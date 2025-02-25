import { TimeSeriesGraph } from "../../pages/Graph_Elements/TimeSeriesGraph";
import { TimeSeriesGraphObject } from "./TimeSeriesGraphObject";

export function CreateTimeSeries({graphObject}:{graphObject: TimeSeriesGraphObject}): React.JSX.Element{
    return(
        <>
            <TimeSeriesGraph graph={graphObject}></TimeSeriesGraph>
        </>
    )
}
