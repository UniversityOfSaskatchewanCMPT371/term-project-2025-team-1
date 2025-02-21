// //TODO
// //Initializes and creates the 2D Time Series Graph Object
// //Takes GraphInterface as parameter
// //This should also generate the points

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
