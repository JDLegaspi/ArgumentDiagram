<?php

require_once 'google_auth_init.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $client->getAccessToken() && isset($_POST['save_to_drive'])) {

    $fileContents = $_POST['file_contents'];
    $fileName = $_POST['file_name'];
    $driveId = $_POST['drive_id'];
    $fileMetaData = new Google_Service_Drive_DriveFile(array(
        'name' => $fileName.".argu"
    ));

    // If file has been loaded from drive, update file
    if ($driveId) {
        try {
            $result = $service->files->update(
                $driveId, $fileMetaData,
                array(
                    'data' => $fileContents,
                    'mimeType' => 'text/plain',
                    'uploadType' => 'multipart',
                    'fields' => 'id'
                )
            );
        } catch (Exception $e) {
            echo "An error occurred: " . $e->getMessage();
        }
    // Otherwise create new file
    } else {
        try {
            $result = $service->files->create(
                $fileMetaData,
                array(
                    'data' => $fileContents,
                    'mimeType' => 'text/plain',
                    'uploadType' => 'multipart',
                    'fields' => 'id'
                )
            );
            echo $result['id'];
        } catch (Exception $e) {
            echo "An error occurred: " . $e->getMessage();
        }
    }
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

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $client->getAccessToken() && isset($_POST['share_chart'])) {
    $fileId = $_POST['file_id'];
    $email = $_POST['email'];
    try {
        $userPermission = new Google_Service_Drive_Permission(array(
            'type' => 'user',
            'role' => 'reader',
            'emailAddress' => $email
        ));
        $service->permissions->create($fileId, $userPermission, array('fields' => 'id'));
    } catch (Exception $e) {
        echo "An error occurred: " . $e->getMessage();
    }
}

?>
