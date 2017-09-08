<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ArgumentDiagram</title>

    <link rel="stylesheet" href="assets/lib/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="assets/css/site.css" />
    <link rel="stylesheet" href="assets/lib/treant-js/Treant.css" type="text/css" />

    <!--Font Awesome-->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <!-- Load Google Drive API -->
    <?php 

        //require Google API code
        require_once __DIR__ . '/app/google_auth_init.php';

        //create GoogleAuth object using Google client 
        $auth = new GoogleAuth($client);
        $auth_url = $auth->getRedirectUrl();
        // if ($auth->checkRedirectCode()) {
        //     echo $_SESSION['lmnop'];
        // }
        //if user has logged in, redirect to clean URL
        // if ($auth->checkRedirectCode()) {
        //     header('Location:' . filter_var($auth_url, FILTER_SANITIZE_URL));
        // }

        $service = new Google_Service_Drive($auth->getClient());

        if (isset($_GET['code'])) {
            echo " 1 ";
            $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
            echo " 2 ";
            $client->setAccessToken($token);
            echo " 3 ";
            // store in the session also
            $_SESSION['upload_token'] = $token;
            echo " 4 ";
            // redirect back to the example
            header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
            echo " 5 ";
        }
        // set the access token as part of the client
        if (!empty($_SESSION['upload_token'])) {
            echo " 6 ";
            $client->setAccessToken($_SESSION['upload_token']);
            echo " 7 ";
            if ($client->isAccessTokenExpired()) {
                echo " 7.5 ";
                unset($_SESSION['upload_token']);
            }
            echo " 8 ";
        } else {
            echo " 9 ";
            $authUrl = $client->createAuthUrl();
        }


        if (isset($_POST['chart_data'])) {
            echo " 10 ";
            $argument_data = $_POST['chart_data']; //not working properly
            $filename = $_POST['chart_filename'].".argu";
            $filepath = "assets/diagrams/$filename";
            $debugFilepath = "assets/diagrams/debug.txt";
            file_put_contents($filepath, $argument_data);
            echo " 11 ";
            $file = new Google_Service_Drive_DriveFile();
            $content = file_get_contents($filepath);
            file_put_contents($debugFilepath, $content);

            try {
                echo " 9 ";
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

    ?>

</head>
<body>

    <div id="mySidenav" class="sidenav">
        <div class="my-diagrams-container">

            <?php

                if (!$auth->isLoggedIn()) { ?>
                    <a class="btn btn-default" href="<?php echo $auth->createGoogleAuthUrl(); ?>">Sign in with Google</a>
                    <?php 
                } else {
                    ?>
                     <div class="my-diagrams">
                        <ul>
                            <?php 
                            
                            //create Google Drive object based on user's account
                            $files = $service->files->listFiles(array(
                                //'q' => "mimeType!='->application/vnd.google-apps.folder'",
                                'q' => "name contains '.argu'",
                                'spaces' => 'drive'
                            ));

                            //echo var_dump($files['files']);

                            foreach ($files['files'] as $key => $value) {
                                echo '<li><a>' . $value['name'] . "</a></li>";
                            }
                            
                            ?>
                        </ul>
                    </div>
                    <div class="Logout-Drive">
                        <a class="btn btn-default" href="logout.php">Log Out</a>
                    </div>
                <?php } ?>
        </div>
    </div>

    <nav class="navbar navbar-inverse navbar-main">
        <div class="col-xs-1 cloud">
            <i class="fa fa-cloud" aria-hidden="true" onclick="toggleNav()" id="open-nav"></i>
        </div>
        <div class="container col-xs-11">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a asp-area="" asp-controller="ArgumentDiagram" asp-action="Index" class="navbar-brand">ArgumentDiagram</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav top-nav">
                    <li><a class="btn btnNew">New</a></li>
                    <li><a class="btn" id="btnSave">Save</a></li>
                    <li><a class="btn" id="btnSaveDrive">Save To Drive</a></li>
                    <li><a class="btn btnLoad">Load</a></li>
                    <li><a class="btn" id="btnUndo">Undo</a></li>
                    <li><a class="btn">Export</a></li>
                    <li><a class="btn">Help</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container body-content">
