import { Line } from "@react-three/drei";
import React from "react";
import { EmbeddedGraphObject } from "../../components/Graph_Components/EmbeddedGraphObject";
import { sendLog } from "../../logger-frontend";
import { Point3DInterface } from "../../types/GraphPointsInterfaces";
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
  /**
   * This function renders the 3D point used in the graph
   * @param param0 a reference to the 3D Point object
   * @precondition an accepted 3D Point object
   * @postcondition returns a React JSX Element that represents a 3D Point
   */
  function GeneratePoint({
    point,
  }: {
    point: Point3DInterface;
  }): React.JSX.Element {
    return <Create3DPoint pointRef={point} />;
  }

  /**
   * This function renders the axis used in the 3D Embedded Graph
   * @precondition none
   * @postcondition returns a x,y,z axis on the VR Scene
   */
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
        />

        {/* Y-axis */}
        <Line
          color={"black"}
          points={[
            [0, -1, 0],
            [0, 1, 0],
          ]}
        />

        {/* Z-axis */}
        <Line
          color={"black"}
          points={[
            [0, 0, -1],
            [0, 0, 1],
          ]}
        />
      </>
    );
  }

  /**
   * This Function creates the main graph of the Embedded Graph
   * @precondtiion none
   * @postcondition the entire 3D Graph and its components
   */
  function GenerateGraph(): React.JSX.Element {
    sendLog(
      "info",
      "an EmbeddedGraph visualization is being created [not yet functioning] (EmbeddedGraph.tsx)",
    );
    return (
      <mesh position={[1, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial visible={false} />
        <GenerateAxis />

        {graph.getPoints3D().map((point) => {
          return <GeneratePoint point={point} />;
        })}
      </mesh>
    );
  }
  return <GenerateGraph />;
}
