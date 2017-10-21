// Calculate supporting algebra for a decision node
function calculateAttributes(node) {
    if (node.type == "reason") {
        var children = node.children;
        var count = 0;        
        for (var key in node.attributes) {
            if (count < 5) {
                var attributeArray = [];
                for (var i = 0; i < children.length; i++) {
                    if (!isNaN(children[i].attributes[key])) {
                        attributeArray.push(children[i].attributes[key]);
                    }
                }
                // Optimistic Algebra
                if (globalVars.support[key] == 2) {
                    node.attributes[key] = +Math.max(...attributeArray).toFixed(2);
                // Pessimistic Algebra
                } else {
                    node.attributes[key] = +Math.min(...attributeArray).toFixed(2);
                }
            }
            count++;
        }
    }
}

// Calculate accrual algebra for a fact node with children
function parentAttributes(node) {
    var children = node.children;
    var count = 0;
    for (var key in node.attributes) {
        if (count < 5) {
            if (children.length == 1) {
                node.attributes[key] = children[0].attributes[key];
            } else {
                var attributeArray = [];
                for (var i = 0; i < children.length; i++) {
                    if (!isNaN(children[i].attributes[key]) && children[i].type == "reason") {
                        attributeArray.push(children[i].attributes[key]);
                    }
                }
                // Optimistic Algebra
                if (globalVars.accrual[key] == 2) {
                    for (var i = 0; i < attributeArray.length - 1; i++) {
                        attributeArray[i + 1] = attributeArray[i] + attributeArray[i + 1] - (attributeArray[i] * attributeArray[i + 1]);
                        node.attributes[key] = +attributeArray[i + 1].toFixed(2);
                    }
                // Pessimistic Algebra
                } else {
                    node.attributes[key] = +Math.min(attributeArray.reduce((a, b) => a + b, 0), 1).toFixed(2);
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
}

// This function allows both sides to be calculated without repeated code
function conflictCalculate(node1, node2) {
    var a = node1.attributes;
    var b = node2.attributes;
    if (isNaN(b.reliWeak)) {
        var reliability = b.reliability;
    } else {
        var reliability = b.reliWeak;
    }
    if (isNaN(b.accuWeak)) {
        var accuracy = b.accuracy;
    } else {
        var accuracy = b.accuWeak;
    }
    if (isNaN(b.releWeak)) {
        var relevancy = b.relevancy;
    } else {
        var relevancy = b.releWeak;
    }
    if (isNaN(b.uniqWeak)) {
        var uniqueness = b.uniqueness;
    } else {
        var uniqueness = b.uniqWeak;
    }
    if (isNaN(b.compWeak)) {
        var completeness = b.completeness;
    } else {
        var completeness = b.compWeak;
    }

    if (globalVars.conflict.reliability == 2) {
        a.reliWeak = conflictOptimistic(a.reliability, reliability);
    } else {
        a.reliWeak = conflictPessimistic(a.reliability, reliability);
    }

    if (globalVars.conflict.accuracy == 2) {
        a.accuWeak = conflictOptimistic(a.accuracy, accuracy);
    } else {
        a.accuWeak = conflictPessimistic(a.accuracy, accuracy);
    }

    if (globalVars.conflict.relevancy == 2) {
        a.releWeak = conflictOptimistic(a.relevancy, relevancy);
    } else {
        a.releWeak = conflictPessimistic(a.relevancy, relevancy);
    }

    if (globalVars.conflict.uniqueness == 2) {
        a.uniqWeak = conflictOptimistic(a.uniqueness, uniqueness);
    } else {
        a.uniqWeak = conflictPessimistic(a.uniqueness, uniqueness);
    }

    if (globalVars.conflict.completeness == 2) {
        a.compWeak = conflictOptimistic(a.completeness, completeness);
    } else {
        a.compWeak = conflictPessimistic(a.completeness, completeness);
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
