import { TimeSeriesGraph } from "../../pages/Graph_Objects/TimeSeriesGraph";
import { TimeSeriesGraphClass } from "./TimeSeriesGraphClass";
import { sendLog } from "../../logger-frontend";

export function CreateTimeSeries({graphObject}:{graphObject: TimeSeriesGraphClass}){
    //const graph = new GraphClass2();
    sendLog("info", "a TimeSeriesGraph has been created (CreateTimeSeries.tsx)");
    return(
        <>
        <TimeSeriesGraph graph={graphObject}></TimeSeriesGraph>
        </>
    )
}
