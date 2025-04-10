import { sendError, sendLog } from "../../logger-frontend";
import { EmbeddedInterface } from "../../types/EmbeddedInterface";
import { Point3DInterface } from "../../types/GraphPointsInterfaces";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";
import { Point3DObject } from "./Points/Point3DObject";

/**
 * EmbeddedGraphObject is a class that extends `GraphObject` and implements `EmbeddedInterface`
 *
 * Holds attributes and methods required of a EmbeddedGraph
 * @history
 * - This inhenrits the history properties of `GraphObject`
 * - The 'tau' property is initialized as 1.
 * - The 'points3D' is initialized as an empty set.
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
   * @preconditions this graph's csv is a valid non-null data set
   * @postconditions the points3D array now contains PointObjects for each point in the csv data
   */
  addPoints(): void {
    let time = 0;
    this.setRange();

    const data = this.getCSVData().getData();
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
      "trace",
      "Points added to EmbeddedGraphObject (EmbeddedGraphObject.addPoints())",
    );
  }

  updatePoints(): void {
    this.points3D.forEach((point) => {
      point.getObject().setSelected(false); // Update selection status
    });
    sendLog(
      "trace",
      "all points have been unselected (EmbeddedGraphObject.ts)",
    );
  }

  /**
   * Calculated the embedded time vector dimensions for the given time.
   * - Uses the data set selected in the csvDataObject of the graph.
   * - Vector return is of the form [y[time], y[time - tau], y[time - 2*tau]] where y is the data set column selected
   *
   * @param time the index/time of the data set calculating the vector for
   * @param csvData the data contained in the csvDataObject of the graph
   * - this is passed in instead of calling the method to obtain it to avoid uneccessary calls to the methods for every point being calculated
   * - for [data[time], data[time - tau], data[time - 2*tau]] of the selected data column
   * @preconditions
   * - `time` >= 0
   * - `csvDataObject` must contain valid data set and a valid data set much be selected
   * @postconditions returns an array contaning the coordinates of the vector in the form [x, y, z]
   */
  calculateVectorPosition(
    time: number,
    csvData: { key: Record<string, string | number> }[],
  ): [number, number, number] {
    // assert that time is non-negative
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
      "debug",
      `vector position calculated for data at index/time ${time} (EmbeddedGraphObject.calculateVectorPosition())`,
    );
    return position;
  }

  /**
   * gets the value of the currently seelcted column at the line specified in index
   * @param index line in csv file that contains the coordniate value being retreived
   * @param csvData the data contained in the csvDataObject of the graph
   * - this is passed in instead of calling the method to obtain it to avoid uneccessary calls to the methods for every point being calculated
   * @preconditions
   * - `csvData` contains valid data
   * - the graph has a column selected that exists in the csv file
   * @postconditions
   * - if `index` is >=0, the value at the index (line) of the csv in the column currently selected
   * - otherwise, 0
   */
  retreiveCoordinateValue(
    index: number,
    csvData: { key: Record<string, string | number> }[],
  ): number {
    if (index < 0) {
      return 0;
    } else {
      if (this.getCSVData().getIsFirstDifferencing()) {
        return this.getCSVData().calculateFirstDifferencingValues()[index];
      } else {
        const line: { key: Record<string, string | number> } = csvData[index];
        const position = line[
          this.getCSVData().getYHeader() as keyof typeof line
        ] as unknown as number;
        return position;
      }
    }
  }

  /**
   * Gets the value of tau
   * @preconditions none
   * @postconditions returns the current value of tau
   */
  getTau(): number {
    return this.tau;
  }

  /**
   * Sets the value of tau
   * @param newTau a number greater than or equal to 1
   * @preconditions `newTau` is a positive number
   * @postconditions the value of tau is updated to newTau
   */
  setTau(newTau: number): void {
    // assert that new tau is non-negative
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
      "debug",
      `value of tau in EmbeddedGraphObject updated to the value ${newTau}`,
    );
  }

  /**
   * Get the points in the 3D Embedded Graph
   * @preconditions a non-empty array of 3d points
   * @postconditions returns the 3d points of the Embedded Graph
   */

  getPoints3D(): Point3DInterface[] {
    // assert that points3D is not empty
    if (this.points3D.length <= 0) {
      const error = new RangeError("Invalid Points 3D");
      sendError(error, "Uninitialized 3d points (EmbeddedGraphObject.ts)");
      throw error;
    }
    return this.points3D;
  }

  /**
   * Get the max range of the csv data file that will be used on the 3d embedded graph
   * @preconditions none
   * @postconditions the max range of the csv data set
   */
  getMaxRange(): number {
    return this.axes.yRange[1];
  }

  /**
   * Get the min range of the csv data file that will be used on the 3d embedded graph
   * @preconditions none
   * @postconditions the min range of the csv data set
   */
  getMinRange(): number {
    return this.axes.yRange[0];
  }

  /**
   * Get the total range of the csv data file that will be used on the 3d embedded graph
   * @preconditions the max range must be larger than min range
   * @postconditions the total range of the csv data set
   */
  getTotalRange(): number {
    if (this.axes.yRange[1] < this.axes.yRange[0]) {
      const error = new Error("Max range must be greater than the min range");
      sendError(error, "Total Range error in EmbeddedGraphObject.ts");
      throw error;
    }
    return this.axes.yRange[1] - this.axes.yRange[0];
  }

  /**
   * Sets the maximum and the minimum range that will be used on the 3d Embedded graph
   * @preconditions this graph's csv is a valid non-null data set
   * @postconditions sets the maximum and minimum range used in the 3D Embedded graph
   */
  setRange(): void {
    // assert that csv data is not empty
    if (this.getCSVData().getData().length <= 0) {
      const error = new RangeError("Invalid CSV Data Objects");
      sendError(
        error,
        "Uninitialized csv data attribute. (EmbeddedGraphObject.ts)",
      );
      throw error;
    }

    let max = 0;
    let min = 0;

    //If first differencing is enabled, set the range using the calculated differencing values
    if (this.getCSVData().getIsFirstDifferencing()) {
      this.getCSVData()
        .calculateFirstDifferencingValues()
        .forEach((data, index) => {
          if (data > max) {
            max = data;
          }
          if (data < min || index === 0) {
            min = data;
          }
        });
    } else {
      //If first differencing is disabled, set the ranges using the data set provided by the csv file
      this.getCSVData()
        .getData()
        .forEach((data, index) => {
          const val = data[
            this.getCSVData().getYHeader() as keyof typeof data
          ] as unknown as number;
          if (val > max) {
            max = val;
          }
          if (val < min || index == 0) {
            min = val;
          }
        });
    }

    // If max is a float, convert it to an integer by rounding up.
    max = Math.ceil(max / 10) * 10;
    min = Math.floor(min / 10) * 10;

    this.axes.yRange[1] = max;
    this.axes.yRange[0] = min;
    sendLog(
      "debug",
      `setRange() was called; yRange was set to ${this.axes.yRange[1]} (EmbeddedGraphObject.ts)`,
    );
  }

  /**
   * Update the 3D embedded graph
   * @preconditions this graph's csv is a valid non-null data set
   * @postconditions the graph is cleared and updated with new points
   */
  updateEmbeddedPoints(): void {
    this.points3D = [];

    // The csv data points are already being cleared on TimeSeries updatePointPosition()
    this.addPoints();
    sendLog(
      "trace",
      `UpdateEmbeddedPoints() was called; 3D points in the Embedded Graph updated (EmbeddedGraphObject.ts)`,
    );
  }
}
