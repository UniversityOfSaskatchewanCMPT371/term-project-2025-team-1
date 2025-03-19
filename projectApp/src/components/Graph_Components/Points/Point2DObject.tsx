import { Point2DInterface } from "../../../types/GraphPointsInterfaces";
import { PointObjectInterface } from "../../../types/PointInterface";
import { PointObject } from "./PointObject";

/**
 * Class that represents a 2D Point used by the Time Series Graph. 
 * Contains the attributes and methods required for a 2D point.
 * 
 * @implements {Point2DInterface}
 */
export class Point2DObject implements Point2DInterface {
  object: PointObjectInterface;       //Reference to the point object used by both 2D and 3D points
  point2Dposition: [number, number];

  constructor(object: PointObject) {
    this.object = object;
    this.point2Dposition = [0, 0];
  }

  /**
   * Gets the point object that the 2D point is referencing to
   * @precondition none
   * @postcondition returns the point object reference
   */
  getObject(): PointObjectInterface {
    return this.object;
  }

  /**
   * This method returns the x position of the point in the 2D Time Series Graph
   * @precondition none
   * @postcondition returns the x-coordinate of the 2D point
   */
  getXPosition(): number {
    return this.point2Dposition[0];
  }

  /**
   * This method returns the y position of the point in the 2D Time Series Graph
   * @precondition none
   * @postcondition returns the y-coordinate of the 2D point
   */
  getYPosition(): number {
    return this.point2Dposition[1];
  }

  /**
   * This method sets the position of the 2D point in the x axis of the 2D Time Series Graph
   * @param x number representing the x position
   * @precondition none
   * @postcondition sets the x position of the 2d point
   */
  setXAxisPos(x: number): void {
    this.point2Dposition[0] = x;
  }

  /**
   * This method sets the position of the 2D point in the y axis of the 2D Time Series Graph
   * @param x number representing the y position
   * @precondition none
   * @postcondition sets the y position of the 2d point
   */
  setYAxisPos(y: number): void {
    this.point2Dposition[1] = y;
  }

  /**
   * This method sets the x and y positions of the 2d point in the 2D Time Series Graph
   * @param position [number, number] representing the x and y coordinate
   * @precondition parameter must be an array of two numbers
   * @postcondition On success, this method will set the new position of the 2d point
   */
  setPoint2DPosition(position: [number, number]): void {
    this.point2Dposition = position;
  }
}
