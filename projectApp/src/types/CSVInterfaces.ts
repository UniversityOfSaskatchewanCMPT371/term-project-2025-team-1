import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { DataInterface, ModelInterface } from "./BaseInterfaces";
import { PointObjectInterface } from "./PointInterface";

/**
 * Interface for CSVDataObject
 * @extends DataInterface
 * Planned new interfaces for csv files.
 * For now, specialized for 2D Time Series
 * */
export interface CSVDataInterface extends DataInterface {
  /** Headers for csv File */
  csvHeaders: string[];
  
  /** Data sets of csv files */
  data: { key: Record<string, string | number> }[];
  
  /** Checks if loaded file is selected on the Browser */
  browserSelected: boolean;
  
  /** Checks if loaded file is selected on the VR Scene */
  vrSelected: boolean;
  
  /** The YHeader for the column used in Y axis. Will use the TIME and yHeader to get data */
  yHeader: string;
  
  /**
   * Get this CSV's data
   * @preconditions this.data is a valid non-empty data set
   * @postconditions returns The complete data array
   */
  getData(): { key: Record<string, string | number> }[];
  
  /**
   * Sets the data array for the CSV object
   * @param data Array of key-value pair records
   * @preconditions `data` must be a non-null array
   * @postconditions this.data will contain the provided data array
   */
  setData(data: { key: Record<string, string | number> }[]): void;
  
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
  getDataByTime(time: string): Record<string, string | number> | null;
  
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
  loadCSVData(file: File | string, isUrl: boolean): Promise<void>;
  
  /**
   * Get the list of this CSV's headers
   * @preconditions none
   * @postconditions returns Array of CSV column headers
   */
  getCSVHeaders(): string[];
  
  /**
   * Gets the Time header used by the csv data file
   * @preconditions timeHeader must be "Time"
   * @postconditions
   * - if timeHeader is "Time", return it
   * - else, throw an error
   */
  getTimeHeader(): string;
  
  /**
   * Get the label of this CSV's YHeader
   * @preconditions none
   * @postconditions returns Currently selected Y-axis header
   */
  getYHeader(): string;
  
  /**
   * Get this CSV's BrowserSelected boolen
   * @preconditions none
   * @postconditions returns Boolean indicating if browser visualization is selected
   */
  getBrowserSelected(): boolean;
  
  /**
   * Sets the browser visualization selection state
   * @param bool Boolean value browserSelected is set to
   * @preconditions `bool` must be a boolean value
   * @postconditions browserSelected will be set to the provided boolean value
   */
  setBrowserSelected(bool: boolean): void;
  
  /**
   * Get this CSV's VRSelected boolean
   * @preconditions none
   * @postconditions returns Boolean indicating if VR visualization is selected
   */
  getVRSelected(): boolean;
  
  /**
   * Sets the VR visualization selection state
   * @param bool Boolean value vrSelected is set to
   * @preconditions `bool` must be a boolean value
   * @postconditions vrSelected will be set to the provided boolean value
   */
  setVRSelected(bool: boolean): void;
  
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
  setYHeader(header: string): void;
  
  /**
   * calculates the values to be used for yValues when first differencing is in effect
   * @preconditions none
   * @postconditions none
   * @returns an array of the first differenced yValues
   */
  calculateFirstDifferencingValues(): number[];
  
  /**
   * Create points from the csv file that will be referenced by the points of
   * both the 2D and 3D Graph
   * @preconditions none
   * @postconditions fills up the array of PointObjects used by the two graphs
   */
  populatePoints(): void;
  
  /**
   * Get the array of Point Objects
   * @preconditions none
   * @postconditions returns the point objects array
   */
  getPoints(): PointObjectInterface[];
  
  /**
   * Set a new point object and replaces the current point object
   * @param points An array of point objects
   * @preconditions `points` is a valid array of PointObjects
   * @postconditions sets the new array of point objects
   */
  setPoints(points: PointObjectInterface[]): void;
  
  /**
   * Find the first non "Time" header in the csv data file and returns it
   * @preconditions The list of headers must be greater than 1
   * - if theres only 1, then that means that there is only a "Time" header,
   *   or that the csv file loaded doesn't have a "Time" header,
   *   with both cases being invalid
   * @postconditions returns the first non "Time" header in the data set
   */
  findFirstHeader(): string;

  /**
   * Get this CSV's name
   * @preconditions none
   * @postconditions returns The name of the CSV data object
   */
  getName(): string;

  /**
   * Gets the boolean for whether first differencing is in effect
   * @precondition none
   * @returns Boolean indicating if first differencing is in effect
   */
  getIsFirstDifferencing(): boolean;

  /**
   * Sets the boolean for if first differening is in effect to the given value
   * @param firstDiff boolean indicating if first differencing is in effect
   * @postcondition if firstDiff is true, first differencing is now if effect
   *                else firstDiff is false, first differencing is not in effect
   */
  setIsFirstDifferencing(firstDiff: boolean): void;

  /**
   * Finds and returns the time header from CSV headers
   *
   * @preconditions csvHeaders must be initialized, not null and contains a Time column
   * @postconditions
   * - If found, returns a valid time header,
   *   (i.e The header string containing "Time" or "time" without modifying data)
   * - Else, throws an error
   */
  findTimeHeader(): string;
}

/**
 * Interface for CSVReaderModel
 * @extends ModelInterface
 */
export interface CSVModelInterface extends ModelInterface {
  /** Will read the csv through local file and load it */
  readLocalFile(file: File): Promise<void>;
  /** Will read the csv file through url link and load it */
  readURLFile(file: string): Promise<void>;
  /** Get specific csv data by Name value */
  getCSVFile(): CSVDataObject | undefined;
}
