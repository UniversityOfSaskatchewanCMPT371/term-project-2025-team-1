import { TimeSeriesGraphInterface } from "../../types/TimeSeriesGraphInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";
import { sendError, sendLog } from "../../logger-frontend";
import { Point2DObject } from "./Points/Point2DObject";
import { Point2DInterface } from "../../types/GraphPointsInterfaces";

/**
 * TimeSeriesGraphObject is a class that extends GraphObject
 *
 * Holds attributes and methods required of a TimeSeriesGraph
 * @history
 * - This inhenrits the history properties of `GraphObject`
 * - The 'points2D' property is initialized as an empty set.
 * - The 'yRangeLength' is initialized as 0.
 */
export class TimeSeriesGraphObject
  extends GraphObject
  implements TimeSeriesGraphInterface
{
  points2D: Point2DObject[];
  yRangeLength: number;
  constructor(csv: CSVDataObject) {
    super(csv);
    this.points2D = [];
    this.yRangeLength = 0;
  }

  /**
   * Get the array of 2D Points
   * @preconditions a valid array of points
   * @postconditions returns the array of 2D points associated with the 2D Graph
   */
  getPoints2D(): Point2DInterface[] {
    return this.points2D;
  }

  /**
   * Get the number of ticks in the y-axis, the y range of the TimeSeriesGraph
   * @preconditions none
   * @postconditions returns the y range of the axis
   */
  getYRangeLength(): number {
    return this.yRangeLength;
  }

  /**
   * Set the range of the y-axis in the Time Series Graph
   * @param num number to set YRange to
   * @preconditions `num` parameter must be the highest value in the data set
   * @postconditions On success, updates the y range to the new one
   */
  setYRangeLength(num: number): void {
    this.yRangeLength = num;

    sendLog(
      "info",
      `setYRangeLength() was called on TimeSeriesGraphObject (TimeSeriesGraphObject.ts)`,
    );
  }

  /**
   * Adds a new point to the graph.
   * @preconditions GraphObject must have valid points
   * @postconditions new PointObjects are added to the graph
   */
  addPoints(): void {
    this.points2D = [];
    this.getCSVData()
      .getPoints()
      .forEach((point) => {
        const newPoint = new Point2DObject(point);

        // Get Header by key then assign
        this.points2D.push(newPoint);
      });
    sendLog(
      "info",
      "addPoint() has added new points to the graph (TimeSeriesGraphObject.tss)",
    );
  }

  /**
   * Updates all points' selection status.
   * @preconditions none
   * @postconditions all points' selection status is updated
   */
  updatePoints(): void {
    this.points2D.forEach((point) => {
      point.getObject().setSelected(false); // Update selection status
      // TODO: Add color update logic if necessary
    });
    sendLog(
      "info",
      "all points have been unselected (TimeSeriesGraphObject.ts)",
    );
  }

  /**
   * Sets the Y range of a time series graph.
   * Increases each tick by 10, for larger data sets this could be tuned
   * @preconditions valid CSV data object
   * @postconditions sets the max Y range of graph to the largest value of the csv data
   */
  setRange(): void {
    let max = 0;
    let min = 0;
    if (this.getCSVData().isFirstDifferencing) {
      this.getCSVData()
        .calculateFirstDifferencingValues()
        .forEach((data) => {
          if (data > max) {
            max = data;
          }
          if (data < min || min === 0) {
            min = data;
          }
        });
      // If max is a float, convert it to an integer by rounding up.
      max = Math.ceil(max / 10) * 10;
      min = Math.floor(min / 10) * 10;

      this.axes.yRange[1] = max;
      this.axes.yRange[0] = min;
      sendLog(
        "info",
        `setRange() was called; max yRange set to ${this.getMaxYRange()}, min yRange set to ${this.getMinYRange()} (TimeSeriesGraphObject.ts)`,
      );
    } else {
      this.getCSVData()
        .getData()
        .forEach((data) => {
          const val = data[
            this.getCSVData().getYHeader() as keyof typeof data
          ] as unknown as number;
          if (val > max) {
            max = val;
          }

          if (val < min || min === 0) {
            min = val;
          }
        });

      // If max is a float, convert it to an integer by rounding up.
      max = Math.ceil(max / 10) * 10;
      min = Math.floor(min / 10) * 10;

      this.axes.yRange[1] = max;
      this.axes.yRange[0] = min;
      sendLog(
        "info",
        `setRange() was called; max yRange set to ${this.getMaxYRange()}, min yRange set to ${this.getMinYRange()} (TimeSeriesGraphObject.ts)`,
      );
    }
  }

  /**
   * The Y values that will be displayed on ticks of the Y axis
   * @preconditions a set y axis range
   * @postconditions returns a number[] that is the values graph ticks
   */
  timeSeriesYRange(): number[] {
    const range: number[] = [];
    const spacing = this.getTotalYRange() / 10;

    let cur = this.getMinYRange();
    let next = this.getMinYRange() + spacing;

    while (cur < this.getMaxYRange()) {
      cur = next;
      next = next + spacing;
      range.push(cur);
    }

    sendLog(
      "info",
      `timeSeriesYRange() returned ${range} (TimeSeriesGraphObject.ts)`,
    );

    return range;
  }

  /**
   * The number of X values that will be displayed on ticks of the X axis
   * @preconditions requires x data of csv data
   * @postconditions returns a string[] that is displayed on x axis
   */
  timeSeriesXRange(): string[] {
    const range: string[] = [];

    this.getCSVData()
      .getData()
      .forEach((data) => {
        const temp = data[
          this.getCSVData().getTimeHeader() as keyof typeof data
        ] as unknown as string;
        range.push(temp);
      });
    sendLog(
      "info",
      `timeSeriesXRange() was called and returned ${range} (TimeSeriesGraphObject.ts)`,
    );
    return range;
  }

  /**
   * Update the graph when the model changes
   * @preconditions whenver the model changes
   * @postconditions point positions are updated
   */
  updatePointPosition(): void {
    this.setRange();

    this.yRangeLength = this.timeSeriesYRange().length + 1;
    const totalSpace = 6.38;
    const divider = totalSpace / this.getNumPoints();
    const ySpacing = 100 / this.getYRangeLength();
    let current = -2.62 + divider / 2;

    // Resetting points
    this.points2D = [];
    this.getCSVData().clearPoints();
    this.getCSVData().populatePoints();
    this.addPoints();
    this.updatePoints();

    // Assigning new position values to the points
    this.getPoints2D().forEach((point) => {
      point.setXAxisPos(current);

      /**
       * Arranges the point position in the Y axis,
       * Takes the Point data and then translates it to its position on the graph container
       *
       * Data value - minimum range / total range (which is max range - min range)
       * Then translates its position to the graph
       * maximum height of graph = 1.45
       * ySpacing = container of a 2D graph y-axis point in percent form, we then scale it
       * minimum height of graph = 1.05
       */
      point.setYAxisPos(
        ((point.getObject().getYData() - this.getMinYRange()) /
          this.getTotalYRange()) *
          (1.45 - (ySpacing / 100) * 2 + 1.05) -
          1.05,
      );

      current += divider;
    });
    sendLog(
      "info",
      "updatePointPosition() has been called to update the graph (TimeSeriesGraphObject.ts)",
    );
  }

  /**
   * Retrieves the csv data of this graph
   * @preconditions none
   * @postconditions returns {CSVDataObject} graph csv data
   */
  getCSVData(): CSVDataObject {
    return this.csvData;
  }

  /**
   * Retrieves all points in the graph.
   * @preconditions none
   * @postconditions returns {PointInterface[]} Array of PointInterface instances.
   */
  get2DPoints(): Point2DObject[] {
    return this.points2D;
  }

  /**
   * Get number of points on the Graph
   * @preconditions none
   * @postconditions returns number of points
   */
  getNumPoints(): number {
    return this.points2D.length;
  }

  /**
   * Gets the total range of the Y axis
   * @precondition none
   * @postcondition total range of the Y axis
   */
  getTotalYRange(): number {
    sendLog(
      "info",
      `getTotalYRange returned ${this.axes.yRange[1] - this.axes.yRange[0]} (TimeSeriesGraphObject.ts)`,
    );
    return this.axes.yRange[1] - this.axes.yRange[0];
  }

  /**
   * Get max range of the Y axis
   * @precondition none
   * @postcondition max range of the Y axis
   */
  getMaxYRange(): number {
    sendLog(
      "info",
      `getMaxYRange returned ${this.axes.yRange[1]} (TimeSeriesGraphObject.ts)`,
    );
    return this.axes.yRange[1];
  }

  /**
   * Get min range of the Y axis
   * @precondition none
   * @postcondition min range of the Y axis
   */
  getMinYRange(): number {
    sendLog(
      "info",
      `getMinYRange returned ${this.axes.yRange[0]} (TimeSeriesGraphObject.ts)`,
    );
    return this.axes.yRange[0];
  }

  /**
   * Sets the interval for the x-axis of the Time Series Graph in order to deal with large data sets
   * @precondition a valid array of time lables, the length cannot be 0
   * @postcondition On success, sets the interval for the x-axis in the Time Series Graph
   *
   * @param range the array of time labels in the csv file
   * @returns the interval to be used in the x-axis of the Time Series Graph
   */
  intervalForXAxis(range: string[]): number {
    try {
      if (range.length <= 0) {
        const error = new Error("Invalid array of time labels");
        throw error;
      } else if (range.length >= 500) {
        sendLog(
          "warn",
          "Loading an extremely large data set intervalForXAxis() on TimeSeriesGraphObject.ts",
        );
      }
      let interval;

      if (range.length <= 5) {
        interval = 1;
      } else if (range.length > 5 && range.length <= 10) {
        interval = Math.ceil(range.length / 8);
      } else {
        interval = Math.floor(range.length / 4);
      }

      return interval;
    } catch (error: unknown) {
      sendError(
        error,
        "Error occurs in setting the interval for the x-axis of the Time Series Graph (TimeSeriesGraphObject.ts)",
      );
      throw error;
    }
  }
}
