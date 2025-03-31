import { sendError, sendLog } from "../../logger-frontend";
import { GraphInterface } from "../../types/GraphInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";

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
  id: string;
  name: string;
  csvData: CSVDataObject;
  dimensions: { width: number; height: number; depth?: number };
  position: { x: number; y: number; z: number };
  axes: {
    xRange: [number, number];
    yRange: [number, number];
  };

  /**
   * Construct a new GraphObject instance.
   * @param CSVDataObject - An object of the CSVDataObject class
   *
   * @precondition The 'csvdata' parameter must be a valid instance of the CSVDataObject class.
   * @postconditions The new GraphClass instance is created with:
   * - The 'id' and 'name' properties set to the CSVDataObject name.
   * - The 'dimensions' property is set to default values of 10 for width, height, and depth.
   * - The 'points' property is initialized as an empty array.
   * - The 'position' property is set to default values.
   * - The 'axes' property is set with the values from CSVDataObject for xLabel and yLabel, default values for xRange and yRange.
   */
  constructor(csvdata: CSVDataObject) {
    // CSVDataObject is required, so the check is unnecessary.
    this.id = csvdata.getName();
    this.name = csvdata.getName();
    this.csvData = csvdata;
    this.dimensions = { width: 10, height: 10, depth: 10 };
    this.position = { x: 1, y: 1, z: 0 };
    this.axes = {
      xRange: [0, 0],
      yRange: [0, 0],
    };
  }

  /**
   * Get the ID of the graph.
   * @precondition The graph instance must have a valid ID.
   * @postcondition The 'id' property is returned as a string.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Set the ID of the graph.
   * @param {string} id - A string representing the ID of the graph.
   *
   * @precondition The `id` parameter must be a non-empty string.
   * @postconditions
   * - The 'id' property is set to the provided ID.
   * - If the ID is empty or not a string, an error is thrown.
   */
  setId(id: string): void {
    if (id.trim() === "" || typeof id !== "string") {
      const error = new SyntaxError("Invalid ID");
      sendError(error, "ID must be a non-empty string. (GraphObject.ts");
      throw error;
    }
    this.id = id;

    sendLog(
      "info",
      `setID() was called on Graph Object, ID is now ${id} (GraphObject.ts)`,
    );
  }

  /**
   * Get the name of the graph.
   *
   * @param none
   *
   * @precondition The graph instance must have a valid name.
   * @postcondition The 'name' property is returned as a string.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the name of the graph.
   * @param {string} title - A string representing the name of the graph.
   *
   * @precondition `title` must be a non-empty string.
   * @postconditions
   * - 'name' property is set to the provided title.
   * - If the title is empty or not a string, an error is thrown.
   */
  setName(title: string): void {
    if (title.trim() === "" || typeof title !== "string") {
      const error = new SyntaxError("Invalid Name");
      sendError(error, "Name must be a non-empty string. (GraphObject.ts");
      throw error;
    }
    this.name = title;

    sendLog(
      "info",
      `setName() was called on Graph Object, name of the Graph is now ${title} (GraphObject.ts)`,
    );
  }

  // Position getters and setters

  /**
   * Get the position of the graph.
   * @param none
   *
   * @precondition The graph instance must have a valid position.
   * @postcondition The 'position' property is returned as an object with 'x', 'y', and 'z' properties.
   */
  getPosition(): { x: number; y: number; z?: number } {
    return this.position;
  }

  /**
   * Set the position of the graph.
   * @param {number} x - A number representing the x-coordinate of the graph.
   * @param {number} y - A number representing the y-coordinate of the graph.
   * @param {number} z - A number representing the z-coordinate of the graph.
   *
   * @precondition The `x`, `y`, and `z` parameters must be numbers.
   * @postcondition The 'position' property is set to an object with 'x', 'y', and 'z' properties. If any of the parameters are not numbers, an error is thrown.
   */
  setPosition(x: number, y: number, z: number): void {
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
      const error = new TypeError("Invalid Positions");
      sendError(error, "Position coordinates must be numbers. (GraphObject.ts");
      throw error;
    }
    this.position = { x, y, z };

    sendLog(
      "info",
      `setPosition() was called on Graph Object, position: [${x}, ${y}, ${z}] (GraphObject.ts)`,
    );
  }

  // Axes management
  /**
   * Get the axes of the graph.
   * @param none
   *
   * @precondition the graph instance must have valid axes.
   * @postcondition the 'axes' property is returned as an object with 'xLabel', 'yLabel', 'xRange', and 'yRange' properties.
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
   * @precondition the `axes` parameter must be an object with `xRange`, and `yRange` properties.
   * @postconditions
   * - the 'axes' property is set to the provided object.
   * - If the `axes` parameter is invalid, an error is thrown.
   */
  setAxes(axes: { xRange: [number, number]; yRange: [number, number] }): void {
    let error;
    if (axes.xRange[0] > axes.xRange[1]) {
      error = new RangeError("Invalid x axis range");
      sendError(
        error,
        "Invalid xRange. First value must be less than the second value (GraphObject.ts)",
      );
      throw error;
    } else if (axes.yRange[0] > axes.yRange[1]) {
      error = new RangeError("Invalid y axis range");
      sendError(
        error,
        "Invalid yRange. First value must be less than the second value (GraphObject.ts)",
      );
      throw error;
    }
    this.axes = axes;

    sendLog(
      "info",
      `setAxes() was called on Graph Object and now: ${axes} (GraphObject.ts)`,
    );
  }

  /**
   * Gets the CSV Data Object used by the graph
   * @precondition none
   * @returns the csv data object linked to the graph
   */
  getCSVData(): CSVDataObject {
    return this.csvData;
  }
}
