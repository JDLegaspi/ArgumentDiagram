<?php

require_once 'google_auth_init.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $client->getAccessToken() && isset($_POST['save_to_drive'])) {

    $file = "assets/diagrams/diagram.argu";
    $fileContents = file_get_contents($file);
    $filename = file_get_contents("assets/diagrams/filename.txt");

    // This is uploading a file directly, with name metadata.
    $fileMetaData = new Google_Service_Drive_DriveFile(array(
        'name' => $filename.".argu"
    ));
    
    $result = $service->files->create(
        $fileMetaData,
        array(
            'data' => $fileContents,
            'mimeType' => 'text/plain',
            'uploadType' => 'multipart'
        )
    );
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $client->getAccessToken() && isset($_POST['delete_chart'])) {
    $fileId = $_POST['file_id'];
    file_put_contents("assets/fileId.txt", $fileId);
    try {
        $service->files->delete($fileId);
    } catch (Exception $e) {
        print "An error occurred: " . $e->getMessage();
        file_put_contents("assets/error.txt", $e->getMessage());
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $client->getAccessToken() && isset($_POST['open_chart'])) {
    $fileId = $_POST['file_id'];
    try {
        $response = $service->files->get($fileId, array(
            'alt' => 'media'
        ));
        $content = $response->getBody()->getContents();
        echo $content;
    } catch (Exception $e) {
        echo "An error occurred: " . $e->getMessage();
        file_put_contents("assets/error.txt", $e->getMessage());
    }
}

?>