//The code snippet below tracks mouse position
var mouseX, mouseY, windowWidth, windowHeight;
var popupLeft, popupTop;

$(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    //To Get the relative position
    if (this.offsetLeft != undefined) mouseX = e.pageX - this.offsetLeft;
    if (this.offsetTop != undefined) mouseY = e.pageY;
    -this.offsetTop;

    if (mouseX < 0) mouseX = 0;
    if (mouseY < 0) mouseY = 0;

    windowWidth = $(window).width();
    windowHeight = $(window).height();
});

// Show popup dialog on mouse release in text area
$("#text").mouseup(function() {
    console.log($(this).prop('selectionStart') + ", " + $(this).prop('selectionEnd'));
    if ($(this).prop('selectionStart') != $(this).prop('selectionEnd')) {
        $("#highlightTextWrapper").fadeIn(200);
    }
    var containerWidth = $("#highlightTextWrapper").outerWidth();
    var containerHeight = $("#highlightTextWrapper").outerHeight();

    var popupWidth = $("#highlightText").outerWidth();
    var popupHeight = $("#highlightText").outerHeight();

    var paddingTop = (containerHeight - popupHeight) / 2;
    var paddingLeft = (containerWidth - popupWidth) / 2

    if (mouseX + popupWidth > windowWidth) popupLeft = mouseX - popupWidth - paddingLeft;
    else popupLeft = mouseX - paddingLeft;

    if (mouseY + popupHeight > windowHeight) popupTop = mouseY - paddingTop;
    else popupTop = mouseY - paddingTop;

    if (popupLeft < 0) popupLeft = 0;
    if (popupTop < 0) popupTop = 0;

    $("#highlightTextWrapper").offset({ top: popupTop, left: popupLeft });

    $('#highlightTextWrapper').on('click', function() {
      $('#highlightTextWrapper').fadeOut(200);
    });

    $(document).mousedown(function() {
        $('#highlightTextWrapper').fadeOut(200);
    });

    $('#highlightTextWrapper').on('click', '#btnNewNode', function () {
        var textArea = document.getElementById("text");
        var text = textArea.value.slice(textArea.selectionStart, textArea.selectionEnd);
        $('#newNodeModal').modal('show');
        $("#nodename").val(text);
    });
});

// Show popup dialog on node click
$('#diagramDiv').on('click', '#basic-example > div', function() {
    globalVars.this = $(this)[0].id;
    console.log(findNode(globalVars.this, chart_config.nodeStructure));
    $("#parentId").val(globalVars.this);

    // Following code is all for popup dialog
    if (!globalVars.selectParent && !globalVars.selectConflict1 && !globalVars.selectConflict2 && !$(this).hasClass("conflict")) {
        $("#nodeFunctionsWrapper").fadeIn(200);
        var thisNode = findNode(globalVars.this, chart_config.nodeStructure);
        if (thisNode.type == "reasonAttr") {
            $('#btnConnect').hide();
            $('#btnCollapse').hide();
            $('#btnDelete').hide();
        } else {
            $('#btnConnect').show();
            $('#btnCollapse').show();
            $('#btnDelete').show();
        }
        if (thisNode.type == "reason") {
            $('#btnEdit').hide();
            $('#btnCollapse').hide();
        } else {
            $('#btnEdit').show();
            $('#btnCollapse').show();
        }
    }

    var containerWidth = $("#nodeFunctionsWrapper").outerWidth();
    var containerHeight = $("#nodeFunctionsWrapper").outerHeight();

    var popupWidth = $("#nodeFunctions").outerWidth();
    var popupHeight = $("#nodeFunctions").outerHeight();

    var paddingTop = (containerHeight - popupHeight) / 2;
    var paddingLeft = (containerWidth - popupWidth) / 2

    if (mouseX + popupWidth > windowWidth) popupLeft = mouseX - popupWidth - paddingLeft;
    else popupLeft = mouseX - paddingLeft;

    if (mouseY + popupHeight > windowHeight) popupTop = mouseY - paddingTop;
    else popupTop = mouseY - paddingTop;

    if (popupLeft < 0) popupLeft = 0;
    if (popupTop < 0) popupTop = 0;

    $("#nodeFunctionsWrapper").offset({ top: popupTop, left: popupLeft });

    $('#nodeFunctionsWrapper').mouseleave(function(e) {
        $('#nodeFunctionsWrapper').fadeOut(200);
    });

    $('#nodeFunctionsWrapper').on('click', function() {
        $('#nodeFunctionsWrapper').fadeOut(200);
    });

    // This only activates if user has clicked "connect node"
    if (globalVars.selectParent) {
        if ((findNode($(this)[0].id, chart_config.nodeStructure)).type == "conflict") {
            window.alert("Can't connect anymore arguments to the conflicting argument node");
        } else if ((findNode($(this)[0].id, chart_config.nodeStructure)).type == "reasonAttr") {
            window.alert("Can't connect other nodes to this node");
        // Connect two nodes together
        } else {
            chartHistory();
            globalVars.selectParent = false;
            globalVars.parent = findNode($(this)[0].id, chart_config.nodeStructure);
            var originalParent = findParent(globalVars.child.id, chart_config.nodeStructure);
            var object = getObjects(globalVars.parent.id, chart_config.nodeStructure);
            deleteNode(globalVars.child.id, chart_config.nodeStructure);
            if (originalParent.children.length == 2 && originalParent.id != 1) {
                deleteNode(originalParent.id, chart_config.nodeStructure);
            }
            // If connecting to a reason node
            if (object[0].type == "reason") {
                // If connecting a reason node, combine them (deletes child reason)
                if (globalVars.child.type == "reason") {
                    for (var i = 0; i < globalVars.child.children.length; i++) {
                        if (globalVars.child.children[i].type == "reasonAttr") {
                            deleteNode(globalVars.child.children[i], chart_config.nodeStructure);
                        } else {
                            object[0].children.push(globalVars.child.children[i]);
                        }
                    }
                } else {
                    object[0].children.push(globalVars.child);
                }
            } else {
                if (object[0].children.length > 0) {
                    var index = object[0].children.length - 1;
                    // If connecting a reason node to a parent
                    if (globalVars.child.type == "reason") {
                        if (object[0].children[index].type == "conflict") {
                            object[0].children.splice(index, 0, globalVars.child);
                        } else {
                            object[0].children.push(globalVars.child);
                        }
                    // Else creates a reason node
                    } else {
                        if (object[0].children[index].type == "conflict") {
                            object[0].children.splice(index, 0, reasonNode(globalVars.child));
                        } else {
                            object[0].children.push(reasonNode(globalVars.child));
                        }
                    }
                } else {
                    // If connecting a reason node to a parent
                    if (globalVars.child.type == "reason") {
                        object[0].children.push(globalVars.child);
                    // Else creates a reason node
                    } else {
                        object[0].children.push(reasonNode(globalVars.child));
                    }
                }
            }
            calculateChartAttributes(chart_config.nodeStructure);
            drawChart();
            hideSnackbar();
        }
    }

    // This only activates if user has clicked "conflict node"
    if (globalVars.selectConflict) {
        var node = findNode($(this)[0].id, chart_config.nodeStructure);
        if (findParent(node.id, chart_config.nodeStructure).id != 1) {
            window.alert("Conflicting argument must be a conclusion");
        } else if (node == globalVars.conflict1) {
            window.alert("Cannot select the same node");
        } else {
            globalVars.selectConflict = false;
            chartHistory();
            deleteNode(node.id, chart_config.nodeStructure);
            globalVars.conflict1.children.push(conflictNode(node));
            calculateChartAttributes(chart_config.nodeStructure);
            drawChart();
            hideSnackbar();
        }
    }
});

// Highlights nodes when mouse over
$("#diagramDiv").on("mouseover", "#basic-example > div", function () {
    $(this).find("table").css('background-color', '#DDDDDD');
    $(this).find("p").css('background-color', '#DDDDDD');
    var node = findNode($(this)[0].id, chart_config.nodeStructure);
    if (node.type != "reason" && node.type != "conflict" && node.type != "reasonAttr") {
        // Selects and scrolls to linked text
        var textArea = document.getElementById("text");
        var selectionStart = node.linktext.start;
        var selectionEnd = node.linktext.end;
        textArea.focus();
        textArea.setSelectionRange(selectionStart, selectionEnd);
        var LineHeight = 20;
        var Height = textArea.scrollHeight;
        var numberOfLines = Math.floor(Height/LineHeight);
        var charsPerRow = textArea.value.length/numberOfLines;
        var selectionRow = (selectionStart - (selectionStart % charsPerRow)) / charsPerRow;
        textArea.scrollTop = 20 * (selectionRow - 1);
    }
});

// Removes highlights when mouse leaves node
$("#diagramDiv").on("mouseleave", "#basic-example > div", function () {
    $(this).find("table").css('background-color', '');
    $(this).find("p").css('background-color', '');
    var node = findNode($(this)[0].id, chart_config.nodeStructure);
    if (node.type != "reason") {
        var textArea = document.getElementById("text")
        textArea.selectionStart = 0;
        textArea.selectionEnd = 0;
        textArea.blur();
    }
});

$('#btnNewNode').click(function () {
    $('#newNodeModal').modal('show');
});


// Sends ajax request to php file, which saves it locally, then upload to google
$('#btnSaveDrive').on('click', function () {

    var filename = chart_config.chart.doc.title.replace(/ /g,"_");

    if (!globalVars.selectParent) {
        $("#saveFunctionsWrapper").fadeIn(200);
    }

    var containerWidth = $("#saveFunctionsWrapper").outerWidth();
    var containerHeight = $("#saveFunctionsWrapper").outerHeight();

    var popupWidth = $("#saveFunctions").outerWidth();
    var popupHeight = $("#saveFunctions").outerHeight();

    var paddingTop = (containerHeight - popupHeight) / 2;
    var paddingLeft = (containerWidth - popupWidth) / 2

    if (mouseX + popupWidth > windowWidth) popupLeft = mouseX - popupWidth - paddingLeft;
    else popupLeft = mouseX - paddingLeft;

    if (mouseY + popupHeight > windowHeight) popupTop = mouseY - paddingTop;
    else popupTop = mouseY - paddingTop;

    if (popupLeft < 0) popupLeft = 0;
    if (popupTop < 0) popupTop = 0;

    $("#saveFunctionsWrapper").offset({ top: popupTop, left: popupLeft });

    $('#saveFunctionsWrapper').mouseleave(function(e) {
        $('#saveFunctionsWrapper').fadeOut(200);
    });

    $('#saveFunctionsWrapper').on('click', function() {
        $('#saveFunctionsWrapper').fadeOut(200);
    });

    $('#saveFunctionsWrapper').off('click').on('click', '#btnSaveToDrive', function() {

        str_json = JSON.stringify(chart_config);

        var data = {
            save_to_drive: "pls save mi",
            file_name: filename,
            file_contents: str_json,
            drive_id: globalVars.driveId
        };

        $.ajax({
            type: "POST",
            url: "app/drive_functions.php",
            data: data,
            success: function(data) {
                if (globalVars.driveId == null) {
                    var item_id = data.trim();
                    globalVars.driveId = item_id;
                    var $newElement = $('<li>', {id: item_id});
                    var $anchor = $('<a>');
                    $anchor.html(filename + ".argu");
                    $newElement.append($anchor);
                    $(".my-diagrams #myFiles").append($newElement);
                }

            },
            error: function(req, status, err) {
                console.log('Something went wrong', status, err);
            }
        });
    });

});

// Loads existing chart file
$('#fileInput').change(function () {
  console.log("test");
    var file = document.getElementById('fileInput').files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
            globalVars.driveId = null;
            chart_config = JSON.parse(e.target.result);
            parseNaN(chart_config.nodeStructure);
            initialise();
            drawChart();
        };
    } else {
        window.alert("No file chosen");
    }
    this.form.reset();
});

// Validation for text input. Moves onto naming chart if valid file type
$('#textInput').change(function () {
    var file = document.getElementById('textInput').files[0];
    if (file) {
        var fileName = file.name;
        var txt = ".txt";
        var docx = ".docx";
        if (fileName.substr(fileName.length - txt.length, txt.length).toLowerCase() != txt.toLowerCase()
            & fileName.substr(fileName.length - docx.length, docx.length).toLowerCase() != docx.toLowerCase())
        {
            window.alert("File type not supported");
        } else {
            $('.arg-container').hide();
            $('.starting-screen').hide();
            $('.name-chart').show();
        }
    } else {
        window.alert("No file chosen");
    }
});

// Used to name and initialise chart
$('#start').click(function () {
    if ($('#chartName').val() != '') {
        globalVars.driveId = null;
        var loadFile=function(url,callback){
                JSZipUtils.getBinaryContent(url,callback);
            }
        var file = document.getElementById('textInput').files[0];
        if (file) {
            var fileName = file.name;
            var txt = ".txt";
            var docx = ".docx";
            var reader = new FileReader();
            if (fileName.substr(fileName.length - txt.length, txt.length).toLowerCase() == txt.toLowerCase()) {
                reader.readAsText(file);
                reader.onload = function () {
                    var chartName = $('#chartName').val();
                    newChart(reader.result, chartName);
                    initialise();
                };
            } else if (fileName.substr(fileName.length - docx.length, docx.length).toLowerCase() == docx.toLowerCase()) {
                reader.onload = function (e) {
                    loadFile(e.target.result,function(error,content){
                        if (error) { throw error };
                        var zip = new JSZip(content);
                        var doc=new Docxtemplater().loadZip(zip);
                        text=doc.getFullText();
                        var chartName = $('#chartName').val();
                        newChart(text, chartName);
                        initialise();
                    });
                }
                reader.readAsDataURL(file);
            } else {
                window.alert("File type not supported");
            }
        } else {
            window.alert("No file chosen");
        }
    } else {
        window.alert("Please enter a file name")
    }
});

$(".my-diagrams-container").on("click", ".my-diagrams ul li", function () {
    if ($(this).parent().attr('id') == "myFiles") {
        $('#btnShareChart').show();
        $('#btnDeleteChart').show();
        $('#btnRenameChart').show();
        $('#btnRemoveChart').hide();
    } else if ($(this).parent().attr('id') == "sharedFiles") {
        $('#btnShareChart').hide();
        //$('#btnDeleteChart').hide();
        $('#btnRenameChart').hide();
        $('#btnRemoveChart').show();
    }
    $("#myChartsWrapper").fadeIn(200);
    console.log($(this).parent().attr('id'));
    var itemID = $(this).attr('id');
    console.log("Google Item ID: #" + itemID);

    var containerWidth = $("#myChartsWrapper").outerWidth();
    var containerHeight = $("#myChartsWrapper").outerHeight();

    var popupWidth = $("#myChartsFunctions").outerWidth();
    var popupHeight = $("#myChartsFunctions").outerHeight();

    var paddingTop = (containerHeight - popupHeight) / 2;
    var paddingLeft = (containerWidth - popupWidth) / 2

    if (mouseX + popupWidth > windowWidth) popupLeft = mouseX - popupWidth - paddingLeft;
    else popupLeft = mouseX - paddingLeft;

    if (mouseY + popupHeight > windowHeight) popupTop = mouseY - paddingTop;
    else popupTop = mouseY - paddingTop;

    if (popupLeft < 0) popupLeft = 0;
    if (popupTop < 0) popupTop = 0;

    $("#myChartsWrapper").offset({ top: popupTop, left: popupLeft });

    $('#myChartsWrapper').mouseleave(function(e) {
        $('#myChartsWrapper').fadeOut(200);
    });

    $('#myChartsWrapper').on('click', function() {
        $('#myChartsWrapper').fadeOut(200);
    });

    $('#myChartsWrapper').off('click').on('click', '#btnShareChart', function() {
        var email = prompt("Enter Email address of user you would like to share file with");
        // var email = "testa8326@gmail.com";
        var data = {
            share_chart: "plez share mi",
            email: email,
            file_id: itemID
        };
        $.ajax({
            type: "POST",
            url: "app/drive_functions.php",
            data: data,
            success: function(data) {
                showSnackbar("Shared with " + email);
            },
            error: function(req, status, err) {
                showSnackbar("Failed to share");
                console.log('Something went wrong', status, err);
            }
        });
    });

    $('#myChartsWrapper').one('click', '#btnRemoveChart', function() {
        window.alert("You must use the Google Drive site to remove shared files");
    });

    $('#myChartsWrapper').one('click', '#btnDeleteChart', function() {
        $('#' + itemID).remove();
        var data = {
            delete_chart: "plez delete mi",
            file_id: itemID
        };
        $.ajax({
            type: "POST",
            url: "app/drive_functions.php",
            data: data,
            error: function(req, status, err) {
                console.log('Something went wrong', status, err);
            }
        });
    });

    $('#myChartsWrapper').one('click', '#btnOpenChart', function() {
        showSnackbar("Opening Chart...");
        var data = {
            open_chart: "plez open mi",
            file_id: itemID
        };
        $.ajax({
            type: "POST",
            url: "app/drive_functions.php",
            data: data,
            success: function(data) {
                chart_config = JSON.parse(data);
                parseNaN(chart_config.nodeStructure);
                globalVars.driveId = itemID;
                initialise();
                hideSnackbar();
            },
            error: function(req, status, err) {
                console.log('Something went wrong', status, err);
            }
        });
        toggleNav();
    });

});

$('#btnHelp').click(function() {
    //introJs()
    introJs().onbeforechange(function(openNav) {
        if (openNav.id == $('#mySidenav').attr('id') || openNav.id == $('#btnHelp').attr('id')) {
            $('#open-nav').click();
        }
    }).start();
});

$('#btnUndo').click(function () {
    undoChart();
});

$('#btnCancel').click(function () {
    hideSnackbar();
    globalVars.selectConflict = false;
    globalVars.selectParent = false;
});

$('#btnConflict').click(function () {
    showSnackbar("Select Conflicting Argument");
    globalVars.conflict1 = findNode(globalVars.this, chart_config.nodeStructure);
    globalVars.selectConflict = true;
});

function saveText(text, filename) {
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click();
}

var currentZoom = 1.0;

$('#btnZoomIn').click(function () {
    currentZoom = currentZoom+0.05;
    var scaleString = "scale("+currentZoom+")";
    $("#basic-example").css("transform", scaleString);
    $("svg").position.left = 0;
});

$('#btnZoomOut').click(function () {
    currentZoom = currentZoom-0.05;
    var scaleString = "scale("+currentZoom+")";
    $("#basic-example").css("transform", scaleString);
});

$('#btnFitZoom').click(function () {
    var divWidth = $('#chart').width();
    var svg = document.getElementsByTagName("svg")[0];
    var svgWidth = svg.getBoundingClientRect().width;
    if (svgWidth < divWidth) {
        while (svgWidth < divWidth) {
            currentZoom = currentZoom+0.05;
            var scaleString = "scale("+currentZoom+")";
            $("#basic-example").css("transform", scaleString);
            svgWidth = svg.getBoundingClientRect().width;
        }
    }
    while (svgWidth > divWidth) {
        currentZoom = currentZoom-0.05;
        var scaleString = "scale("+currentZoom+")";
        $("#basic-example").css("transform", scaleString);
        svgWidth = svg.getBoundingClientRect().width;
    }
});

$("#btnToggleAttributes").click(function () {
    if (globalVars.hideAttributes) {
        globalVars.hideAttributes = false;
        $('.chart-key').show();
    } else {
        globalVars.hideAttributes = true;
        $('.chart-key').hide();
    }
    toggleAttributes(chart_config.nodeStructure);
    drawChart();
});

var isOpen = true;

function toggleNav() {
    if (isOpen) {
        isOpen = false;
        /* Set the width of the side navigation to 250px */
        var newWidth = "300px"
        document.getElementById("mySidenav").style.width = newWidth;
        $(".navbar-main").css("margin-left", newWidth);
    }
    else {
        isOpen = true;
        document.getElementById("mySidenav").style.width = "0";
        $(".navbar-main").css("margin-left", "0");
    }
}

// COPIED FROM MODAL
$('#nodeFunctionsWrapper').on('click', '#btnDelete', function () {
    if (globalVars.this) {
        chartHistory();
        deleteNode(globalVars.this, chart_config.nodeStructure);
        calculateChartAttributes(chart_config.nodeStructure);
        drawChart();
    } else {
        window.alert("Please select a node");
    }
});

$('#nodeFunctionsWrapper').on('click', '#btnEdit', function () {
    if (globalVars.this) {
        if ($("#" + globalVars.this).hasClass("reason")) {
            window.alert("Can't edit reasoning node");
        } else {
            var thisNode = findNode(globalVars.this, chart_config.nodeStructure);
            var selectedText = $('#text').val().slice(thisNode.linktext.start, thisNode.linktext.end);
            $('#editNodeModal').modal('show');
            $("#editName").val(thisNode.name);
            $("#editReli").val(thisNode.attributes.reliability[0]);
            $("#editAccu").val(thisNode.attributes.accuracy[0]);
            $("#editRele").val(thisNode.attributes.relevancy[0]);
            $("#editUniq").val(thisNode.attributes.uniqueness[0]);
            $("#editComp").val(thisNode.attributes.completeness[0]);
            $("#selectedText").val(selectedText);
            $("#editSelect").val($('#text').val());
            if (thisNode.type == "reasonAttr") {
                $("#editName").prop('disabled', true);
                $("#selectedText").prop('disabled', true);
            } else {
                $("#editName").prop('disabled', false);
                $("#selectedText").prop('disabled', false);
            }
        }
    } else {
        window.alert("Please select a node");
    }
});

$('#nodeFunctionsWrapper').on('click', '#btnConnect', function () {
    var thisNode = findNode(globalVars.this, chart_config.nodeStructure);
    globalVars.child = thisNode;
    globalVars.selectParent = true;
    showSnackbar("Select the node to connect to");
});

$('#nodeFunctionsWrapper').on('click', '#btnCollapse', function () {
    var thisNode = findNode(globalVars.this, chart_config.nodeStructure);
    if (thisNode.collapsed) {
        thisNode.collapsed = false;
    } else {
        thisNode.collapsed = true;
    }
    drawChart();
});

$('#submitNew').click(function () {
    $('#newNodeModal').modal('hide');
    globalVars.count += 1;
    var id = globalVars.count;
    var type = "fact";
    var name = $('#nodename').val();
    var relia = parseFloat($('#reliability').val());
    var accur = parseFloat($('#accuracy').val());
    var relev = parseFloat($('#relevancy').val());
    var unique = parseFloat($('#uniqueness').val());
    var comple = parseFloat($('#completeness').val());
    var startSel = document.getElementById("text").selectionStart;
    var endSel = document.getElementById("text").selectionEnd;
    if (startSel == endSel) {
        startSel = null;
        endSel = null;
    }
    chartHistory();
    chart_config.nodeStructure.children.push(newNode(id, type, name, relia, accur, relev, unique, comple, startSel, endSel));
    drawChart();
    $('#newNodeModal').find('form').trigger('reset');
});

$('#cancelNew').click(function () {
    $('#newNodeModal').modal('hide');
    $('#newNodeModal').find('form').trigger('reset');
});

$('#submitEdit').click(function () {
    $('#editNodeModal').modal('hide');
    var name = $('#editName').val();
    var reli = parseFloat($('#editReli').val());
    var accu = parseFloat($('#editAccu').val());
    var rele = parseFloat($('#editRele').val());
    var uniq = parseFloat($('#editUniq').val());
    var comp = parseFloat($('#editComp').val());
    chartHistory();
    editNode(chart_config.nodeStructure, globalVars.this, name, reli, accu, rele, uniq, comp);
    calculateChartAttributes(chart_config.nodeStructure);
    drawChart();
    $('#editNodeModal').find('form').trigger('reset');
});

$('#cancelEdit').click(function () {
    $('#editNodeModal').modal('hide');
    $('#editNodeModal').find('form').trigger('reset');
});

$('#textEdit').click(function () {
    $('#editSelectModal').modal('show');
});

$('#btnAlgebra').click(function () {
    $('#algebraModal').modal('show');
});

$('#submitAlgebra').click(function () {
    $('#algebraModal').modal('hide');
    // Super super janky option select. Whoever sees this I am sorry
    var support = [];
    var accrual = [];
    var conflict = [];
    support.push($('#supportReli').val());
    support.push($('#supportAccu').val());
    support.push($('#supportRele').val());
    support.push($('#supportUniq').val());
    support.push($('#supportComp').val());

    accrual.push($('#accrualReli').val());
    accrual.push($('#accrualAccu').val());
    accrual.push($('#accrualRele').val());
    accrual.push($('#accrualUniq').val());
    accrual.push($('#accrualComp').val());

    conflict.push($('#conflictReli').val());
    conflict.push($('#conflictAccu').val());
    conflict.push($('#conflictRele').val());
    conflict.push($('#conflictUniq').val());
    conflict.push($('#conflictComp').val());
    var i = 0;
    for (var key in globalVars.support) {
        globalVars.support[key] = support[i];
        globalVars.accrual[key] = accrual[i];
        globalVars.conflict[key] = conflict[i];
        i++;
    }
    calculateChartAttributes(chart_config.nodeStructure);
    console.log(support);
    drawChart();
});

$('#editSelectModal').on('show.bs.modal', function () {
    console.log("test");
    var node = findNode(globalVars.this, chart_config.nodeStructure);
    if (node.type != "reason" && node.type != "conflict" && node.type != "reasonAttr") {
        console.log("test");
        // Selects and scrolls to linked text
        var textArea = document.getElementById("editSelect");
        var selectionStart = node.linktext.start;
        var selectionEnd = node.linktext.end;
        textArea.focus();
        textArea.setSelectionRange(selectionStart, selectionEnd);
        var LineHeight = 20;
        var Height = textArea.scrollHeight;
        var numberOfLines = Math.floor(Height/LineHeight);
        var charsPerRow = textArea.value.length/numberOfLines;
        var selectionRow = (selectionStart - (selectionStart % charsPerRow)) / charsPerRow;
        textArea.scrollTop = 20 * (selectionRow - 1);
    }
});

$('#saveSelect').click(function() {
    var textArea = document.getElementById("editSelect");
    editSelection(chart_config.nodeStructure, globalVars.this, textArea.selectionStart, textArea.selectionEnd);
    var thisNode = findNode(globalVars.this, chart_config.nodeStructure);
    var selectedText = chart_config.chart.doc.text.slice(thisNode.linktext.start, thisNode.linktext.end);
    $("#selectedText").val(selectedText);
    $('#editNodeModal').modal('show');
    $('#editSelectModal').find('form').trigger('reset');
});

$('#saveFunctionsWrapper').on('click', '#btnDownload', function() {
    saveText(JSON.stringify(chart_config), (chart_config.chart.doc.title + ".argu"));
});

$('#btnExport').click(function () {
    var div = document.createElement('div');
    div.innerHTML = document.getElementById('chart').innerHTML;
    div.style.width = 'fit-content';
    div.children[1].style.transform = 'scale(1)';
    document.body.appendChild(div);
    html2canvas(div, {
        allowTaint: true,
		useOverflow: true,
        background: '#fff'
    }).then(function(canvas) {
		var a = document.createElement('a');
		a.href = canvas.toDataURL();
		a.download = chart_config.chart.doc.title;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
        document.body.removeChild(div);
	});
});

// Keeps number slider in sync with number input
$(".attribute").on('input', function () {
    if ($(this).val() > 1) {
        $(this).val(1);
    }
    if ($(this).context.previousElementSibling.nodeName == "INPUT") {
        var sibling = $(this).context.previousElementSibling;
    } else {
        var sibling = $(this).context.nextElementSibling;
    }
    console.log($(this).context.previousElementSibling.nodeName);
    sibling.value = $(this).val();
});
