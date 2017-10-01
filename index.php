<?php include 'header.php'; ?>
<div class="container body-content">

<div class="starting-screen container text-center">
    <div class="col-md-6">

        <h1>Argument Diagram Creator</h1>
        <p><b>Never lose an argument</b>, or prove yourself wrong, by constructing cohesive arguments using <b>Argument Diagram Creator.</b></p>
        <p>Our diagram creator is a great way to create <b>visual representations of a verbal argument</b>, by visualising multiple aspects of the argument, including: visualising how facts <b>support a given conclusion</b>, or constructing and <b>measuring counter arguments.</b></p>
        <a href="javascript:document.getElementById('textInput').click();" class="btn btn-primary" id="btnNew">New Diagram</a>
        <a href="javascript:document.getElementById('fileInput').click();" class="btn btn-primary" id="btnLoad">Load Diagram</a>

    </div>
</div>

<div class="jumbotron name-chart container text-center" style="display:none">
    <form>
        <div class="form-group">
            <label for="chartName">Name Your Chart</label>
            <input type="text" id="chartName"/>
        </div>
    </form>
    <button type="button" class="btn btn-primary" id="start">Start</button>
</div>

<div class="container arg-container" style="display:none">
    <div class="col-md-4 text-center" style="height:100%">
        <textarea class="well" id="text" autofocus readonly></textarea>
        <form>
            <input type="file" id="fileInput"/>
        </form>
        <form>
            <input type="file" accept=".txt, .docx" id="textInput"/>
        </form>
    </div>
    <div class="col-md-8" id="diagramDiv" style="height:100%">
        <div class="row btn-new-node-wrapper">
            <button class="btn btn-default" id="btnNewNode">New Node</button>
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

<div id="snackbar">
    <p id="snackbarText">Select Parent Node</p>
    <button id='btnCancel' class='btn btn-danger'>Cancel</button>
</div>

<?php include 'modal.php'; ?>

<script src="assets/lib/jquery/dist/jquery.min.js"></script>
<script src="assets/lib/treant-js/vendor/raphael.js"></script>
<script src="assets/lib/treant-js/Treant.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.7.0/intro.min.js"></script>
<script src="assets/js/html2canvas.js"></script>
<script src="assets/js/site.js"></script>
<script src="assets/js/events.js"></script>
<script src="assets/js/algebra.js"></script>

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
