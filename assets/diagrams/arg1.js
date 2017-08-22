var chart_config = {
    chart: {
        doc: {
            title: 'Test',
            text: 'This is the test document'
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
        children: [
            {
                id: 2,
                HTMLid: "2",
                type: "dc",
                name: "Node 1",
                attributes: {
                  reliability: 0,
                  accuracy: 0,
                  relevancy: 0,
                  uniqueness: 0
                },
                linktext: {
                  start: 0,
                  end: 6
                },
                collapsable: true,
                children: []
            },
            {
                id: 3,
                HTMLid: "3",
                type: "dc",
                name: "Node 2",
                attributes: {
                  reliability: 1,
                  accuracy: 1,
                  relevancy: 1,
                  uniqueness: 1
                },
                linktext: {
                  start: 7,
                  end: 13
                },
                collapsable: true,
                children: []
            }
        ]
    }
};
