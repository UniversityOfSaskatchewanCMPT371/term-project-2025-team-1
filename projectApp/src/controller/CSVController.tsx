import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { sendLog } from "../logger-frontend";
import { CSVReaderModel } from "../models/CSVReaderModel";
import { ControllerInterface } from "../types/BaseInterfaces";
import { CSVDataInterface } from "../types/CSVInterfaces";
import mainController from "./MainController";

/**
 * Controller class that manages CSV-related operations and interactions.
 * Handles loading, processing, and managing CSV data files for visualization.
 * 
 * @implements {ControllerInterface}
 */
export class CSVController implements ControllerInterface {
    /** Model instance that handles CSV data storage and processing */
    model: CSVReaderModel;

    /**
     * Initializes a new CSVController with a fresh CSVReaderModel
     * 
     * @postcondition A new CSVReaderModel is created and assigned to this.model
     */
    constructor() {
        this.model = new CSVReaderModel();
    }
    
    /**
     * Generates time series graphs from CSV data and adds them to the graph controller
     * 
     * @precondition The model, mainController, and graphController must be initialized
     * @postcondition 
     *   - Creates graphs for CSV data with displayBoard=1
     *   - Sets VRSelected=true for processed CSV data
     *   - Adds generated graphs to graph controller
     */
    generate(): void{
        for(const csv of this.model.getData()){
            if(csv.getDisplayBoard() == 1){
                csv.setVRSelected(true);
                const graph = new TimeSeriesGraphObject(csv);
                graph.setName(csv.getName());
                graph.addPoint();
                mainController.getGraphController().pushDataToModel(graph)
                console.log("Success on generate?")
                sendLog("info","generate has pushed a new graph");
            }
        }
    }

    /**
     * Loads a CSV file from local storage
     * 
     * @param {File} file - Local file to load
     * @precondition file must be a valid CSV File object
     * @postcondition CSV data is loaded into the model if successful, Will throw an error if file loading fails
     */
    async loadLocalFile(file: File): Promise<void>{
        try {
            await this.getModel().readLocalFile(file);
        }
        catch(error: unknown){
            throw error;
        }
    }

    /**
     * Loads a CSV file from a URL
     * 
     * @param {string} csv - URL of the CSV file
     * @precondition csv must be a valid URL string
     * @postcondition CSV data is loaded into the model if successful, Will throw an error if URL loading fails
     */
    async loadURLFile(csv: string): Promise<void>{
        try{
            await this.getModel().readURLFile(csv);
        }
        catch(error: unknown){
            //Log the error
            throw error;
        }
    }

    /**
     * Gets array of CSV file names and their browser selection status
     * 
     * @returns {[string, boolean][]} Array of tuples containing filename and selection state
     * @postcondition Returns current browser selection state without modification
     */
    browserCSVFiles():[string, boolean][]{
        return this.getModel().loadedCsvBrowser();
    }

    /**
     * Retrieves the controller's model instance
     * 
     * @postcondition Returns existing model attribute
     * @returns {CSVReaderModel} The CSV reader model
     */
    getModel(): CSVReaderModel{
        return this.model;
    }

    /**
     * Gets all CSV data objects from the model
     * 
     * @returns {CSVDataObject[]} Array of CSV data objects
     * @postcondition Returns current data array without modification
     */
    getModelData(): CSVDataObject[]{
        return this.model.getData();
    }
    
    /**
     * Retrieves the first CSV data object marked for VR visualization
     * 
     * @returns {CSVDataObject} Selected CSV data object or new empty one if none found
     * @precondition model must be initialized
     * @postcondition Returns existing or new CSV object without modifying data
     */
    getVRSelected(): CSVDataObject{
        let file:CSVDataObject = new CSVDataObject();
        for(const csv of this.model.getData()){
            if(csv.getVRSelected()){
                file = csv;
                sendLog("info",`getVRSelected has returned ${csv.name}`);
                return csv;
            }
        }
        sendLog("info","getVRSelected has returned an empty CSVDataObject");
        return file;
    }

    /**
     * Retrieves a CSV data object by its name
     * 
     * @param {string} name - Name of the CSV file to find
     * @returns {CSVDataInterface | null} Matching CSV data object or null if not found
     * @precondition name must be a non-empty string
     * @postcondition Returns matching data or null without modification
     */
    getDataByName(name:string): CSVDataInterface | null{
        return this.model.getCSVFileByName(name);
    }
    
}

