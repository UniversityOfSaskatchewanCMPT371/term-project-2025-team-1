import { TimeSeriesGraph } from "../../pages/Graph_Elements/TimeSeriesGraph";
import { TimeSeriesGraphObject } from "./TimeSeriesGraphObject";
import { sendLog } from "../../logger-frontend";

export function CreateTimeSeries({graphObject}:{graphObject: TimeSeriesGraphObject}): React.JSX.Element{
    sendLog("info", "a TimeSeriesGraph has been created (CreateTimeSeries.tsx)");
    return(
        <>
            <TimeSeriesGraph graph={graphObject}></TimeSeriesGraph>
        </>
    )
}
