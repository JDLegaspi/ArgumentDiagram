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
    var sentences = [];
    
    loop1:
    for (var x = 0; x < json['sentences'].length; x++) {
        var string = "";
        var offset = json['sentences'][x]['text']['beginOffset'];
        console.log(offset);
        var sentenceIndex;
        
        loopFindOffset:
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i]['text']['beginOffset'] == offset) {
                sentenceIndex = i;
                break loopFindOffset;
            }
        }

        loop2:
        for (var i = sentenceIndex; i < tokens.length; i++) {
            if (getLabel(tokens[i]) == 'ROOT') {
                root = tokens[i]['text']['content'];
                rootTokenIndex = i;
                break loop2;
            }
        }
        
        loop3:
        for (var i = sentenceIndex; i < tokens.length; i++) {
            if (isDependant(tokens[i], rootTokenIndex)) {
                if (getLemma(tokens[i]) == ".") {
                    break loop3;
                }
                if (getLabel(tokens[i]) == "CC" && i > rootTokenIndex) break loop3;
                if (getLabel(tokens[i]) == "AUX" || getLabel(tokens[i]) == "NSUBJ" || getLabel(tokens[i]) == "TMOD" || getLabel(tokens[i]) == "DOBJ" || getLabel(tokens[i]) == "NEG" || getLabel(tokens[i]) == "ROOT") {
                    if (getLabel(tokens[i]) == "DOBJ" || getLabel(tokens[i]) == "TMOD") {
                        
                        loop4:
                        for (var j = sentenceIndex; j < tokens.length; j++) {
                            if (isDependant(tokens[j], i) && getLabel(tokens[j]) == "POSS") {
                                string += " " + tokens[j]['text']['content'] + "'s";
                                break loop4;
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
        sentences[x] = string;


    }
    return sentences;
    //return string;
}

function isDependant(token, headTokenIndex) {
    return token['dependencyEdge']['headTokenIndex'] == headTokenIndex;
}

function getLabel(token) {
    return token['dependencyEdge']['label'];
}

function getLemma(token) {
    return token['lemma'];
}