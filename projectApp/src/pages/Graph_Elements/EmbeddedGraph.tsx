import { Line } from "@react-three/drei";
import React from "react";
import { EmbeddedGraphObject } from "../../components/Graph_Components/EmbeddedGraphObject";
import { sendLog } from "../../logger-frontend";
import { Point3DInterface } from "../../types/GraphPointsInterfaces";
import Create3DPoint from "../../components/Graph_Components/Points/Create3DPoint";

/**
 * Create an Embedded Graph in the VR environment using a EmbeddedGraphObject.
 * - This graph will be 3D.
 * @param graph the EmbeddedGraphObject this graph visualizes.
 * @preconditions `graph` must be a defined EmbeddedGraphObject.
 * @postconditions returns a React JSX Element that represents a 3D Embedded Graph.
 */
export function EmbeddedGraph({
  graph,
}: {
  graph: EmbeddedGraphObject;
}): React.JSX.Element {
  /**
   * Renders the 3D point used in the graph
   * @param point a reference to the 3D Point object
   * @preconditions `point` is an accepted 3D Point object in this graph
   * @postconditions returns an interactable 3D Point for the graph
   */
  function GeneratePoint({
    point,
  }: {
    point: Point3DInterface;
  }): React.JSX.Element {
    return <Create3DPoint pointRef={point} />;
  }

  /**
   * Renders the axes used in the 3D Embedded Graph
   * @preconditions none
   * @postconditions returns an [x, y, z] set of axes on the VR Scene
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
   * Generates the main graph of the Embedded Graph
   * @preconditions none
   * @postconditions returns the body of the graph and its components
   */
  function GenerateGraph(): React.JSX.Element {
    sendLog(
      "info",
      "an EmbeddedGraph visualization is being created (EmbeddedGraph.tsx)",
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
