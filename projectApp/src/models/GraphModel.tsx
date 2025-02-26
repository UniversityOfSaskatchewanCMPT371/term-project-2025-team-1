import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { ModelInterface } from "../types/BaseInterfaces";
import { CSVDataInterface } from "../types/CSVInterfaces";

/**
 * The GraphModel class is responsible for managing a collection of TimeSeriesGraphObject instances..
 *  
 * @invariants 
 * - The 'data' property is always an array of TimeSeriesGraphObject objects.
 * - The 'data' is initialized as an empty array when a new instance of GraphModel is created.
 * - Each TimeSeriesGraphObject object in the 'data' array represents a valid TimeSeriesGraph.
 *
 * @history The number of TimeSeriesGraphObject instances in 'data' is non-decreasing unless explicitly modified.
 *   
 */
export class GraphModel implements ModelInterface{
    data: TimeSeriesGraphObject[];
    constructor(){
        this.data = [];
    }

    /**
     * Sets the VRSelected flag of the given CSV data object to true.
     *
     * @preconditions The CSVDataInterface instance is a valid instance of CSVDataObject.
     * 
     * @postconditions The CSVDataInterface instance's VRSelected flag is updated to true if it is a valid instance of CSVDataObject.
     *
     * @param {CSVDataInterface} csv - The CSVDataInterface instance whose VRSelected property will be set.
     */
    selectData(csv: CSVDataInterface): void{
        csv.setVRSelected(true);
    }

    /**
     * Adds a TimeSeriesGraphObject to the model.
     *
     * @preconditions The 'graph' parameter must be a valid TimeSeriesGraphObject instance.
     *
     * @postconditions The provided 'graph' is appended to the internal 'data' array.
     *
     * @param {TimeSeriesGraphObject} graph - The TimeSeriesGraphObject to add to the model.
     */
    addTimeSeriesGraph(graph: TimeSeriesGraphObject): void{
        this.data.push(graph);
    }

    /**
     * Returns the TimeSeriesGraphObject instances in the model.
     *
     * @preconditions none.
     * 
     * @postconditions Returns the current state of the 'data' array, which includes all added TimeSeriesGraphObject instances.
     * 
     * @returns {TimeSeriesGraphObject[]} An array of TimeSeriesGraphObject instances.
     */
    getData(): TimeSeriesGraphObject[]{
        return this.data;
    }
}