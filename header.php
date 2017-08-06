<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ArgumentDiagram</title>

    <environment names="Development">
        <link rel="stylesheet" href="assets/lib/bootstrap/dist/css/bootstrap.css" />
        <link rel="stylesheet" href="assets/css/site.css" />
        <link rel="stylesheet" href="assets/lib/treant-js/Treant.css" type="text/css" />
    </environment>
    <environment names="Staging,Production">
        <link rel="stylesheet" href="https://ajax.aspnetcdn.com/ajax/bootstrap/3.3.7/css/bootstrap.min.css"
              asp-fallback-href="assets/lib/bootstrap/dist/css/bootstrap.min.css"
              asp-fallback-test-class="sr-only" asp-fallback-test-property="position" asp-fallback-test-value="absolute" />
        <link rel="stylesheet" href="assets/css/site.min.css" asp-append-version="true" />
    </environment>
</head>
<body onload="initialise();">
    <nav class="navbar navbar-inverse">
        <div class="container">
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
                    <li><a class="btn">Export</a></li>
                    <li><a class="btn">Help</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container body-content">
