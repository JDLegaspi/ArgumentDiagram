countNodes(chart_config.nodeStructure);

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