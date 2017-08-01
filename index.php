<?php include 'header.php'; ?>

<link rel="stylesheet" type="text/css" href="assets/css/style.css" />

<div class="container arg-container">
    <div class="col-md-4">
        <form id="argumentForm">
            <div class="form-group">
                <label for="parentId">Parent ID:</label>
                <input type="number" step="1" class="form-control" name="parentId" id="parentId" />
            </div>
            <div class="form-group">
                <label for="argText">Argument:</label>
                <textarea class="form-control" name="argText" id="argText"></textarea>
            </div>
        </form>
        <button class="btn btn-default" id="btwNewNode">New Node</button>
        <button class="btn btn-default" id="btnConnect">Connect Nodes</button>
        <button class="btn btn-default" id="btnDelete">Delete Node</button>
        <button class="btn btn-default" id="btnEdit">Edit Node</button><br/>
        <button class="btn btn-default" id="btnNew">New Chart</button>
        <button class="btn btn-default" id="btnSave">Save Chart</button>
        <button class="btn btn-default" id="btnLoad">Load Chart</button>
        <input type="file" id="fileinput"/>
    </div>
    <div class="col-md-8" id="diagramDiv">
        <div class="chart" id="basic-example"></div>
    </div>
</div>

<script src="assets/lib/jquery/dist/jquery.min.js"></script>
<script src="assets/lib/treant-js/vendor/raphael.js"></script>
<script src="assets/lib/treant-js/Treant.js"></script>
<script src="assets/diagrams/arg1.js"></script>
<script src="assets/js/site.js"></script>
<script>
    console.log(chart_config.nodeStructure.name);
    chart_config.nodeStructure.children[0].innerHTML = nodeConstructor(chart_config.nodeStructure.children[0]);
    chart_config.nodeStructure.children[1].innerHTML = nodeConstructor(chart_config.nodeStructure.children[1]);
    var chart = new Treant(chart_config);
    var count = 1;
    var selectParent = false;
    var selectChild = false;
    var parent;
    var child;
    console.log(chart_config.nodeStructure);
</script>
<script>
    $('#btwNewNode').click(function () {
        count += 1;
        var id = count;
        var type = window.prompt("Type");
        var name = window.prompt("Name");
        var relia = parseFloat(window.prompt("Reliability"));
        var accur = parseFloat(window.prompt("Accuracy"));
        var relev = parseFloat(window.prompt("Relevancy"));
        var unique = parseFloat(window.prompt("Uniqueness"));
        chart_config.nodeStructure.children.push(newNode(id, type, name, relia, accur, relev, unique));
        var chart = new Treant(chart_config);
    })

    $('#btnConnect').click(function () {
        selectParent = true;
        console.log("connect");
    })

    $('#btnSend').click(function () {

        var parentId = $('#parentId').val();
        count += 1;

        if (!$('#argText').val() || !$('#parentId').val()) {
            window.alert("Something is missing, yo");
        } else {

	        var childObject = {
	                        id: count,
	                        HTMLid: count.toString(),
	                        type: "fact",
	                        text: {
	                            name: $('#argText').val()
	                        },
	                        children: []
	                    }


			var object = getObjects(chart_config.nodeStructure, 'id', parentId);

			console.log(object);

			if (object[0].type == "fact") {
			    object[0].children.push(reasonNode(childObject));
			} else {
			    object[0].children.push(childObject);
			}

			console.log(object);

			chart = new Treant(chart_config);
		}
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
        count = 1;
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
        if (selectParent) {
            selectParent = false;
            selectChild = true;
            parent = findNode($(this)[0].id, chart_config.nodeStructure);
        } else if (selectChild) {
            selectChild = false;
            child = findNode($(this)[0].id, chart_config.nodeStructure);
            deleteNode(chart_config.nodeStructure, child.id);
            var object = getObjects(chart_config.nodeStructure, 'id', parent.id);
            object[0].children.push(child);
            chart = new Treant(chart_config);
        }
    });

    function saveText(text, filename) {
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
        a.setAttribute('download', filename);
        a.click();
    }
</script>

<?php include 'footer.php'; ?>
