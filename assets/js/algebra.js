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
            if (globalVars.support[key] == 2) {
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
                if (globalVars.accrual[key] == 2) {
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
    var a = findParent(node.id, chart_config.nodeStructure);
    var b = node.children[0];
    conflictCalculate(a, b);
    //conflictCalculate(b, a);
}

// This function allows both sides to be calculated without repeated code
function conflictCalculate(node1, node2) {
    var a = node1.attributes;
    var b = node2.attributes;

    if (globalVars.conflict.reliability == 2) {
        a.reliWeak = conflictOptimistic(a.reliability, b.reliability);
    } else {
        a.reliWeak = conflictPessimistic(a.reliability, b.reliability);
    }

    if (globalVars.conflict.accuracy == 2) {
        a.accuWeak = conflictOptimistic(a.accuracy, b.accuracy);
    } else {
        a.accuWeak = conflictPessimistic(a.accuracy, b.accuracy);
    }

    if (globalVars.conflict.relevancy == 2) {
        a.releWeak = conflictOptimistic(a.relevancy, b.relevancy);
    } else {
        a.releWeak = conflictPessimistic(a.relevancy, b.relevancy);
    }

    if (globalVars.conflict.uniqueness == 2) {
        a.uniqWeak = conflictOptimistic(a.uniqueness, b.uniqueness);
    } else {
        a.uniqWeak = conflictPessimistic(a.uniqueness, b.uniqueness);
    }

    if (globalVars.conflict.completeness == 2) {
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
