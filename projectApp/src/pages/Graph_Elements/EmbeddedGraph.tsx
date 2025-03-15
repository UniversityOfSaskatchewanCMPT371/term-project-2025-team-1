import { Text } from "@react-three/drei";
import React from "react";
import mainController from "../../controller/MainController";
import { EmbeddedGraphObject } from "../../components/Graph_Components/EmbeddedGraphObject";
import { sendLog } from "../../logger-frontend";

/**
 * This function will create an Embedded Graph in the VR environment using a EmbeddedGraphObject.
 * This graph will be 3D.
 * @preconditions A defined EmbeddedGraphObject.
 * @postconditions Returns a React JSX Element that represents a 3D Embedded Graph.
 */

export function EmbeddedGraph({
  graph,
}: {
  graph: EmbeddedGraphObject;
}): React.JSX.Element {
  //Used to update the graph
  function UpdateGraph(): void {
    mainController.updateMainScene();
    sendLog("info", "an EmbeddedGraph object was updated (EmbeddedGraph.tsx)");
  }

  /**
   * This Function creates the main graph of the Embedded Graph
   * @postcondition Body of the graph
   */
  function GenerateGraph(): React.JSX.Element {
    sendLog(
      "info",
      "an EmbeddedGraph visualization is being created [not yet functioning] (EmbeddedGraph.tsx)",
    );
    return (
      <>
        <mesh position={[3, 1, 6]}>
          <boxGeometry args={[6, 5.5, 2]} />
          <meshBasicMaterial color="gray" />
        </mesh>

        <mesh rotation={[0, 3.14, 0]} position={[3, 2, 4.8]}>
          <Text fontSize={0.35}>A 3D Graph will exist someday soon</Text>
        </mesh>
        <mesh rotation={[0, 3.14, 0]} position={[3, 1, 4.8]}>
          <Text fontSize={0.35}>but here's a box in the meantime!</Text>
        </mesh>
      </>
    );
  }

  return <GenerateGraph />;
}
