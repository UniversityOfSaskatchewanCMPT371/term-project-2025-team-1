import Point2D from "../../pages/Graph_Elements/Point2D";
import { Point2DInterface} from "../../types/PointInterface";
import { Point2DObject } from "./Points/Point2DObject";

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
  pointRef: Point2DInterface;
}): React.JSX.Element {
  const point = new Point2DObject(pointRef.getObject())
  point.setXAxisPos(pointRef.getXPosition());
  point.setYAxisPos(pointRef.getYPosition())
  point.getObject().setXData(pointRef.getObject().getXData());
  point.getObject().setYData(pointRef.getObject().getYData())
  return <Point2D pointRef={point}></Point2D>;
}
