<?php

if( isset($_POST['chart_filename'])) {
    file_put_contents("assets/diagrams/filename.txt", $_POST['chart_filename']);
}

?>