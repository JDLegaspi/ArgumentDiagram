<?php

session_start();
require_once __DIR__ . '/classes/vendor/autoload.php';
require_once __DIR__ . '/classes/class_google_auth.php';
//$redirect_uri = 'http://localhost:8888/ArgumentDiagram';
$client = new Google_Client();

//create GoogleAuth object using Google client 
$auth = new GoogleAuth($client);
$redirect_uri = $auth->getRedirectUrl();

$service = new Google_Service_Drive($auth->getClient());

if (isset($_GET['code'])) {
    try {
        $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $client->setAccessToken($token);
    $_SESSION['upload_token'] = $token;
    
    // redirect back to main redirect url (home)
    header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}
// set the access token as part of the client
if (!empty($_SESSION['upload_token'])) {
    $client->setAccessToken($_SESSION['upload_token']);
    if ($client->isAccessTokenExpired()) {
        unset($_SESSION['upload_token']);
    }
} else {
    try {
        $authUrl = $client->createAuthUrl();
    } catch (Exception $e) {
        echo $e->getMessage() , "\n";
    }
    
}

?>