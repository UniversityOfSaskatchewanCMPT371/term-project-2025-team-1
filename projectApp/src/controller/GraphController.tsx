import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { GraphModel } from "../models/GraphModel";
import { ControllerInterface } from "../types/BaseInterfaces";
import mainController from "./MainController";

export class GraphController implements ControllerInterface{
    model: GraphModel;
    constructor(){
        this.model = new GraphModel()
    }

    generateTimeSeriesGraph(csv: CSVDataObject): TimeSeriesGraphObject{
        const result:TimeSeriesGraphObject = new TimeSeriesGraphObject(csv);

        for(const graph of this.getModel().getData()){
            if(graph.getName() == csv.getName()){
                graph.setRange()
                return graph;
            }
        }
        mainController.updateMainScene();
        return result;
    }

    pushDataToModel(graph: TimeSeriesGraphObject): void{
        this.getModel().getData().push(graph);
    }

    getModel(): GraphModel{
        return this.model;
    }
    getModelData(): TimeSeriesGraphObject[]{
        return this.model.getData();
    };

    getDataLength(): number{
        return this.getModel().getData().length;
    }
    
}