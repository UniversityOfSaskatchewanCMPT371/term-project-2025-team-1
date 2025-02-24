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

    generateTimeSeriesGraph(csv: CSVDataObject): TimeSeriesGraphClass{
        const result:TimeSeriesGraphClass = new TimeSeriesGraphClass(csv);

        for(const graph of this.getModel().getData()){
            if(graph.getName() == csv.getName()){
                graph.setRange()
                return graph;
            }
        }
        mainController.updateMainScene();
        return result;
    }

    pushDataToModel(graph: TimeSeriesGraphClass): void{
        this.getModel().getData().push(graph);
    }

    getModel(): GraphModel{
        return this.model;
    }
    getModelData(): TimeSeriesGraphClass[]{
        return this.model.getData();
    };

    getDataLength(): number{
        return this.getModel().getData().length;
    }
    
}