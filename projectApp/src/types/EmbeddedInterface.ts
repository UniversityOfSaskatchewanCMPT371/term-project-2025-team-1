import { GraphInterface } from "./GraphInterface";
import { Point3DInterface } from "./GraphPointsInterfaces";

/**
 * Interface for the EmbeddedGraphObject
 * @extends GraphInterface
 */
export interface EmbeddedInterface extends GraphInterface {
  /** Dimension properties, may have depth for 3D graphs */
  dimensions: {
    width: number;
    height: number;
    depth?: number;
  };
  /** tau value used in point position */
  tau: number;
  /** set of 3D points */
  points3D: Point3DInterface[];

  /**
   * Adds embedded point vectors to the graph.
   * @precondition valid points exist in the csvDataObject of the graph
   * @postcondition PointObject's containing the vectors are stored in the points array attribute
   */
  addPoints(): void;

  /**
   * Calculated the embedded time vector dimensions for the given time.
   * Uses the data set selected in the csvDataObject of the graph
   * Vector return is of the form [y[time], y[time - tau], y[time - 2*tau]] where y is the data set column selected
   * @preconditions
   * - time >= 0
   * - csvDataObject must contain valid data set
   * - a valid data set much be selected
   * @postcondition none
   * @param time the index/time of the data set calculating the vector for
   * @param csvData the data contained in the csvDataObject of the graph
   * - this is passed in instead of calling the method to obtain it to avoid uneccessary calls to the methods for every point being calculated
   * @returns an array contaning the coordinates of the vector in the form [x, y, z]
   */
  calculateVectorPosition(
    time: number,
    csvData: { key: Record<string, string | number> }[],
  ): [number, number, number];

  /**
   * gets the value of the currently seelcted column at the line specified in index
   * @preconditions
   * - csvData contains valid data
   * - the graph has a column selected that exists in the csv file
   * @postcondition none
   * @param index line in csv file that contains the coordniate value being retreived
   * @param csvData the data contained in the csvDataObject of the graph
   * - this is passed in instead of calling the method to obtain it to avoid uneccessary calls to the methods for every point being calculated
   * @returns
   * - if index is >=0, the value at the index (line) of the csv in the column currently selected
   * - otherwise, 0
   */
  retreiveCoordinateValue(
    index: number,
    csvData: { key: Record<string, string | number> }[],
  ): number;

  /**
   * Gets the graph's dimensions
   * @precondition none
   * @returns the current dimensions object
   */
  getDimensions(): { width: number; height: number; depth?: number };

  /**
   * Sets the graph's dimensions
   * @param width a number greater than or eqaul to 1
   * @param height a number greater than or eqaul to 1
   * @param depth a number greater than or eqaul to 1, can be excluded for 2D dimensions
   * @preconditions
   * - `width` and `height` must be positive integers
   * - if `height` is specified, it must be a positive integer
   * @postcondition graph's dimensions are updated to the new values
   */
  setDimensions(width: number, height: number, depth?: number): void;

  /**
   * Gets the value of tau
   * @precondition none
   * @returns the current value of tau
   */
  getTau(): number;

  /**
   * Sets the value of tau
   * @param newTau a number greater than or eqaul to 1
   * @precondition `newTau'` must be a positive integer
   * @postcondition the value of tau is updated to newTau
   */
  setTau(newTau: number): void;
}
