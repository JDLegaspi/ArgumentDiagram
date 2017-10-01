var globalVars = {};
var historyArray = [];
var chart_config;

// App initialisation
function initialise() {
    // Getting a count to be used for Node IDs
    globalVars.count = 1;
    globalVars.countReason = 0;
    countNodes(chart_config.nodeStructure);
    globalVars.history = 0;

    // Global variables used for connecting node states
    globalVars.selectParent = false;
    globalVars.selectChild = false;
    globalVars.selectConflict = false;

    // Whether algebra for attributes are optimistic or pessimistic
    // 1 = Pessimistic
    // 2 = Optimistic
    globalVars.support = {reliability: 1, accuracy: 1, relevancy: 1, uniqueness: 1, completeness: 1};
    globalVars.accrual = {reliability: 1, accuracy: 1, relevancy: 1, uniqueness: 1, completeness: 1};
    globalVars.conflict = {reliability: 1, accuracy: 1, relevancy: 1, uniqueness: 1, completeness: 1};

    // Show main app view and hide starting views
    $('.arg-container').show();
    $('.name-chart').hide();
    $('.starting-screen').hide();

    document.getElementById('textInput').form.reset();
    document.getElementById('chartName').form.reset();

    // Draw chart and fill text area
    var chart = new Treant(chart_config);
    $('#text').val(chart_config.chart.doc.text);
}

// Iterates through the chart to get a count of all nodes
function countNodes(obj) {
    if (obj.hasOwnProperty('children')) {
        globalVars.count += obj.children.length;
        if (obj.type == "reason") {
            globalVars.countReason++;
        }
        for (var i = 0; i < obj.children.length; i++) {
            countNodes(obj.children[i]);
        }
    }
}

// Sets up a new chart with a text input
function newChart(text, title) {
    chart_config = {
        chart: {
            doc: {
                title: title,
                text: text
            },
            scrollbar: 'fancy',
            container: "#basic-example",
            hideRootNode: true,
            connectors: {
                type: 'curve',
                style: {
                    'arrow-start': 'block-wide-long'
                },
            },
            node: {
                HTMLclass: 'nodeExample1'
            }
        },
        nodeStructure: {
            id: 1,
            HTMLid: "1",
            children: []
        }
    };
}

// Draw chart
// Overflow is set as Treant will reset this value everytime a chart is drawn
function drawChart() {
    var chart = new Treant(chart_config);
    $("#basic-example").css("overflow", 'visible');
}

// Generate and return HTML for nodes
function nodeConstructor(node) {
    var text = "<p class='nodeTitle'>";
    if (node.name.length > 25) {
        text += node.name.slice(0, 22) + "...</p>";
    } else if (node.name.length == 0) {
        text += "#" + node.id;
    } else {
        text += node.name + "</p>";
    }
    if (globalVars.hideAttributes) {
        text += "<table class='nodeAttributes' style='margin: auto; display: none'>";
    } else {
        text += "<table class='nodeAttributes' style='margin: auto'>";
    }
    if (isNaN(node.attributes.reliWeak) && isNaN(node.attributes.accuWeak) && isNaN(node.attributes.releWeak) && isNaN(node.attributes.uniqWeak)) {
        text += "<tr><td>" + node.attributes.reliability.toFixed(2) + "</td>" + "<td>" + node.attributes.reliability.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.accuracy.toFixed(2) + "</td>" + "<td>" + node.attributes.accuracy.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.relevancy.toFixed(2) + "</td>" + "<td>" + node.attributes.relevancy.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.uniqueness.toFixed(2) + "</td>" + "<td>" + node.attributes.uniqueness.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.completeness.toFixed(2) + "</td>" + "<td>" + node.attributes.completeness.toFixed(2) + "</td></tr>";
    } else {
        text += "<tr><td>" + node.attributes.reliability.toFixed(2) + "</td>" + "<td>" + node.attributes.reliWeak.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.accuracy.toFixed(2) + "</td>" + "<td>" + node.attributes.accuWeak.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.relevancy.toFixed(2) + "</td>" + "<td>" + node.attributes.releWeak.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.uniqueness.toFixed(2) + "</td>" + "<td>" + node.attributes.uniqWeak.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.completeness.toFixed(2) + "</td>" + "<td>" + node.attributes.compWeak.toFixed(2) + "</td></tr>";
    }
    text += "</table>";
    return text;
}

// Create and return new nodes
function newNode(id, type, name, relia, accur, relev, unique, comple, startSel, endSel) {
    var node = {
        id: id,
        HTMLid: id.toString(),
        type: type,
        name: name,
        attributes: {
          reliability: relia,
          accuracy: accur,
          relevancy: relev,
          uniqueness: unique,
          completeness: comple,
          reliWeak: NaN,
          accuWeak: NaN,
          releWeak: NaN,
          uniqWeak: NaN,
          compWeak: NaN
        },
        linktext: {
          start: startSel,
          end: endSel
        },
        collapsed: false,
        children: []
    };
    node.innerHTML = nodeConstructor(node);
    return node;
}

// Finds and returns node from an ID
function findNode(id, obj) {
    if (obj.id == id) {
        return obj;
    } else if (obj.hasOwnProperty('children')) {
        var object;
        for (var i = 0; i < obj.children.length; i++) {
            if (object === undefined) {
                object = findNode(id, obj.children[i]);
            }
        }
    } else {
        window.alert("ERROR: NODE NOT FOUND");
    }
    return object;
}

// Finds and returns parent node from an ID
function findParent(id, obj) {
    var object;
    for (var i = 0; i < obj.children.length; i++) {
        if (object === undefined) {
            if (obj.children[i].id == id) {
                return obj;
            } else {
                object = findParent(id, obj.children[i]);
            }
        }
    }
    return object;
}

// Finds node with 'id' and returns it and all its children
function getObjects(id, obj) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(id, obj[i]));
        } else if (i == "id" && obj.id == id) {
            objects.push(obj);
        }
    }
    return objects;
}

// Deletes node witd 'id' from the chart, including any of its children
function deleteNode(id, obj) {
    if (obj.hasOwnProperty('children')) {
        for (var i = 0; i < obj.children.length; i++) {
            if (obj.children[i].id == id) {
                obj.children.splice(i, 1);
                // Removing conflict node if only one argument
                if (obj.type == "conflict") {
                    $("#btnConflict").prop('disabled', false);
                    chart_config.nodeStructure.children[0] = obj.children[0];
                }
                return;
            } else {
                deleteNode(id, obj.children[i]);
                if (obj.children[i].type == "reason" && obj.children[i].children.length < 1) {
                    obj.children.splice(i, 1);
                }
            }
        }
    } else {
        window.alert("Ummmmm, something is wrong...");    }

}

// Change node values
function editNode(obj, id, text, reli, accu, rele, uniq, comp) {
    if (obj.id == id) {
        obj.name = text;
        obj.attributes.reliability = reli;
        obj.attributes.accuracy = accu;
        obj.attributes.relevancy = rele;
        obj.attributes.uniqueness = uniq;
        obj.attributes.completeness = comp;
        obj.innerHTML = nodeConstructor(obj);
    } else if (obj.hasOwnProperty('children')) {
        for (var i = 0; i < obj.children.length; i++) {
            editNode(obj.children[i], id, text, reli, accu, rele, uniq, comp);
        }
    } else {
        window.alert("Ummmmm, something is wrong...");
    }
}

// Changes selected text for node with 'id'
function editSelection(obj, id, start, end) {
    if (obj.id == id) {
        obj.linktext.start = start;
        obj.linktext.end = end;
    } else if (obj.hasOwnProperty('children')) {
        for (var i = 0; i < obj.children.length; i++) {
            editSelection(obj.children[i], id, start, end);
        }
    } else {
        window.alert("Ummmmm, something is wrong...");
    }
}

// Appends nodes to a reasoning node and its attributes before adding them to the chart
function reasonNode(child) {
    globalVars.count++;
    globalVars.countReason++;
    var name = "<p class='reason'>dMP (r" + globalVars.countReason + ")</p>"
    var reason =
        {
            id: globalVars.count,
            HTMLid: globalVars.count.toString(),
            type: "reason",
            text: {
                name: name
            },
            innerHTML: name,
            attributes: {
              reliability: NaN,
              accuracy: NaN,
              relevancy: NaN,
              uniqueness: NaN,
              completeness: NaN
            },
            children: []
        };
    // Setting up Attributes for Reason Node
    var name = "r" + globalVars.countReason;
    globalVars.count++;
    reason.children.push(newNode(globalVars.count, "reasonAttr", name, 1, 1, 1, 1, 1, 0, 0));
    reason.children.push(child);
    return reason;
}

// Appends nodes to a conflict node and its attributes before adding them to the chart
function conflictNode(child) {
    globalVars.count++;
    var name = "<p class='conflict'>CA</p>"
    var conflict =
        {
            id: globalVars.count,
            HTMLid: globalVars.count.toString(),
            type: "conflict",
            text: {
                name: name
            },
            innerHTML: name,
            attributes: {
              reliability: NaN,
              accuracy: NaN,
              relevancy: NaN,
              uniqueness: NaN,
              completeness: NaN
            },
            connectors: {
                type: 'curve',
                style: {
                    'arrow-start': 'block-wide-long',
                    'arrow-end': 'block-wide-long'
                },
            },
            children: []
        };
    conflict.children.push(child);
    return conflict;
}

// Used for showing the snackbar with a text input
function showSnackbar(text) {
    var x = document.getElementById("snackbar");
    var y = document.getElementById("snackbarText");
    x.className = "show";
    y.innerHTML = text;
}

// Used for hiding the snackbar
function hideSnackbar() {
    var x = document.getElementById("snackbar");
    x.className = x.className.replace("show", "");
}

// Appending current chart to the history array
function chartHistory() {
    historyArray[globalVars.history] = JSON.parse(JSON.stringify(chart_config));
    globalVars.history++;
}

// Loads previous chart in history
function undoChart() {
    if (globalVars.history != 0) {
        globalVars.history--;
        chart_config = historyArray[globalVars.history];
        parseNaN(chart_config.nodeStructure);
        globalVars.count = 1;
        countNodes(chart_config.nodeStructure);
        drawChart();
    }
}

// Changes null to NaN when chart is parsed back to JSON for history
function parseNaN(obj) {
    if (obj.hasOwnProperty('children') && obj.children.length > 0) {
        for (var i = 0; i < obj.children.length; i++) {
            parseNaN(obj.children[i]);
        }
        for (var key in obj.attributes) {
            if (obj.attributes[key] == null) {
                obj.attributes[key] = NaN;
            }
        }
    } else if (obj.id != 1) {
        for (var key in obj.attributes) {
            if (obj.attributes[key] == null) {
                obj.attributes[key] = NaN;
            }
        }
    }
}

// Iterating through chart and toggling whether attributes are displayed or not
function toggleAttributes(obj) {
    if (obj.hasOwnProperty('children')) {
        for (var i = 0; i < obj.children.length; i++) {
            if (obj.children[i].type == "reasonAttr" || obj.children[i].type == "fact") {
                obj.children[i].innerHTML = nodeConstructor(obj.children[i]);
            }
            toggleAttributes(obj.children[i]);
        }
    }
}
