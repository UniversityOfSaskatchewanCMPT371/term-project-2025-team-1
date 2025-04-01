import { DataInterface } from "./BaseInterfaces";
import { CSVDataInterface } from "./CSVInterfaces";
/**
 * Interface for graph objects that can be used in both 2D and 3D contexts.
 * Provides a standardized structure for graph representation and manipulation.
 */
export interface GraphInterface extends DataInterface {
  // Basic graph properties
  /** identifier for the graph */
  id: string;

  /** The csv data used by the graph */
  csvData: CSVDataInterface;
  /** x, y, and possibly z coordinates for position */
  position: {
    x: number;
    y: number;
    z: number; // Optional for possible 3D implementation
  };

  /** Axes configuration, min and max for x-axis and y-axis */
  axes: {
    xRange: [number, number];
    yRange: [number, number];
  };

  // Basic getters and setters
  /**
   * Gets the graph's unique identifier
   * @preconditions none
   * @postconditions returns the current id string, unchanged
   */
  getId(): string;

  /**
   * Sets the graph's unique identifier
   * @preconditions id must be a non-empty string
   * @postconditions graph's id is updated to the new value
   */
  setId(id: string): void;

  /**
   * Gets the graph's position
   * @preconditions none
   * @postconditions returns the current position object
   */
  getPosition(): { x: number; y: number; z?: number };

  /**
   * Sets the graph's position
   * @preconditions x, y must be valid numbers
   * @postconditions graph's position is updated to the new values
   */
  setPosition(x: number, y: number, z?: number): void;

  /**
   * Gets the axes configuration
   * @preconditions none
   * @postconditions returns the current axes configuration object
   */
  getAxes(): {
    xRange: [number, number];
    yRange: [number, number];
  };

  /**
   * Sets the axes configuration
   * @preconditions axes object must contain valid labels and ranges
   * @postconditions graph's axes configuration is updated to the new values
   */
  setAxes(axes: { xRange: [number, number]; yRange: [number, number] }): void;

  /**
   * Get the CSV Data
   * @preconditions none
   * @postconditions returns the current axes configuration object
   */
  getCSVData(): CSVDataInterface;
}
