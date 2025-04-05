import { sendLog } from "../../../logger-frontend";
import Point3D from "../../../pages/Graph_Elements/Point3D";
import { Point3DInterface } from "../../../types/GraphPointsInterfaces";
import { Point3DObject } from "./Point3DObject";

/**
 * Creates and renders a 3D point visualization based on provided point data.
 *
 * @param {PointRef} pointRef - Reference object containing point data and state
 * @preconditions `pointRef` must be a valid PointRef object with defined position, selected state, and x,y,z data
 * @postconditions returns a Point3D component with initialized Point Object data
 */
export default function Create3DPoint({
  pointRef,
}: {
  pointRef: Point3DInterface;
}): React.JSX.Element {
  const point = new Point3DObject(pointRef.getObject());

  point.getObject().setTimeData(pointRef.getObject().getTimeData());
  point.getObject().setYData(pointRef.getObject().getYData());
  point.getObject().setSelected(pointRef.getObject().getSelected());

  point.setXAxisPos(pointRef.getXPosition());
  point.setYAxisPos(pointRef.getYPosition());
  point.setZAxisPos(pointRef.getZPosition());
  sendLog("info", "a 3D Point has been created (Create3DPoint.tsx)");
  return <Point3D pointRef={point} />;
}
