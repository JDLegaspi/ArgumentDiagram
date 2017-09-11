<?php

if (isset($_POST['chart_data'])) {

    $debugFilepath = "assets/diagrams/debug.txt";
    file_put_contents($debugFilepath, $_POST['chart_filename']);
    $_SESSION['chart_filename'] = $_POST['chart_filename'];

    $argument_data = $_POST['chart_data'];
    $filename = "diagram".".argu";
    $filepath = "assets/diagrams/$filename";
    
    file_put_contents($filepath, $argument_data);

}

?>