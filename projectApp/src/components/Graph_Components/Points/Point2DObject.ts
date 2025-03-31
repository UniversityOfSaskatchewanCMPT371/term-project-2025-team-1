import { sendLog } from "../../../logger-frontend";
import { Point2DInterface } from "../../../types/GraphPointsInterfaces";
import { PointObjectInterface } from "../../../types/PointInterface";
import { PointObject } from "./PointObject";

/**
 * Class that represents a 2D Point used by the Time Series Graph.
 * Contains the attributes and methods required for a 2D point.
 *
 * @implements {Point2DInterface}
 *
 * @invariants
 * - 'object' property is always initialized on construction and is never set again
 * - 'point2Dposition' property is always a two length number array of [x, y] that holds the point's 2D position
 *
 * @history
 * - 'object' is initialized as the passed in `object`
 * - 'point2Dposition' is initialized as [0, 0]
 */
export class Point2DObject implements Point2DInterface {
  object: PointObjectInterface; // Reference to the point object used by both 2D and 3D points
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
   * Get the x position of the point in the 2D Time Series Graph
   * @precondition none
   * @postcondition returns the x-coordinate of the 2D point
   */
  getXPosition(): number {
    return this.point2Dposition[0];
  }

  /**
   * Get the y position of the point in the 2D Time Series Graph
   * @precondition none
   * @postcondition returns the y-coordinate of the 2D point
   */
  getYPosition(): number {
    return this.point2Dposition[1];
  }

  /**
   * Set the position of the 2D point in the x axis of the 2D Time Series Graph
   * @param x number representing the x position
   * @precondition none
   * @postcondition sets the x position of the 2d point
   */
  setXAxisPos(x: number): void {
    this.point2Dposition[0] = x;

    sendLog(
      "info",
      `setXAxisPos() was called; xPosition of 2D Point was set to ${x} (Point2DObject.ts)`,
    );
  }

  /**
   * Set the position of the 2D point in the y axis of the 2D Time Series Graph
   * @param y number representing the y position
   * @precondition none
   * @postcondition sets the y position of the 2d point
   */
  setYAxisPos(y: number): void {
    this.point2Dposition[1] = y;

    sendLog(
      "info",
      `setYAxisPos() was called; yPosition of 2D Point was set to ${y} (Point2DObject.ts)`,
    );
  }

  /**
   * Set the x and y positions of the 2d point in the 2D Time Series Graph
   * @param position [number, number] representing the x and y coordinate
   * @precondition `position` must be an array of two numbers
   * @postcondition On success, set the new position of the 2d point
   */
  setPoint2DPosition(position: [number, number]): void {
    this.point2Dposition = position;

    sendLog(
      "info",
      `setPoint2DPosition() was called; Position of 2D Point was set to ${position} (Point2DObject.ts)`,
    );
  }
}
