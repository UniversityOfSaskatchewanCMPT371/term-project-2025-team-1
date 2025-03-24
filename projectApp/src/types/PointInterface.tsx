/*
 * Interfaces that are used to represent a point object and the base interfaces for both 2D and 3D Graph
 */

/**
 * This interface is used to represent the Point Object
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

/**
 * This interface acts as a base interface for both the 2D and 3D points
 */
export interface PointInterface {
  object: PointObjectInterface;

  getObject(): PointObjectInterface;
  getXPosition(): number;
  getYPosition(): number;

  setXAxisPos(x: number): void;
  setYAxisPos(y: number): void;
}
