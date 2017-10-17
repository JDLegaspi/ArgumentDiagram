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
            <input type="number" id="reliability" name="reliability" min="0" max="1" step="0.01"><br>
          </div>
          <div class="form-group">
            <label for="accuracy">Accuracy:</label>
            <input type="number" id="accuracy" name="accuracy" min="0" max="1" step="0.01"><br>
          </div>
          <div class="form-group">
            <label for="relevancy">Relevancy:</label>
            <input type="number" id="relevancy" name="relevancy" min="0" max="1" step="0.01"><br>
          </div>
          <div class="form-group">
            <label for="uniqueness">Uniqueness:</label>
            <input type="number" id="uniqueness" name="uniqueness" min="0" max="1" step="0.01"><br>
          </div>
          <div class="form-group">
            <label for="completeness">Completeness:</label>
            <input type="number" id="completeness" name="completeness" min="0" max="1" step="0.01"><br>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="submitNew" data-dismiss="modal">Submit</button>
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
          <div class="form-group">
            <label for="editName">Node Name:</label>
            <input type="text" id="editName" name="nodename">
          </div>
          <div class="form-group">
            <label for="editReli">Reliability:</label>
            <input type="number" id="editReli" name="reliability" min="0" max="1" step="0.01">
          </div>
          <div class="form-group">
            <label for="editAccu">Accuracy:</label>
            <input type="number" id="editAccu" name="accuracy" min="0" max="1" step="0.01">
          </div>
          <div class="form-group">
            <label for="editRele">Relevancy:</label>
            <input type="number" id="editRele" name="relevancy" min="0" max="1" step="0.01">
          </div>
          <div class="form-group">
            <label for="editUniq">Uniqueness:</label>
            <input type="number" id="editUniq" name="uniqueness" min="0" max="1" step="0.01">
          </div>
          <div class="form-group">
            <label for="editComp">Completeness:</label>
            <input type="number" id="editComp" name="completeness" min="0" max="1" step="0.01"><br>
          </div>
          <div class="form-group">
            <label for="selectedText">Selected Text:</label>
            <input type="text" id="selectedText" readonly>
          </div>

        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="textEdit">Edit Selected Text</button>
        <button type="button" class="btn btn-primary" id="submitEdit" data-dismiss="modal">Submit</button>
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
        <button type="button" class="btn btn-primary" id="saveSelect" data-dismiss="modal">Submit</button>
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
            Supporting:
            <select id="supportReli">
              <option value=1>Min</option>
              <option value=2>Max</option>
            </select><br>
            Acrrual:
            <select id="accrualReli">
              <option value=1>a + b - ab</option>
              <option value=2 selected="selected">Min(a + b, 1)</option>
            </select><br>
            Conflict:
            <select id="conflictReli">
              <option value=1>(a - b) / (1 - b)</option>
              <option value=2 selected="selected">a - b</option>
            </select><br>
            Accuracy<br>
            Supporting:
            <select id="supportAccu">
              <option value=1>Min</option>
              <option value=2>Max</option>
            </select><br>
            Acrrual:
            <select id="accrualAccu">
              <option value=1>a + b - ab</option>
              <option value=2>Min(a + b, 1)</option>
            </select><br>
            Conflict:
            <select id="conflictAccu">
              <option value=1>(a - b) / (1 - b)</option>
              <option value=2>a - b</option>
            </select><br>
            Relevancy<br>
            Supporting:
            <select id="supportRele">
              <option value=1>Min</option>
              <option value=2>Max</option>
            </select><br>
            Acrrual:
            <select id="accrualRele">
              <option value=1>a + b - ab</option>
              <option value=2 selected="selected">Min(a + b, 1)</option>
            </select><br>
            Conflict:
            <select id="conflictRele">
              <option value=1>(a - b) / (1 - b)</option>
              <option value=2>a - b</option>
            </select><br>
            Uniqueness<br>
            Supporting:
            <select id="supportUniq">
              <option value=1>Min</option>
              <option value=2>Max</option>
            </select><br>
            Acrrual:
            <select id="accrualUniq">
              <option value=1>a + b - ab</option>
              <option value=2 selected="selected">Min(a + b, 1)</option>
            </select><br>
            Conflict:
            <select id="conflictUniq">
              <option value=1>(a - b) / (1 - b)</option>
              <option value=2>a - b</option>
            </select><br>
            Completeness<br>
            Supporting:
            <select id="supportComp">
              <option value=1>Min</option>
              <option value=2>Max</option>
            </select><br>
            Acrrual:
            <select id="accrualComp">
              <option value=1>a + b - ab</option>
              <option value=2 selected="selected">Min(a + b, 1)</option>
            </select><br>
            Conflict:
            <select id="conflictComp">
              <option value=1>(a - b) / (1 - b)</option>
              <option value=2>a - b</option>
            </select><br>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="submitAlgebra" data-dismiss="modal">Submit</button>
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
    <button class="btn btn-default" id="btnConflict">Add Conflict</button>
    <button class="btn btn-default" id="btnCollapse">Collapse/Expand</button>
  </div>
</div>

<div id="myChartsWrapper">
  <div id="myChartsFunctions">
    <button class="btn btn-default" id="btnOpenChart">Open</button>
    <button class="btn btn-default" id="btnRenameChart">Rename</button>
    <button class="btn btn-default" id="btnDeleteChart">Delete</button>
    <button class="btn btn-default" id="btnShareChart">Share</button>
    <button class="btn btn-default" id="btnRemoveChart">Remove</button>
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
