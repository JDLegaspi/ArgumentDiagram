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
    $("#highlightTextWrapper").fadeIn(200);
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

//$('#btnLoad').click(function () { changed to #fileinput so user doesn't have 2 actions to upload
$('#fileinput').change(function () {
    var file = document.getElementById('fileinput').files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
            chart_config = JSON.parse(e.target.result);
            chart = new Treant(chart_config);
        };
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
            $('#text').val(reader.result);
        };
    } else {
        window.alert("No file chosen");
    }
});

$('#btnNew').click(function () {
    var conclusionText = window.prompt("Please enter a conclusion");
    chart_config = newChart(conclusionText);
    globablVars.count = 1;
    chart = new Treant(chart_config);
});

$('#btnImportText').click(function () {
    $('#textInput').click();
});

$("#diagramDiv").on("click", "#basic-example > div", function () {
    $("#parentId").val($(this)[0].id);
    console.log(findNode($(this)[0].id, chart_config.nodeStructure));

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

            calculateAttributes(object[0]);
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
