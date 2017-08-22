<?php include 'header.php'; ?>

<link rel="stylesheet" type="text/css" href="assets/css/style.css" />

<div class="container arg-container">
    <div class="col-md-4 text-center" style="height:100%">
        <button class="btn btn-default" id="btnImportText">Import Text</button>
        <div>
            <textarea id="text" autofocus readonly>Node 1 Node 2</textarea>
        </div>
        <input type="file" id="fileinput"/>
        <input type="file" id="textInput"/>
        <div id="snackbar"></div>
    </div>
    <div class="col-md-8" id="diagramDiv">
        <div class="row btn-new-node-wrapper">
            <button class="btn btn-default" id="btnNewNode">New Node</button>
        </div>
        <div class="row chart" id="basic-example"></div>
    </div>
</div>
<div class="container">
<form class="form-inline" id="argumentForm">
    <p>DEBUG TOOLS</p>
    <div class="form-group">
        <label for="parentId">Parent ID:</label>
        <input type="number" step="1" class="form-control" name="parentId" id="parentId" />
    </div>
    <div class="form-group">
        <label for="argText">Argument:</label>
        <textarea class="form-control" name="argText" id="argText"></textarea>
    </div>
</form>
</div>


<script src="assets/lib/jquery/dist/jquery.min.js"></script>
<script src="assets/lib/treant-js/vendor/raphael.js"></script>
<script src="assets/lib/treant-js/Treant.js"></script>
<script src="assets/diagrams/arg1.js"></script>
<script src="assets/js/site.js"></script>
<script src="assets/js/events.js"></script>

<script>
function getSelectionText() {
    var textArea = document.getElementById("text");
    var text = textArea.selectionStart.toString() + ", " + textArea.selectionEnd.toString();
    return text;
}

document.onmouseup = document.onkeyup = document.onselectionchange = function() {
  document.getElementById("argText").value = getSelectionText();
};
</script>

<?php include 'modal.php'; ?>

<?php include 'footer.php'; ?>
