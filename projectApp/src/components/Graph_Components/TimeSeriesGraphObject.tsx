import { TimeSeriesGraphInterface } from "../../types/TimeSeriesGraphInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";
import { PointObject } from "./PointObject";
import { sendLog } from "../../logger-frontend";

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
  constructor(csv: CSVDataObject) {
    super(csv);
  }

  // TODO - refactor point methods to GraphObject as both TimeSeries and Embedded graphs will use same point objects
  /**
   * Adds a new point to the graph.
   * pre-codition: valid points in GraphObject
   * post-condition: a new PointInterface instance is added to the graph
   */
  addPoints(): void {
    this.csvData.getData().forEach((data) => {
      const newPoint = new PointObject();
      newPoint.setPosition([0, 0, 0.01]);

      newPoint.setXData(
        data[this.axes.xLabel as keyof typeof data] as unknown as string,
      );
      newPoint.setYData(
        data[this.axes.yLabel as keyof typeof data] as unknown as number,
      );

      //Get Header by key then assign
      this.points.push(newPoint);
    });
    sendLog(
      "info",
      "addPoint() has added new points to the graph (TimeSeriesGraphClass.tsx)",
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
  findPoint(xData: string, yData: number): PointObject | undefined {
    sendLog(
      "info",
      `findPoint() is searching for a point at ${xData}, ${yData} (TimeSeriesGraphClass.tsx)`,
    );
    return this.points.find(
      (point) => point.getXData() === xData && point.getYData() === yData,
    );
  }

  /**
   * Updates all points' selection status.
   * If additional properties (like color) need updating, modify here.
   * pre-codition: none
   * post-condition: all points' selection status is updated
   */
  updatePoints(): void {
    this.points.forEach((point) => {
      point.setSelected(false); // Update selection status
      // TODO: Add color update logic if necessary
    });
    sendLog(
      "info",
      "all points have been unselected (TimeSeriesGraphClass.tsx)",
    );
  }

  /**
   * Sets the Y range of a time series graph
   * Increases each tick by 5, for larger data sets this could be tuned
   * @precondition valid CSV data object
   * @postcondition sets the max Y range of graph to the largest value of the csv data
   */
  setRange(): void {
    let max = 0;
    this.csvData.getData().forEach((data) => {
      if (
        (data[this.axes.yLabel as keyof typeof data] as unknown as number) >=
        max
      ) {
        max = data[this.axes.yLabel as keyof typeof data] as unknown as number;
      }
    });

    while (max % 5 != 0) {
      max++;
    }

    this.axes.yRange[1] = max;
    sendLog(
      "info",
      `setRange() was called; yRange was set to ${this.axes.yRange[1]} (TimeSeriesGraphClass.tsx)`,
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

    //For larger data sets, it would be possible to create a case statement
    while (cur < this.axes.yRange[1]) {
      cur = cur + 5;
      range.push(cur);
    }
    sendLog(
      "info",
      `timeSeriesYRange() returned ${range} (TimeSeriesGraphClass.tsx)`,
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

    this.csvData.getData().forEach((data) => {
      const temp = data[
        this.axes.xLabel as keyof typeof data
      ] as unknown as string;
      range.push(temp);
    });
    sendLog(
      "info",
      `timeSeriesXRange() was called and returned ${range} (TimeSeriesGraphClass.tsx)`,
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
    if (this.csvData.getCSVHeaders().length < 3) {
      sendLog(
        "info",
        "incrementYHeader() was called but no changes were made (length < 3) (TimeSeriesGraphClass.tsx)",
      );
      return;
    }

    let start = this.csvData.getCSVHeaders().indexOf(this.getYHeader());

    //Cycle to the beginning
    if (start == this.csvData.getCSVHeaders().length - 1) {
      if (this.csvData.getCSVHeaders()[0] != this.getXHeader()) {
        this.axes.yLabel = this.csvData.getCSVHeaders()[0];
      } else {
        //Go to the next available header
        this.axes.yLabel = this.csvData.getCSVHeaders()[1];
      }
      sendLog(
        "info",
        "incrementYHeader() was called and successfully incremented (TimeSeriesGraphClass.tsx)",
      );
      return;
    }

    //If second to the last but last is the Time header, go to the start
    if (
      start == this.csvData.getCSVHeaders().length - 2 &&
      this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1] ==
        this.getXHeader()
    ) {
      this.axes.yLabel = this.csvData.getCSVHeaders()[0];
      sendLog(
        "info",
        "incrementYHeader() was called and successfully incremented (TimeSeriesGraphClass.tsx)",
      );
      return;
    }

    for (start; start < this.csvData.getCSVHeaders().length; start++) {
      if (
        this.csvData.getCSVHeaders()[start] != this.getYHeader() &&
        this.csvData.getCSVHeaders()[start] != this.getXHeader()
      ) {
        this.axes.yLabel = this.csvData.getCSVHeaders()[start];
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
    if (this.csvData.getCSVHeaders().length < 3) {
      sendLog(
        "info",
        "decrementYHeader() was called but no changes were made (length < 3) (TimeSeriesGraphClass.tsx)",
      );
      return;
    }

    let start = this.csvData.getCSVHeaders().indexOf(this.getYHeader());

    //Cycle to the end
    if (start == 0) {
      if (
        this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1] !=
        this.getXHeader()
      ) {
        this.axes.yLabel =
          this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1];
      } else {
        //Go to the next available header
        this.axes.yLabel =
          this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 2];
      }
      sendLog(
        "info",
        "decrementYHeader() was called and successfully deccremented (TimeSeriesGraphClass.tsx)",
      );
      return;
    }

    //If second to the first but first is the Time header, go to the end
    if (start == 1 && this.csvData.getCSVHeaders()[0] == this.getXHeader()) {
      this.axes.yLabel =
        this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1];
      sendLog(
        "info",
        "decrementYHeader() was called and successfully deccremented (TimeSeriesGraphClass.tsx)",
      );
      return;
    }

    for (start; start > 0; start--) {
      if (
        this.csvData.getCSVHeaders()[start] != this.getYHeader() &&
        this.csvData.getCSVHeaders()[start] != this.getXHeader()
      ) {
        this.axes.yLabel = this.csvData.getCSVHeaders()[start];
        return;
      }
    }
  }

  /**
   * This is used to update the graph when the model changes
   */
  updatePointPosition(): void {
    const totalSpace = 5;
    const divider = totalSpace / this.timeSeriesYRange().length;
    let current = -1.8 + divider / 2;

    //Resetting points
    this.clearPoints();
    this.addPoints();
    this.updatePoints();

    //Assigning new position values to the points
    this.getPoints().forEach((point) => {
      point.setXPosition(current);
      point.setYPosition(
        (point.getYData() / 100) *
          (this.getYRange() / this.timeSeriesYRange().length) -
          1,
      );

      current += divider;
    });
    sendLog(
      "info",
      "updatePointPosition() has been called to update the graph (TimeSeriesGraphClass.tsx)",
    );
  }

  /**
   * Retrieves all points in the graph.
   * pre-codition: none
   * post-condition: returns an array of PointInterface instances
   * @returns {PointInterface[]} Array of PointInterface instances.
   */
  getPoints(): PointObject[] {
    return this.points;
  }

  /**
   * Get number of points on the Graph
   * @precondition none
   * @postcondition return number of points
   */
  getNumPoints(): number {
    return this.points.length;
  }

  /**
   * Get the current X header of the Graph
   * @precondition none
   * @postcondition the graph's X header
   */
  getXHeader(): string {
    sendLog(
      "info",
      `getXHeader returned ${this.axes.xLabel} (TimeSeriesGraphClass.tsx)`,
    );
    return this.axes.xLabel;
  }

  /**
   * Get the current Y header of the graph
   * @precondition none
   * @postcondition the graph's Y header
   */
  getYHeader(): string {
    sendLog(
      "info",
      `getYHeader returned ${this.axes.yLabel} (TimeSeriesGraphClass.tsx)`,
    );
    return this.axes.yLabel;
  }

  /**
   * Get max range of the Y axis
   * @precondition none
   * @postcondition range of the Y axis
   */
  getYRange(): number {
    sendLog(
      "info",
      `getYRange returned ${this.axes.yRange[1]} (TimeSeriesGraphClass.tsx)`,
    );
    return this.axes.yRange[1];
  }
}
