import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { EmbeddedGraphObject } from "../components/Graph_Components/EmbeddedGraphObject";
import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { sendError, sendLog } from "../logger-frontend";
import { CSVReaderModel } from "../models/CSVReaderModel";
import { ControllerInterface } from "../types/BaseInterfaces";
import mainController from "./MainController";

/**
 * Controller class that manages CSV-related operations and interactions.
 * Implements the ControllerInterface for standardized controller behavior.
 *
 * @implements {ControllerInterface}
 *
 * @invariants
 * - The 'model' property is initialized on construction and is never set again
 */
export class CSVController implements ControllerInterface {
  model: CSVReaderModel;

  /**
   * Initializes a new CSVController with a fresh CSVReaderModel
   *
   * @postconditions A new CSVReaderModel is created and assigned to this.model
   */
  constructor() {
    this.model = new CSVReaderModel();
  }

  /**
   * Generates time series graphs for CSV data marked for VR display
   * @param tau value of tau used in generation
   * @preconditions this.model must be initialized with CSV data
   * @postconditions For each CSV:
   *   - VR selection is enabled
   *   - A new TimeSeriesGraph is created and initialized
   *   - The graph is added to the main controller's graph collection
   */
  generate(tau: number): void {
    const emData = this.getModelData();
    // assert that model.data is defined
    if (emData === undefined) {
      const error = new SyntaxError("Error getting CSVDataObject");
      sendError(error, "Unable to get csv data object (CSVController.ts)");
      throw error;
    }

    emData.setVRSelected(true);
    emData.populatePoints();

    const TSGraph = new TimeSeriesGraphObject(emData);
    TSGraph.setName(emData.getName());
    TSGraph.addPoints();

    const emGraph = new EmbeddedGraphObject(emData);
    emGraph.setName(emData.getName());
    emGraph.setTau(tau);
    emGraph.addPoints();

    mainController.getGraphController().pushDataToModel(TSGraph, emGraph);
    sendLog("info", "generate has pushed a new graph");
  }

  /**
   * Get the csv file by opening a local file, and then loads it into the program
   * @param file local file that contains csv data
   * @preconditions `file` must be a valid csv file
   * @postconditions On success, the csv file to be loaded to the program
   */
  async loadLocalFile(file: File): Promise<void> {
    try {
      await this.getModel().readLocalFile(file);
    } catch (error: unknown) {
      // if readLocalFile errors out, log the error
      sendError(error, "loadLocalFile Error");
      throw error;
    }
  }

  /**
   * Get the csv file using a url link, and then loads it into the program
   * @param csv url path to a csv file
   * @preconditions `csv` must be a valid csv file
   * @postconditions On success, the csv file to be loaded to the program
   */
  async loadURLFile(csv: string): Promise<void> {
    try {
      await this.getModel().readURLFile(csv);
    } catch (error: unknown) {
      // if readURLFile errors out, log the error
      sendError(error, "loadURLFile Error");
      throw error;
    }
  }

  /**
   * Get the loaded csv browser of this controller's model
   * @preconditions model must have a loadedCsvBrowser list
   * @postconditions returns tuple set of csv file names and selection status boolean
   */
  browserCSVFiles(): [string, boolean][] {
    return this.getModel().loadedCsvBrowser();
  }

  /**
   * Retrieves the controller's associated model
   * @preconditions none
   * @postconditions returns {CSVReaderModel} The CSV reader model instance
   */
  getModel(): CSVReaderModel {
    return this.model;
  }

  /**
   * Gets the csv data linked to the model
   * @preconditions none
   * @postconditions returns this model's csv data
   */
  getModelData(): CSVDataObject | undefined {
    return this.model.getData();
  }
}
