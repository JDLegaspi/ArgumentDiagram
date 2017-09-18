var globablVars = {};
var historyArray = [];
var chart_config;

// App initialisation
function initialise() {
    // Code for testing purposes with dummy data
    // chart_config.nodeStructure.children[0].innerHTML = nodeConstructor(chart_config.nodeStructure.children[0]);
    // chart_config.nodeStructure.children[1].innerHTML = nodeConstructor(chart_config.nodeStructure.children[1]);

    // Getting a count to be used for Node IDs
    globablVars.count = 1;
    globablVars.countReason = 0;
    countNodes(chart_config.nodeStructure);
    globablVars.history = 0;

    // Global variables used for connecting nodes
    globablVars.selectParent = false;
    globablVars.selectChild = false;

    // Whether algebra for attributes are optimistic or pessimistic
    // 1 = Pessimistic
    // 2 = Optimistic
    globablVars.support = {reliability: 1, accuracy: 1, relevancy: 1, uniqueness: 1, completeness: 1};
    globablVars.accrual = {reliability: 1, accuracy: 1, relevancy: 1, uniqueness: 1, completeness: 1};
    globablVars.conflict = {reliability: 1, accuracy: 1, relevancy: 1, uniqueness: 1, completeness: 1};

    // Show main app view
    $('.container').show();
    $('.jumbotron').hide();

    // Draw chart and fill text area
    var chart = new Treant(chart_config);
    $('#text').val(chart_config.chart.doc.text);
}

// Iterates through the chart to get a count of all nodes
function countNodes(obj) {
    if (obj.hasOwnProperty('children')) {
        globablVars.count += obj.children.length;
        if (obj.type == "reason") {
            globablVars.countReason++;
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
    if (globablVars.hideAttributes) {
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

// Returns node and all its children
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

// Deletes nodes from the chart, including any of its children
function deleteNode(obj, nodeId) {
    if (obj.hasOwnProperty('children')) {
        for (var i = 0; i < obj.children.length; i++) {
            if (obj.children[i].id == nodeId) {
                obj.children.splice(i, 1);
                // Removing conflict node if only one argument
                if (obj.type == "conflict") {
                    $("#btnConflict").prop('disabled', false);
                    chart_config.nodeStructure.children[0] = obj.children[0];
                }
                return;
            } else {
                deleteNode(obj.children[i], nodeId);
                if (obj.children[i].type == "reason" && obj.children[i].children.length < 1) {
                    obj.children.splice(i, 1);
                }
            }
        }
    } else {
        window.alert("Ummmmm, something is wrong...");    }

}

// Changes node values
function editNode(obj, nodeId, text, reli, accu, rele, uniq, comp) {
    if (obj.id == nodeId) {
        obj.name = text;
        obj.attributes.reliability = reli;
        obj.attributes.accuracy = accu;
        obj.attributes.relevancy = rele;
        obj.attributes.uniqueness = uniq;
        obj.attributes.completeness = comp;
        obj.innerHTML = nodeConstructor(obj);
    } else if (obj.hasOwnProperty('children')) {
        for (var i = 0; i < obj.children.length; i++) {
            editNode(obj.children[i], nodeId, text, reli, accu, rele, uniq, comp);
        }
    } else {
        window.alert("Ummmmm, something is wrong...");
    }
}

// Changes selectedText
function editSelection(obj, nodeId, start, end) {
    if (obj.id == nodeId) {
        obj.linktext.start = start;
        obj.linktext.end = end;
    } else if (obj.hasOwnProperty('children')) {
        for (var i = 0; i < obj.children.length; i++) {
            editSelection(obj.children[i], nodeId, start, end);
        }
    } else {
        window.alert("Ummmmm, something is wrong...");
    }
}

// Appends nodes to a reasoning node and its attributes before adding them to the chart
function reasonNode(child) {
    globablVars.count++;
    globablVars.countReason++;
    var name = "<p class='reason'>dMP (r" + globablVars.countReason + ")</p>"
    var reason =
        {
            id: globablVars.count,
            HTMLid: globablVars.count.toString(),
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
    var name = "r" + globablVars.countReason;
    globablVars.count++;
    reason.children.push(newNode(globablVars.count, "reasonAttr", name, 1, 1, 1, 1, 1, 0, 0));
    reason.children.push(child);
    return reason;
}

// Constructor for conflicting argument node
function conflictNode(child1, child2) {
    globablVars.count++;
    var conflict =
        {
            id: globablVars.count,
            HTMLid: globablVars.count.toString(),
            type: "conflict",
            HTMLclass: "conflict",
            text: {
                name: "CA"
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
    conflict.children.push(child1);
    conflict.children.push(child2);
    return conflict;
}

// Calculate supporting algebra for a decision node
function calculateAttributes(node) {
    var children = node.children;
    var count = 0;
    for (var key in children[0].attributes) {
        if (count < 5) {
            var attributeArray = [];
            for (var i = 0; i < children.length; i++) {
                if (!isNaN(children[i].attributes[key])) {
                    attributeArray.push(children[i].attributes[key]);
                }
            }
            // Optimistic Algebra
            if (globablVars.support[key] == 2) {
                node.attributes[key] = Math.max(...attributeArray);
            // Pessimistic Algebra
            } else {
                node.attributes[key] = Math.min(...attributeArray);
            }
        }
        count++;
    }
}

// Calculate accrual algebra for a fact node with children
function parentAttributes(node) {
    var children = node.children;
    var count = 0;
    for (var key in children[0].attributes) {
        if (count < 5) {
            if (children.length == 1) {
                node.attributes[key] = children[0].attributes[key];
            } else {
                var attributeArray = [];
                for (var i = 0; i < children.length; i++) {
                    if (!isNaN(children[i].attributes[key])) {
                        attributeArray.push(children[i].attributes[key]);
                    }
                }
                // Optimistic Algebra
                if (globablVars.accrual[key] == 2) {
                    for (var i = 0; i < attributeArray.length - 1; i++) {
                        attributeArray[i + 1] = attributeArray[i] + attributeArray[i + 1] - (attributeArray[i] * attributeArray[i + 1]);
                        node.attributes[key] = attributeArray[i + 1];
                    }
                // Pessimistic Algebra
                } else {
                    node.attributes[key] = Math.min(attributeArray.reduce((a, b) => a + b, 0), 1);
                }
            }
        }
        count++;
    }
    node.innerHTML = nodeConstructor(node);
}

// Calculate the weakened attributes in a conflicting argument
function conflictAttributes(node) {
    var a = node.children[0];
    var b = node.children[1];
    conflictCalculate(a, b);
    //conflictCalculate(b, a);
}

// This function allows both sides to be calculated without repeated code
function conflictCalculate(node1, node2) {
    var a = node1.attributes;
    var b = node2.attributes;

    if (globablVars.conflict.reliability == 2) {
        a.reliWeak = conflictOptimistic(a.reliability, b.reliability);
    } else {
        a.reliWeak = conflictPessimistic(a.reliability, b.reliability);
    }

    if (globablVars.conflict.accuracy == 2) {
        a.accuWeak = conflictOptimistic(a.accuracy, b.accuracy);
    } else {
        a.accuWeak = conflictPessimistic(a.accuracy, b.accuracy);
    }

    if (globablVars.conflict.relevancy == 2) {
        a.releWeak = conflictOptimistic(a.relevancy, b.relevancy);
    } else {
        a.releWeak = conflictPessimistic(a.relevancy, b.relevancy);
    }

    if (globablVars.conflict.uniqueness == 2) {
        a.uniqWeak = conflictOptimistic(a.uniqueness, b.uniqueness);
    } else {
        a.uniqWeak = conflictPessimistic(a.uniqueness, b.uniqueness);
    }

    if (globablVars.conflict.completeness == 2) {
        a.compWeak = conflictOptimistic(a.completeness, b.completeness);
    } else {
        a.compWeak = conflictPessimistic(a.completeness, b.completeness);
    }
    node1.innerHTML = nodeConstructor(node1);
}

// Iterate through entire chart and calculate attributes
function calculateChartAttributes(obj) {
    if (obj.children.length && obj.children[0].type == "reason") {
        for (var i = 0; i < obj.children.length; i++) {
            calculateChartAttributes(obj.children[i]);
            calculateAttributes(obj.children[i]);
        }
        parentAttributes(obj);
    } else if (obj.children.length) {
        for (var i = 0; i < obj.children.length; i++) {
            calculateChartAttributes(obj.children[i]);
        }
    }
    if (obj.type == "conflict") {
        conflictAttributes(obj);
    }
}

// Optimistic algebra for conflicting argument
function conflictOptimistic(a, b) {
    if (isNaN(a)) {
        return NaN;
    } else if (isNaN(b)) {
        return a;
    } else if (a >= b && b != 1) {
        return ((a - b) / (1 - b));
    } else {
        return 0;
    }
}

// Pessimistic algebra for conflicting argument
function conflictPessimistic(a, b) {
    if (isNaN(a)) {
        return NaN;
    } else if (isNaN(b)) {
        return a;
    } else if (a >= b) {
        return (a - b);
    } else {
        return 0;
    }
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
    historyArray[globablVars.history] = JSON.parse(JSON.stringify(chart_config));
    globablVars.history++;
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
