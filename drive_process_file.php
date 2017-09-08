<?php

if (isset($_POST['chart_data'])) {

    $argument_data = $_POST['chart_data'];
    $filename = $_POST['chart_filename'].".argu";
    $filepath = "assets/diagrams/$filename";
    $debugFilepath = "assets/diagrams/debug.txt";
    file_put_contents($filepath, $argument_data);

}

?>