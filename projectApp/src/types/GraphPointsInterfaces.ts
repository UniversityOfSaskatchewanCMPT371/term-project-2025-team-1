import { PointInterface } from "./PointInterface";

// These are interfaces used by 2D and 3D Points

/**
 * Interface used by the 2D points
 * @extends PointInterface
 */
export interface Point2DInterface extends PointInterface {
  /** 2D position array of the point */
  point2Dposition: [number, number];
  /** set the 2D position of the point */
  setPoint2DPosition(position: [number, number]): void;
}

/**
 * Interface used by the 3D Points
 * @extends PointInterface
 */
export interface Point3DInterface extends PointInterface {
  /** 3D position array of the point */
  point3Dposition: [number, number, number];
  /** get the Z position of the point */
  getZPosition(): number;
  /** get the 3D position of the point */
  getPosition(): [number, number, number];
  /** set the Z position of the point */
  setZAxisPos(z: number): void;
  /** set the 3D position of the point */
  setPoint3DPosition(poisition: [number, number, number]): void;
}
