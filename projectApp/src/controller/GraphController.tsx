import { GraphClass2 } from "../components/Graph_Components/GraphClass2";
import { GraphModel } from "../models/GraphModel";
import { ControllerInterface } from "../types/BaseInterfaces";
import { CSVData } from "../types/CSVInterfaces";

export class GraphController implements ControllerInterface{
    model: GraphModel;
    constructor(){
        this.model = new GraphModel()
    }

    getModel(){
        return this.model;
    }

    generateTimeSeriesGraph(csv: CSVData): GraphClass2{
        const graph = new GraphClass2(csv);
        graph.setPoints();
        this.getModel().getData().push(graph)

        return graph;
    }
}