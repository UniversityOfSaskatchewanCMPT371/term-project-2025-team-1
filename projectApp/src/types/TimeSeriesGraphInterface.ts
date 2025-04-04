import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { Point2DObject } from "../components/Graph_Components/Points/Point2DObject";
import { GraphInterface } from "./GraphInterface";
import { Point2DInterface } from "./GraphPointsInterfaces";

/**
 * Interface for enhanced graph objects with additional point manipulation capabilities.
 * @extends GraphInterface extends basic GraphInterface with point-specific operations.
 */
export interface TimeSeriesGraphInterface extends GraphInterface {
  /**
   * Get the array of 2D Points
   * @preconditions a valid array of points
   * @postconditions returns the array of 2D points associated with the 2D Graph
   */
  getPoints2D(): Point2DInterface[];

  /**
   * Get the number of ticks in the y-axis, the y range of the TimeSeriesGraph
   * @preconditions none
   * @postconditions returns the y range of the axis
   */
  getYRangeLength(): number;
  
  /**
   * Set the range of the y-axis in the Time Series Graph
   * @param num number to set YRange to
   * @preconditions `num` parameter must be the highest value in the data set
   * @postconditions On success, updates the y range to the new one
   */
  setYRangeLength(num: number): void;

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
   * Sets the Y range of a time series graph.
   * Increases each tick by 10, for larger data sets this could be tuned
   * @preconditions valid CSV data object
   * @postconditions sets the max Y range of graph to the largest value of the csv data
   */
  setRange(): void;

  /**
   * The Y values that will be displayed on ticks of the Y axis
   * @preconditions a set y axis range
   * @postconditions returns a number[] that is the values graph ticks
   */
  timeSeriesYRange(): number[];

  /**
   * The number of X values that will be displayed on ticks of the X axis
   * @preconditions requires x data of csv data
   * @postconditions returns a string[] that is displayed on x axis
   */
  timeSeriesXRange(): string[];

  /**
   * Update the graph when the model changes
   * @preconditions whenver the model changes
   * @postconditions point positions are updated
   */
  updatePointPosition(): void;

  /**
   * Retrieves the csv data of this graph
   * @preconditions none
   * @postconditions returns {CSVDataObject} graph csv data
   */
  getCSVData(): CSVDataObject;

  /**
   * Get number of points on the Graph
   * @preconditions none
   * @postconditions returns number of points
   */
  getNumPoints(): number;

  /**
   * Gets the total range of the Y axis
   * @precondition none
   * @postcondition total range of the Y axis
   */
  getTotalYRange(): number;

  /**
   * Get max range of the Y axis
   * @precondition none
   * @postcondition max range of the Y axis
   */
  getMaxYRange(): number;

  /**
   * Get min range of the Y axis
   * @precondition none
   * @postcondition min range of the Y axis
   */
  getMinYRange(): number;

  /**
   * Sets the interval for the x-axis of the Time Series Graph in order to deal with large data sets
   * @precondition a valid array of time lables, the length cannot be 0
   * @postcondition On success, sets the interval for the x-axis in the Time Series Graph
   *
   * @param range the array of time labels in the csv file
   * @returns the interval to be used in the x-axis of the Time Series Graph
   */
  intervalForXAxis(range: string[]): number;

  /**
   * Gets all points in the graph
   * @preconditions none
   * @postconditions returns {PointObject[]} Array of points in the graph
   */
  get2DPoints(): Point2DObject[];
}
