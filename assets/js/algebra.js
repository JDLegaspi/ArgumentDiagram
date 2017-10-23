// Calculate supporting algebra for a decision node
function calculateAttributes(node) {
    if (node.type == "reason") {
        var children = node.children;
        for (var key in node.attributes) {
            var attributeArray = [];
            for (var i = 0; i < children.length; i++) {
                if (!isNaN(children[i].attributes[key][1])) {
                    attributeArray.push(children[i].attributes[key][1]);
                } else if (!isNaN(children[i].attributes[key][0])) {
                    attributeArray.push(children[i].attributes[key][0]);
                }
            }
            // Optimistic Algebra
            if (globalVars.support[key] == 2) {
                node.attributes[key][0] = +Math.max(...attributeArray).toFixed(2);
            // Pessimistic Algebra
            } else {
                node.attributes[key][0] = +Math.min(...attributeArray).toFixed(2);
            }
        }
    }
}

// Calculate accrual algebra for a fact node with children
function parentAttributes(node) {
    var children = node.children;
    for (var key in node.attributes) {
        if (children.length == 1) {
            if (isNaN(children[0].attributes[key][1])) {
                node.attributes[key][0] = children[0].attributes[key][0];
            } else {
                node.attributes[key][0] = children[0].attributes[key][1];
            }
        } else {
            var attributeArray = [];
            for (var i = 0; i < children.length; i++) {
                if (!isNaN(children[i].attributes[key][1]) && children[i].type == "reason") {
                    attributeArray.push(children[i].attributes[key][1]);
                } else if (!isNaN(children[i].attributes[key][0]) && children[i].type == "reason") {
                    attributeArray.push(children[i].attributes[key][0]);
                }
            }
            // Optimistic Algebra
            if (globalVars.accrual[key] == 2) {
                for (var i = 0; i < attributeArray.length - 1; i++) {
                    attributeArray[i + 1] = attributeArray[i] + attributeArray[i + 1] - (attributeArray[i] * attributeArray[i + 1]);
                    node.attributes[key][0] = +attributeArray[i + 1].toFixed(2);
                }
            // Pessimistic Algebra
            } else {
                node.attributes[key][0] = +Math.min(attributeArray.reduce((a, b) => a + b, 0), 1).toFixed(2);
            }
        }
    }
    node.innerHTML = nodeConstructor(node);
}

// Calculate the weakened attributes in a conflicting argument
function conflictAttributes(node) {
    var a = findParent(node.id, chart_config.nodeStructure);
    var b = node.children[0];
    conflictCalculate(a, b);
}

// This function allows both sides to be calculated without repeated code
function conflictCalculate(node1, node2) {
    var a = node1.attributes;
    var b = node2.attributes;
    for (var key in a) {
        if (isNaN(b[key][1])) {
            if (globalVars.conflict[key] == 2) {
                a[key][1] = conflictOptimistic(a[key][0], b[key][0]);
            } else {
                a[key][1] = conflictPessimistic(a[key][0], b[key][0]);
            }
        } else {
            if (globalVars.conflict[key] == 2) {
                a[key][1] = conflictOptimistic(a[key][0], b[key][1]);
            } else {
                a[key][1] = conflictPessimistic(a[key][0], b[key][1]);
            }
        }
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
        if (obj.type != 'conflict') {
            parentAttributes(obj);
        }
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
        return +a.toFixed(2);
    } else if (a >= b && b != 1) {
        return +((a - b) / (1 - b)).toFixed(2);
    } else {
        return 0;
    }
}

// Pessimistic algebra for conflicting argument
function conflictPessimistic(a, b) {
    if (isNaN(a)) {
        return NaN;
    } else if (isNaN(b)) {
        return +a.toFixed(2);
    } else if (a >= b) {
        return +(a - b).toFixed(2);
    } else {
        return 0;
    }
}
