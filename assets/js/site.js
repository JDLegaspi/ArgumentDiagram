var globablVars = {};
var historyArray = [];
var chart_config;

// App initialisation
function initialise() {
    // Getting a count to be used for Node IDs
    globablVars.count = 1;
    globablVars.countReason = 0;
    countNodes(chart_config.nodeStructure);
    globablVars.history = 0;

    // Global variables used for connecting nodes
    globablVars.selectParent = false;
    globablVars.selectChild = false;

    // Whether algebra for attributes are optimistic or pessimistic
    globablVars.relevancyOpt = true;
    globablVars.uniquenessOpt = true;

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
function newChart(input) {
    chart_config = {
        chart: {
            doc: {
                title: '',
                text: input
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
    } else {
        text += node.name + "</p>";
    }
    text += "<table class='nodeAttributes' style='margin: auto'>";
    if (isNaN(node.attributes.reliWeak) && isNaN(node.attributes.accuWeak) && isNaN(node.attributes.releWeak) && isNaN(node.attributes.uniqWeak)) {
        text += "<tr><td>" + node.attributes.reliability.toFixed(2) + "</td>" + "<td>" + node.attributes.reliability.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.accuracy.toFixed(2) + "</td>" + "<td>" + node.attributes.accuracy.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.relevancy.toFixed(2) + "</td>" + "<td>" + node.attributes.relevancy.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.uniqueness.toFixed(2) + "</td>" + "<td>" + node.attributes.uniqueness.toFixed(2) + "</td></tr>";
    } else {
        text += "<tr><td>" + node.attributes.reliability.toFixed(2) + "</td>" + "<td>" + node.attributes.reliWeak.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.accuracy.toFixed(2) + "</td>" + "<td>" + node.attributes.accuWeak.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.relevancy.toFixed(2) + "</td>" + "<td>" + node.attributes.releWeak.toFixed(2) + "</td></tr>";
        text += "<tr><td>" + node.attributes.uniqueness.toFixed(2) + "</td>" + "<td>" + node.attributes.uniqWeak.toFixed(2) + "</td></tr>";
    }
    text += "</table>";
    return text;
}

// Create and return new nodes
function newNode(id, type, name, relia, accur, relev, unique, startSel, endSel) {
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
          reliWeak: NaN,
          accuWeak: NaN,
          releWeak: NaN,
          uniqWeak: NaN
        },
        linktext: {
          start: startSel,
          end: endSel
        },
        collapsable: true,
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
                    chart_config.nodeStructure.children[0] = obj.children[0];
                }
                calculateChartAttributes(chart_config.nodeStructure);
                return;
            } else {
                console.log("2");
                console.log(obj.children[i].id);
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
function editNode(obj, nodeId, text, reli, accu, rele, uniq) {
    if (obj.id == nodeId) {
        obj.name = text;
        obj.attributes.reliability = reli;
        obj.attributes.accuracy = accu;
        obj.attributes.relevancy = rele;
        obj.attributes.uniqueness = uniq;
        obj.innerHTML = nodeConstructor(obj);
    } else if (obj.hasOwnProperty('children')) {
        for (var i = 0; i < obj.children.length; i++) {
            editNode(obj.children[i], nodeId, text, reli, accu, rele, uniq);
        }
    } else {
        window.alert("Ummmmm, something is wrong...");
    }
    calculateChartAttributes(chart_config.nodeStructure);
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
              uniqueness: NaN
            },
            children: []
        };
    // Setting up Attributes for Reason Node
    var name = "r" + globablVars.countReason;
    globablVars.count++;
    reason.children.push(newNode(globablVars.count, "reasonAttr", name, 1, 1, 1, 1, 0, 0));
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

// Calculating attribute values based on the child nodes of a reasoning node
function calculateAttributes(node) {
    var children = node.children;
    var reliability = NaN;
    var accuracy = NaN;
    var relevancy = NaN;
    var uniqueness = NaN;
    for (var i = 1; i < children.length; i++) {
        reliability = getMin(reliability, children[i].attributes.reliability, children[0].attributes.reliability);
        accuracy = getMin(accuracy, children[i].attributes.accuracy, children[0].attributes.accuracy);
        if (globablVars.relevancyOpt) {
            relevancy = getMax(relevancy, children[i].attributes.relevancy, children[0].attributes.relevancy);
        } else {
            relevancy = getMin(relevancy, children[i].attributes.relevancy, children[0].attributes.relevancy);
        }
        if (globablVars.uniquenessOpt) {
            uniqueness = getMax(uniqueness, children[i].attributes.uniqueness, children[0].attributes.uniqueness);
        } else {
            uniqueness = getMin(uniqueness, children[i].attributes.uniqueness, children[0].attributes.uniqueness);
        }
    }
    node.attributes.reliability = reliability;
    node.attributes.accuracy = accuracy;
    node.attributes.relevancy = relevancy;
    node.attributes.uniqueness = uniqueness;
}

// Calculating the attributes for a ndoe based on its connected reasoning nodes
function parentAttributes(node) {
    var children = node.children;
    var reliability = NaN;
    var accuracy = NaN;
    var relevancy = NaN;
    var uniqueness = NaN;
    if (children.length == 1) {
        for (var i = 0; i < children.length; i++) {
            reliability = children[i].attributes.reliability;
            accuracy = children[i].attributes.accuracy;
            relevancy = children[i].attributes.relevancy;
            uniqueness = children[i].attributes.uniqueness;
        }
    } else {
        reliability = children[0].attributes.reliability + children[1].attributes.reliability - (children[0].attributes.reliability * children[1].attributes.reliability);
        accuracy = Math.min(children[0].attributes.accuracy + children[1].attributes.accuracy, 1);
        if (globablVars.relevancyOpt) {
            relevancy = Math.min(children[0].attributes.relevancy + children[1].attributes.relevancy, 1);
        } else {
            relevancy = children[0].attributes.relevancy + children[1].attributes.relevancy - (children[0].attributes.relevancy * children[1].attributes.relevancy);
        }
        if (globablVars.uniquenessOpt) {
            uniqueness = Math.min(children[0].attributes.uniqueness + children[1].attributes.uniqueness, 1);
        } else {
            uniqueness = children[0].attributes.uniqueness + children[1].attributes.uniqueness - (children[0].attributes.uniqueness * children[1].attributes.uniqueness);
        }
    }
    node.attributes.reliability = reliability;
    node.attributes.accuracy = accuracy;
    node.attributes.relevancy = relevancy;
    node.attributes.uniqueness = uniqueness;
    node.innerHTML = nodeConstructor(node);
}

// Calculate the weakened attributes in a conflicting argument
function conflictAttributes(node) {
    var a = node.children[0];
    var b = node.children[1];
    conflictCalculate(a, b);
    conflictCalculate(b, a);
}

// This function allows both sides to be calculated without repeated code
function conflictCalculate(node1, node2) {
    var a = node1.attributes;
    var b = node2.attributes;
    a.reliWeak = conflictOptimistic(a.reliability, b.reliability);
    a.accuWeak = conflictPessimistic(a.accuracy, b.accuracy);
    if (globablVars.relevancyOpt) {
        a.releWeak = conflictOptimistic(a.relevancy, b.relevancy);
    } else {
        a.releWeak = conflictPessimistic(a.relevancy, b.relevancy);
    }
    if (globablVars.uniquenessOpt) {
        a.uniqWeak = conflictOptimistic(a.uniqueness, b.uniqueness);
    } else {
        a.uniqWeak = conflictPessimistic(a.uniqueness, b.uniqueness);
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

// Used for getting minimum attribute for nodes
function getMin(original, comparison, weight) {
    if ((comparison < original || isNaN(original)) && !isNaN(comparison)) {
        original = comparison * weight;
    }
    return original;
}

// Used for getting maximum attribute for nodes
function getMax(original, comparison, weight) {
    if ((comparison > original || isNaN(original)) && !isNaN(comparison)) {
        original = comparison * weight;
    }
    return original;
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
    var x = document.getElementById("snackbar")
    x.className = "show";
    x.innerHTML = text;
}

// Used for hiding the snackbar
function hideSnackbar() {
    var x = document.getElementById("snackbar");
    x.innerHTML = "";
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
    } else if (obj.id != 1) {
        for (var key in obj.attributes) {
            if (obj.attributes[key] == null) {
                obj.attributes[key] = NaN;
            }
        }
    }
}
