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
}
