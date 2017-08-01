countNodes(chart_config.nodeStructure);
var globablVars = {};

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
    console.log(node);
    return node;
}

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
        window.alert("OBJ NOT FOUND");
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
            if (obj['type'] == 'reason') {
                objects.push(obj);
            } else {
                if (obj['children'][0] && obj['children'][0]['type'] == 'reason') {
                    objects.push(obj['children'][0]);
                    console.log(objects);
                } else {
                    objects.push(obj);
                }
            }
        }
    }
    return objects;
}

function countNodes(obj) {
    if (obj.hasOwnProperty('children')) {
        count += obj.children.length;
        for (var i = 0; i < obj.children.length; i++) {
            countNodes(obj.children[i]);
        }
    }
}

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

function reasonNode(child) {
    count++;
    var reason =
        {
            id: count,
            HTMLid: count.toString(),
            type: "reason",
            HTMLclass: "reason",
            text: {
                name: "R"
            },
            children: [child]
        };
    return reason;
}

function newChart(conclusion) {
    var chart_config = {
        chart: {
            container: "#basic-example",

            connectors: {
                type: 'curve'
            },
            node: {
                HTMLclass: 'nodeExample1'
            }
        },
        nodeStructure: {
            id: 1,
            HTMLid: "1",
            type: "fact",
            text: {
                name: conclusion
            },
            children: []
        }
    };
    return chart_config;
}
