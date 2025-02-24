import { TimeSeriesGraph } from "../../pages/Graph_Objects/TimeSeriesGraph";
import { TimeSeriesGraphClass } from "./TimeSeriesGraphClass";

export function CreateTimeSeries({graphObject}:{graphObject: TimeSeriesGraphClass}): JSX.Element{
    return(
        <>
            <TimeSeriesGraph graph={graphObject}></TimeSeriesGraph>
        </>
    )
}
