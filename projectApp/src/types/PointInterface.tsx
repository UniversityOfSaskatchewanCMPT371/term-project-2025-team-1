/*
* So far, only meant to handle the 2D TimeSeriesGraph
* Could be further specialized to be used by both graph (Creating a base interface)
*/

export interface PointInterface {
    position: [number, number, number];
    selected: boolean;
    xData: string;
    yData: number;

    getPosition(): [number, number, number];
    getXData(): string;
    getYData(): number;
    getSelected(): boolean;
    getXPosition(): number;
    getYPosition(): number;

    setPosition(position: [number,number,number]): void;
    setSelected(select: boolean): void;
    setXData(x: string): void;
    setYData(y: number): void;
    setXPosition(x: number): void;
    setYPosition(y: number): void;
}