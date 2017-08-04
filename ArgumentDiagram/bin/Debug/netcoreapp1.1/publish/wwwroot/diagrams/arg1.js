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
            name: "Therefore, we should boycott Canadian seafood"
        },
        children: [
            {
                id: 6,
                HTMLid: "6",
                type: "reason",
                HTMLclass: "reason",
                text: {
                    name: "R"
                },
                children: [
                    {
                        id: 2,
                        HTMLid: "2",
                        type: "fact",
                        text: {
                            name: "We can help to stop the seal hunt by boycotting Canadian Seafood"
                        },
                        children: []
                    },
                    {
                        id: 3,
                        HTMLid: "3",
                        type: "fact",
                        text: {
                            name: "Therefore, the seal hunt should be stopped"
                        },
                        children: [
                            {
                                id: 7,
                                HTMLid: "7",
                                type: "reason",
                                HTMLclass: "reason",
                                text: {
                                    name: "R"
                                },
                                children: [
                                    {
                                        id: 4,
                                        HTMLid: "4",
                                        type: "fact",
                                        text: {
                                            name: "The seal hunt is inhumane"
                                        },
                                        children: []
                                    },
                                    {
                                        id: 5,
                                        HTMLid: "5",
                                        type: "fact",
                                        text: {
                                            name: "Generally, inhumane treatment of animals should be stopped"
                                        },
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};