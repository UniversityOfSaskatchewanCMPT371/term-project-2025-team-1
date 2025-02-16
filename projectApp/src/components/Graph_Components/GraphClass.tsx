import { GraphInterface } from "../../types/GraphInterface";

// GraphClass is a class that represents a point in a graph
// It temporarily implements the PointRef interface
export class GraphClass implements GraphInterface{
    // position of the graph (maybe updated in the future)
    position: [number,number,number];
    // Indicates the status of the graph (selected or not)
    selected: boolean;
    // xData is the x-axis data of the graph(maybe updated in the future)
    xData: string;
    // yData is the y-axis data of the graph(maybe updated in the future)
    yData: number;

    // Constructor initializes the GraphClass with the basic properties
    constructor(position: [number, number, number], selected: boolean, xData: string, yData: number) {
        this.position = position;
        this.selected = selected;
        this.xData = xData;
        this.yData = yData;
        console.log("GraphClass initialized:", this);
    }

    // Temporary test method to check if the GraphClass is working
    testMethod() {
        console.log("GraphClass test method called!");
    }
}

// const graphInstance = new GraphClass([0, 0, 0], false, "TestXData", 100);
// graphInstance.testMethod();

