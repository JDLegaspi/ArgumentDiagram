<?php include 'header.php'; ?>
<div class="container body-content">

<link rel="stylesheet" type="text/css" href="assets/css/style.css" />

<div class="jumbotron container text-center">
    <a href="javascript:document.getElementById('textInput').click();" class="btn btn-primary" id="btnNew">New Diagram</a>
    <a href="javascript:document.getElementById('fileInput').click();" class="btn btn-primary" id="btnLoad">Load Diagram</a>
</div>
<div class="container arg-container" style="display:none">
    <div class="col-md-4 text-center" style="height:100%">
        <textarea id="text" autofocus readonly></textarea>
        <input type="file" id="fileInput"/>
        <input type="file" accept=".txt" id="textInput"/>
        <div id="snackbar">Select Parent Node</div>
    </div>
    <div class="col-md-8" id="diagramDiv">
        <div class="row btn-new-node-wrapper">
            <button class="btn btn-default" id="btnNewNode">New Node</button>
        </div>
        <div class="row chart" id="basic-example"></div>
        <div class="container" id="debug">
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
            <button class="btn btn-default" id="btnConflict">Conflict Node</button>
            <button class="btn btn-default" id="btnImportText">Import Text</button>
        </div>
    </div>
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
