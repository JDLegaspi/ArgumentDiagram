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

    <!--IntroJS-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.7.0/introjs.min.css" type="text/css"/>
</head>
<body>

    <div id="mySidenav" class="sidenav" data-step="8" data-intro="Here are extra features exclusive to this thing..">
        <div class="my-diagrams-container">
            <div class="my-diagrams">
                <h2 style="margin-top: 0px;" data-step="9" data-intro="Here is a list of files that have been previously saved">My Files</h2>
                <ul>
                    <li><a>Computer Purchase</a></li>
                    <li><a>Seal hunting</a></li>
                </ul>
            </div>
            <div class="my-diagrams" data-step="10" data-intro="This is a list of files you have access too.  These files have been shared to you by other users" >
                <h2>Shared With Me</h2>
                <ul>
                    <li><a>Capstone</a></li>
                    <li><a>Team 35</a></li>
                    <li><a>Australia Should Allow Online Poker</a></li>
                    <li><a>Jose is Salty About Aus Gambling Laws</a></li>
                </ul>
            </div>
        </div>
    </div>

    <nav class="navbar navbar-inverse navbar-main">
        <div class="col-xs-1 cloud">
            <i class="fa fa-cloud" aria-hidden="true" onclick="toggleNav()" id="open-nav" data-step="7" data-intro="Click on this Cloud icon to view additional account features"></i>
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
                    <li><a class="btn btnNew" data-intro="Click on New to start a new diagram and import a text file" data-step="1">New</a></li>
                    <li><a class="btn" id="btnSave" data-step="2" data-intro="Click Save to save the current state of your diagram">Save</a></li>
                    <li><a class="btn btnLoad" data-step="3" data-intro="Click Load to open a diagram">Load</a></li>
                    <li><a class="btn" id="btnUndo" data-step="4" data-intro="Click Undo to reverse your last action">Undo</a></li>
                    <li><a class="btn" data-step="5" data-intro="Click Export to create a pdf file of your diagram">Export</a></li>
                    <li><a class="btn" id="btnHelp" data-step="6" data-intro="Click Help to start this introduction guide again or view the help page for tips on how to create an argument diagram">Help</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container body-content">
