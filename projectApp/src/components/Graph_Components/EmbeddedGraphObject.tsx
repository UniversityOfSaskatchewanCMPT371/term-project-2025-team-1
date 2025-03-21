import { sendError, sendLog } from "../../logger-frontend";
import { EmbeddedInterface } from "../../types/EmbeddedInterface";
import { Point3DInterface } from "../../types/GraphPointsInterfaces";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";
import { Point3DObject } from "./Points/Point3DObject";

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
  tau: number;
  points3D: Point3DInterface[];

  constructor(csv: CSVDataObject) {
    super(csv);
    this.tau = 1;
    this.points3D = [];
  }

  /**
   * Adds embedded point vectors to the graph.
   * pre-conditions: valid points exist in the csvDataObject of the graph
   * post-conditions: PointObject's containing the vectors are stored in the points array attribute
   */
  addPoints(): void {
    const data = this.csvData.getData();
    let time = 0;

    this.setRange();
    this.getCSVData()
      .getPoints()
      .forEach((point) => {
        const newPoint = new Point3DObject(point);

        // calculates the vector and stores it in the position attribute of a new PointObject
        const vectorPosition = this.calculateVectorPosition(time, data);
        newPoint.setPoint3DPosition(vectorPosition);

        time++;
        this.points3D.push(newPoint);
      });
    sendLog(
      "info",
      "Points added to EmbeddedGraphObject (EmbeddedGraphObject.addPoints())",
    );
  }

  updatePoints(): void {
    this.points3D.forEach((point) => {
      point.getObject().setSelected(false); // Update selection status
      // TODO: Add color update logic if necessary
    });
    sendLog(
      "info",
      "all points have been unselected (EmbeddedGraphObject.tsx)",
    );
  }

  /**
   * Calculated the embedded time vector dimensions for the given time.
   * Uses the data set selected in the csvDataObject of the graph
   * Vector return is of the form [y[time], y[time - tau], y[time - 2*tau]] where y is the data set column selected
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
    const yIndex = time - this.tau;
    const zIndex = time - 2 * this.tau;

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
      const line: { key: Record<string, string | number> } = csvData[index];
      const position = line[
        this.getCSVData().getYHeader() as keyof typeof line
      ] as unknown as number;
      return position;
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
   * Gets the value of tau
   * pre-conditions: none
   * post-conditions: returns the current value of tau
   */
  getTau(): number {
    return this.tau;
  }

  /**
   * Sets the value of tau
   * @param newTau - a number greater than or eqaul to 1
   * pre-condition: a valid tau value
   * post-conditions: the value of tau is updated to newTau
   */
  setTau(newTau: number): void {
    if (newTau < 1) {
      const e = new TypeError("Tau must be greater than or equal to 1");
      sendError(
        e,
        `Error in setTau, ${newTau} is not greater than or equal to 1`,
      );
      throw e;
    }

    this.tau = newTau;
    sendLog(
      "info",
      `value of tau in EmbeddedGraphObject updated to the value ${newTau}`,
    );
  }

  /**
   * This method gets the points in the 3D Embedded Graph
   * @precondition a non-empty array of 3d points
   * @postcondition returns the 3d points of the Embedded Graph
   */

  getPoints3D(): Point3DInterface[] {
    if (this.points3D.length <= 0) {
      throw new Error("Uninitialized 3d points (EmbeddedGraphObject.ts)");
    }
    return this.points3D;
  }

  /**
   * This methods gets the max range of the csv data file that will be used on the 3d embedded graph
   * @precondition the max range must be greater than the min range
   * @postcondition the range of the csv data set
   */
  getRange(): number {
    if (this.axes.yRange[0] >= this.axes.yRange[1]) {
      throw new Error("Invalid max yRange set (EmbeddedGraphObject.ts)");
    }
    return this.axes.yRange[1];
  }

  /**
   * Sets the max range that will be used on the 3d Embedded graph
   * @precondition a valid non-null data set of the csv file
   * @postcondition sets the max range used in the 3d Embedded graph
   */
  setRange(): void {
    if (this.getCSVData().getData().length <= 0) {
      throw new Error(
        "Uninitialized csv data attribute. (EmbeddedGraphObject.ts)",
      );
    }

    let max = 0;
    this.getCSVData()
      .getData()
      .forEach((data) => {
        if (
          (data[
            this.getCSVData().getYHeader() as keyof typeof data
          ] as unknown as number) >= max
        ) {
          max = data[
            this.getCSVData().getYHeader() as keyof typeof data
          ] as unknown as number;
        }
      });

    this.axes.yRange[1] = max;
    sendLog(
      "info",
      `setRange() was called; yRange was set to ${this.axes.yRange[1]} (EmbeddedGraphObject.tsx)`,
    );
  }

  /**
   * This is used to update the 3D embedded graph
   */
  updateEmbeddedPoints(): void{
    this.points3D = [];
    //The csv data points are already being cleared on TimeSeries updatePointPosition()
    this.addPoints();
  }
}
