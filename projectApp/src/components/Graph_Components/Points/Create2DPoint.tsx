import { sendLog } from "../../../logger-frontend";
import Point2D from "../../../pages/Graph_Elements/Point2D";
import { Point2DInterface } from "../../../types/GraphPointsInterfaces";
import { Point2DObject } from "./Point2DObject";

/**
 * Creates and renders a 2D point visualization based on provided point data.
 *
 * @param {PointRef} pointRef - Reference object containing point data and state
 * @preconditions `pointRef` must be a valid PointRef object with defined position, selected state, and x/y data
 * @postconditions returns a Point2D component with initialized PointClass data
 */
export default function Create2DPoint({
  pointRef,
}: {
  pointRef: Point2DInterface;
}): React.JSX.Element {
  const point = new Point2DObject(pointRef.getObject());
  point.setXAxisPos(pointRef.getXPosition());
  point.setYAxisPos(pointRef.getYPosition());

  point.getObject().setSelected(pointRef.getObject().getSelected());
  point.getObject().setTimeData(pointRef.getObject().getTimeData());
  point.getObject().setYData(pointRef.getObject().getYData());

  sendLog("trace", "a 2D Point has been created (Create2DPoint.tsx)");
  return <Point2D pointRef={point} />;
}
