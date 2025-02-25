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
    generateTimeSeriesGraph(csv: CSVDataObject): TimeSeriesGraphClass{
        //Empty new graph
        const result:TimeSeriesGraphClass = new TimeSeriesGraphClass(csv);
        //result.setRange();

        for(const graph of this.getModel().getData()){
            if(graph.getName() == csv.getName()){
                graph.setRange()
                return graph;
            }
        }
        mainController.updateMainScene();
        return result;
    }
}
