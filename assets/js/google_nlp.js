var api_key = "AIzaSyCfo2OUtmg0hqNiCVR6u0JbXHFdstfEXUs";

function analyseSyntax(string) {
    $('#text').highlightTextarea('destroy');
    var url = "https://language.googleapis.com/v1beta2/documents:analyzeSyntax?key="+api_key;
    var data = {
        encodingType: "UTF8",
        document: {
            type: "PLAIN_TEXT",
            content: string
        }
    };

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        dataType:"json",
        contentType: 'application/json',
        success: function(data) {
            console.log(data);

            var sentences = processRootWords(data);

            console.log(string);
            console.log($('#text').val());
            console.log(sentences);

            $('#text').highlightTextarea({
                ranges: [{
                    ranges: sentences,
                    color: '#e8bf7d',
                    resizable: true
                }]
            });

            return sentences;

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
    var output  = [];

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

        //find token
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

                if (getLabel(tokens[i]) == "AUX" || getLabel(tokens[i]) == "NSUBJ" || getLabel(tokens[i]) == "TMOD" || getLabel(tokens[i]) == "DOBJ" || getLabel(tokens[i]) == "NEG" || getLabel(tokens[i]) == "ROOT" || getLabel(tokens[i]) == "XCOMP" || getLabel(tokens[i]) == "ACOMP" || getLabel(tokens[i]) == "AUXPASS" || getLabel(tokens[i]) == "NSUBJPASS" || getLabel(tokens[i]) == "ATTR" || (isDependant(tokens[i], rootTokenIndex) && getLabel(tokens[i]) == "ADVCL")) {

                    if (getLabel(tokens[i]) == "DOBJ" || getLabel(tokens[i]) == "TMOD") {

                        loop4:
                        for (var j = sentenceIndex; j < tokens.length; j++) {
                            if (isDependant(tokens[j], i) && getLabel(tokens[j]) == "POSS") {
                                string += " " + tokens[j]['text']['content'] + "'s";
                                output.push(outputStartAndEnd(tokens[j]['text']['beginOffset'], tokens[j]['text']['content']));
                                break loop4;
                            }
                        }
                    }


                    if (getLabel(tokens[i]) == "ATTR") {
                        loop5:
                        for (var j = sentenceIndex; j <tokens.length; j++) {
                            if (isDependant(tokens[j], i) && getLabel(tokens[j]) == "AMOD" || isDependant(tokens[j], i) && getLabel(tokens[j]) == "PREP" || isDependant(tokens[j], i) && getLabel(tokens[j]) == "NN") {
                                string += " " + tokens[j]['text']['content'];
                                output.push(outputStartAndEnd(tokens[j]['text']['beginOffset'], tokens[j]['text']['content']));

                                if (getLabel(tokens[j]) == "PREP") {
                                    for (var k = 0; k < tokens.length; k++) {
                                        if (isDependant(tokens[k], j) && getLabel(tokens[k]) == "POBJ") {
                                            output.push(outputStartAndEnd(tokens[k]['text']['beginOffset'], tokens[k]['text']['content']));
                                        }
                                    }
                                }

                            }
                        }
                    }

                    if (getLabel(tokens[i]) == "NSUBJ") {
                        for (var j = sentenceIndex; j <tokens.length; j++) {
                            if (isDependant(tokens[j], i) && getLabel(tokens[j]) == "POSS" || isDependant(tokens[j], i) && getLabel(tokens[j]) == "AMOD") {
                                string += " " + tokens[j]['text']['content'];
                                output.push(outputStartAndEnd(tokens[j]['text']['beginOffset'], tokens[j]['text']['content']));
                            }
                        }
                    }

                    if (!(tokens[i]['text']['content'] == "n't" || tokens[i]['text']['content'] == "'s'" || tokens[i]['text']['beginOffset'] == 0)) {
                        string += " ";
                    }

                    if (getLabel(tokens[i]) == "ADVCL") {
                        for (var j = sentenceIndex; j <tokens.length; j++) {
                            if (isDependant(tokens[j], i) && getLabel(tokens[j]) == "NSUBJ" || isDependant(tokens[j], i) && getLabel(tokens[j]) == "MARK" || isDependant(tokens[j], i) && getLabel(tokens[j]) == "XCOMP") {
                                string += " " + tokens[j]['text']['content'];
                                output.push(outputStartAndEnd(tokens[j]['text']['beginOffset'], tokens[j]['text']['content']));

                                if (getLabel(tokens[j]) == "NSUBJ") {
                                    for (var k = 0; k < tokens.length; k++) {
                                        if (isDependant(tokens[k], j) && getLabel(tokens[k]) == "POSS") {
                                            output.push(outputStartAndEnd(tokens[k]['text']['beginOffset'], tokens[k]['text']['content']));
                                        }
                                    }
                                }

                                if (getLabel(tokens[j]) == "XCOMP") {
                                    for (var k = 0; k < tokens.length; k++) {
                                        if (isDependant(tokens[k], j) && getLabel(tokens[k]) == "AMOD") {
                                            output.push(outputStartAndEnd(tokens[k]['text']['beginOffset'], tokens[k]['text']['content']));
                                        }
                                    }
                                }

                            }
                        }
                    }

                    string += tokens[i]['text']['content'];
                    output.push(outputStartAndEnd(tokens[i]['text']['beginOffset'], tokens[i]['text']['content']));

                    if (getLabel(tokens[i]) == "XCOMP") {
                        loop5:
                        for (var j = sentenceIndex; j <tokens.length; j++) {
                            if (isDependant(tokens[j], i) && getLabel(tokens[j]) == "DOBJ" || isDependant(tokens[j], i) && getLabel(tokens[j]) == "AUX" || isDependant(tokens[j], i) && getLabel(tokens[j]) == "ACOMP" || isDependant(tokens[j], i) && getLabel(tokens[j]) == "ATTR") {
                                string += " " + tokens[j]['text']['content'];
                                output.push(outputStartAndEnd(tokens[j]['text']['beginOffset'], tokens[j]['text']['content']));
                            }
                        }
                    }
                }
            }
        }
        sentences[x] = string;


    }
    console.log(sentences);
    return output;
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

function outputStartAndEnd(beginOffset, token) {
    return [beginOffset, beginOffset + token.length];
}
