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
        <input type="file" accept=".txt, .docx" id="textInput"/>
        <div id="snackbar">
            <p id="snackbarText">Select Parent Node</p>
            <button id='btnCancel' class='btn btn-danger'>Cancel</button>
        </div>
    </div>
    <div class="col-md-8" id="diagramDiv" style="height:100%">
        <div class="row btn-new-node-wrapper">
            <button class="btn btn-default" id="btnNewNode">New Node</button>
            <button class="btn btn-default" id="btnConflict">Conflicting Argument</button>
            <button class="btn btn-default pull-right" id="btnToggleAttributes">Toggle Attributes</button>
            <button class="btn btn-default pull-right" id="btnZoomOut">-</button>
            <button class="btn btn-default pull-right" id="btnZoomIn">+</button>
        </div>
        <div id="chart" style="height:90%">
            <div class="row chart" id="basic-example" style="overflow-x: visible; overflow-y: visible"></div>
        </div>
        <div class="container" id="debug">
            <form class="form-inline" id="argumentForm">
                <p>DEBUG TOOLS</p>
                <div class="form-group">
                    <label for="parentId">Parent ID:</label>
                    <input type="number" step="1" class="form-control" name="parentId" id="parentId" />
                </div>
                <div class="form-group">
                    <label for="argText">Argument:</label>
                    <input type="text" class="form-control" name="argText" id="argText" />
                </div>
            </form>
        </div>
    </div>
</div>

<?php include 'modal.php'; ?>

<script src="assets/lib/jquery/dist/jquery.min.js"></script>
<script src="assets/lib/treant-js/vendor/raphael.js"></script>
<script src="assets/lib/treant-js/Treant.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.7.0/intro.min.js"></script>
<script src="assets/diagrams/arg1.js"></script>
<script src="assets/js/site.js"></script>
<script src="assets/js/events.js"></script>

<script src="assets/lib/docx/docxgen.js"></script>
<script src="assets/lib/docx/jszip.js"></script>
<script src="assets/lib/docx/jszip-utils.js"></script>
<script src="assets/lib/docx/FileSaver.js"></script>
<script>
$("#algebraSelect").change(function() {
    console.log($("#algebraSelect").val());
    if ($("#algebraSelect").val() == "true") {
        console.log(true);
        globablVars.relevancyOpt = true;
        globablVars.uniquenessOpt = true;
    } else {
        console.log(false);
        globablVars.relevancyOpt = false;
        globablVars.uniquenessOpt = false;
    }
    calculateChartAttributes(chart_config.nodeStructure);
    var chart = new Treant(chart_config);
});

function getSelectionText() {
    var textArea = document.getElementById("text");
    var text = textArea.selectionStart.toString() + ", " + textArea.selectionEnd.toString();
    return text;
}

document.onmouseup = document.onkeyup = document.onselectionchange = function() {
  document.getElementById("argText").value = getSelectionText();
};
</script>

<?php include 'footer.php'; ?>
