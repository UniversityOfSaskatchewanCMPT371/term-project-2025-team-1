import { Point2DObject } from "../components/Graph_Components/Points/Point2DObject";
import { GraphInterface } from "./GraphInterface";

/**
 * Interface for enhanced graph objects with additional point manipulation capabilities.
 * @extends GraphInterface extends basic GraphInterface with point-specific operations.
 */
export interface TimeSeriesGraphInterface extends GraphInterface {
  /**
   * Adds a new point to the graph
   * @precondition none
   * @postcondition a new PointObject instance is added to the graph
   */
  addPoints(): void;

  /**
   * Finds a point based on given x and y data
   * @preconditions
   * - xData is a string
   * - yData is a number
   * @postconditions
   * - data is not modified
   * - if point is not found, return undefined
   * @param {string} xData The x-coordinate (string representation)
   * @param {number} yData The y-coordinate (numeric value)
   * @returns {PointObject | undefined} The found point or undefined
   */
  findPoint(xData: string, yData: number): Point2DObject | undefined;

  /**
   * Updates all points' selection status
   * @precondition none
   * @postcondition all points' states are updated
   */
  updatePoints(): void;

  /**
   * Updates point positions based on zoom factor
   * @precondition zoomFactor is a positive number
   * @postcondition all points' positions are scaled by the zoom factor
   * @param {number} zoomFactor - The scaling factor for point positions
   */

  // Left here for now, may be used when implementing zoom
  // updateOnZoom(zoomFactor: number): void;

  /**
   * Gets all points in the graph
   * @precondition none
   * @returns array of current points, unchanged
   * @returns {PointObject[]} Array of points in the graph
   */
  get2DPoints(): Point2DObject[];
}
