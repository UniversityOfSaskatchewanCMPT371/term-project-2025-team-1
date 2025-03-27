import { TimeSeriesGraphInterface } from "../../types/TimeSeriesGraphInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";
import { sendLog } from "../../logger-frontend";
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

    // If max is a float, convert it to an integer by rounding up.
    max = Math.ceil(max);

    while (max % 10 != 0) {
      max++;
    }

    this.axes.yRange[1] = max;
    sendLog(
      "info",
      `setRange() was called; yRange was set to ${this.axes.yRange[1]} (TimeSeriesGraphObject.ts)`,
    );
  }

  /**
   * The Y values that will be displayed on ticks of the Y axis
   * @precondition a set y axis range
   * @postconditions returns a number[] that is the values graph ticks
   */
  timeSeriesYRange(): number[] {
    const range: number[] = [];

    let cur = 0;
    let max = this.axes.yRange[1];

    //For larger data sets, it would be possible to create a switch statement
    //Since setRange() max is set to be divisible by 10, we might be able to divide by 10
    //and only have ten ticks in the y-axis
    switch (true) {
      case max <= 10:
        while (cur < max) {
          cur = cur + 1;
          range.push(cur);
        }
        break;
      case max <= 50:
        while (cur < max) {
          cur = cur + 10;
          range.push(cur);
        }
        break;
      default:
        while (cur < max) {
          cur = cur + 10;
          range.push(cur);
        }
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
    const totalSpace = 5;
    const divider = totalSpace / this.timeSeriesYRange().length;
    let current = -1.8 + divider / 2;

    //Resetting points
    this.points2D = [];
    this.getCSVData().clearPoints();
    this.getCSVData().populatePoints();
    this.addPoints();
    this.updatePoints();

    //Assigning new position values to the points
    this.getPoints2D().forEach((point) => {
      point.setXAxisPos(current);
      point.setYAxisPos(
        (point.getObject().getYData() / 100) *
          (this.getYRange() / this.timeSeriesYRange().length) -
          1,
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
   * Get max range of the Y axis
   * @precondition none
   * @postcondition range of the Y axis
   */
  getYRange(): number {
    sendLog(
      "info",
      `getYRange returned ${this.axes.yRange[1]} (TimeSeriesGraphObject.ts)`,
    );
    return this.axes.yRange[1];
  }
}
