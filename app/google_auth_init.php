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
    echo '1';
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token);
    $_SESSION['upload_token'] = $token;
    
    // redirect back to main redirect url (home)
    header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}
// set the access token as part of the client
if (!empty($_SESSION['upload_token'])) {
    echo '2';
    $client->setAccessToken($_SESSION['upload_token']);
    if ($client->isAccessTokenExpired()) {
        unset($_SESSION['upload_token']);
    }
} else {
    echo '3';
    try {
        $authUrl = $client->createAuthUrl();
    } catch (Exception $e) {
        echo $e->getMessage() , "\n";
    }
    
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $client->getAccessToken()) {
    echo '4';
    
    $file = "/assets/diagrams/diagram.argu";
    $fileContents = file_get_contents($file);

    // This is uploading a file directly, with no metadata associated.
    $fileMetaData = new Google_Service_Drive_DriveFile(array(
        'name' => $_SESSION['chart_filename'].".argu"
    ));
    
    $result = $service->files->create(
        $fileMetaData,
        array(
            'data' => $fileContents,
            'mimeType' => 'text/csv',
            'uploadType' => 'multipart'
        )
    );

    //delete temporary file after uploading it
    //unlink($file) or die("Couldn't delete file");
}


?>