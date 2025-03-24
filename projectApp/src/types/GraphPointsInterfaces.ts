import { PointInterface } from "./PointInterface";

// These are interfaces used by 2D and 3D Points

/**
 * Interface used by the 2D points
 *
 * @implements {PointInterface}
 */
export interface Point2DInterface extends PointInterface {
  point2Dposition: [number, number];

  setPoint2DPosition(position: [number, number]): void;
}

/**
 * Interface used by the 3D Points
 *
 * @implements {PointInterface}
 */
export interface Point3DInterface extends PointInterface {
  point3Dposition: [number, number, number];

  getZPosition(): number;
  getPosition(): [number, number, number];

  setZAxisPos(z: number): void;
  setPoint3DPosition(poisition: [number, number, number]): void;
}
