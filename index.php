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
        <input type="file" id="fileinput"/>
        <div id="snackbar"></div>
    </div>
    <div class="col-md-8" id="diagramDiv">
        <div class="row btn-new-node-wrapper">
            <button class="btn btn-default" id="btnNewNode">New Node</button>
        </div>
        <div class="row chart" id="basic-example"></div>
    </div>
</div>


<script src="assets/lib/jquery/dist/jquery.min.js"></script>
<script src="assets/lib/treant-js/vendor/raphael.js"></script>
<script src="assets/lib/treant-js/Treant.js"></script>
<script src="assets/diagrams/arg1.js"></script>
<script src="assets/js/site.js"></script>
<script src="assets/js/events.js"></script>

<?php include 'modal.php'; ?>

<?php include 'footer.php'; ?>