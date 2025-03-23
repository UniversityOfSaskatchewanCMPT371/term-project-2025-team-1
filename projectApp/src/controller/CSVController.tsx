import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { EmbeddedGraphObject } from "../components/Graph_Components/EmbeddedGraphObject";
import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { sendError, sendLog } from "../logger-frontend";
import { CSVReaderModel } from "../models/CSVReaderModel";
import { ControllerInterface } from "../types/BaseInterfaces";
import { CSVDataInterface } from "../types/CSVInterfaces";
import mainController from "./MainController";

/**
 * Controller class that manages CSV-related operations and interactions.
 * Implements the ControllerInterface for standardized controller behavior.
 *
 * @implements {ControllerInterface}
 */
export class CSVController implements ControllerInterface {
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
   * Generates time series graphs for CSV data marked for VR display
   *
   * @precondition this.model must be initialized with CSV data
   * @postcondition For each CSV:
   *   - VR selection is enabled
   *   - A new TimeSeriesGraph is created and initialized
   *   - The graph is added to the main controller's graph collection
   */
  generate(tau: number): void {
    mainController.getGraphController().getModelData().pop();
    mainController.getGraphController().getModelEmData().pop();

    for (const csv of this.model.getData()) {
      csv.setVRSelected(true);
      csv.populatePoints();

      const TSGraph = new TimeSeriesGraphObject(csv);
      TSGraph.setName(csv.getName());
      TSGraph.addPoints();

      const emGraph = new EmbeddedGraphObject(csv);
      emGraph.setName(csv.getName());
      emGraph.setTau(tau);
      emGraph.addPoints();

      mainController.getGraphController().pushDataToModel(TSGraph, emGraph);
      sendLog("info", "generate has pushed a new graph");
    }
  }

  /**
   * This method gets the csv file by opening a local file, and then loads it into the program
   * @precondition a file that represents the csv file, needs to be a valid csv file
   * @postcondition On success, the csv file to be loaded to the program
   */
  async loadLocalFile(file: File): Promise<void> {
    try {
      await this.getModel().readLocalFile(file);
    } catch (error: unknown) {
      //Log the error
      sendError(error, "loadLocalFile Error");
      throw error;
    }
  }

  /**
   * This method gets the csv file using a url link, and then loads it into the program
   * @precondition a string parameter representing the url link, needs to be a valid csv file
   * @postcondition On success, the csv file to be loaded to the program
   */
  async loadURLFile(csv: string): Promise<void> {
    try {
      await this.getModel().readURLFile(csv);
    } catch (error: unknown) {
      //Log the error
      sendError(error, "loadURLFile Error");
      throw error;
    }
  }

  browserCSVFiles(): [string, boolean][] {
    return this.getModel().loadedCsvBrowser();
  }

  /**
   * Retrieves the controller's associated model
   *
   * @returns {CSVReaderModel} The CSV reader model instance
   * @postcondition Returns the existing model without modification
   */
  getModel(): CSVReaderModel {
    return this.model;
  }

  getModelData(): CSVDataObject[] {
    return this.model.getData();
  }

  /**
   * Retrieves the first CSV data object that is selected for VR visualization
   *
   * @precondition this.model must be initialized
   * @postcondition Returns either an existing CSV object or a new empty one (if none found)
   *  without modifying data
   */
  getVRSelected(): CSVDataObject {
    let file: CSVDataObject = new CSVDataObject();
    for (const csv of this.model.getData()) {
      if (csv.getVRSelected()) {
        file = csv;
        sendLog("info", `getVRSelected has returned ${csv.name}`);
        return csv;
      }
    }
    sendLog("info", "getVRSelected has returned an empty CSVDataObject");
    return file;
  }

  /**
   * This method gets the CSV Data by Name
   * @precondition name, a string that is the name assigned to the CSV Data Object
   * @postcondition returns the CSV Data Object with the specified name
   */
  getDataByName(name: string): CSVDataInterface | null {
    return this.model.getCSVFileByName(name);
  }
}
