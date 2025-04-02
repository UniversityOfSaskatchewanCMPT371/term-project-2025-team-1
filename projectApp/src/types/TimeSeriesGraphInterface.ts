import { Point2DObject } from "../components/Graph_Components/Points/Point2DObject";
import { GraphInterface } from "./GraphInterface";

/**
 * Interface for enhanced graph objects with additional point manipulation capabilities.
 * @extends GraphInterface extends basic GraphInterface with point-specific operations.
 */
export interface TimeSeriesGraphInterface extends GraphInterface {
  /**
   * Adds a new point to the graph
   * @preconditions none
   * @postconditions a new PointObject instance is added to the graph
   */
  addPoints(): void;

  /**
   * Updates all points' selection status
   * @preconditions none
   * @postconditions all points' states are updated
   */
  updatePoints(): void;

  /**
   * Updates point positions based on zoom factor
   * @preconditions zoomFactor is a positive number
   * @postconditions all points' positions are scaled by the zoom factor
   * @param {number} zoomFactor - The scaling factor for point positions
   */

  // Left here for now, may be used when implementing zoom
  // updateOnZoom(zoomFactor: number): void;

  /**
   * Gets all points in the graph
   * @preconditions none
   * @postconditions returns {PointObject[]} Array of points in the graph
   */
  get2DPoints(): Point2DObject[];
}
