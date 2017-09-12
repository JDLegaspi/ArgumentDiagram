<?php

$str_json = file_get_contents('php://input');
$filename = "diagram".".argu";
$filepath = "assets/diagrams/$filename";
file_put_contents($filepath, $str_json);

?>