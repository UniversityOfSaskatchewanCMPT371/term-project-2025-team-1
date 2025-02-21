import { TimeSeriesGraphClass } from "../components/Graph_Components/TimeSeriesGraphClass";
import { CSVDataObject } from "../models/CSVDataObject";
import { GraphModel } from "../models/GraphModel";
import { ControllerInterface } from "../types/BaseInterfaces";
import mainController from "./MainController";

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
        const result:TimeSeriesGraphClass = new TimeSeriesGraphClass(csv);
        //result.setRange();

        for(const graph of this.getModel().getData()){
            console.log(graph);
            if(graph.getName() == csv.getName()){
                graph.setRange()
                return graph;
            }
        }
        mainController.updateMainScene();
        return result;
    }

    
}