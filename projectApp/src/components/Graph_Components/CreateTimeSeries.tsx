import { TimeSeriesGraph } from "../../pages/Graph_Elements/TimeSeriesGraph";
import { TimeSeriesGraphObject } from "./TimeSeriesGraphObject";
import { sendLog } from "../../logger-frontend";

/**
 *   The CreateTimeSeries component is a functional component that creates a TimeSeriesGraph. 
 *   It is responsible for:
 *     - Logging the creation of a TimeSeriesGraph.
 *     - Rendering a TimeSeriesGraph using the provided TimeSeriesGraphObject.
 *
 * @param {Object} graphObject - An object with a single property "graphObject" of type TimeSeriesGraphObject.
 * @returns {React.JSX.Element} - A React JSX element containing the TimeSeriesGraph component.
 * 
 * @precondition graphObject must be a valid instance of TimeSeriesGraphObject. The logging system must be configured and available.
 *
 * @postcondition 
 * - An informational log entry is recorded indicating that a TimeSeriesGraph has been created. 
 * - A valid React JSX element is returned that renders the TimeSeriesGraph component.
 *  
 */
export function CreateTimeSeries({graphObject}:{graphObject: TimeSeriesGraphObject}): React.JSX.Element{
    sendLog("info", "a TimeSeriesGraph has been created (CreateTimeSeries.tsx)");
    return(
        <>
            <TimeSeriesGraph graph={graphObject}></TimeSeriesGraph>
        </>
    )
}
