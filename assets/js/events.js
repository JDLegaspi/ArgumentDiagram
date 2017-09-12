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
    globablVars.this = $(this)[0].id;
    $("#parentId").val(globablVars.this);
    console.log(findNode(globablVars.this, chart_config.nodeStructure));
    if (!globablVars.selectParent && !globablVars.selectConflict1 && !globablVars.selectConflict2 && !$(this).hasClass("conflict")) {
        $("#nodeFunctionsWrapper").fadeIn(200);
        var thisNode = findNode(globablVars.this, chart_config.nodeStructure);
        if (thisNode.type == "reasonAttr" || findParent(thisNode.id, chart_config.nodeStructure).type == "conflict") {
            $('#btnConnect').prop('disabled', true);
        } else {
            $('#btnConnect').prop('disabled', false);
        }
        if (thisNode.type == "reason") {
            $('#btnEdit').prop('disabled', true);
        } else {
            $('#btnEdit').prop('disabled', false);
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

    $('#nodeFunctionsWrapper').on('click', '#btnDelete', function () {
        if (globablVars.this) {
            chartHistory();
            deleteNode(chart_config.nodeStructure, globablVars.this);
            chart = new Treant(chart_config);
        } else {
            window.alert("Please select a node");
        }
    });

    $('#nodeFunctionsWrapper').on('click', '#btnEdit', function () {
        if (globablVars.this) {
            if ($("#" + globablVars.this).hasClass("reason")) {
                window.alert("Can't edit reasoning node");
            } else {
                var thisNode = findNode(globablVars.this, chart_config.nodeStructure);
                $('#editNodeModal').modal('show');
                $("#editName").val(thisNode.name);
                $("#editReli").val(thisNode.attributes.reliability);
                $("#editAccu").val(thisNode.attributes.accuracy);
                $("#editRele").val(thisNode.attributes.relevancy);
                $("#editUniq").val(thisNode.attributes.uniqueness);
                if (thisNode.type == "reasonAttr") {
                    $("#editName").prop('disabled', true);
                } else {
                    $("#editName").prop('disabled', false);
                }
            }
        } else {
            window.alert("Please select a node");
        }
    });

    $('#nodeFunctionsWrapper').on('click', '#btnConnect', function () {
        var thisNode = findNode(globablVars.this, chart_config.nodeStructure);
        globablVars.child = thisNode;
        globablVars.selectParent = true;
        showSnackbar("Select the node to connect to");
    });
});

$('#btnNewNode').click(function () {
    $('#newNodeModal').modal('show');
});

$('#btnSave').click(function () {
    saveText(JSON.stringify(chart_config), "diagram.txt");
});

// Input for loading an existing chart
$('#fileInput').change(function () {
    var file = document.getElementById('fileInput').files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
            chart_config = JSON.parse(e.target.result);
            initialise();
        };
    } else {
        window.alert("No file chosen");
    }
});

// Input for text and creating a new chart
$('#textInput').change(function () {
    var file = document.getElementById('textInput').files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            newChart(reader.result);
            initialise();
        };
    } else {
        window.alert("No file chosen");
    }
});

$('#btnImportText').click(function () {
    $('#textInput').click();
});

$("#diagramDiv").on("click", "#basic-example > div", function () {
    // This only activates if user has clicked "connect node"
    if (globablVars.selectParent) {
        if ((findNode($(this)[0].id, chart_config.nodeStructure)).type == "conflict") {
            window.alert("Can't connect anymore arguments to the conflicting argument node");
        } else if ((findNode($(this)[0].id, chart_config.nodeStructure)).type == "reasonAttr") {
            window.alert("Can't connect other nodes to this node");
        } else {
            chartHistory();
            globablVars.selectParent = false;
            globablVars.parent = findNode($(this)[0].id, chart_config.nodeStructure);
            var originalParent = findParent(globablVars.child.id, chart_config.nodeStructure);
            var object = getObjects(chart_config.nodeStructure, 'id', globablVars.parent.id);
            deleteNode(chart_config.nodeStructure, globablVars.child.id);
            if (originalParent.children.length == 2 && originalParent.id != 1) {
                deleteNode(chart_config.nodeStructure, originalParent.id);
            }
            if (object[0].type == "reason") {
                if (globablVars.child.type == "reason") {
                    for (var i = 0; i < globablVars.child.children.length; i++) {
                        if (globablVars.child.children[i].type == "reasonAttr") {
                            deleteNode(globablVars.child.children[i]);
                        } else {
                            object[0].children.push(globablVars.child.children[i]);
                        }
                    }
                } else {
                    object[0].children.push(globablVars.child);
                }
            } else {
                if (globablVars.child.type == "reason") {
                    object[0].children.push(globablVars.child);
                } else {
                    object[0].children.push(reasonNode(globablVars.child));
                    calculateAttributes(object[0].children[0]);
                    parentAttributes(object[0]);
                }
            }
            calculateChartAttributes(chart_config.nodeStructure);
            chart = new Treant(chart_config);
            hideSnackbar();
        }
    }

    //this only activates if user has clicked "conflict node"
    if (globablVars.selectConflict1) {
        var node = findNode($(this)[0].id, chart_config.nodeStructure);
        if (findParent(node.id, chart_config.nodeStructure).id != 1) {
            window.alert("Conflicting argument must be a conclusion");
        } else {
            globablVars.selectConflict1 = false;
            globablVars.selectConflict2 = true;
            globablVars.conflict1 = findNode($(this)[0].id, chart_config.nodeStructure);
            showSnackbar("Select Second Conflicting Argument");
        }
    } else if (globablVars.selectConflict2) {
        var node = findNode($(this)[0].id, chart_config.nodeStructure);
        if (findParent(node.id, chart_config.nodeStructure).id != 1) {
            window.alert("Conflicting argument must be a conclusion");
        } else if (node == globablVars.conflict1) {
            window.alert("Cannot select the same node");
        } else {
            globablVars.selectConflict2 = false;
            globablVars.conflict2 = findNode($(this)[0].id, chart_config.nodeStructure);
            chartHistory();
            chart_config.nodeStructure.children.push(conflictNode(globablVars.conflict1, globablVars.conflict2));
            deleteNode(chart_config.nodeStructure, globablVars.conflict1.id);
            deleteNode(chart_config.nodeStructure, globablVars.conflict2.id);
            var chart = new Treant(chart_config);
            hideSnackbar();
        }
    }
});

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
});

$('#btnUndo').click(function () {
    if (globablVars.history != 0) {
        globablVars.history--;
        chart_config = historyArray[globablVars.history];
        parseNaN(chart_config.nodeStructure);
        globablVars.count = 1;
        countNodes(chart_config.nodeStructure);
        var chart = new Treant(chart_config);
    }
});

$('#btnConflict').click(function () {
    showSnackbar("Select First Conflicting Argument");
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
