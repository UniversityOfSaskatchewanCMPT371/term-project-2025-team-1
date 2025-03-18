import { Line, Text } from "@react-three/drei";
import React from "react";
import mainController from "../../controller/MainController";
import { EmbeddedGraphObject } from "../../components/Graph_Components/EmbeddedGraphObject";
import { sendLog } from "../../logger-frontend";
import { Point3DInterface } from "../../types/PointInterface";
import Create3DPoint from "../../components/Graph_Components/Points/Create3DPoint";

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

  function GeneratePoints({point}:{point:Point3DInterface}): React.JSX.Element{
    return(
      <>
        <Create3DPoint pointRef={point}></Create3DPoint>
      </>
    )
  }

  function GenerateAxis() {
    return (
      <>
        {/* X-axis */}
        <Line
          color={"black"}
          points={[
            [-1, 0, 0],
            [1, 0, 0],
          ]}
        ></Line>

        {/* Y-axis */}
        <Line
          color={"black"}
          points={[
            [0, -1, 0],
            [0, 1, 0],
          ]}
        ></Line>

        {/* Z-axis */}
        <Line
          color={"black"}
          points={[
            [0, 0, -1],
            [0, 0, 1],
          ]}
        ></Line>
      </>
    );
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
        <mesh position={[2, 1, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial visible={false} />
          <GenerateAxis /> 

          {graph.getPoints3D().map((points) => {
            return(
              <>
                <GeneratePoints point={points}></GeneratePoints>
              </>
            )
          })}
        </mesh>
      </>
    );
  }

  return <GenerateGraph />;
}
