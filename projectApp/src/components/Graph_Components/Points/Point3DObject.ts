import { sendLog } from "../../../logger-frontend";
import { Point3DInterface } from "../../../types/GraphPointsInterfaces";
import { PointObjectInterface } from "../../../types/PointInterface";
import { PointObject } from "./PointObject";

/**
 * Class that represents a 3D Point used by the Embedded Graph.
 * Contains the attributes and methods required for a 3D point.
 *
 * @implements {Point3DInterface}
 *
 * @invariants
 * - 'object' property is always initialized on construction and is never set again
 * - 'point3Dposition' property is always a three length number array of [x, y, z] that holds the point's 3D position
 *
 * @history
 * - 'object' is initialized as the passed in `object`
 * - 'point3Dposition' is initialized as [0, 0, 0]
 */
export class Point3DObject implements Point3DInterface {
  object: PointObjectInterface; // Reference to the point object used by both 2D and 3D points
  point3Dposition: [number, number, number];

  constructor(object: PointObject) {
    this.object = object;
    this.point3Dposition = [0, 0, 0];
  }

  /**
   * Gets the point object that the 3D point is referencing to
   * @precondition none
   * @postcondition returns the point object reference
   */
  getObject(): PointObjectInterface {
    return this.object;
  }

  /**
   * Get the x position of the point in the VR scene
   * @precondition none
   * @postcondition returns the x-coordinate of the 3D point
   */
  getXPosition(): number {
    return this.point3Dposition[0];
  }

  /**
   * Get the y position of the point in the VR scene
   * @precondition none
   * @postcondition returns the y-coordinate of the 3D point
   */
  getYPosition(): number {
    return this.point3Dposition[1];
  }

  /**
   * Get the z position of the point in the VR scene
   * @precondition none
   * @postcondition returns the z-coordinate of the 3D point
   */
  getZPosition(): number {
    return this.point3Dposition[2];
  }

  /**
   * Get the x, y and z position of the 3d point in the vr scene
   * @precondition none
   * @postcondition returns [x, y, z] coordinate of the 3d point
   */
  getPosition(): [number, number, number] {
    return this.point3Dposition;
  }

  /**
   * Set the position of the 3D point in the x axis of the vr scene
   * @param x number representing the x position
   * @precondition none
   * @postcondition sets the x position of the 3d point
   */
  setXAxisPos(x: number): void {
    this.point3Dposition[0] = x;

    sendLog(
      "info",
      `setXAxisPos() was called; xPosition of 3D Point was set to ${x} (Point3DObject.ts)`,
    );
  }

  /**
   * Set the position of the 3D point in the y axis of the vr scene
   * @param y number representing the y position
   * @precondition none
   * @postcondition sets the y position of the 3d point
   */
  setYAxisPos(y: number): void {
    this.point3Dposition[1] = y;

    sendLog(
      "info",
      `setYAxisPos() was called; yPosition of 3D Point was set to ${y} (Point3DObject.ts)`,
    );
  }

  /**
   * Set the position of the 3D point in the z axis of the vr scene
   * @param z number representing the z position
   * @precondition none
   * @postcondition sets the z position of the 3d point
   */
  setZAxisPos(z: number): void {
    this.point3Dposition[2] = z;
    sendLog(
      "info",
      `setZAxisPos() was called; zPosition of 3D Point was set to ${z} (Point3DObject.ts)`,
    );
  }

  /**
   * Set the [x, y, z] position of the 3d point in the vr scene
   * @param position [number, number, number] representing a x,y,z coordinate
   * @precondition `position` must be an array of three numbers
   * @postcondition On success, set the new position of the 3d point
   */
  setPoint3DPosition(position: [number, number, number]): void {
    this.point3Dposition = position;

    sendLog(
      "info",
      `setPoint3DPosition() was called; Position of 3D Point was set to ${position} (Point3DObject.ts)`,
    );
  }
}
