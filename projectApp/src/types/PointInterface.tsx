/*
 * So far, only meant to handle the 2D TimeSeriesGraph
 * Could be further specialized to be used by both graph (Creating a base interface)
 */

export interface PointObjectInterface {
  selected: boolean;
  timeData: string; // time value for 2d graph and where needed for 3d stuff
  yData: number; // y data for time series 2d graph

  getTimeData(): string;
  getYData(): number;
  getSelected(): boolean;

  setSelected(select: boolean): void;
  setTimeData(x: string): void;
  setYData(y: number): void;
}

export interface PointInterface {
  object: PointObjectInterface;

  getObject(): PointObjectInterface;
  getXPosition(): number;
  getYPosition(): number;

  setObject(obj: PointObjectInterface): void;
  setXAxisPos(x: number): void;
  setYAxisPos(y: number): void;
}

export interface Point2DInterface extends PointInterface {
  point2Dposition: [number, number];

  setPoint2DPosition(position: [number, number]): void;
}

export interface Point3DInterface extends PointInterface {
  point3Dposition: [number, number, number];

  getZPosition(): number;

  setZAxisPos(z: number): void;
  setPoint3DPosition(poisition: [number, number, number]): void;
}
