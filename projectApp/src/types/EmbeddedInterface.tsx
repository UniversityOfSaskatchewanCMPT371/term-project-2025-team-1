import { GraphInterface } from "./GraphInterface";
import { Point3DInterface } from "./PointInterface";

export interface EmbeddedInterface extends GraphInterface {
  // Dimension properties
  dimensions: {
    width: number;
    height: number;
    depth?: number; //for 3D graphs? Yes for 3D Graph
  };
  tao: number;
  points3D: Point3DInterface[];

  /**
   * Adds embedded point vectors to the graph.
   * pre-conditions: valid points exist in the csvDataObject of the graph
   * post-conditions: PointObject's containing the vectors are stored in the points array attribute
   */
  addPoints(): void;

  /**
   * Calculated the embedded time vector dimensions for the given time.
   * Uses the data set selected in the csvDataObject of the graph
   * Vector return is of the form [y[time], y[time - tao], y[time - 2*tao]] where y is the data set column selected
   * pre-conditions: time >= 0, csvDataObject must contain valid data set and a valid data set much be selected
   * post-conditions: none
   * @param time - the index/time of the data set calculating the vector for
   * @param csvData - the data contained in the csvDataObject of the graph
   *                - this is passed in instead of calling the method to obtain it to avoid uneccessary calls to the methods for every point being calculated
   * @returns an array contaning the coordinates of the vector in the form [x, y, z]
   */
  calculateVectorPosition(
    time: number,
    csvData: { key: Record<string, string | number> }[],
  ): [number, number, number];

  /**
   * gets the value of the currently seelcted column at the line specified in index
   * pre-conditions: csvData contains valid data, and the graph has a column selected that exists in the csv file
   * post-conditions: none
   * @param index line in csv file that contains the coordniate value being retreived
   * @param csvData - the data contained in the csvDataObject of the graph
   *                - this is passed in instead of calling the method to obtain it to avoid uneccessary calls to the methods for every point being calculated
   * @returns if index is >=0, the value at the index (line) of the csv in the column currently selected
   *          otherwise, 0
   */
  retreiveCoordinateValue(
    index: number,
    csvData: { key: Record<string, string | number> }[],
  ): number;

  /**
   * Gets the graph's dimensions
   * pre-condition: none
   * post-condition: returns the current dimensions object
   */
  getDimensions(): { width: number; height: number; depth?: number };

  /**
   * Sets the graph's dimensions
   * pre-condition: width and height must be positive numbers
   * post-condition: graph's dimensions are updated to the new values
   */
  setDimensions(width: number, height: number, depth?: number): void;

  /**
   * Gets the value of tao
   * pre-conditions: none
   * post-conditions: returns the current value of tao
   */
  getTao(): number;

  /**
   * Sets the value of tao
   * @param newTao - a number greater than or eqaul to 1
   * post-conditions: the value of tao is updated to newTao
   */
  setTao(newTao: number): void;
}
