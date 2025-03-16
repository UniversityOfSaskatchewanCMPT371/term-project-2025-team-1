import { sendError, sendLog } from "../../logger-frontend";
import { EmbeddedInterface } from "../../types/EmbeddedInterface";
import { Point3DInterface } from "../../types/PointInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";
import { PointObject } from "./Points/PointObject";

/**
 * EmbeddedGraphObject is a class that extends GraphObject and implements the EmbeddedInterface
 * Holds attributes and methods required of a EmbeddedGraph
 * @preconditions A valid CSVDataObject
 * @postconditions Creates a new EmbeddedGraph Object
 */
export class EmbeddedGraphObject
  extends GraphObject
  implements EmbeddedInterface
{
  tao: number;
  points3D: Point3DInterface[];

  constructor(csv: CSVDataObject) {
    super(csv);
    this.tao = 1;
    this.points3D = [];
  }

  /**
   * Adds embedded point vectors to the graph.
   * pre-conditions: valid points exist in the csvDataObject of the graph
   * post-conditions: PointObject's containing the vectors are stored in the points array attribute
   */
  addPoints(): void {
    const data = this.csvData.getData();
    data.forEach((line) => {
      const newPoint = new PointObject();
      // gets the time of the current line in the data set
      const time = line[
        this.csvData.getTimeHeader() as keyof typeof line
      ] as unknown as number;

      // calculates the vector and stores it in the position attribute of a new PointObject
      const vectorPosition = this.calculateVectorPosition(time, data);
      //newPoint.setPosition(vectorPosition);
      //this.points.push(newPoint);
    });
    sendLog(
      "info",
      "Points added to EmbeddedGraphObject (EmbeddedGraphObject.addPoints())",
    );
  }

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
  ): [number, number, number] {
    if (time < 0) {
      const e = new Error("time must be >= 0");
      sendError(
        e,
        `Error in calculateVectorPosition - got ${time}, expected: a number greater than or equal to 0`,
      );
      throw e;
    }

    const position: [number, number, number] = [0, 0, 0];

    // calculate the indexes for the 3 coordinates
    const xIndex = time;
    const yIndex = time - this.tao;
    const zIndex = time - 2 * this.tao;

    // gets the value of the specified indices from the csvData set
    position[0] = this.retreiveCoordinateValue(xIndex, csvData);
    position[1] = this.retreiveCoordinateValue(yIndex, csvData);
    position[2] = this.retreiveCoordinateValue(zIndex, csvData);

    sendLog(
      "info",
      `vector position calculated for data at index/time ${time} (EmbeddedGraphObject.calculateVectorPosition())`,
    );
    return position;
  }

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
  ): number {
    if (index < 0) {
      return 0;
    } else {
      //const line: { key: Record<string, string | number> } = csvData[index];
      // const position = line[
      //   this.axes.yLabel as keyof typeof line
      // ] as unknown as number;
      return 0;
    }
  }

  /**
   * gets the dimensions of the graph
   * @preconditions none
   * @returns the current dimensions of the graph
   */
  getDimensions(): { width: number; height: number; depth?: number } {
    return this.dimensions;
  }

  /**
   * Sets the dimenstion of the graph to the new values
   * @preconditions all given dimenstions must be valid numbers for the dimensions of a graph
   * @postconditions the dimension attribute of the graphis updated to contain the given values
   * @param width the new width of the graph
   * @param height the new height of the graph
   * @param depth thew new depth of the graph
   */
  setDimensions(width: number, height: number, depth?: number): void {
    const newDimensions = { width: width, height: height, depth: depth };
    this.dimensions = newDimensions;
  }

  /**
   * Gets the value of tao
   * pre-conditions: none
   * post-conditions: returns the current value of tao
   */
  getTao(): number {
    return this.tao;
  }

  /**
   * Sets the value of tao
   * @param newTao - a number greater than or eqaul to 1
   * post-conditions: the value of tao is updated to newTao
   */
  setTao(newTao: number): void {
    if (newTao < 1) {
      const e = new TypeError("Tao must be greater than or equal to 1");
      sendError(
        e,
        `Error in setTao, ${newTao} is not greater than or equal to 1`,
      );
      throw e;
    }

    this.tao = newTao;
    sendLog(
      "info",
      `value of tao in EmbeddedGraphObject updated to the value ${newTao}`,
    );
  }
}
