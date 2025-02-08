//TODO
//Interface for the Point(s) for the 2D Time Series Graph
//Position of the point, possible size of the point
//Specified data(s) related to the point
//Could be used for 3D points

export interface PointRef {
    position: [number, number, number];
    selected: boolean;
    xData: string;
    yData: number;
}