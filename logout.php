<?php

require_once 'app/google_auth_init.php';

$auth = new GoogleAuth();

unset($_SESSION['upload_token']);

header("Location: index.php");

?>