/**
 * Creates and renders a 2D point visualization based on provided point data.
 * 
 * @param {PointRef} pointRef - Reference object containing point data and state
 * @precondition pointRef must be a valid PointRef object with defined position, selected state, and x/y data
 * @postcondition Returns a Point2D component with initialized PointClass data
 */

import { Point2D } from "../../pages/Graph_Objects/Point2D";
import { PointRef } from "../../types/PointInterface";
import { PointClass } from "./PointClass";

export function Create2DPoint(pointRef: PointRef){
    const point = new PointClass();
    point.setPosition(pointRef.position);
    point.setSelected(pointRef.selected);
    point.setXData(pointRef.xData);
    point.setYData(pointRef.yData);
    return (
        <Point2D pointRef = {point}></Point2D>
    )
}