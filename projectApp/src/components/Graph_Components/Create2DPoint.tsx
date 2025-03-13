import Point2D from "../../pages/Graph_Elements/Point2D";
import { PointInterface } from "../../types/PointInterface";
import { PointObject } from "./PointObject";

/**
 * Creates and renders a 2D point visualization based on provided point data.
 *
 * @param {PointRef} pointRef - Reference object containing point data and state
 * @precondition pointRef must be a valid PointRef object with defined position, selected state, and x/y data
 * @postcondition Returns a Point2D component with initialized PointClass data
 */
export default function Create2DPoint({
  pointRef,
}: {
  pointRef: PointInterface;
}): React.JSX.Element {
  const point = new PointObject();
  point.setPosition(pointRef.getPosition());
  point.setSelected(pointRef.getSelected());
  point.setXData(pointRef.getXData());
  point.setYData(pointRef.getYData());
  return <Point2D pointRef={point}></Point2D>;
}
