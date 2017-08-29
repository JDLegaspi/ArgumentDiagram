<?php

require_once 'app/google_auth_init.php';

$auth = new GoogleAuth();

$auth->logout();

header("Location: index.php");

?>