var globablVars = {};

// App initialisation
function initialise() {
    // Code for testing purposes with dummy data
    chart_config.nodeStructure.children[0].innerHTML = nodeConstructor(chart_config.nodeStructure.children[0]);
    chart_config.nodeStructure.children[1].innerHTML = nodeConstructor(chart_config.nodeStructure.children[1]);

    // Getting a count to be used for Node IDs
    globablVars.count = 1;
    countNodes(chart_config.nodeStructure);

    // Global variables used for connecting nodes
    globablVars.selectParent = false;
    globablVars.selectChild = false;

    // Draw chart
    var chart = new Treant(chart_config);
}

// Generate and return HTML for nodes
function nodeConstructor(node) {
    var text = "<p>";
    text += node.name + "</p>";
    text += "<table>";
    text += "<tr><td>" + node.attributes.reliability.toFixed(2) + "</td>" + "<td>" + node.attributes.reliability.toFixed(2) + "</td></tr>";
    text += "<tr><td>" + node.attributes.accuracy.toFixed(2) + "</td>" + "<td>" + node.attributes.accuracy.toFixed(2) + "</td></tr>";
    text += "<tr><td>" + node.attributes.relevancy.toFixed(2) + "</td>" + "<td>" + node.attributes.relevancy.toFixed(2) + "</td></tr>";
    text += "<tr><td>" + node.attributes.uniqueness.toFixed(2) + "</td>" + "<td>" + node.attributes.uniqueness.toFixed(2) + "</td></tr>";
    text += "</table>";
    return text;
}

// Create and return new nodes
function newNode(id, type, name, relia, accur, relev, unique) {
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
          start: 0,
          end: 0
        },
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

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
            // if (obj['type'] == 'reason') {
            //     objects.push(obj);
            // } else {
            //     if (obj['children'][0] && obj['children'][0]['type'] == 'reason') {
            //         objects.push(obj['children'][0]);
            //         console.log(objects);
            //     } else {
            //         objects.push(obj);
            //     }
            // }
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
function editNode(obj, nodeId, editText) {
    if (obj.id == nodeId) {
        obj.text.name = editText;
    } else if (obj.hasOwnProperty('children')) {
        for (var i = 0; i < obj.children.length; i++) {
            editNode(obj.children[i], nodeId, editText);
        }
    } else {
        window.alert("Ummmmm, something is wrong...");
    }
}

// Appends nodes to a reasoning node before adding them to the chart
function reasonNode(child) {
    globablVars.count++;
    var reason =
        {
            id: globablVars.count,
            HTMLid: globablVars.count.toString(),
            type: "reason",
            HTMLclass: "reason",
            text: {
                name: "R"
            },
            children: [child]
        };
    return reason;
}
