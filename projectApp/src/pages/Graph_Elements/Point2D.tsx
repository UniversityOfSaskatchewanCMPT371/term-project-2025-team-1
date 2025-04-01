import { useState } from "react";
import { Point2DObject } from "../../components/Graph_Components/Points/Point2DObject";
import { useFrame } from "@react-three/fiber";
import { sendLog } from "../../logger-frontend";
/**
 * Renders a 2D point on a `TimeSeriesGraph`.
 * The point can be interacted with through hover and click events.
 * @param {Point2DObject} pointRef Reference to the point data and state
 * @precondition `pointRef` must be a valid `Point2DObject` instance with position and selected state
 * @postcondition Renders an interactive 2D point with hover and click functionality used on a `TimeSeriesGraph`
 */
export default function Point2D({ pointRef }: { pointRef: Point2DObject }) {
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
