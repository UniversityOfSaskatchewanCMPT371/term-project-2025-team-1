import { TimeSeriesGraph } from "../../pages/Graph_Objects/TimeSeriesGraph";
import { TimeSeriesGraphClass } from "./TimeSeriesGraphClass";
import { sendLog } from "../../logger-frontend";

export function CreateTimeSeries({graphObject}:{graphObject: TimeSeriesGraphClass}){
    //const graph = new GraphClass2();
    sendLog("info", "an TimeSeriesGraph has been created");
    return(
        <>
        <TimeSeriesGraph graph={graphObject}></TimeSeriesGraph>
        </>
    )
}
