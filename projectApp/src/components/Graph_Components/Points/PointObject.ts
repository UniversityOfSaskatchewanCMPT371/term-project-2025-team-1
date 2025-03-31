import { sendLog } from "../../../logger-frontend";
import { PointObjectInterface } from "../../../types/PointInterface";

/**
 * The PointObject class is responsible for managing the data of a single point in a graph.
 *
 * @invariant
 * - The 'position' property is always an array of three numbers representing the x, y, and z coordinates of the point.
 * - The 'selected' property is always a boolean value indicating whether the point is selected.
 * - The 'xData' property is always a string representing the x-axis data of the point.
 * - The 'yData' property is always a number representing the y-axis data of the point.
 *
 * @history
 * - The 'position' property is initialized as [0, 0, 0].
 * - The 'selected' property is initialized as false.
 * - The 'xData' property is initialized as an empty string.
 * - The 'yData' property is initialized as 0.
 */
export class PointObject implements PointObjectInterface {
  selected: boolean;
  timeData: string;
  yData: number;

  constructor() {
    this.selected = false;
    this.timeData = "";
    this.yData = 0;
  }

  // The setters and getters for the Point Class
  // Getters

  /**
   * Gets the selected status of the point.
   * @precondition none
   * @returns the current 'selected' value of the point as a boolean value.
   */
  getSelected(): boolean {
    return this.selected;
  }

  /**
   * Gets the x-axis data of the point.
   * @precondition none
   * @returns the current 'xData' value of the point as a string.
   */
  getTimeData(): string {
    return this.timeData;
  }

  /**
   * Gets the y-axis data of the point.
   * @precondition none
   * @returns the current 'yData' value as a number.
   */
  getYData(): number {
    return this.yData;
  }

  // End of Getters

  // Setters

  /**
   * Sets the selected status of the point.
   * @param {boolean} select - A boolean value representing the new selected status.
   * @precondition The `select` parameter is a boolean value.
   * @postcondition The 'selected' property is updated to the provided value.
   */
  setSelected(select: boolean): void {
    this.selected = select;

    sendLog("info", `setSelected() was called on PointObject (PointObject.ts)`);
  }

  /**
   * Sets the x-axis data of the point.
   * @param {string} time - A string representing the new x-axis data.
   * @precondition The `time` parameter is a string.
   * @postcondition The 'timeData' property is updated to the provided value.
   */
  setTimeData(time: string): void {
    this.timeData = time;
    sendLog(
      "info",
      `setTimeData() was called; time Data of Point set to ${time} (PointObject.ts)`,
    );
  }
  /**
   * Sets the y-axis data of the point.
   * @param {number} y - A number representing the new y-axis data.
   * @precondition The `y` parameter is a number.
   * @postcondition The 'yData' property is updated to the provided value.
   */
  setYData(y: number): void {
    this.yData = y;

    sendLog(
      "info",
      `setYData() was called; y Data of Point set to ${y} (PointObject.ts)`,
    );
  }

  // End of Setters
}
