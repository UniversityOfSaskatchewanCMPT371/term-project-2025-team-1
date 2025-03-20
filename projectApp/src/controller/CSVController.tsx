import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { EmbeddedGraphObject } from "../components/Graph_Components/EmbeddedGraphObject";
import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { sendError, sendLog } from "../logger-frontend";
import { CSVReaderModel } from "../models/CSVReaderModel";
import { ControllerInterface } from "../types/BaseInterfaces";
// import { CSVDataInterface } from "../types/CSVInterfaces";
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
   * @postcondition For each CSV with displayBoard=1:
   *   - VR selection is enabled
   *   - A new TimeSeriesGraph is created and initialized
   *   - The graph is added to the main controller's graph collection
   */
  generate(): void {
    const csv = this.getModelData();
    // assert(csv, "CSV data is undefined");
    if (!csv) {
      throw new Error("CSV data is undefined"); // Ensure csv is always valid
    }

    // for (const csv of this.model.getData()) {
    //   if (csv.getDisplayBoard() == 1) {
    csv.setVRSelected(true);
    const TSGraph = new TimeSeriesGraphObject(csv);
    TSGraph.setName(csv.getName());
    TSGraph.addPoints();

    const emGraph = new EmbeddedGraphObject(csv);
    emGraph.setName(csv.getName());
    emGraph.addPoints();

    mainController.getGraphController().pushDataToModel(TSGraph, emGraph);
    console.log("Success on generate?");
    sendLog("info", "generate has pushed a new graph");
    // }
    // }
  }

  async loadLocalFile(file: File): Promise<void> {
    try {
      await this.getModel().readLocalFile(file);
    } catch (error: unknown) {
      //Log the error
      sendError(error, "loadLocalFile Error");
      throw error;
    }
  }

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

  getModelData(): CSVDataObject | undefined {
    return this.model.getData();
  }

  /**
   * Retrieves the first CSV data object that is selected for VR visualization
   *
   * @precondition this.model must be initialized
   * @postcondition Returns either an existing CSV object or a new empty one (if none found)
   *  without modifying data
   */
  getVRSelected(): CSVDataObject | undefined {
    let file: CSVDataObject = new CSVDataObject();
    const csv = this.getModelData();
    // for (const csv of this.model.getData()) {
    // assert(csv, "CSV data is undefined");
    if (csv?.getVRSelected()) {
      file = csv;
      sendLog("info", `getVRSelected has returned ${csv.name}`);
      return csv;
    }
    // }
    sendLog("info", "getVRSelected has returned an empty CSVDataObject");
    return file;
  }

  getDataByName(name: string): CSVDataObject | undefined {
    return this.model.getCSVFileByName(name);
  }
}
