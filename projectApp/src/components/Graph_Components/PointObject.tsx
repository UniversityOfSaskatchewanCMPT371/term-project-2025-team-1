import { PointInterface } from "../../types/PointInterface";

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
export class PointObject implements PointInterface {
  position: [number, number, number];
  selected: boolean;
  xData: string;
  yData: number;

  constructor() {
    this.position = [0, 0, 0];
    this.selected = false;
    this.xData = "";
    this.yData = 0;
  }

  //The setters and getters for the Point Class
  //Getters
  /**
   * Gets the position of the point.
   * @precondition none
   * @postcondition Returns the current 'position' value
   * @returns The position of the point as an array of three numbers representing the x, y, and z coordinates.
   */
  getPosition(): [number, number, number] {
    return this.position;
  }

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
  getXData(): string {
    return this.xData;
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

  /**
   * Gets the x position of the point.
   * @precondition none
   * @postcondition Returns the x position of the point
   * @returns The x position of the point
   */
  getXPosition(): number {
    return this.getPosition()[0];
  }

  /**
   * Gets the y position of the point.
   * @precondition none
   * @postcondition Returns the y position of the point
   * @returns The y position of the point
   */
  getYPosition(): number {
    return this.getPosition()[1];
  }
  //End of Getters

  //Setters
  /**
   * Sets the position of the point.
   * @precondition The 'position' parameter is an array of three numbers.
   * @postcondition The 'position' property is updated to the provided value.
   * @param {[number,number,number]} position - A tuple [number, number, number] representing the new position.
   */
  setPosition(position: [number, number, number]): void {
    this.position = position;
  }

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
  setXData(x: string): void {
    this.xData = x;
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

  /**
   * Sets the x position of the point.
   * @precondition The 'x' parameter is a number.
   * @postcondition The x position of the point is updated to the provided value.
   * @param {number} x - The x position of the point.
   */
  setXPosition(x: number): void {
    this.position[0] = x;
  }

  /**
   * Sets the y position of the point.
   * @precondition The 'y' parameter is a number.
   * @postcondition The y position of the point is updated to the provided value.
   * @param {number} y - The y position of the point.
   */
  setYPosition(y: number): void {
    this.position[1] = y;
  }
  //End of Setters
}
