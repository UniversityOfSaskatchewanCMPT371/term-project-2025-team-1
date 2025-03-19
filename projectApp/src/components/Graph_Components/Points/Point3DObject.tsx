import { Point3DInterface } from "../../../types/GraphPointsInterfaces";
import { PointObjectInterface } from "../../../types/PointInterface";
import { PointObject } from "./PointObject";

/**
 * Class that represents a 3D Point used by the Embedded Graph. 
 * Contains the attributes and methods required for a 3D point.
 * 
 * @implements {Point3DInterface}
 */
export class Point3DObject implements Point3DInterface {
  object: PointObjectInterface;               //Reference to the point object used by both 2D and 3D points
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
   * This method returns the x position of the point in the VR scene
   * @precondition none
   * @postcondition returns the x-coordinate of the 3D point
   */
  getXPosition(): number {
    return this.point3Dposition[0];
  }

  /**
   * This method returns the y position of the point in the VR scene
   * @precondition none
   * @postcondition returns the y-coordinate of the 3D point
   */
  getYPosition(): number {
    return this.point3Dposition[1];
  }

  /**
   * This method returns the z position of the point in the VR scene
   * @precondition none
   * @postcondition returns the z-coordinate of the 3D point
   */
  getZPosition(): number {
    return this.point3Dposition[2];
  }

  /**
   * This method returns the x, y and z position of the 3d point in the vr scene
   * @precondition none
   * @postcondition returns [x, y, z] coordinate of the 3d point
   */
  getPosition(): [number, number, number] {
    return [this.getXPosition(), this.getYPosition(), this.getZPosition()];
  }

  /**
   * This method sets the position of the 3D point in the x axis of the vr scene
   * @param x number representing the x position
   * @precondition none
   * @postcondition sets the x position of the 3d point
   */
  setXAxisPos(x: number): void {
    this.point3Dposition[0] = x;
  }

  /**
   * This method sets the position of the 3D point in the y axis of the vr scene
   * @param x number representing the y position
   * @precondition none
   * @postcondition sets the y position of the 3d point
   */
  setYAxisPos(y: number): void {
    this.point3Dposition[1] = y;
  }

  /**
   * This method sets the position of the 3D point in the z axis of the vr scene
   * @param x number representing the z position
   * @precondition none
   * @postcondition sets the z position of the 3d point
   */
  setZAxisPos(z: number): void {
    this.point3Dposition[2] = z;
  }

  /**
   * This method sets the [x, y, z] position of the 3d point in the vr scene
   * @param position [number, number, number] representing a x,y,z coordinate
   * @precondition parameter must be an array of three numbers
   * @postcondition On success, this method will set the new position of the 3d point
   */
  setPoint3DPosition(position: [number, number, number]): void {
    this.point3Dposition = position;
  }
}
