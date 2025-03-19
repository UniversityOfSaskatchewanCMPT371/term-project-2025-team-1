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

  //The setters and getters for the Point Class
  //Getters

  /**
   * Gets the selected status of the point.
   * @precondition none
   * @postcondition Returns the current 'selected' value
   * @returns The selected status of the point as a boolean value.
   */
  getSelected(): boolean {
    return this.selected;
  }

  /**
   * Gets the x-axis data of the point.
   * @precondition none
   * @postcondition Returns the current 'xData' value
   * @returns The x-axis data of the point as a string.
   */
  getTimeData(): string {
    return this.timeData;
  }

  /**
   * Gets the y-axis data of the point.
   * @precondition none
   * @postcondition Returns the current 'yData' value
   * @returns The y-axis data of the point as a number.
   */
  getYData(): number {
    return this.yData;
  }

  //End of Getters

  //Setters

  /**
   * Sets the selected status of the point.
   * @precondition The 'select' parameter is a boolean value.
   * @postcondition The 'selected' property is updated to the provided value.
   * @param {boolean} select - A boolean value representing the new selected status.
   */
  setSelected(select: boolean): void {
    this.selected = select;
  }

  /**
   * Sets the x-axis data of the point.
   * @precondition The 'x' parameter is a string.
   * @postcondition The 'xData' property is updated to the provided value.
   * @param {string} x - A string representing the new x-axis data.
   */
  setTimeData(x: string): void {
    this.timeData = x;
    //Error no Time Header
  }
  /**
   * Sets the y-axis data of the point.
   * @precondition The 'y' parameter is a number.
   * @postcondition The 'yData' property is updated to the provided value.
   * @param {number} y - A number representing the new y-axis data.
   */
  setYData(y: number): void {
    this.yData = y;
  }

  //End of Setters
}
