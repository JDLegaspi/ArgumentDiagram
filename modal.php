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
            Completeness:<input type="number" id="completeness" min="0" max="1" step="0.05"><br>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="submitNew" data-dismiss="modal">New Node</button>
        <button type="button" class="btn btn-secondary" id="cancelNew" data-dismiss="modal">Close</button>
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
            Completeness:<input type="number" id="editComp" min="0" max="1" step="0.05"><br>
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
        <textarea id="editSelect" style="height:300px; width:100%" autofocus readonly></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="saveSelect" data-dismiss="modal">Save</button>
        <button type="button" class="btn btn-secondary" id="cancelEdit" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="algebraModal">
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
            Reliability<br>
            Supporting: <select id="">
              <option value="max">Max</option>
              <option value="min">Min</option>
          </select><br>
            Acrrual: <select id="">
              <option value="max">Max(a + b, 1)</option>
              <option value="min">Min(a + b, 1)</option>
            </select><br>
            Conflict: <select id="">
              <option value="max">(a - b) / (1 - b)</option>
              <option value="min">a - b</option>
            </select><br>
            Accuracy<br>
            Supporting: <select id="">
              <option value="max">Max</option>
              <option value="min">Min</option>
          </select><br>
            Acrrual: <select id="">
              <option value="max">Max(a + b, 1)</option>
              <option value="min">Min(a + b, 1)</option>
            </select><br>
            Conflict: <select id="">
              <option value="max">(a - b) / (1 - b)</option>
              <option value="min">a - b</option>
            </select><br>
            Relevancy<br>
            Supporting: <select id="">
              <option value="max">Max</option>
              <option value="min">Min</option>
          </select><br>
            Acrrual: <select id="">
              <option value="max">Max(a + b, 1)</option>
              <option value="min">Min(a + b, 1)</option>
            </select><br>
            Conflict: <select id="">
              <option value="max">(a - b) / (1 - b)</option>
              <option value="min">a - b</option>
            </select><br>
            Uniqueness<br>
            Supporting: <select id="">
              <option value="max">Max</option>
              <option value="min">Min</option>
          </select><br>
            Acrrual: <select id="">
              <option value="max">Max(a + b, 1)</option>
              <option value="min">Min(a + b, 1)</option>
            </select><br>
            Conflict: <select id="">
              <option value="max">(a - b) / (1 - b)</option>
              <option value="min">a - b</option>
            </select><br>
            Completeness<br>
            Supporting: <select id="">
              <option value="max">Max</option>
              <option value="min">Min</option>
          </select><br>
            Acrrual: <select id="">
              <option value="max">Max(a + b, 1)</option>
              <option value="min">Min(a + b, 1)</option>
            </select><br>
            Conflict: <select id="">
              <option value="max">(a - b) / (1 - b)</option>
              <option value="min">a - b</option>
            </select><br>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="submitAlgebra" data-dismiss="modal">Save</button>
        <button type="button" class="btn btn-secondary" id="cancelAlgebra" data-dismiss="modal">Close</button>
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
