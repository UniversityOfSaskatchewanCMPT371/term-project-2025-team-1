import { TimeSeriesGraphClass } from "../components/Graph_Components/TimeSeriesGraphClass";
import { CSVDataObject } from "../models/CSVDataObject";
import { GraphModel } from "../models/GraphModel";
import { ControllerInterface } from "../types/BaseInterfaces";

export class GraphController implements ControllerInterface{
    model: GraphModel;
    constructor(){
        this.model = new GraphModel()
    }

    getModel(){
        return this.model;
    }

    generateTimeSeriesGraph(csv: CSVDataObject): TimeSeriesGraphClass{
        //Empy new graph
        let result:TimeSeriesGraphClass = new TimeSeriesGraphClass(csv);
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