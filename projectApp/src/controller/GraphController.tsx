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
        let result:GraphClass2 = new GraphClass2(csv);
        for(let graph of this.getModel().getData()){
            if(graph.getName() == csv.getName()){
                return graph;
            }
        }
        return result;
    }
}