import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { GraphModel } from "../models/GraphModel";
import { ControllerInterface } from "../types/BaseInterfaces";
import mainController from "./MainController";

/**
 *
 * The GraphController is responsible for managing the creation and storage of time series graphs
 *
 * @invariants
 *   - The 'model' property is always a valid instance of GraphModel.
 *   - The GraphModel contains only valid TimeSeriesGraphObject instances.
 *
 * @history
 *   - Graph objects are stored in the model's data array. Once a graph is added, it persists until it is removed.
 *  
 */
// TODO - modify or add methods for embedded graph support
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

    // TODO - generateEmbeddedGraph method

    /**
     * Pushes a TimeSeriesGraphObject into the model's data collection.
     *
     * @precondition The provided 'graph' is a valid TimeSeriesGraphObject.
     *
     * @postcondition The 'graph' is added to the model's data collection.
     *
     * @param graph The TimeSeriesGraphObject to add to the model.
     */
    // TODO - change to take in borth time series and embedded; use setters to put into model
    pushDataToModel(graph: TimeSeriesGraphObject): void{
        this.getModel().getData().push(graph);
    }

    /**
     * Retrieves the GraphModel instance.
     *
     * @precondition none
     *
     * @postcondition a valid GraphModel instance is returned.
     *
     * @returns The GraphModel instance.
     */
    getModel(): GraphModel{
        return this.model;
    }

    /**
     * Retrieves the array of TimeSeriesGraphObject instances stored in the model.
     *
     * @precondition none
     *
     * @postcondition The array of TimeSeriesGraphObject instances is returned.
     *
     * @returns The array of TimeSeriesGraphObject instances.
     */
    getModelData(): TimeSeriesGraphObject[]{
        return this.model.getData();
    };

    /**
     * Returns the number of TimeSeriesGraphObject instances stored in the model.
     *
     * @precondition none
     *
     * @postcondition The number of TimeSeriesGraphObject instances is returned.
     *
     * @returns The number of TimeSeriesGraphObject instances in the model
     */
    getDataLength(): number{
        return this.getModel().getData().length;
    }
    
}
