<?php 
if (isset($_POST['chart_data'])) {
    
    $argument_data = $_POST['chart_data'];
    $filename = "diagram.argu";
    $filepath = "assets/diagrams/$filename";

    file_put_contents($filepath, $argument_data);

}

?>