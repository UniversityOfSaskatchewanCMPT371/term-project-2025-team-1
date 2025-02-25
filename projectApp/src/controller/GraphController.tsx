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

    /**
    * Generates a time series graph for the given CSV data object.
    * 
    * @param csv The CSV data object for which to generate or retrieve the graph.
    * @returns {TimeSeriesGraphClass} The generated or retrieved time series graph.
    * 
    * Pre-Conditions:
    *    The `csv` parameter must be a valid `CSVDataObject`.
    *    The `model` property must be initialized and contain valid graph data.
    *    The `mainController` must be initialized and valid.
    * 
    * Post-Conditions:
    *    If a graph with the same name as `csv` exists, its range is updated, a new graph is created and returned otherwise
    *    The mainController's main scene is updated.
    */
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
