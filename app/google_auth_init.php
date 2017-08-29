<?php

session_start();
require_once __DIR__ . '/classes/vendor/autoload.php';
require_once __DIR__ . '/classes/class_google_auth.php';
$client = new Google_Client();

?>