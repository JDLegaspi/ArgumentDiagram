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
</head>
<body onload="initialise();">

    <div id="mySidenav" class="sidenav">
        <div class="my-diagrams-container">
            <div class="my-diagrams">
                <h2 style="margin-top: 0px;">My Files</h2>
                <ul>
                    <li><a>Computer Purchase</a></li>
                    <li><a>Seal hunting</a></li>
                </ul>
            </div>
            <div class="my-diagrams">
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
                    <li><a class="btn" id="btnNew">New</a></li>
                    <li><a class="btn" id="btnSave">Save</a></li>
                    <li><a href="javascript:document.getElementById('fileinput').click();" class="btn" id="btnLoad">Load</a></li>
                    <li><a class="btn" id="btnUndo">Undo</a></li>
                    <li><a class="btn">Export</a></li>
                    <li><a class="btn">Help</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container body-content">
