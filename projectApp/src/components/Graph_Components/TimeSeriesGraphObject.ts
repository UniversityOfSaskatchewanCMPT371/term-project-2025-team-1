import { TimeSeriesGraphInterface } from "../../types/TimeSeriesGraphInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";
import { sendError, sendLog } from "../../logger-frontend";
import { Point2DObject } from "./Points/Point2DObject";
import { Point2DInterface } from "../../types/GraphPointsInterfaces";

/**
 * TimeSeriesGraphObject is a class that extends GraphObject
 * Holds attributes and methods required of a TimeSeriesGraph
 * @precondition A valid CSVDataObject
 * @postcondition Creates a Time Series Data Object
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
   * This methods gets the array of 2D Points
   * @precondition a valid array of points
   * @postcondition returns the array of 2D points associated with the 2D Graph
   */
  getPoints2D(): Point2DInterface[] {
    return this.points2D;
  }

  /**
   * This method gets the number of ticks in the y-axis, the y range of the TimeSeriesGraph
   * @precondition none
   * @postcondition returns the y range of the axis
   */
  getYRangeLength(): number {
    return this.yRangeLength;
  }

  /**
   * This method sets the range of the y-axis in the Time Series Graph
   * @precondition number parameter wchich is the highest value in hte data set
   * @postcondition On success, updates the y range to the new one
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
   * pre-codition: valid points in GraphObject
   * post-condition: a new PointInterface instance is added to the graph
   */
  addPoints(): void {
    this.points2D = [];
    this.getCSVData()
      .getPoints()
      .forEach((point) => {
        const newPoint = new Point2DObject(point);

        //Get Header by key then assign
        this.points2D.push(newPoint);
      });
    sendLog(
      "info",
      "addPoint() has added new points to the graph (TimeSeriesGraphObject.tss)",
    );
  }

  /**
   * Finds a point based on given x and y data.
   * pre-codition: xData is a string, yData is a number
   * post-condition: returns the corresponding Points instance if found, otherwise undefined
   * @param {string} xData - The x-coordinate (string representation).
   * @param {number} yData - The y-coordinate (numeric value).
   * @returns {PointInterface | undefined} The corresponding Points instance if found, otherwise undefined.
   */
  findPoint(xData: string, yData: number): Point2DObject | undefined {
    sendLog(
      "info",
      `findPoint() is searching for a point at ${xData}, ${yData} (TimeSeriesGraphObject.ts)`,
    );
    return this.points2D.find(
      (point) =>
        point.getObject().getTimeData() === xData &&
        point.getObject().getYData() === yData,
    );
  }

  /**
   * Updates all points' selection status.
   * If additional properties (like color) need updating, modify here.
   * pre-codition: none
   * post-condition: all points' selection status is updated
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
   * Sets the Y range of a time series graph
   * Increases each tick by 10, for larger data sets this could be tuned
   * @precondition valid CSV data object
   * @postcondition sets the max Y range of graph to the largest value of the csv data
   */
  setRange(): void {
    let max = 0;
    let min = 0;

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

  /**
   * The Y values that will be displayed on ticks of the Y axis
   * @precondition a set y axis range
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
   * @precondition requires x data of csv data
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
   * Increment Y header
   * @precondition nonde
   * @postcondition Y header increments/changes properly
   */
  incrementYHeader(): void {
    //If theres only two Y headers, increment to new column not possible
    if (this.getCSVData().getCSVHeaders().length < 3) {
      sendLog(
        "info",
        "incrementYHeader() was called but no changes were made (length < 3) (TimeSeriesGraphObject.ts)",
      );
      return;
    }

    let start = this.getCSVData()
      .getCSVHeaders()
      .indexOf(this.getCSVData().getYHeader());

    //Cycle to the beginning
    if (start == this.getCSVData().getCSVHeaders().length - 1) {
      if (
        this.getCSVData().getCSVHeaders()[0] !=
        this.getCSVData().getTimeHeader()
      ) {
        this.getCSVData().setYHeader(this.getCSVData().getCSVHeaders()[0]);
      } else {
        //Go to the next available header
        this.getCSVData().setYHeader(this.getCSVData().getCSVHeaders()[1]);
      }
      sendLog(
        "info",
        "incrementYHeader() was called and successfully incremented (TimeSeriesGraphObject.ts)",
      );
      return;
    }

    //If second to the last but last is the Time header, go to the start
    if (
      start == this.getCSVData().getCSVHeaders().length - 2 &&
      this.getCSVData().getCSVHeaders()[
        this.getCSVData().getCSVHeaders().length - 1
      ] == this.getCSVData().getTimeHeader()
    ) {
      this.getCSVData().setYHeader(this.getCSVData().getCSVHeaders()[0]);
      sendLog(
        "info",
        "incrementYHeader() was called and successfully incremented (TimeSeriesGraphObject.ts)",
      );
      return;
    }

    for (start; start < this.getCSVData().getCSVHeaders().length; start++) {
      if (
        this.getCSVData().getCSVHeaders()[start] !=
          this.getCSVData().getTimeHeader() &&
        this.getCSVData().getCSVHeaders()[start] !=
          this.getCSVData().getYHeader()
      ) {
        this.getCSVData().setYHeader(this.getCSVData().getCSVHeaders()[start]);
        return;
      }
    }
  }

  /**
   * Decrement Y header
   * @precondition nonde
   * @postcondition Y header decrements/changes properly
   */
  decrementYHeader(): void {
    //If theres only two Y headers, increment to new column not possible
    if (this.getCSVData().getCSVHeaders().length < 3) {
      sendLog(
        "info",
        "decrementYHeader() was called but no changes were made (length < 3) (TimeSeriesGraphObject.ts)",
      );
      return;
    }

    let start = this.getCSVData()
      .getCSVHeaders()
      .indexOf(this.getCSVData().getYHeader());

    //Cycle to the end
    if (start == 0) {
      if (
        this.getCSVData().getCSVHeaders()[
          this.getCSVData().getCSVHeaders().length - 1
        ] != this.getCSVData().getTimeHeader()
      ) {
        this.getCSVData().setYHeader(
          this.getCSVData().getCSVHeaders()[
            this.getCSVData().getCSVHeaders().length - 1
          ],
        );
      } else {
        //Go to the next available header
        this.getCSVData().setYHeader(
          this.getCSVData().getCSVHeaders()[
            this.getCSVData().getCSVHeaders().length - 2
          ],
        );
      }
      sendLog(
        "info",
        "decrementYHeader() was called and successfully deccremented (TimeSeriesGraphObject.ts)",
      );
      return;
    }

    //If second to the first but first is the Time header, go to the end
    if (
      start == 1 &&
      this.getCSVData().getCSVHeaders()[0] == this.getCSVData().getTimeHeader()
    ) {
      this.getCSVData().setYHeader(
        this.getCSVData().getCSVHeaders()[
          this.getCSVData().getCSVHeaders().length - 1
        ],
      );
      sendLog(
        "info",
        "decrementYHeader() was called and successfully deccremented (TimeSeriesGraphObject.ts)",
      );
      return;
    }

    for (start; start > 0; start--) {
      if (
        this.getCSVData().getCSVHeaders()[start] !=
          this.getCSVData().getYHeader() &&
        this.getCSVData().getCSVHeaders()[start] !=
          this.getCSVData().getTimeHeader()
      ) {
        this.getCSVData().setYHeader(this.getCSVData().getCSVHeaders()[start]);
        return;
      }
    }
  }

  /**
   * This is used to update the graph when the model changes
   */
  updatePointPosition(): void {
    this.setRange();

    this.yRangeLength = this.timeSeriesYRange().length + 1;
    const totalSpace = 6.38;
    const divider = totalSpace / this.getNumPoints();
    const ySpacing = 100 / this.getYRangeLength();
    let current = -2.62 + divider / 2;

    //Resetting points
    this.points2D = [];
    this.getCSVData().clearPoints();
    this.getCSVData().populatePoints();
    this.addPoints();
    this.updatePoints();

    //Assigning new position values to the points
    this.getPoints2D().forEach((point) => {
      point.setXAxisPos(current);
      /**
       * This basically arranges point position in the Y axis,
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

  getCSVData() {
    return this.csvData;
  }

  /**
   * Retrieves all points in the graph.
   * pre-codition: none
   * post-condition: returns an array of PointInterface instances
   * @returns {PointInterface[]} Array of PointInterface instances.
   */
  get2DPoints(): Point2DObject[] {
    return this.points2D;
  }

  /**
   * Get number of points on the Graph
   * @precondition none
   * @postcondition return number of points
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
