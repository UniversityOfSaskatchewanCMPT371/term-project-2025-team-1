/*
 * Interfaces that are used to represent a point object and the base interfaces for both 2D and 3D Graph
 */

/**
 * Interface used to represent the Point Object
 */
export interface PointObjectInterface {
  /** selection boolean */
  selected: boolean;
  /** time value for 2d graph and where needed for 3d stuff */
  timeData: string;
  /** y data for time series 2d graph */
  yData: number;
  /** get the time string */
  getTimeData(): string;
  /** get the YData number */
  getYData(): number;
  /** get the selection boolean */
  getSelected(): boolean;
  /** set the selection boolean */
  setSelected(select: boolean): void;
  /** set the time string */
  setTimeData(x: string): void;
  /** set the YData number */
  setYData(y: number): void;
}

/**
 * Interface used for both the 2D and 3D points
 */
export interface PointInterface {
  /** point object reference */
  object: PointObjectInterface;
  /** get the point object */
  getObject(): PointObjectInterface;
  /** get the X position of the point */
  getXPosition(): number;
  /** get the Y position of the point */
  getYPosition(): number;
  /** get the X position of the point */
  setXAxisPos(x: number): void;
  /** get the Y position of the point */
  setYAxisPos(y: number): void;
}
