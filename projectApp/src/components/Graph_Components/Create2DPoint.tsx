import { Point2D } from "../../pages/Graph_Objects/Point2D";
import { PointRef } from "../../types/PointInterface";
import { PointClass } from "./PointClass";

export function Create2DPoint({pointRef} : {pointRef: PointRef}){
    const point = new PointClass();
    point.setPosition(pointRef.position);
    point.setSelected(pointRef.selected);
    point.setXData(pointRef.xData);
    point.setYData(pointRef.yData);

    return (
        <Point2D pointRef = {point}></Point2D>
    )
}