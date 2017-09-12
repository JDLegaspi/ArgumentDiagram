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

        //if user has logged in, redirect to clean URL
        if ($auth->checkRedirectCode()) {
            header('Location:' . filter_var($auth_url, FILTER_SANITIZE_URL));
        }
    ?>

</head>
<body>

    <div id="mySidenav" class="sidenav">
        <div class="my-diagrams-container">

            <?php

                if (!$auth->isLoggedIn()) { ?>
                    <a class="btn btn-default" href="<?php echo $auth->getAuthUrl(); ?>">Sign in with Google</a>
                    <?php 
                } else {
                    ?>
                     <div class="my-diagrams">
                        <h2>My Files</h2>
                        <ul>
                            <?php 
                            
                            //create Google Drive object based on user's account
                            $drive = new Google_Service_Drive($auth->getClient());
                            $files = $drive->files->listFiles(array(
                                //'q' => "mimeType!='->application/vnd.google-apps.folder'",
                                'q' => "name contains '.mp3'",
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
                    <li><a class="btn btnLoad">Load</a></li>
                    <li><a class="btn" id="btnUndo">Undo</a></li>
                    <li><a class="btn">Export</a></li>
                    <li><a class="btn">Help</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container body-content">
