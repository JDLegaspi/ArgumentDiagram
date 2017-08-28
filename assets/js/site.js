var globablVars = {};
var historyArray = [];

// App initialisation
function initialise() {
    // Code for testing purposes with dummy data
    chart_config.nodeStructure.children[0].innerHTML = nodeConstructor(chart_config.nodeStructure.children[0]);
    chart_config.nodeStructure.children[1].innerHTML = nodeConstructor(chart_config.nodeStructure.children[1]);

    // Getting a count to be used for Node IDs
    globablVars.count = 1;
    countNodes(chart_config.nodeStructure);
    globablVars.history = 0;
    console.log(chart_config);
    globablVars.reasonNodes = 0;

    // Global variables used for connecting nodes
    globablVars.selectParent = false;
    globablVars.selectChild = false;

    globablVars.relevancyOpt = true;
    globablVars.uniquenessOpt = true;

    // Draw chart
    var chart = new Treant(chart_config);
    console.log(chart_config.chart.doc.text);
    $('#text').val(chart_config.chart.doc.text);

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
    text += "<tr><td>" + node.attributes.reliability.toFixed(2) + "</td>" + "<td>" + node.attributes.reliability.toFixed(2) + "</td></tr>";
    text += "<tr><td>" + node.attributes.accuracy.toFixed(2) + "</td>" + "<td>" + node.attributes.accuracy.toFixed(2) + "</td></tr>";
    text += "<tr><td>" + node.attributes.relevancy.toFixed(2) + "</td>" + "<td>" + node.attributes.relevancy.toFixed(2) + "</td></tr>";
    text += "<tr><td>" + node.attributes.uniqueness.toFixed(2) + "</td>" + "<td>" + node.attributes.uniqueness.toFixed(2) + "</td></tr>";
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
          uniqueness: unique
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

// Finds and returns nodes from an ID
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

// Iterates through the chart to get a count of all nodes
function countNodes(obj) {
    if (obj.hasOwnProperty('children')) {
        globablVars.count += obj.children.length;
        for (var i = 0; i < obj.children.length; i++) {
            countNodes(obj.children[i]);
        }
    }
}

// Deletes nodes from the chart, including any of its children
function deleteNode(obj, nodeId) {
    if (obj.hasOwnProperty('children')) {
        for (var i = 0; i < obj.children.length; i++) {
            if (obj.children[i].id == nodeId) {
                obj.children.splice(i, 1);
                return;
            } else {
                deleteNode(obj.children[i], nodeId);
                if (obj.children[i].type == "reason" && obj.children[i].children.length < 1) {
                    obj.children.splice(i, 1);
                }
            }
        }
    } else {
        window.alert("Ummmmm, something is wrong...");
    }
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
}

// Appends nodes to a reasoning node before adding them to the chart
function reasonNode(child) {
    globablVars.count++;
    globablVars.reasonNodes++;
    var reason =
        {
            id: globablVars.count,
            HTMLid: globablVars.count.toString(),
            HTMLclass: "reason",
            type: "reason",
            text: {
                name: "dMP"
            },
            attributes: {
              reliability: 0,
              accuracy: 0,
              relevancy: 0,
              uniqueness: 0
            },
            children: []
        };
    // Setting up Attributes for Reason Node
    var name = "r" + globablVars.reasonNodes;
    globablVars.count++;
    reason.children.push(newNode(globablVars.count, "reasonAttr", name, 1, 1, 1, 1, 0, 0));
    reason.children.push(child);
    calculateAttributes(reason);
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

// Calculating attribute values based on child nodes of a reasoning node
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

function parentAttributes(node) {
    console.log(node);
    var children = node.children;
    var reliability = NaN;
    var accuracy = NaN;
    var relevancy = NaN;
    var uniqueness = NaN;
    console.log(children.length);
    if (children.length = 1) {
        for (var i = 0; i < children.length; i++) {
            reliability = children[i].attributes.reliability;
            accuracy = children[i].attributes.accuracy;
            relevancy = children[i].attributes.relevancy;
            uniqueness = children[i].attributes.uniqueness;
        }
    } else {
        reliability = children[0].attributes.reliability + children[1].attributes.reliability - (children[0].attributes.reliability * children[1].attributes.reliability);
        accuracy = Math.min(children[0].attributes.accuracy, children[1].attributes.accuracy);
        relevancy = Math.min(children[0].attributes.relevancy, children[1].attributes.relevancy);
        uniqueness = Math.min(children[0].attributes.uniqueness, children[1].attributes.uniqueness);
    }
    node.attributes.reliability = reliability;
    node.attributes.accuracy = accuracy;
    node.attributes.relevancy = relevancy;
    node.attributes.uniqueness = uniqueness;
    node.innerHTML = nodeConstructor(node);
}

function getMin(original, comparison, weight) {
    if ((comparison < original || isNaN(original)) && !isNaN(comparison)) {
        original = comparison * weight;
    }
    return original;
}

function getMax(original, comparison, weight) {
    if ((comparison > original || isNaN(original)) && !isNaN(comparison)) {
        original = comparison * weight;
    }
    return original;
}

function chartHistory() {
    historyArray.push(JSON.parse(JSON.stringify(chart_config)));
    globablVars.history++;
}
