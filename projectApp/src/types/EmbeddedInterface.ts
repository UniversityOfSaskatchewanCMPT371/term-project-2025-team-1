import { GraphInterface } from "./GraphInterface";
import { Point3DInterface } from "./GraphPointsInterfaces";

/**
 * Interface for the EmbeddedGraphObject
 * @extends GraphInterface
 */
export interface EmbeddedInterface extends GraphInterface {
  /** tau value used in point position */
  tau: number;
  /** set of 3D points */
  points3D: Point3DInterface[];

  /**
   * Adds embedded point vectors to the graph.
   * @preconditions valid points exist in the csvDataObject of the graph
   * @postconditions PointObject's containing the vectors are stored in the points array attribute
   */
  addPoints(): void;

  /**
   * Updates the selection status for each point in the graph.
   * @preconditions valid points exist in the csvDataObject of the graph
   * @postconditions each 3D point in the graph is unselected
   */
  updatePoints(): void;

  /**
   * Calculated the embedded time vector dimensions for the given time.
   * Uses the data set selected in the csvDataObject of the graph
   * Vector return is of the form [y[time], y[time - tau], y[time - 2*tau]] where y is the data set column selected
   * @param time the index/time of the data set calculating the vector for
   * @param csvData the data contained in the csvDataObject of the graph
   * - this is passed in instead of calling the method to obtain it to avoid uneccessary calls to the methods for every point being calculated
   * @preconditions
   * - time >= 0
   * - csvDataObject must contain valid data set
   * - a valid data set much be selected
   * @postconditions returns an array contaning the coordinates of the vector in the form [x, y, z]
   */
  calculateVectorPosition(
    time: number,
    csvData: { key: Record<string, string | number> }[],
  ): [number, number, number];

  /**
   * gets the value of the currently seelcted column at the line specified in index
   * @param index line in csv file that contains the coordniate value being retreived
   * @param csvData the data contained in the csvDataObject of the graph
   * - this is passed in instead of calling the method to obtain it to avoid uneccessary calls to the methods for every point being calculated
   * @preconditions
   * - csvData contains valid data
   * - the graph has a column selected that exists in the csv file
   * @postconditions returns
   * - if index is >=0, the value at the index (line) of the csv in the column currently selected
   * - otherwise, 0
   */
  retreiveCoordinateValue(
    index: number,
    csvData: { key: Record<string, string | number> }[],
  ): number;

  /**
   * Gets the value of tau
   * @preconditions none
   * @postconditions returns the current value of tau
   */
  getTau(): number;

  /**
   * Sets the value of tau
   * @param newTau a number greater than or eqaul to 1
   * @preconditions `newTau'` must be a positive integer
   * @postconditions the value of tau is updated to newTau
   */
  setTau(newTau: number): void;

  /**
   * Get the points in the 3D Embedded Graph
   * @preconditions a non-empty array of 3d points
   * @postconditions returns the 3d points of the Embedded Graph
   */
  getPoints3D(): Point3DInterface[];

  /**
   * Get the max range of the csv data file that will be used on the 3d embedded graph
   * @preconditions the max range must be greater than the min range
   * @postconditions the range of the csv data set
   */
  getMaxRange(): number;

  /**
   * Set the max range that will be used on the 3d Embedded graph
   * @preconditions this graph's csv is a valid non-null data set
   * @postconditions sets the max range used in the 3D Embedded graph
   */
  setRange(): void;

  /**
   * Update the 3D embedded graph
   * @preconditions this graph's csv is a valid non-null data set
   * @postconditions the graph is cleared and updated with new points
   */
  updateEmbeddedPoints(): void;
}
