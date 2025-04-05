import { sendError, sendLog } from "../../logger-frontend";
import { GraphInterface } from "../../types/GraphInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import assert from "../../Assert";

/**
 * The GraphClass represents a graph structure that manages points, dimensions, styling, and interactivity.
 * @invariant
 * - The 'id' and 'name' properties are always non-empty strings.
 * - The 'dimensions' properties ('width', 'height', and optionally 'depth') are non-negative numbers.
 * - The 'points' property is a defined array of only 'PointClass' instances.
 * - The 'position' property is an object with 'x', 'y', and optionally 'z' coordinate properties that are numbers.
 * - The 'axes' property is an object with 'xLabel', 'yLabel', 'xRange', and 'yRange' properties that are defined.
 *
 * @history
 * - Although the 'id' and 'name' can be updated, they must always remain non-empty.
 * - The 'points' array is mutable.
 */
export class GraphObject implements GraphInterface {
  csvData: CSVDataObject;
  name: string;
  axes: {
    xRange: [number, number];
    yRange: [number, number];
  };

  /**
   * Construct a new GraphObject instance.
   * @param CSVDataObject - An object of the CSVDataObject class
   *
   * @preconditions The 'csvdata' parameter must be a valid instance of the CSVDataObject class.
   * @postconditions The new GraphClass instance is created with:
   * - The 'id' and 'name' properties set to the CSVDataObject name.
   * - The 'dimensions' property is set to default values of 10 for width, height, and depth.
   * - The 'points' property is initialized as an empty array.
   * - The 'position' property is set to default values.
   * - The 'axes' property is set with the values from CSVDataObject for xLabel and yLabel, default values for xRange and yRange.
   */
  constructor(csvdata: CSVDataObject) {
    // CSVDataObject is required, so the check is unnecessary.
    this.csvData = csvdata;
    this.name = "";
    this.axes = {
      xRange: [0, 0],
      yRange: [0, 0],
    };
  }

  // Axes management
  /**
   * Get the axes of the graph.
   * @param none
   *
   * @preconditions the graph instance must have valid axes.
   * @postconditions the 'axes' property is returned as an object with 'xLabel', 'yLabel', 'xRange', and 'yRange' properties.
   */
  getAxes(): {
    xRange: [number, number];
    yRange: [number, number];
  } {
    return this.axes;
  }

  /**
   * Set the axes of the graph.
   * @param {{xRange: [number, number]; yRange: [number, number]}} axes An object with `xRange`, and `yRange` properties.
   * @preconditions the `axes` parameter must be an object with `xRange`, and `yRange` properties.
   * @postconditions
   * - the 'axes' property is set to the provided object.
   * - If the `axes` parameter is invalid, an error is thrown.
   */
  setAxes(axes: { xRange: [number, number]; yRange: [number, number] }): void {
    // Assert that the minimum is less than or equal to the maximum for both ranges.
    assert(
      axes.xRange[0] <= axes.xRange[1],
      "Invalid x axis range: first value must be less than or equal to the second value (GraphObject.ts)",
    );
    assert(
      axes.yRange[0] <= axes.yRange[1],
      "Invalid y axis range: first value must be less than or equal to the second value (GraphObject.ts)",
    );
    this.axes = axes;

    sendLog(
      "debug",
      `setAxes() was called on Graph Object and now: ${axes} (GraphObject.ts)`,
    );
  }

  /**
   * Gets the CSV Data Object used by the graph
   * @preconditions none
   * @postconditions returns the csv data object linked to the graph
   */
  getCSVData(): CSVDataObject {
    return this.csvData;
  }

  /**
   * Gets the name used by the graph
   * @preconditions none
   * @postconditions returns the name attribute of the graph
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the name of the graph
   * @param {string} name the new name set for the graph
   * @precondition the name parameter must be non-null and not empty ""
   * @postcondition
   * - the name of the graph is set to the name parameter of the method
   * - throws an error if the parameter is invalid
   */
  setName(name: string): void {
    if (name === "") {
      const error = new Error("Empty string provided");
      sendError(error, "Invalid name parameter, GraphObject.ts");
      throw error;
    }
    this.name = name;
    sendLog("debug", `setName, ${this.name} will now be called ${name}`);
  }
}
