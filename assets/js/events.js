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

//show popup dialog on node click
$('#diagramDiv').on('click', '#basic-example > div', function() {
    if (!globablVars.selectParent && !globablVars.selectConflict1 && !globablVars.selectConflict2 && !$(this).hasClass("conflict")) {
        $("#nodeFunctionsWrapper").fadeIn(200);
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

    $('#nodeFunctionsWrapper').on('click', '#btnDelete', function () {
        if ($("#parentId").val()) {
            chartHistory();
            deleteNode(chart_config.nodeStructure, $("#parentId").val());
            chart = new Treant(chart_config);
        } else {
            window.alert("Please select a node");
        }
    });

    $('#nodeFunctionsWrapper').on('click', '#btnEdit', function () {
        if ($("#parentId").val()) {
            if ($("#" + $("#parentId").val()).hasClass("reason")) {
                window.alert("Can't edit reasoning node");
            } else {
                $('#editNodeModal').modal('show');
                var node = findNode($("#parentId").val(), chart_config.nodeStructure);
                $("#editName").val(node.name);
                $("#editReli").val(node.attributes.reliability);
                $("#editAccu").val(node.attributes.accuracy);
                $("#editRele").val(node.attributes.relevancy);
                $("#editUniq").val(node.attributes.uniqueness);
            }
        } else {
            window.alert("Please select a node");
        }
    });

    $('#nodeFunctionsWrapper').on('click', '#btnConnect', function () {
        globablVars.child = findNode($("#parentId").val(), chart_config.nodeStructure);
        globablVars.selectParent = true;
        console.log(globablVars.child);
        var x = document.getElementById("snackbar")
        x.className = "show";
        x.innerHTML = "Select Parent Node";
    });

});

$('#btnNewNode').click(function () {
    $('#newNodeModal').modal('show');
});

$('#btnSave').click(function () {
    saveText(JSON.stringify(chart_config), "diagram.txt");
});


//sends ajax request to php file, which saves it locally, then upload to google
$('#btnSaveDrive').on('click', function () {
    
    var filename = chart_config.chart.doc.title.replace(/ /g,"_");
    // var data = {
    //     chart_data: JSON.stringify(chart_config),
    //     chart_filename: filename
    // };
    var str_json = JSON.stringify(chart_config);
    $.ajax({
        type: "POST",
        url: "drive_process_file.php",
        data: str_json,
        error: function(req, status, err) {
            console.log('Something went wrong', status, err);
        }
    });

    $.ajax({
        type: "POST",
        url: "drive_process_filename.php",
        data: {chart_filename: filename},
        error: function(req, status, err) {
            console.log('Something went wrong', status, err);
        }
    });

    if (!globablVars.selectParent) {
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

    $('#saveFunctionsWrapper').one('click', '#btnDownload', function() {
        saveText(JSON.stringify(chart_config), "diagram.txt");
    });

    $('#saveFunctionsWrapper').off('click').on('click', '#btnSaveToDrive', function() {
        
        var data = {
            save_to_drive: "pls save mi",
            file_name: filename,
            file_contents: str_json
        };
        
        $.ajax({
            type: "POST",
            url: "app/drive_functions.php",
            data: data,
            success: function(data) {
                var item_id = data.trim();
                console.log(item_id);
                var $newElement = $('<li>', {id: item_id});
                var $anchor = $('<a>');
                $anchor.html(filename);
                $newElement.append($anchor);
                $(".my-diagrams ul").append($newElement);
            },
            error: function(req, status, err) {
                console.log('Something went wrong', status, err);
            }
        });
    });
     
});

//$('#btnLoad').click(function () { changed to #fileinput so user doesn't have 2 actions to upload
$('#fileinput').change(function () {
    var file = document.getElementById('fileinput').files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
            chart_config = JSON.parse(e.target.result);
            var chart = new Treant(chart_config);
            $('#text').val(chart_config.chart.doc.text);
            globablVars.count = 1;
            globablVars.reasonNodes = 0;
            globablVars.history = 0;
            countNodes(chart_config.nodeStructure);
        };
        $('.container').show();
        $('.jumbotron').hide();
    } else {
        window.alert("No file chosen");
    }
});

$('#textInput').change(function () {
    console.log("test");
    var file = document.getElementById('textInput').files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            chart_config.chart.doc.text = reader.result;
            $('#text').val(reader.result);
        };
        $('.container').show();
        $('.jumbotron').hide();
    } else {
        window.alert("No file chosen");
    }
});

$('.btnNew').click(function () {
    initialise();
    $('#textInput').click();
    var chart = new Treant(chart_config);
});

$('.btnLoad').click(function () {
    $('#fileinput').click();
});

$('#btnImportText').click(function () {
    $('#textInput').click();
});

$("#diagramDiv").on("click", "#basic-example > div", function () {
    $("#parentId").val($(this)[0].id);
    console.log(findNode($(this)[0].id, chart_config.nodeStructure));
    console.log(findParent($(this)[0].id, chart_config.nodeStructure));

    //this only activates if user has clicked "connect node"
    if (globablVars.selectParent) {
        if ((findNode($(this)[0].id, chart_config.nodeStructure)).type == "conflict") {
            window.alert("Can't connect anymore arguments to the conflicting argument node");
        } else {
            chartHistory();
            globablVars.selectParent = false;
            // globablVars.selectChild = true;
            globablVars.parent = findNode($(this)[0].id, chart_config.nodeStructure);
            var x = document.getElementById("snackbar");
            deleteNode(chart_config.nodeStructure, globablVars.child.id);
            var object = getObjects(chart_config.nodeStructure, 'id', globablVars.parent.id);

            if (object[0].type == "reason") {
                if (globablVars.child.type == "reason") {
                    for (var i = 0; i < globablVars.child.children.length; i++) {
                        object[0].children.push(globablVars.child.children[i]);
                    }
                } else {
                    object[0].children.push(globablVars.child);
                    calculateAttributes(object[0]);
                    //parentAttributes(findParent(object[0].id, chart_config.nodeStructure));
                }
            } else {
                if (globablVars.child.type == "reason") {
                    for (var i = 0; i < globablVars.child.children.length; i++) {
                        object[0].children.push(globablVars.child.children[i]);
                    }
                } else {
                    object[0].children.push(reasonNode(globablVars.child));
                }
            }
            calculateParentAttributes(chart_config.nodeStructure);
            chart = new Treant(chart_config);
            var x = document.getElementById("snackbar");
            x.innerHTML = "";
            x.className = x.className.replace("show", "");
        }
    }

    //this only activates if user has clicked "conflict node"
    if (globablVars.selectConflict1) {
        globablVars.selectConflict1 = false;
        globablVars.selectConflict2 = true;
        globablVars.conflict1 = findNode($(this)[0].id, chart_config.nodeStructure);
    } else if (globablVars.selectConflict2) {
        globablVars.selectConflict2 = false;
        globablVars.conflict2 = findNode($(this)[0].id, chart_config.nodeStructure);
        chartHistory();
        chart_config.nodeStructure.children.push(conflictNode(globablVars.conflict1, globablVars.conflict2));
        deleteNode(chart_config.nodeStructure, globablVars.conflict1.id);
        deleteNode(chart_config.nodeStructure, globablVars.conflict2.id);
        var chart = new Treant(chart_config);
    }
});

$("#diagramDiv").on("mouseover", "#basic-example > div", function () {
    $(this).find("table").css('background-color', '#DDDDDD');
    $(this).find("p").css('background-color', '#DDDDDD');
    var node = findNode($(this)[0].id, chart_config.nodeStructure);
    if (node.type != "reason") {
        var textArea = document.getElementById("text")
        textArea.focus();
        textArea.selectionStart = node.linktext.start;
        textArea.selectionEnd = node.linktext.end;
    }
});

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

$(".my-diagrams-container").on("click", ".my-diagrams ul li", function () {
    if (!globablVars.selectParent) {
        $("#myChartsWrapper").fadeIn(200);
    }

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

    // Button Click Functions Go Here!!!

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
                $('#text').val(chart_config.chart.doc.text);
                
                globablVars.count = 1;
                globablVars.reasonNodes = 0;
                globablVars.history = 0;

                countNodes(chart_config.nodeStructure);
                
                $('.container').show();
                $('.jumbotron').hide();

                var chart = new Treant(chart_config);

            },
            error: function(req, status, err) {
                console.log('Something went wrong', status, err);
            }
        });
    });

});

$('#btnUndo').click(function () {
    console.log(historyArray);
    if (globablVars.history != 0) {
        globablVars.history--;
        chart_config = historyArray[globablVars.history];
        var chart = new Treant(chart_config);
    }
});

$('#btnConflict').click(function () {
    globablVars.selectConflict1 = true;
});

function saveText(text, filename) {
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click();
}


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
