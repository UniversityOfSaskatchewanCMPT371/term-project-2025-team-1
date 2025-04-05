import { DataInterface } from "./BaseInterfaces";
import { CSVDataInterface } from "./CSVInterfaces";
/**
 * Interface for graph objects that can be used in both 2D and 3D contexts.
 * Provides a standardized structure for graph representation and manipulation.
 */
export interface GraphInterface extends DataInterface {
  // Basic graph properties

  /** The csv data used by the graph */
  csvData: CSVDataInterface;

  /** Axes configuration, min and max for x-axis and y-axis */
  axes: {
    xRange: [number, number];
    yRange: [number, number];
  };

  // Basic getters and setters

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

  /**
   * Gets the name used by the graph
   * @preconditions none
   * @postconditions returns the name attribute of the graph
   */
  getName(): string;

  /**
   * Sets the name of the graph
   * @param {string} name the new name set for the graph
   * @precondition the name parameter must be non-null and not empty ""
   * @postcondition
   * - the name of the graph is set to the name parameter of the method
   * - throws an error if the parameter is invalid
   */
  setName(name: string): void;
}
