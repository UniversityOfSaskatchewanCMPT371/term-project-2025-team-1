import { useState } from "react";
import { Point2DObject } from "../../components/Graph_Components/Points/Point2DObject";
import mainController from "../../controller/MainController";

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

  /**
   * Toggles the point's selected state and updates local click state
   * @precondition None
   * @postcondition Updates both local clicked state and pointRef's selected state
   */
  function setOnClick(): void {
    pointRef.getObject().setSelected(!pointRef.getObject().getSelected());
    click(pointRef.getObject().getSelected());
    mainController.updateMainScene();
  }

  return (
    <mesh
      position={[pointRef.getXPosition(), pointRef.getYPosition(), 0.01]}
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
      <circleGeometry attach="geometry" args={[0.06, 32]} />

      <meshStandardMaterial
        color={clicked ? "blue" : "skyblue"}
        opacity={hovered ? 1.0 : 0.4}
      />
    </mesh>
  );
}
