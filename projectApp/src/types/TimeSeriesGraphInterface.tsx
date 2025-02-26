import { PointObject } from "../components/Graph_Components/PointObject";
import { GraphInterface } from "./GraphInterface";

/**
 * Interface for enhanced graph objects with additional point manipulation capabilities.
 * Extends basic GraphInterface with point-specific operations.
 */
export interface TimeSeriesGraphInterface extends GraphInterface {
    /**
     * Adds a new point to the graph
     * pre-condition: none
     * post-condition: a new PointObject instance is added to the graph
     */
    addPoint(): void;

    /**
     * Finds a point based on given x and y data
     * pre-condition: xData is a string, yData is a number
     * post-condition: returns the matching point or undefined if not found
     * @param {string} xData - The x-coordinate (string representation)
     * @param {number} yData - The y-coordinate (numeric value)
     * @returns {PointObject | undefined} The found point or undefined
     */
    findPoint(xData: string, yData: number): PointObject | undefined;

    /**
     * Updates all points' selection status
     * pre-condition: none
     * post-condition: all points' states are updated
     */
    updatePoints(): void;

    /**
     * Updates point positions based on zoom factor
     * pre-condition: zoomFactor is a positive number
     * post-condition: all points' positions are scaled by the zoom factor
     * @param {number} zoomFactor - The scaling factor for point positions
     */
    // updateOnZoom(zoomFactor: number): void;

    /**
     * Gets all points in the graph
     * pre-condition: none
     * post-condition: returns array of current points, unchanged
     * @returns {PointObject[]} Array of points in the graph
     */
    getPoints(): PointObject[];

    /**
     * Sets the graph's points
     * pre-condition: points must be an array of valid PointObject instances
     * post-condition: graph's points are replaced with the new array
     * @param {PointObject[]} points - Array of new points
     */
    setPoints(points: PointObject[]): void;
}