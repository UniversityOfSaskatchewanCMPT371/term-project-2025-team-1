import { TimeSeriesGraphInterface } from "../../types/TimeSeriesGraphInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";
import { sendLog } from "../../logger-frontend";
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
   * @precondition a valid array of points
   * @postcondition returns the array of 2D points associated with the 2D Graph
   */
  getPoints2D(): Point2DInterface[] {
    return this.points2D;
  }

  /**
   * Get the number of ticks in the y-axis, the y range of the TimeSeriesGraph
   * @precondition none
   * @postconditions returns the y range of the axis
   */
  getYRangeLength(): number {
    return this.yRangeLength;
  }

  /**
   * Set the range of the y-axis in the Time Series Graph
   * @param num number to set YRange to
   * @precondition `num` parameter must be the highest value in the data set
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
   * @precondition GraphObject must have valid points
   * @postcondition new PointObjects are added to the graph
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
   * Finds a point based on given x and y data.
   * @param {string} xData The x-coordinate (string representation).
   * @param {number} yData The y-coordinate (numeric value).
   * @preconditions
   * - xData is a string
   * - yData is a number
   * @postcondition returns the corresponding Point instance if found, otherwise undefined.
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
   * @precondition none
   * @postcondition all points' selection status is updated
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

    // For larger data sets, it would be possible to create a case statement
    while (cur < this.axes.yRange[1]) {
      cur = cur + 10;
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
    // If theres only two Y headers, increment to new column not possible
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

    // Cycle to the beginning
    if (start == this.getCSVData().getCSVHeaders().length - 1) {
      if (
        this.getCSVData().getCSVHeaders()[0] !=
        this.getCSVData().getTimeHeader()
      ) {
        this.getCSVData().setYHeader(this.getCSVData().getCSVHeaders()[0]);
      } else {
        // Go to the next available header
        this.getCSVData().setYHeader(this.getCSVData().getCSVHeaders()[1]);
      }
      sendLog(
        "info",
        "incrementYHeader() was called and successfully incremented (TimeSeriesGraphObject.ts)",
      );
      return;
    }

    // If second to the last but last is the Time header, go to the start
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
    // If theres only two Y headers, increment to new column not possible
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

    // Cycle to the end
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
        // Go to the next available header
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

    // If second to the first but first is the Time header, go to the end
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
   * Update the graph when the model changes
   * @precondition whenver the model changes
   * @postcondition point positions are updated
   */
  updatePointPosition(): void {
    this.setRange();

    this.yRangeLength = this.timeSeriesYRange().length + 1;
    const totalSpace = 5;
    const divider = totalSpace / this.timeSeriesYRange().length;
    let current = -1.8 + divider / 2;

    // Resetting points
    this.points2D = [];
    this.getCSVData().clearPoints();
    this.getCSVData().populatePoints();
    this.addPoints();
    this.updatePoints();

    // Assigning new position values to the points
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

  /**
   * Retrieves the csv data of this graph
   * @precondition none
   * @postconditions returns {CSVDataObject} graph csv data
   */
  getCSVData(): CSVDataObject {
    return this.csvData;
  }

  /**
   * Retrieves all points in the graph.
   * @precondition none
   * @postconditions returns {PointInterface[]} Array of PointInterface instances.
   */
  get2DPoints(): Point2DObject[] {
    return this.points2D;
  }

  /**
   * Get number of points on the Graph
   * @precondition none
   * @postconditions returns number of points
   */
  getNumPoints(): number {
    return this.points2D.length;
  }

  /**
   * Get max range of the Y axis
   * @precondition none
   * @postconditions returns range of the Y axis
   */
  getYRange(): number {
    sendLog(
      "info",
      `getYRange returned ${this.axes.yRange[1]} (TimeSeriesGraphObject.ts)`,
    );
    return this.axes.yRange[1];
  }
}
