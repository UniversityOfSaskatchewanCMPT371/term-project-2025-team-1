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
 * Although the 'id' and 'name' can be updated, they must always remain non-empty.
 * The 'points' array is mutable.
 */
export class GraphObject implements GraphInterface {
  id: string;
  name: string;
  csvData: CSVDataObject;
  dimensions: { width: number; height: number; depth?: number };
  // points: PointInterface[];
  position: { x: number; y: number; z: number };
  axes: {
    xRange: [number, number];
    yRange: [number, number];
  };

  /**
   * Constructs a new GraphObject instance.
   * @param CSVDataObject - An object of the CSVDataObject class
   *
   * @precondition The 'csvdata' parameter must be a valid instance of the CSVDataObject class.
   * @postcondition The new GraphClass instance is created with the 'id' and 'name' properties set to the CSVDataObject name.
   * The 'dimensions' property is set to default values of 10 for width, height, and depth.
   * The 'points' property is initialized as an empty array.
   * The 'position' property is set to default values.
   * The 'axes' property is set with the values from CSVDataObject for xLabel and yLabel, default values for xRange and yRange.
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
   * Gets the ID of the graph.
   * @param none
   *
   * @precondition The graph instance must have a valid ID.
   * @postcondition The 'id' property is returned as a string.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Sets the ID of the graph.
   * @param {string} id - A string representing the ID of the graph.
   *
   * @precondition The 'id' parameter must be a non-empty string.
   * @postcondition The 'id' property is set to the provided ID. If the ID is empty or not a string, an error is thrown.
   */
  setId(id: string): void {
    if (id.trim() === "" || typeof id !== "string") {
      throw new Error("ID must be a non-empty string.");
    }
    this.id = id;
  }

  /**
   * Gets the name of the graph.
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
   * @precondition 'title' must be a non-empty string.
   * @postcondition 'name' property is set to the provided title. If the title is empty or not a string, an error is thrown.
   */
  setName(title: string): void {
    if (title.trim() === "" || typeof title !== "string") {
      throw new Error("Name must be a non-empty string.");
    }
    this.name = title;
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
   * @precondition The 'x', 'y', and 'z' parameters must be numbers.
   * @postcondition The 'position' property is set to an object with 'x', 'y', and 'z' properties. If any of the parameters are not numbers, an error is thrown.
   */
  setPosition(x: number, y: number, z: number): void {
    if (
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof z !== "number"
    ) {
      throw new Error("Position coordinates must be numbers.");
    }
    this.position = { x, y, z };
  }

  /**
   * Get the points array of the graph.
   * @param none
   *
   * @precondition The graph instance must have a valid points array.
   * @postcondition The 'points' property is returned as an array of PointClass instances.
   */
  // getPoints(): PointInterface[] {
  //   return this.points;
  // }

  /**
   * Set the points array of the graph.
   * @param {PointInterface[]} points the points array - An array of PointClass instances.
   *
   * @precondition The 'points' parameter must be an array of PointClass instances.
   * @postcondition The 'points' property is set to the provided array. If the 'points' parameter is not an array of PointClass instances, an error is thrown.
   */
  // setPoints(points: PointInterface[]): void {
  //   if (!Array.isArray(points)) {
  //     throw new Error(
  //       "Invalid points: must be an array of PointClass instances",
  //     );
  //   }
  //   for (const point of points) {
  //     if (!(point instanceof PointObject)) {
  //       throw new Error(
  //         "Invalid point: each element must be an instance of PointClass",
  //       );
  //     }
  //   }

  //   this.points = points;
  // }

  /**
   * Remove a point from the graph.
   * @param {PointInterface[]} points the point to remove - A PointClass instance.
   *
   * @precondition the 'point' parameter must be a valid PointClass instance.
   * @postcondition the 'point' is removed from the 'points' array. If the point does not exist in the array, an error is thrown.
   */
  // removePoint(point: PointInterface): void {
  //   const index = this.points.indexOf(point);
  //   if (index !== -1) {
  //     throw new Error("The specified point does not exist in the points array");
  //   }
  //   this.points.splice(index, 1);
  // }

  /**
   * Clear all points from the graph.
   * @param none
   *
   * @precondition the 'points' parameter must be an array of PointClass instances.
   * @postcondition the 'points' array is cleared.
   */
  // clearPoints(): void {
  //   this.points = [];
  // }

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
   * @param {xLabel: string; yLabel: string; xRange: [number, number]; yRange: [number, number]} axes
   * - An object with 'xLabel', 'yLabel', 'xRange', and 'yRange' properties.
   * @precondition the 'axes' parameter must be an object with 'xLabel', 'yLabel', 'xRange', and 'yRange' properties.
   * @postcondition the 'axes' property is set to the provided object. If the 'axes' parameter is invalid, an error is thrown.
   */
  setAxes(axes: {
    xRange: [number, number];
    yRange: [number, number];
  }): void {
    // if (typeof axes.xLabel !== "string" || axes.xLabel.trim() === "") {
    //   throw new Error("Invalid xLabel: must be a non-empty string");
    // }
    // if (typeof axes.yLabel !== "string" || axes.yLabel.trim() === "") {
    //   throw new Error("Invalid yLabel: must be a non-empty string");
    // }
    this.axes = axes;
  }
}
