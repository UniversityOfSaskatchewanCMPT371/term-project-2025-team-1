/**
 * Interface for graph objects that can be used in both 2D and 3D contexts.
 * Provides a standardized structure for graph representation and manipulation.
 */
import { DataInterface } from "./BaseInterfaces";
import { CSVDataInterface } from "./CSVInterfaces";

export interface GraphInterface extends DataInterface {
  // Basic graph properties
  id: string; // identifier for the graph

  //The csv data used by the graph
  csvData: CSVDataInterface;

  position: {
    x: number;
    y: number;
    z: number; // Optional for possible 3D implementation
  };

  // Axes configuration
  axes: {
    xRange: [number, number]; // Min and max values for x-axis
    yRange: [number, number]; // Min and max values for y-axis
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
   * Gets the axes configuration
   * pre-condition: none
   * post-condition: returns the current axes configuration object
   */
  getAxes(): {
    xRange: [number, number];
    yRange: [number, number];
  };

  /**
   * Sets the axes configuration
   * pre-condition: axes object must contain valid labels and ranges
   * post-condition: graph's axes configuration is updated to the new values
   */
  setAxes(axes: { xRange: [number, number]; yRange: [number, number] }): void;

  getCSVData(): CSVDataInterface;
}
