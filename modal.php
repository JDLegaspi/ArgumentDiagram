<div class="modal fade" id="myModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">New Node</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Node Name:<input type="text" id="nodename"><br>
        Reliability:<input type="number" id="reliability"><br>
        Accuracy:<input type="number" id="accuracy"><br>
        Relevancy:<input type="number" id="relevancy"><br>
        Uniqueness:<input type="number" id="uniqueness"><br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="submit" data-dismiss="modal">New Node</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<script>
$('#submit').click(function () {
    console.log("test");
    count += 1;
    var id = count;
    var type = "dc";
    var name = $('#nodename').val();
    var relia = parseFloat($('#reliability').val());
    var accur = parseFloat($('#accuracy').val());
    var relev = parseFloat($('#relevancy').val());
    var unique = parseFloat($('#uniqueness').val());
    chart_config.nodeStructure.children.push(newNode(id, type, name, relia, accur, relev, unique));
    var chart = new Treant(chart_config);
})
</script>
