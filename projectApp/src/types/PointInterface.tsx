/*
 * So far, only meant to handle the 2D TimeSeriesGraph
 * Could be further specialized to be used by both graph (Creating a base interface)
 */


export interface PointInterface {
  selected: boolean;
  xData: string; // time value for 2d graph and where needed for 3d stuff
  yData: number; // y data for time series 2d graph

  getXData(): string;
  getYData(): number;
  getSelected(): boolean;

  setSelected(select: boolean): void;
  setXData(x: string): void;
  setYData(y: number): void;
}

export interface Point2DInterface{
  object: PointInterface;
  point2Dposition: [number, number];

  getObject(): PointInterface;
  getXPosition(): number;
  getYPosition(): number;

  setObject(obj: PointInterface): void;
  setXAxisPos(x: number): void;
  setYAxisPos(y: number): void;
  setPoint2DPosition(position: [number,number]): void;
}