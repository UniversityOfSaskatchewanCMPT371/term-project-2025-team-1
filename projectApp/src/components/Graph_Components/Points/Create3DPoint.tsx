import { Point3DInterface } from "../../../types/PointInterface";
import { Point3DObject } from "./Point3DObject";

export default function Create3DPoint({pointRef}:{pointRef: Point3DInterface}): React.JSX.Element {
    const point = new Point3DObject(pointRef.getObject());
    point.getObject().setTimeData(pointRef.getObject().getTimeData());
    point.getObject().setYData(pointRef.getObject().getYData());

    point.setXAxisPos(pointRef.getXPosition());
    point.setYAxisPos(pointRef.getYPosition());
    point.setZAxisPos(pointRef.getZPosition());
    return(
        <>
        </>
    )
}