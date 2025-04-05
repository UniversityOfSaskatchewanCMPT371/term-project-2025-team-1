import TimeSeriesGraph from "../../pages/Graph_Elements/TimeSeriesGraph";
import { TimeSeriesGraphObject } from "./TimeSeriesGraphObject";
import { sendLog } from "../../logger-frontend";

/**
 * The CreateTimeSeries component is a functional component that creates a TimeSeriesGraph.
 * It is responsible for:
 *  - Logging the creation of a TimeSeriesGraph.
 *  - Rendering a TimeSeriesGraph using the provided TimeSeriesGraphObject.
 *
 * @param {Object} graphObject An object with a single property "graphObject" of type TimeSeriesGraphObject.
 *
 * @preconditions
 * - `graphObject` must be a valid instance of TimeSeriesGraphObject.
 * - The logging system must be configured and available.
 *
 * @postconditions
 * - returns a React JSX element containing the TimeSeriesGraph component.
 * - An informational log entry is recorded indicating that a TimeSeriesGraph has been created.
 * - A valid React JSX element is returned that renders the TimeSeriesGraph component.
 */
export default function CreateTimeSeries({
  graphObject,
}: {
  graphObject: TimeSeriesGraphObject;
}): React.JSX.Element {
  sendLog("trace", "a TimeSeriesGraph has been created (CreateTimeSeries.tsx)");
  return <TimeSeriesGraph graph={graphObject} />;
}
