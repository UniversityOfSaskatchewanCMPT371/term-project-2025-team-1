/**
 * Interface for graph objects that can be used in both 2D and 3D contexts.
 * Provides a standardized structure for graph representation and manipulation.
 */
import { PointClass } from "../../src/components/Graph_Components/PointClass";
import { DataInterface } from "./BaseInterfaces";

export interface GraphInterface extends DataInterface{
    // Basic graph properties
    id: string;                          // identifier for the graph
    
    // Data points and configuration
    points: PointClass[];                  // Array of points using PointRef interface
    
    position: {
        x: number;
        y: number;
        z: number;                  // Optional for possible 3D implementation
    };

    // Axes configuration
    axes: {
        xLabel: string;
        yLabel: string;
        xRange: [number, number];        // Min and max values for x-axis
        yRange: [number, number];        // Min and max values for y-axis
    };

    // Basic getters and setters
    /**
     * Gets the graph's unique identifier
     * pre-condition: none
     * post-condition: returns the current id string, unchanged
     */
    getId(): string;

    /**
     * Sets the graph's unique identifier
     * pre-condition: id must be a non-empty string
     * post-condition: graph's id is updated to the new value
     */
    setId(id: string): void;

    // /**
    //  * Gets the graph's title
    //  * pre-condition: none
    //  * post-condition: returns the current title or undefined if not set
    //  */
    // getTitle(): string | undefined;

    // /**
    //  * Sets the graph's title
    //  * pre-condition: title must be a string
    //  * post-condition: graph's title is updated to the new value
    //  */
    // setTitle(title: string): void;

    /**
     * Gets the graph's position
     * pre-condition: none
     * post-condition: returns the current position object
     */
    getPosition(): { x: number; y: number; z?: number };

    /**
     * Sets the graph's position
     * pre-condition: x, y must be valid numbers
     * post-condition: graph's position is updated to the new values
     */
    setPosition(x: number, y: number, z?: number): void;

    /**
     * Gets all points in the graph
     * pre-condition: none
     * post-condition: returns array of current points, unchanged
     */
    getPoints(): PointClass[];

    /**
     * Sets the graph's points
     * pre-condition: points must be an array of valid PointClass instances
     * post-condition: graph's points are replaced with the new array
     */
    setPoints(points: PointClass[]): void;

    /**
     * Removes all points from the graph
     * pre-condition: none
     * post-condition: graph's points array is empty
     */
    clearPoints(): void;

    /**
     * Gets the axes configuration
     * pre-condition: none
     * post-condition: returns the current axes configuration object
     */
    getAxes(): { xLabel: string; yLabel: string; xRange: [number, number]; yRange: [number, number] };

    /**
     * Sets the axes configuration
     * pre-condition: axes object must contain valid labels and ranges
     * post-condition: graph's axes configuration is updated to the new values
     */
    setAxes(axes: { xLabel: string; yLabel: string; xRange: [number, number]; yRange: [number, number] }): void;
}
