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
        <button class="btn btn-default" id="btnNewNode">New Node</button>
        <button class="btn btn-default" id="btnConnect">Connect Nodes</button>
        <button class="btn btn-default" id="btnDelete">Delete Node</button>
        <button class="btn btn-default" id="btnEdit">Edit Node</button><br/>
        <button class="btn btn-default" id="btnNew">New Chart</button>
        <button class="btn btn-default" id="btnSave">Save Chart</button>
        <button class="btn btn-default" id="btnLoad">Load Chart</button>
        <input type="file" id="fileinput"/>
        <div id="snackbar"></div>
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
<script src="assets/js/events.js"></script>

<?php include 'footer.php'; ?>
