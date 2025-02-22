import { TimeSeriesGraph } from "../../pages/Graph_Objects/TimeSeriesGraph";
import { TimeSeriesGraphClass } from "./TimeSeriesGraphClass";

export function CreateTimeSeries({graphObject}:{graphObject: TimeSeriesGraphClass}){
    //const graph = new GraphClass2();
    return(
        <>
        <TimeSeriesGraph graph={graphObject}></TimeSeriesGraph>
        </>
    )
}
