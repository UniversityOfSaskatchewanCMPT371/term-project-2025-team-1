import { EmbeddedGraph } from "../../pages/Graph_Elements/EmbeddedGraph";
import { EmbeddedGraphObject } from "./EmbeddedGraphObject";
import { sendLog } from "../../logger-frontend";

/**
 * The CreateEmbeddedGraph component is a functional component that creates an EmbeddedGraph.
 * It is responsible for:
 *  - Logging the creation of an EmbeddedGraph.
 *  - Rendering an EmbeddedGraph using the provided EmbeddedGraphObject.
 *
 * @param {Object} graphObject An object with a single property "graphObject" of type EmbeddedGraphObject.
 * @returns {React.JSX.Element} A React JSX element containing the EmbeddedGraph component.
 *
 * @preconditions
 * - `graphObject` must be a valid instance of EmbeddedGraphObject.
 * - The logging system must be configured and available.
 *
 * @postconditions
 * - An informational log entry is recorded indicating that an EmbeddedGraph has been created.
 * - A valid React JSX element is returned that renders the EmbeddedGraph component.
 */

export function CreateEmbeddedGraph({
  graphObject,
}: {
  graphObject: EmbeddedGraphObject;
}): React.JSX.Element {
  sendLog(
    "info",
    "an EmbeddedGraph has been created (CreateEmbeddedGraph.tsx)",
  );
  return <EmbeddedGraph graph={graphObject} />;
}
