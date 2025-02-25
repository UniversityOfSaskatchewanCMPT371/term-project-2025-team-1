import { Point2D } from "../../pages/Graph_Objects/Point2D";
import { PointInterface } from "../../types/PointInterface";
import { PointObject } from "./PointObject";

export function Create2DPoint({pointRef} : {pointRef: PointInterface}): React.JSX.Element{
    const point = new PointObject();
    point.setPosition(pointRef.getPosition());
    point.setSelected(pointRef.getSelected());
    point.setXData(pointRef.getXData());
    point.setYData(pointRef.getYData());

    return (
        <Point2D pointRef = {point}></Point2D>
    )
}