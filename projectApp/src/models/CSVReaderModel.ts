import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import mainController from "../controller/MainController";
import { sendError, sendLog } from "../logger-frontend";
import { addTestSceneInfo } from "../pages/Scene/TestScene";
import { CSVModelInterface } from "../types/CSVInterfaces";

/**
 * The CSVReaderModel class is responsible for managing a CSV data object.
 *
 * @invariant
 * - If 'data' property is defined, the CSVDataObject object in 'data' must be a valid CSV file that was successfully loaded.
 *
 * @history
 * - The 'data' property is uninitialized, and must be set by `readLocalFile()` or `readURLFile()`.
 */
export class CSVReaderModel implements CSVModelInterface {
  data?: CSVDataObject;

  /**
   * Returns a CSVData object
   * @preconditions The 'data' property contains a valid CSVDataObject instance
   *
   * @postconditions
   * - If the 'data' CSVDataObject is valid, it is returned.
   * - Otherwise, an informational log is recorded and null is returned.
   */
  getCSVFile(): CSVDataObject {
    const data = this.data;
    // assert that data is defined
    if (data === undefined) {
      const error = new Error("Error getting csvfile");
      sendError(error, "Unable to getCSVFile");
      throw error;
    }
    return data;
  }

  /**
   * Reads a local CSV file and sets it to 'data'.
   *
   * @preconditions The `file` parameter is a valid File object representing a CSV file.
   *
   * @postconditions
   * - If the file is successfully read, a new CSVDataObject is created and set in 'data' property.
   * - Otherwise, an error is logged.
   *
   * @param {File} file - The File object representing the local CSV file.
   */
  async readLocalFile(file: File): Promise<void> {
    const data: CSVDataObject = new CSVDataObject();
    try {
      await data.loadCSVData(file, false);
      sendLog(
        "debug",
        `readLocalFile read a file\n${JSON.stringify(data.getData())}`,
      );
    } catch (error: unknown) {
      // if loadCSVData errors out, log the error
      sendError(error, "readLocalFile error");
      throw error;
    }
    this.data = data;
    mainController.getGraphController().setRecommendedPointSize(this.data);
    addTestSceneInfo(
      "CSVReaderModel now contains a CSVDataObject for the local file just read in",
    );
  }

  /**
   * Reads a CSV file from a URL and sets it to 'data'.
   *
   * @preconditions The 'file' parameter is a valid URL string representing a CSV file.
   *
   * @postconditions
   * - If the file is successfully read, a new CSVDataObject is created and set in 'data' property.
   * - Otherwise, an error is logged.
   *
   * @param {string} file - The URL string of the CSV file.
   */
  async readURLFile(file: string): Promise<void> {
    const data: CSVDataObject = new CSVDataObject();
    try {
      await data.loadCSVData(file, true);
      sendLog(
        "debug",
        `readURLFile read a file\n${JSON.stringify(data.getData())}`,
      );
    } catch (error: unknown) {
      // if loadCSVData errors out, log the error
      sendError(error, "readURLFile error");
      throw error;
    }
    this.data = data;
    mainController.getGraphController().setRecommendedPointSize(this.data);
    addTestSceneInfo(
      "CSVReaderModel now contains a CSVDataObject for the url file just read in",
    );
  }

  /**
   * Returns the current array of CSVDataObject instances.
   * @precondition none
   * @postcondition The internal data array of CSVDataObject instances is returned.
   * @returns The internal data array of CSVDataObject instances.
   */
  getData(): CSVDataObject | undefined {
    return this.data;
  }
}
