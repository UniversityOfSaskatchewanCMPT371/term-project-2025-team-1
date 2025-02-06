//TODO
//Will track the data of the 2D Point and create the 2D Point
//Takes Point2DInterface as parameter 

import { Point2D } from "../../pages/Graph_Objects/Point2D";
import { PointRef } from "../../types/PointInterface";
import { PointClass } from "./PointClass";

export function Create2DPoint(pointRef: PointRef){
    let point = new PointClass(pointRef);
    return (
        <Point2D pointRef = {point}></Point2D>
    )
}