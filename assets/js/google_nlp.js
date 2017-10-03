var api_key = "AIzaSyCfo2OUtmg0hqNiCVR6u0JbXHFdstfEXUs";

function analyseSyntax(string) {
    var url = "https://language.googleapis.com/v1beta2/documents:analyzeSyntax?key="+api_key;
    var data = {
        encodingType: "UTF8",
        document: {
            type: "PLAIN_TEXT",
            content: string
        }
    };
    console.log(data);

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        dataType:"json",
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            console.log(processRootWords(data));
            return data;
        },
        error: function(data) {
            console.log('Something went wrong:');
            console.log(data);
            if (data.responseJSON.error.message) {
                console.log(data.responseJSON.error.message);
            }
        }
    });
}

function processRootWords(json) {
    var tokens = json.tokens;
    var root;
    var rootTokenIndex;
    var string = "";

    for (var i = 0; i < tokens.length; i++) {
        if (getLabel(tokens[i]) == 'ROOT') {
            root = tokens[i]['text']['content'];
            rootTokenIndex = i;
            break;
        }
    }

    for (var i = 0; i < tokens.length; i++) {
        if (isDependant(tokens[i], rootTokenIndex)) {
            if (getLabel(tokens[i]) == "CC" && i > rootTokenIndex) break;
            if (getLabel(tokens[i]) == "AUX" || getLabel(tokens[i]) == "NSUBJ" || getLabel(tokens[i]) == "TMOD" || getLabel(tokens[i]) == "DOBJ" || getLabel(tokens[i]) == "NEG" || getLabel(tokens[i]) == "ROOT") {
                if (getLabel(tokens[i]) == "DOBJ" || getLabel(tokens[i]) == "TMOD") {
                    for (var j = 0; j < tokens.length; j++) {
                        if (isDependant(tokens[j], i) && getLabel(tokens[j]) == "POSS") {
                            string += " " + tokens[j]['text']['content'] + "'s";
                            break;
                        }
                    }   
                }     
                if (!(tokens[i]['text']['content'] == "n't" || tokens[i]['text']['content'] == "'s'" || tokens[i]['text']['beginOffset'] == 0)) {
                    string += " ";
                }        
                string += tokens[i]['text']['content'];
            }
        }
    }

    return string;
}

function isDependant(token, headTokenIndex) {
    return token['dependencyEdge']['headTokenIndex'] == headTokenIndex;
}

function getLabel(token) {
    return token['dependencyEdge']['label'];
}