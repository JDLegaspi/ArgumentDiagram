<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ArgumentDiagram</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700|Raleway:400,500,600,700" rel="stylesheet">

    <link rel="stylesheet" href="assets/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="assets/css/site.css" type="text/css" />
    <link rel="stylesheet" href="assets/css/style.css" type="text/css" />
    <link rel="stylesheet" href="assets/lib/treant-js/Treant.css" type="text/css" />
    <link rel="stylesheet" href="assets/css/modal_styles.css" type="text/css"/>

    <!--Font Awesome-->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <!-- Load Google Drive API -->
    <?php

        //require Google API code
        require_once __DIR__ . '/app/drive_functions.php';

    ?>

    <!--IntroJS-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.7.0/introjs.min.css" type="text/css"/>
</head>
<body>

    <div id="mySidenav" class="sidenav" data-step="7" data-intro="Here are extra features exclusive to this thing..">
        <div class="my-diagrams-container">

            <?php

                if (isset($authUrl)) { ?>
                    <a class="btn btn-default" href="<?php echo $authUrl; ?>">Sign in with Google</a>
                    <?php
                } else {
                    ?>
                     <div class="my-diagrams">
                     <h2 style="margin-top: 0px;" data-step="8" data-intro="Here is a list of files that have been previously saved">My Files</h2>
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

    <nav class="navbar navbar-inverse navbar-main navbar-fixed-top">
        <div class="col-xs-1 cloud">
            <i class="fa fa-cloud" aria-hidden="true" onclick="toggleNav()" id="open-nav" data-step="6" data-intro="Click on this Cloud icon to view additional account features"></i>
        </div>
        <div class="container col-xs-11">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand">Argument Diagram Creator</a>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav top-nav">
                    <li><a href="javascript:document.getElementById('textInput').click();" class="btn btnNew" data-intro="Click on New to start a new diagram and import a text file" data-step="1">New</a></li>
                    <li><a class="btn" id="btnSaveDrive" data-step="2" data-intro="Click Save to save the current state of your diagram">Save</a></li>
                    <li><a href="javascript:document.getElementById('fileInput').click();" class="btn btnLoad" data-step="3" data-intro="Click Load to open a diagram">Load</a></li>
                    <li><a class="btn" id="btnUndo" data-step="4" data-intro="Click Undo to reverse your last action">Undo</a></li>
                    <li><a class="btn" data-step="5" data-intro="Click Export to create a pdf file of your diagram">Export</a></li>
                    <li><a id="btnHelp" class="btn" data-intro="Click Help to start this introduction guide again or view the help page for tips on how to create an argument diagram">Help</a></li>
                    <select id="algebraSelect">
                      <option value="true">Optimistic</option>
                      <option value="false">Pessimistic</option>
                    </select>
                </ul>
            </div>
        </div>
    </nav>
