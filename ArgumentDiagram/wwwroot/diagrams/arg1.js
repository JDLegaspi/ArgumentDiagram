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
        stackChildren: true,
        children: [
            {
                text: {
                    name: "We can help to stop the seal hunt by boycotting Canadian Seafood"
                },
                stackChildren: true,
                children: []
            },
            {
                text: {
                    name: "Therefore, the seal hunt should be stopped"
                },
                stackChildren: true,
                children: [
                    {
                        text: {
                            name: "The seal hunt is inhumane"
                        },
                        stackChildren: true,
                        children: []
                    },
                    {
                        text: {
                            name: "Generally, inhumane treatment of animals should be stopped"
                        },
                        stackChildren: true,
                        children: []
                    }
                ]
            }
        ]
    }
};