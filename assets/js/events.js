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

//show popup dialog on node click
$('#diagramDiv').on('click', '#basic-example > div', function() {

    if (!globablVars.selectParent) {
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
            console.log($("#parentId").val());
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
                var editText = window.prompt("Edit text", $("#" + $("#parentId").val() + " > .node-name").html());
                editNode(chart_config.nodeStructure, $("#parentId").val(), editText);
                console.log("Edit Complete");
                chart = new Treant(chart_config);
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
    $('#myModal').modal('show')
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

$('#btnNew').click(function () {
    var conclusionText = window.prompt("Please enter a conclusion");
    chart_config = newChart(conclusionText);
    globablVars.count = 1;
    chart = new Treant(chart_config);
});

$("#diagramDiv").on("click", "#basic-example > div", function () {
    $("#parentId").val($(this)[0].id);
    console.log(findNode($(this)[0].id, chart_config.nodeStructure));
    
    //this only activates if user has clicked "connect node"
    if (globablVars.selectParent) {
        globablVars.selectParent = false;
        // globablVars.selectChild = true;
        globablVars.parent = findNode($(this)[0].id, chart_config.nodeStructure);
        var x = document.getElementById("snackbar");
        //x.innerHTML = "Select Child Node(s)";
        deleteNode(chart_config.nodeStructure, globablVars.child.id);
        var object = getObjects(chart_config.nodeStructure, 'id', globablVars.parent.id);
        if (object[0].type == "reason") {
            object[0].children.push(globablVars.child);
        } else {
            object[0].children.push(reasonNode(globablVars.child));
        }
        chart = new Treant(chart_config);
        var x = document.getElementById("snackbar");
        x.innerHTML = "";
        x.className = x.className.replace("show", "");
    }
});

function saveText(text, filename) {
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click();
}