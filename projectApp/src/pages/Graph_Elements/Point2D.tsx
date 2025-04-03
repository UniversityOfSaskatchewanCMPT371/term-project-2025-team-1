import { useState } from "react";
import { Point2DObject } from "../../components/Graph_Components/Points/Point2DObject";
import { useFrame } from "@react-three/fiber";
import { sendLog } from "../../logger-frontend";
import { addTestSceneInfo} from "../Scene/TestScene.tsx";

/**
 * Renders a 2D point on a Time Series Graph.
 * The point can be interacted with through hover and click events.
 * @param props - Component props
 * @param {PointClass} props.pointRef - Reference to the point data and state
 * @precondition pointRef must be a valid PointClass instance with position and selected state
 * @postcondition Renders an interactive 2D point with hover and click functionality
 */
export default function Point2D({ pointRef }: { pointRef: Point2DObject }) {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  //If the selection of this point doesn't match the selection status of the PointObject
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
    if (selectedState){
      addTestSceneInfo("point " + pointRef.getObject().getTimeData() + " " + pointRef.getObject().getYData() + " (2D) selected");
    }
    else {    addTestSceneInfo("point " + pointRef.getObject().getTimeData() + " " + pointRef.getObject().getYData() + " (2D) deselected");
    }
    sendLog("info", `setOnClick(), 2D Point has been clicked (Point2D.tsx)`);
  }

  return (
    <mesh
      position={[pointRef.getXPosition(), pointRef.getYPosition(), 0.05]}
      onClick={() => {
        setOnClick();
      }}
      onPointerOver={() => {
        hover(true);
      }}
      onPointerOut={() => {
        hover(false);
      }}
    >
      <circleGeometry attach="geometry" args={[0.08, 32]} />

      <meshStandardMaterial
        color={clicked ? "blue" : "skyblue"}
        opacity={hovered ? 1.0 : 0.4}
      />
    </mesh>
  );
}
