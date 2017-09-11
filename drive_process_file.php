<?php

$str_json = file_get_contents('php://input');
$filename = "diagram".".argu";
$filepath = "assets/diagrams/$filename";
file_put_contents($filepath, $str_json);

// if (isset($_POST['chart_data'])) {

//     $debugFilepath = "assets/diagrams/debug.txt";
//     $str_json = file_get_contents('php://input');
//     file_put_contents($debugFilepath, $_POST['chart_filename']);
//     $_SESSION['chart_filename'] = $_POST['chart_filename'];

//     $argument_data = $_POST['chart_data'];
//     $filename = "diagram".".argu";
//     $filepath = "assets/diagrams/$filename";
    
//     file_put_contents($filepath, $argument_data);

// }

?>