<?php

require_once 'google_auth_init.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $client->getAccessToken() && isset($_POST['save_to_drive'])) {
    echo '4';
    
    $file = "/assets/diagrams/diagram.argu";
    $fileContents = file_get_contents($file);

    // This is uploading a file directly, with name metadata.
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

?>