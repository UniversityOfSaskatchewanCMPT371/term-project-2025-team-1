//TODO
//Initializes and creates the 2D Time Series Graph Object
//Takes GraphInterface as parameter
//This should also generate the points

import { TimeSeriesGraph } from "../../pages/Graph_Objects/TimeSeriesGraph";
import { GraphClass2 } from "./GraphClass2";

export function CreateTimeSeries({graphObject}:{graphObject: GraphClass2}){
    //const graph = new GraphClass2();
    return(
        <>
        <TimeSeriesGraph graph={graphObject}></TimeSeriesGraph>
        </>
    )
}