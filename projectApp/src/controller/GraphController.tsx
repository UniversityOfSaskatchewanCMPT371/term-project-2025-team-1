import { GraphClass2 } from "../components/Graph_Components/GraphClass2";
import { CSVDataObject } from "../models/CSVDataObject";
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

    generateTimeSeriesGraph(csv: CSVDataObject): GraphClass2{
        //Empy new graph
        let result:GraphClass2 = new GraphClass2(csv);
        //result.setRange();

        for(let graph of this.getModel().getData()){
            if(graph.getName() == csv.getName()){
                graph.setRange()
                return graph;
            }
        }
        return result;
    }
}