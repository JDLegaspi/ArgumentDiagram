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
        require_once __DIR__ . '/app/drive_functions.php';
        
    ?>

</head>
<body>

    <div id="mySidenav" class="sidenav">
        <div class="my-diagrams-container">

            <?php

                if (isset($authUrl)) { ?>
                    <a class="btn btn-default" href="<?php echo $authUrl; ?>">Sign in with Google</a>
                    <?php 
                } else {
                    ?>
                     <div class="my-diagrams">
                        <ul>
                            <?php 
                            
                            //create Google Drive object based on user's account
                            $files = $service->files->listFiles(array(
                                'q' => "name contains '.argu' and trashed != true",
                                'spaces' => 'drive'
                            ));
                            //echo var_dump($files['files']);

                            foreach ($files['files'] as $key => $value) {
                                echo '<li id="'.$value['id'].'"><a>' . $value['name'] . "</a></li>";
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
                    <li><a class="btn" id="btnSaveDrive">Save</a></li>
                    <li><a class="btn btnLoad">Load</a></li>
                    <li><a class="btn" id="btnUndo">Undo</a></li>
                    <li><a class="btn">Export</a></li>
                    <li><a class="btn">Help</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container body-content">
