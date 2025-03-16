import { Point3DInterface, PointObjectInterface } from "../../../types/PointInterface";
import { PointObject } from "./PointObject";

export class Point3DObject implements Point3DInterface{
    object: PointObjectInterface;
    point3Dposition: [number, number, number];

    constructor(object: PointObject){
        this.object = object;
        this.point3Dposition = [0, 0, 0];
    }

    getObject(): PointObjectInterface {
        return this.object;
    }
    getXPosition(): number {
        return this.point3Dposition[0];
    }
    getYPosition(): number {
        return this.point3Dposition[1];
    }
    getZPosition(): number {
        return this.point3Dposition[2];
    }

    setObject(obj: PointObjectInterface): void {
        this.object = obj;
    }
    setXAxisPos(x: number): void {
        this.point3Dposition[0] = x;
    }
    setYAxisPos(y: number): void {
        this.point3Dposition[1] = y;
    }
    setZAxisPos(z: number): void {
        this.point3Dposition[2] = z;
    }
    setPoint3DPosition(position: [number, number, number]): void {
        this.point3Dposition = position;
    }
}