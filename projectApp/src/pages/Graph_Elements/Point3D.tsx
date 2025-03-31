import { useState } from "react";
import { Point3DObject } from "../../components/Graph_Components/Points/Point3DObject";
import mainController from "../../controller/MainController";
import { useFrame } from "@react-three/fiber";
import { sendLog } from "../../logger-frontend";

/**
 * Renders a 3D Point on an `EmbeddedGraph`.
 * The point can be interacted with through hover and click events.
 * @param {Point3DObject} pointRef Reference to the point data and state
 * @precondition `pointRef` must be a valid `Point3DObject` instance with position and selected state
 * @postcondition Renders an interactive 3D point with hover and click functionality
 * @returns a React JSX element for the 3D point used on an `EmbeddedGraph`
 */
export default function Point3D({
  pointRef,
}: {
  pointRef: Point3DObject;
}): React.JSX.Element {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // If the selection of this point doesn't match the selection status of the PointObject
  useFrame(() => {
    if (clicked !== pointRef.getObject().getSelected()) {
      click(pointRef.getObject().getSelected());
    }
  });

  /**
   * Toggles the point's selected state and updates local click state
   * @precondition None
   * @postcondition Updates both local clicked state and pointRef's selected state
   */
  function setOnClick(): void {
    const selectedState = !pointRef.getObject().getSelected();
    click(selectedState);
    pointRef.getObject().setSelected(selectedState);

    sendLog("info", `setOnClick(), 3D Point has been clicked (Point3D.tsx)`);
  }

  return (
    <mesh
      // Translating the positions to the 3D Embedded Graph Axis
      position={[
        pointRef.getPosition()[0] /
          mainController.getGraphController().getEmbeddedRange(),
        pointRef.getPosition()[1] /
          mainController.getGraphController().getEmbeddedRange(),
        pointRef.getPosition()[2] /
          mainController.getGraphController().getEmbeddedRange(),
      ]}
      onClick={() => {
        setOnClick();
      }}
      onPointerOver={() => {
        hover(true);
      }}
      onPointerOut={() => {
        hover(false);
      }}
      scale={0.05}
    >
      <sphereGeometry attach="geometry" args={[1, 32, 16]} />
      <meshStandardMaterial
        color={clicked ? "red" : "orange"}
        opacity={hovered ? 1.0 : 0.4}
      />
    </mesh>
  );
}
