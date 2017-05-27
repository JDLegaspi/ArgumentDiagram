var chart_config = {
    chart: {
        container: "#basic-example",

        connectors: {
            type: 'step'
        },
        node: {
            HTMLclass: 'nodeExample1'
        }
    },
    nodeStructure: {
        text: {
            name: "Therefore, we should boycott Canadian seafood"
        },
        id: 1,
        HTMLid: "1",
        children: [
            {
                id: 2,
                text: {
                    name: "We can help to stop the seal hunt by boycotting Canadian Seafood"
                },
                children: []
            },
            {
                id: 3,
                text: {
                    name: "Therefore, the seal hunt should be stopped"
                },
                children: [
                    {
                        id: 4,
                        text: {
                            name: "The seal hunt is inhumane"
                        },
                        children: []
                    },
                    {
                        id: 5,
                        text: {
                            name: "Generally, inhumane treatment of animals should be stopped"
                        },
                        children: []
                    }
                ]
            }
        ]
    }
};