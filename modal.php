<div class="modal fade" id="newNodeModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">New Node</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
            Node Name:<input type="text" id="nodename"><br>
            Reliability:<input type="number" id="reliability" min="0" max="1" step="0.05"><br>
            Accuracy:<input type="number" id="accuracy" min="0" max="1" step="0.05"><br>
            Relevancy:<input type="number" id="relevancy" min="0" max="1" step="0.05"><br>
            Uniqueness:<input type="number" id="uniqueness" min="0" max="1" step="0.05"><br>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="submitNew">New Node</button>
        <button type="button" class="btn btn-secondary" id="cancelNew">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="editNodeModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Node</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
            Node Name:<input type="text" id="editName"><br>
            Reliability:<input type="number" id="editReli" min="0" max="1" step="0.05"><br>
            Accuracy:<input type="number" id="editAccu" min="0" max="1" step="0.05"><br>
            Relevancy:<input type="number" id="editRele" min="0" max="1" step="0.05"><br>
            Uniqueness:<input type="number" id="editUniq" min="0" max="1" step="0.05"><br>
            Selected Text:<input type="text" id="selectedText" readonly><br>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="textEdit">Edit Selected Text</button>
        <button type="button" class="btn btn-primary" id="submitEdit" data-dismiss="modal">Edit Node</button>
        <button type="button" class="btn btn-secondary" id="cancelEdit" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="editSelectModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Node</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="height:">
        <textarea id="editSelect" style="height:100%; width:100%" autofocus readonly></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="saveSelect" data-dismiss="modal">Save</button>
        <button type="button" class="btn btn-secondary" id="cancelEdit" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div id="nodeFunctionsWrapper">
  <div id="nodeFunctions">
    <button class="btn btn-default" id="btnConnect">Connect Node</button>
    <button class="btn btn-default" id="btnEdit">Edit Node</button>
    <button class="btn btn-default" id="btnDelete">Delete Node</button>
    <button class="btn btn-default" id="btnCollapse">Collapse/Expand</button>
  </div>
</div>

<div id="myChartsWrapper" style="z-index: 2;">
  <div id="myChartsFunctions">
    <button class="btn btn-default" id="btnOpenChart">Open</button>
    <button class="btn btn-default" id="btnRenameChart">Rename</button>
    <button class="btn btn-default" id="btnDeleteChart">Delete</button>
    <hr/>
    <button class="btn btn-default" id="btnShareChart">Share</button>
    <button class="btn btn-default" id="btnExportChart">Export</button>
  </div>
</div>

<div id="highlightTextWrapper">
  <div id="highlightText">
    <button class="btn btn-default" id="btnNewNode">Add Node</button>
  </div>
</div>

<script>
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
            var selectedText = $('#text').val().slice(thisNode.linktext.start, thisNode.linktext.end);
            $('#editNodeModal').modal('show');
            $("#editName").val(thisNode.name);
            $("#editReli").val(thisNode.attributes.reliability);
            $("#editAccu").val(thisNode.attributes.accuracy);
            $("#editRele").val(thisNode.attributes.relevancy);
            $("#editUniq").val(thisNode.attributes.uniqueness);
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
    var thisNode = findNode(globablVars.this, chart_config.nodeStructure);
    globablVars.child = thisNode;
    globablVars.selectParent = true;
    showSnackbar("Select the node to connect to");
});

$('#nodeFunctionsWrapper').on('click', '#btnCollapse', function () {
    var thisNode = findNode(globablVars.this, chart_config.nodeStructure);
    if (thisNode.collapsed) {
        thisNode.collapsed = false;
    } else {
        thisNode.collapsed = true;
    }
    var chart = new Treant(chart_config);
});

$('#submitNew').click(function () {
    $('#newNodeModal').modal('hide');
    globablVars.count += 1;
    var id = globablVars.count;
    var type = "fact";
    var name = $('#nodename').val();
    var relia = parseFloat($('#reliability').val());
    var accur = parseFloat($('#accuracy').val());
    var relev = parseFloat($('#relevancy').val());
    var unique = parseFloat($('#uniqueness').val());
    var startSel = document.getElementById("text").selectionStart;
    var endSel = document.getElementById("text").selectionEnd;
    if (startSel == endSel) {
        startSel = null;
        endSel = null;
    }
    chartHistory();
    chart_config.nodeStructure.children.push(newNode(id, type, name, relia, accur, relev, unique, startSel, endSel));
    var chart = new Treant(chart_config);
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
    chartHistory();
    editNode(chart_config.nodeStructure, globablVars.this, name, reli, accu, rele, uniq);
    var chart = new Treant(chart_config);
    $('#editNodeModal').find('form').trigger('reset');
});

$('#cancelEdit').click(function () {
    $('#editNodeModal').modal('hide');
    $('#editNodeModal').find('form').trigger('reset');
});

$('#textEdit').click(function () {
    $('#editSelectModal').modal('show');
});

$('#saveSelect').click(function() {
    var textArea = document.getElementById("editSelect");
    editSelection(chart_config.nodeStructure, globablVars.this, textArea.selectionStart, textArea.selectionEnd);
    var thisNode = findNode(globablVars.this, chart_config.nodeStructure);
    var selectedText = chart_config.chart.doc.text.slice(thisNode.linktext.start, thisNode.linktext.end);
    $("#selectedText").val(selectedText);
    $('#editNodeModal').modal('show');
    $('#editSelectModal').find('form').trigger('reset');
});
</script>
