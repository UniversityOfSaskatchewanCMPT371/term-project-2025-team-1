import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { sendError, sendLog } from "../logger-frontend";
import { CSVModelInterface } from "../types/CSVInterfaces";

/**
 * The CSVReaderModel class is responsible for managing the CSV data objects.
 *
 * @invariant
 * - The 'data' property is always an array of CSVDataObject objects.
 * - Each CSVDataObject object in the 'data' array represents a valid CSV file that was successfully loaded.
 *
 * @history
 * - The 'data' array is initialized as an empty array.
 *
 * Note on the Index Parameter:
 * - The current implementation uses this.data.length as the unique index when loading files.
 *   This assumes that the index uniquely identifies a file at load time.
 *
 */
export class CSVReaderModel implements CSVModelInterface {
  data?: CSVDataObject;

  constructor() {}

  /**
   * Returns a CSVData object
   * @param {string} name - The name of the CSV file.
   *
   * @precondition The 'data' array contains CSVDataObject instances with a valid 'name' property
   *
   * @postcondition If a CSVDataObject with the specified name is found, it is returned. Otherwise, an informational log is recorded and null is returned.
   *
   * @returns The CSVData object if found, otherwise null.
   */
  getCSVFile(): CSVDataObject | undefined {
    return this.data;
  }

  /**
   * Reads a local CSV file and sets it as the data array.
   *
   * @precondition The 'file' parameter is a valid File object representing a CSV file. The CSV file is successfully read.
   *
   * @postcondition If the file is successfully read, a new CSVDataObject is created and added to the 'data' array. Otherwise, an error is logged.
   *
   * @param {File} file - The File object representing the local CSV file.
   */
  async readLocalFile(file: File): Promise<void> {
    const data: CSVDataObject = new CSVDataObject();
    try {
      await data.loadCSVData(0, file, false);
      sendLog(
        "info",
        `readLocalFile read a file\n${JSON.stringify(data.getData())}`,
      );
    } catch (error: unknown) {
      // Log the Error
      sendError(error, "readLocalFile error");
      throw error;
    }
    this.data = data;
  }

  /**
   * Reads a CSV file from a URL and adds it to the data array.
   *
   * @precondition The 'file' parameter is a valid URL string representing a CSV file. The CSV file is successfully read.
   *
   * @postcondition If the file is successfully read, a new CSVDataObject is created and added to the 'data' array. Otherwise, an error is logged.
   *
   * @param {string} file - The URL string of the CSV file.
   */
  async readURLFile(file: string): Promise<void> {
    const data: CSVDataObject = new CSVDataObject();
    try {
      await data.loadCSVData(0, file, true);
      sendLog(
        "info",
        `readURLFile read a file\n${JSON.stringify(data.getData())}`,
      );
    } catch (error: unknown) {
      // Log the error
      sendError(error, "readURLFile error");
      throw error;
    }
    this.data = data;
  }

  /**
   * Reads a CSV file from a URL and adds it to the data array.
   *
   * @precondition The 'file' parameter is a valid URL string representing a CSV file. The CSV file is successfully read.
   *
   * @postcondition If the file is successfully read, a new CSVDataObject is created and added to the 'data' array. Otherwise, an error is logged.
   *
   * @param {string} file - The URL string of the CSV file.
   */

  async readLocalByPath(file: string): Promise<void> {
    const data: CSVDataObject = new CSVDataObject();
    try {
      await data.loadLocalByPath(0, file);
      sendLog(
        "info",
        `readLocalByPath read a file\n${JSON.stringify(data.getData())}`,
      );
    } catch (error: unknown) {
      // Log the error
      sendError(error, "readLocalByPath error");
      throw error;
    }

    this.data = data;
  }

  /**
   * Provides an array of tuples for the browser UI, where each tuple contains the CSV file's name
   * and its browser selection status.
   *
   * @precondition The 'data' array contains CSVDataObject instances with a valid 'name' property
   *
   * @postcondition An array of tuples is returned where each tuple contains the CSV file name and its browser selection status.
   *
   * @returns An array of tuples where each tuple contains the CSV file name and its browser selection status.
   */
  loadedCsvBrowser(): [string, boolean][] {
    const csvBrowser: [string, boolean][] = [];
    const file = this.getData();

    if (file) {
      csvBrowser.push([file.getName(), file.getBrowserSelected()]);
      sendLog(
        "info",
        `loadedCsvBrowser() returns list\n${JSON.stringify(csvBrowser)}`,
      );
    }
    return csvBrowser;
  }

  /**
   * Returns the current array of CSVDataObject instances.
   *
   * @precondition none
   *
   * @postcondition The internal data array of CSVDataObject instances is returned.
   *
   * @returns The internal data array of CSVDataObject instances.
   */
  getData(): CSVDataObject | undefined {
    return this.data;
  }
}
