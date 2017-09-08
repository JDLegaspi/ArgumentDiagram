<?php

//require Google API code
require_once __DIR__ . '/app/classes/vendor/autoload.php';
require_once __DIR__ . '/app/classes/class_google_auth.php';
$client = new Google_Client();
$auth = new GoogleAuth($client);
$service = new Google_Service_Drive($auth->getClient());

try {
    if (isset($_SESSION['lmnop'])) {
        $auth->getClient()->authenticate($_SESSION['lmnop']);
        $token = $auth->setToken($auth->getClient()->getAccessToken());
        $_SESSION['access_token'] = $token;
        file_put_contents("hi".$_SESSION['lmnop'].".txt", $_SESSION['lmnop']);
    }
    else file_put_contents("didntwork".$_SESSION['lmnop'].".txt", $_SESSION['lmnop']);
} catch (Exception $e) {
    file_put_contents("error.txt", $e->getMessage());
}


if (isset($_POST['chart_data'])) {

    $argument_data = $_POST['chart_data']; //not working properly
    $filename = $_POST['chart_filename'].".argu";
    $filepath = "assets/diagrams/$filename";
    $debugFilepath = "assets/diagrams/debug.txt";
    file_put_contents($filepath, $argument_data);

    $file = new Google_Service_Drive_DriveFile();
    $content = file_get_contents($filepath);

    if (!isset($_SESSION['code'])) {
        file_put_contents("assets/diagrams/hahayes.txt", $content);
    }

    file_put_contents($debugFilepath, $content);

    try {
        $createdFile = $service->files->create(
            $file, 
            array(
                'data' => $content,
                'mimeType' => 'application/octet-stream',
                'uploadType' => 'media'
            )
        );
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
        printf("Shit it ain't working, dog");
        
    }
}

header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));

?>