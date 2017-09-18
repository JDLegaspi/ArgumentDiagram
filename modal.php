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
          <div class="form-group">
            <label for="nodename">Node Name:</label>
            <input type="text" id="nodename" name="nodename"><br>
          </div>
          <div class="form-group">
            <label for="reliability">Reliability:</label>
            <input type="number" id="reliability" name="reliability" min="0" max="1" step="0.05"><br>
          </div>
          <div class="form-group">
            <label for="accuracy">Accuracy:</label>
            <input type="number" id="accuracy" name="accuracy" min="0" max="1" step="0.05"><br>
          </div>
          <div class="form-group">
            <label for="relevancy">Relevancy:</label>
            <input type="number" id="relevancy" name="relevancy" min="0" max="1" step="0.05"><br>
          </div>
          <div class="form-group">
            <label for="uniqueness">Uniqueness:</label>
            <input type="number" id="uniqueness" name="uniqueness" min="0" max="1" step="0.05"><br>
          </div>
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
          <div class="form-group">
            <label for="nodename">Node Name:</label>
            <input type="text" id="nodename" name="nodename">
          </div>
          <div class="form-group">
            <label for="reliability">Reliability:</label>
            <input type="number" id="reliability" name="reliability" min="0" max="1" step="0.05">
          </div>
          <div class="form-group">
            <label for="accuracy">Accuracy:</label>
            <input type="number" id="accuracy" name="accuracy" min="0" max="1" step="0.05">
          </div>
          <div class="form-group">
            <label for="relevancy">Relevancy:</label>
            <input type="number" id="relevancy" name="relevancy" min="0" max="1" step="0.05">
          </div>
          <div class="form-group">
            <label for="uniqueness">Uniqueness:</label>
            <input type="number" id="uniqueness" name="uniqueness" min="0" max="1" step="0.05">
          </div>
          <div class="form-group">
            <label for="uniqueness">Selected Text:</label>
            <input type="text" id="selectedText" readonly>
          </div>
            
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
        <textarea id="editSelect" style="height:300px; width:100%" autofocus readonly></textarea>
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

<div id="saveFunctionsWrapper">
  <div id="saveFunctions">
    <button class="btn btn-default" id="btnSaveToDrive">Save To Drive</button>
    <button class="btn btn-default" id="btnDownload">Download</button>
  </div>
</div>

<div id="highlightTextWrapper">
  <div id="highlightText">
    <button class="btn btn-default" id="btnNewNode">Add Node</button>
  </div>
</div>
