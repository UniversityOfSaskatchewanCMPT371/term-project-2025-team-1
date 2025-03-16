import { Point2DInterface, PointInterface, PointObjectInterface } from "../../../types/PointInterface";
import { PointObject } from "./PointObject";

export class Point2DObject implements Point2DInterface{
    object: PointObjectInterface;
    point2Dposition: [number, number];

    constructor(object: PointObject){
        this.object = object;
        this.point2Dposition = [0,0];
    }

    getObject(): PointObjectInterface {
        return this.object;
    }
    getXPosition(): number {
        return this.point2Dposition[0];
    }
    getYPosition(): number {
        return this.point2Dposition[1];
    }

    setObject(obj: PointObjectInterface): void {
        this.object = obj;
    }
    setXAxisPos(x: number): void {
        this.point2Dposition[0] = x;
    }
    setYAxisPos(y: number): void {
        this.point2Dposition[1] = y;
    }
    setPoint2DPosition(position: [number, number]): void {
        this.point2Dposition = position;
    }
}