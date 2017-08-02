$('#btnNewNode').click(function () {
    $('#myModal').modal('show')
})

$('#btnConnect').click(function () {
    globablVars.selectParent = true;
    globablVars.selectChild = false;
    console.log("connect");
    var x = document.getElementById("snackbar")
    x.className = "show";
    x.innerHTML = "Select Parent Node";
})

$('#btnSave').click(function () {
    saveText(JSON.stringify(chart_config), "diagram.txt");
})

$('#btnLoad').click(function () {
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
})

$('#btnNew').click(function () {
    var conclusionText = window.prompt("Please enter a conclusion");
    chart_config = newChart(conclusionText);
    globablVars.count = 1;
    chart = new Treant(chart_config);
})

$('#btnDelete').click(function () {
    if ($("#parentId").val()) {
        console.log($("#parentId").val());
        deleteNode(chart_config.nodeStructure, $("#parentId").val());
        chart = new Treant(chart_config);
    } else {
        window.alert("Please select a node");
    }
})

$('#btnEdit').click(function () {
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
})

$("#diagramDiv").on("click", "#basic-example > div", function () {
    $("#parentId").val($(this)[0].id);
    console.log(findNode($(this)[0].id, chart_config.nodeStructure));
    if (globablVars.selectParent) {
        globablVars.selectParent = false;
        globablVars.selectChild = true;
        globablVars.parent = findNode($(this)[0].id, chart_config.nodeStructure);
        var x = document.getElementById("snackbar");
        x.innerHTML = "Select Child Node(s)";
    } else if (globablVars.selectChild) {
        globablVars.selectChild = false;
        globablVars.child = findNode($(this)[0].id, chart_config.nodeStructure);
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
