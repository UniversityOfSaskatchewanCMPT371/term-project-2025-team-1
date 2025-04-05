import { CSVDataInterface } from "../../types/CSVInterfaces";
import { LocalCsvReader, UrlCSVReader } from "./CSVReaders";
import { sendError, sendLog } from "../../logger-frontend";
import { PointObjectInterface } from "../../types/PointInterface";
import { PointObject } from "../Graph_Components/Points/PointObject";
import { addTestSceneInfo } from "../../pages/Scene/TestScene";
import assert from "../../Assert";

/**
 * Class representing a CSV data structure that implements the CSVData interface.
 * Handles loading, storing, and managing CSV data for VR visualization.
 *
 * @history
 * - The 'name', 'yHeader', and 'timeHeader' properties are initialized as empty strings.
 * - The 'csvHeaders', 'data', and 'points' properties are initialized as empty sets.
 * - The 'browserSelected', and 'vrSelected' properties are initialized as false.
 */
export class CSVDataObject implements CSVDataInterface {
  name: string;
  csvHeaders: string[];
  data: { key: Record<string, string | number> }[];
  yHeader: string;
  timeHeader: string;
  browserSelected: boolean;
  vrSelected: boolean;
  points: PointObjectInterface[];
  isFirstDifferencing: boolean;

  /**
   * Initializes a new CSVDataObject with default values
   */
  constructor() {
    this.name = "";
    this.csvHeaders = [];
    this.data = [];
    this.yHeader = "";
    this.timeHeader = "";
    this.browserSelected = false;
    this.vrSelected = false;
    this.points = [];
    this.isFirstDifferencing = false;
  }

  /**
   * calculates the values to be used for yValues when first differencing is in effect
   * @preconditions none
   * @postconditions none
   * @returns an array of the first differenced yValues
   */
  calculateFirstDifferencingValues(): number[] {
    const differencedData: number[] = [0];
    const numPoints = this.getData().length;

    if (numPoints >= 500) {
      sendLog(
        "warn",
        "A large number of data is being used to calculate First Differencing (CSVDataObject.ts",
      );
    }
    for (let i = 1; i < numPoints; i += 1) {
      const currRow = this.data[i];
      const prevRow = this.data[i - 1];

      const currVal = currRow[
        this.getYHeader() as keyof typeof currRow
      ] as unknown as number;
      const prevVal = prevRow[
        this.getYHeader() as keyof typeof prevRow
      ] as unknown as number;

      // calculate the difference between value at yHeader in row i and row i-1
      const difference = currVal - prevVal;
      differencedData.push(difference);
    }

    sendLog(
      "debug",
      `first differencing point calculation completed, result - ${differencedData} (CSVDataObject.ts)`,
    );
    return differencedData;
  }

  /**
   * Create points from the csv file that will be referenced by the points of
   * both the 2D and 3D Graph
   * @preconditions none
   * @postconditions fills up the array of PointObjects used by the two graphs
   */
  populatePoints(): void {
    this.points = [];

    //If first differencing is enabled
    if (this.getIsFirstDifferencing()) {
      const firstDiffedData = this.calculateFirstDifferencingValues();

      firstDiffedData.forEach((data, index) => {
        const newPoint = new PointObject();
        newPoint.setTimeData(index.toString());
        newPoint.setYData(data);
        this.points.push(newPoint);
      });
    } else {
      //If first differencing is enabled
      this.getData().forEach((data) => {
        const newPoint = new PointObject();

        newPoint.setTimeData(
          (
            data[this.getTimeHeader() as keyof typeof data] as unknown as string
          ).toString(),
        );
        newPoint.setYData(
          data[this.getYHeader() as keyof typeof data] as unknown as number,
        );
        this.points.push(newPoint);
      });
    }

    sendLog(
      "trace",
      `populatePoints() was called, the program points loaded using the csv file (CSVDataObject.ts)`,
    );
  }

  /**
   * Get the array of Point Objects
   * @preconditions none
   * @postconditions returns the point objects array
   */
  getPoints(): PointObjectInterface[] {
    return this.points;
  }

  /**
   * Set a new point object and replaces the current point object
   * @param points An array of point objects
   * @preconditions `points` is a valid array of PointObjects
   * @postconditions sets the new array of point objects
   */
  setPoints(points: PointObjectInterface[]): void {
    // assert points is an array of PointObjects
    assert(Array.isArray(points), "must be an array of PointObject instances");
    assert(
      points.every((point) => point instanceof PointObject),
      "each element must be a PointObject instances",
    );

    this.points = points;

    sendLog(
      "trace",
      `setPoints() was called, the points has been succesfully set (CSVDataObject.ts)`,
    );
  }

  /**
   * Loads CSV data from either a file or URL
   * @param index Index number used to generate the graph name
   * @param file File object or URL string containing CSV data
   * @param isUrl Boolean indicating if the source is a URL
   * @preconditions
   * - if `isUrl` is true, `file` must be a string URL, else `file` must be a File object
   * - index must be a non-negative number
   * @postconditions
   * - On success: data, csvHeaders, and name will be populated
   * - On failure: error will be logged and method returns
   * - May throw errors during file reading or parsing
   */
  async loadCSVData(file: File | string, isUrl: boolean): Promise<void> {
    try {
      const data = isUrl
        ? await UrlCSVReader(file as string)
        : await LocalCsvReader(file as File);

      if (data.length === 0) {
        throw new Error("Loaded in an empty csv file CSVDataObject.ts");
      }
      const headers = Object.keys(data[0]);

      //Checking if an extra unexpected header gets parsed
      if (headers.includes("__parsed_extra")) {
        throw new Error(
          "Parsed an extra column without a proper header CSVDataObject.ts",
        );
      }

      //Checking it the length of each row matches the length of the header
      for (const row of data) {
        if (Object.values(row).length !== headers.length) {
          throw new Error(
            `Row: ${Object.values(row)} doesn't match header length of ${headers.length} CSVDataObject.ts`,
          );
        }

        //Checking if the proper value types are found on each column
        //Non-Time header values should contain numbers
        for (const key of headers) {
          const value = row[key as keyof typeof row];
          if (key !== "Time") {
            if (typeof value !== "number") {
              throw new Error(
                "String value found on non Time column CSVDataObject.ts",
              );
            }
          }
        }
      }
      this.setData(data);
      this.csvHeaders = headers;
      this.setTimeHeader();
      this.setYHeader(this.findFirstHeader());
      addTestSceneInfo("setting headers in loadCSVData()");

      sendLog(
        "debug",
        `loadCSVData has loaded csv data\n${JSON.stringify(this.data)}`,
      );
    } catch (error: unknown) {
      // if any portion errors out, log the error
      sendError(error, "loadCSVData error");
      throw error;
    }
  }

  /**
   * Find the first non "Time" header in the csv data file and returns it
   * @preconditions The list of headers must be greater than 1
   * - if theres only 1, then that means that there is only a "Time" header,
   *   or that the csv file loaded doesn't have a "Time" header,
   *   with both cases being invalid
   * @postconditions returns the first non "Time" header in the data set
   */
  findFirstHeader(): string {
    // assert that csvHeader.Length is greater than 1
    assert(
      this.csvHeaders.length > 1,
      "uninitialized csv file headers (CSVDataObject.ts)",
    );

    for (const head of this.csvHeaders) {
      if (head != "Time") {
        sendLog(
          "debug",
          `findFirstHeader() was called, the first header was found ${head} (CSVDataObject.ts)`,
        );
        return head;
      }
    }

    // if no first header is found, log the error
    const error = new SyntaxError("Invalid csv file");
    sendError(error, "Unable to find valid header (CSVDataObject.ts)");
    throw error;
  }

  /**
   * Resets the array of point objects
   * @preconditions none
   * @postconditions points array is cleared
   */
  clearPoints() {
    this.points = [];

    sendLog(
      "trace",
      `clearPoints() was called, array of points reset (CSVDataObject.ts)`,
    );
  }

  /**
   * Retrieves data for a specific time value
   * @param time Time value to search for
   * @preconditions
   * - `time` must be a valid time string format
   * - this.data must be initialized
   * - this.yHeader must be set
   * @postconditions
   * - returns Record object if found, null otherwise
   * - does not modify data when searching
   *
   */
  getDataByTime(time: string): Record<string, string | number> | null {
    let result: Record<string, string | number> | null = null;
    for (const value of this.data) {
      const val = value;
      for (const header of Object.keys(val)) {
        if ((val[header as keyof typeof val] as unknown as string) == time) {
          result = val[this.yHeader as keyof typeof val];
          sendLog("info", "getDataByKey has found data");
          return result;
        }
      }
    }
    sendLog(
      "warn",
      "CSVDataObject.getDataByTime() has returned null, is this expected?",
    );
    return result;
  }

  /**
   * Get this CSV's data
   * @preconditions this.data is a valid non-empty data set
   * @postconditions returns The complete data array
   */
  getData(): { key: Record<string, string | number> }[] {
    // assert that data.length is not empty
    assert(
      this.data.length > 0,
      "Unitialized data set for the csv file. (CSVDataObject.ts)",
    );
    return this.data;
  }

  /**
   * Get this CSV's name
   * @preconditions none
   * @postconditions returns The name of the CSV data object
   */
  getName(): string {
    return this.name;
  }

  /**
   * Get the list of this CSV's headers
   * @preconditions none
   * @postconditions returns Array of CSV column headers
   */
  getCSVHeaders(): string[] {
    return this.csvHeaders;
  }

  /**
   * Get the label of this CSV's YHeader
   * @preconditions none
   * @postconditions returns Currently selected Y-axis header
   */
  getYHeader(): string {
    return this.yHeader;
  }

  /**
   * Get this CSV's BrowserSelected boolen
   * @preconditions none
   * @postconditions returns Boolean indicating if browser visualization is selected
   */
  getBrowserSelected(): boolean {
    return this.browserSelected;
  }

  /**
   * Get this CSV's VRSelected boolean
   * @preconditions none
   * @postconditions returns Boolean indicating if VR visualization is selected
   */
  getVRSelected(): boolean {
    return this.vrSelected;
  }

  /**
   * Gets the boolean for whether first differencing is in effect
   * @precondition none
   * @returns Boolean indicating if first differencing is in effect
   */
  getIsFirstDifferencing(): boolean {
    return this.isFirstDifferencing;
  }

  /**
   * Finds and returns the time header from CSV headers
   *
   * @preconditions csvHeaders must be initialized, not null and contains a Time column
   * @postconditions
   * - If found, returns a valid time header,
   *   (i.e The header string containing "Time" or "time" without modifying data)
   * - Else, throws an error
   */
  findTimeHeader(): string {
    for (const head of this.getCSVHeaders()) {
      if (head == "Time" || head == "time") {
        sendLog(
          "debug",
          `findTimeHeader() was called, the time header in the data set has been found (CSVDataObject.ts)`,
        );
        return head;
      }
    }
    // if no Time header is found, log the error
    const error = new Error("CSV file doesn't have a Time header");
    sendError(error, "No allowed time header in csv file (CSVDataObject.ts)");
    throw error;
  }

  // End of Getters
  // Setters

  /**
   * Sets the data array for the CSV object
   * @param data Array of key-value pair records
   * @preconditions `data` must be a non-null array
   * @postconditions this.data will contain the provided data array
   */
  setData(data: { key: Record<string, string | number> }[]): void {
    this.data = data;
    sendLog(
      "trace",
      `setData() was called, data has been set (CSVDataObject.ts)`,
    );
  }

  /**
   * Sets the name for the CSV object
   * @param name string to name this CSV object
   * @preconditions `name` must be a string
   * @postconditions The `name` property is updated to the provided name.
   */
  setName(name: string) {
    sendLog("debug", `setName, ${this.name} will now be called ${name}`);
    this.name = name;
  }

  /**
   * Sets the browser visualization selection state
   * @param bool Boolean value browserSelected is set to
   * @preconditions `bool` must be a boolean value
   * @postconditions browserSelected will be set to the provided boolean value
   */
  setBrowserSelected(bool: boolean) {
    sendLog(
      "debug",
      `setBrowserSelected, ${this.name} browser is set to ${bool.toString()}`,
    );
    this.browserSelected = bool;
  }

  /**
   * Sets the VR visualization selection state
   * @param bool Boolean value vrSelected is set to
   * @preconditions `bool` must be a boolean value
   * @postconditions vrSelected will be set to the provided boolean value
   */
  setVRSelected(bool: boolean) {
    sendLog(
      "debug",
      `setVRSelected, ${this.name} vr is set to ${bool.toString()}`,
    );
    this.vrSelected = bool;
  }

  /**
   * Sets the Y-axis header if it exists in CSV headers
   * @param header Header string to set as Y-axis
   * @preconditions
   * - csvHeaders must be initialized
   * - header must exist in csvHeaders
   * @postconditions
   * - if it exists in csvHeaders, yHeader will be set to header,
   * - else, yHeader remains unchanged
   */
  setYHeader(header: string) {
    sendLog("info", `setYHeader, ${this.name} yHeader is set to ${header}`);
    for (const head of this.getCSVHeaders()) {
      if (head == header) {
        this.yHeader = header;
        break;
      }
    }
  }

  // End of Setters

  /**
   * Gets the Time header used by the csv data file
   * @preconditions timeHeader must be "Time"
   * @postconditions
   * - if timeHeader is "Time", return it
   * - else, throw an error
   */
  getTimeHeader(): string {
    // assert that timeHeader is "Time"
    assert(
      this.timeHeader === "Time",
      "Invalid time header, not Time (CSVDataObject.ts)",
    );
    return this.timeHeader;
  }

  /**
   * Sets the time header used on the csv data set
   * @preconditions none
   * @postconditions sets the Time header used in the program
   */
  setTimeHeader() {
    this.timeHeader = this.findTimeHeader();

    sendLog(
      "trace",
      `setTimeHeader() was called, finding the time header in the data set (CSVDataObject.ts)`,
    );
  }

  /**
   * Sets the boolean for if first differening is in effect to the given value
   * @param firstDiff boolean indicating if first differencing is in effect
   * @postcondition if firstDiff is true, first differencing is now if effect
   *                else firstDiff is false, first differencing is not in effect
   */
  setIsFirstDifferencing(firstDiff: boolean): void {
    this.isFirstDifferencing = firstDiff;
    sendLog(
      "debug",
      `setIsFirstDifferencing() was called, first differencing is set to ${firstDiff}`,
    );
  }

  /**
   * Gets the selected point object(s) in the program
   * @precondition none
   * @postcondition
   * - On success, returns the array of selected point objects
   */
  getSelectedPoints(): PointObject[] {
    const selectedP: PointObject[] = [];

    this.getPoints().forEach((point) => {
      if (point.getSelected()) {
        selectedP.push(point);
      }
    });
    return selectedP;
  }
}
