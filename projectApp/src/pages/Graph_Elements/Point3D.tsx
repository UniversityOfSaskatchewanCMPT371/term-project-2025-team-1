import { useState } from "react";
import { Point3DObject } from "../../components/Graph_Components/Points/Point3DObject";
import mainController from "../../controller/MainController";

/**
 * This function will display and realize the 3D Point Object onto the VR Scene
 * @param param0 takes a Point3DObject
 * @returns a JSX element that displays the 3D Point
 */
export default function Point3D({
  pointRef,
}: {
  pointRef: Point3DObject;
}): React.JSX.Element {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  
  function setOnClick(): void {
    pointRef.getObject().setSelected(!pointRef.getObject().getSelected());
    click(pointRef.getObject().getSelected());
  }

  return (
    <>
      <mesh
        //Translating the positions to the 3D Embedded Graph Axis
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
        <sphereGeometry attach="geometry" args={[1, 32, 16]}></sphereGeometry>
        <meshStandardMaterial
          color={clicked ? "red" : "orange"}
          opacity={hovered ? 1.0 : 0.4}
        ></meshStandardMaterial>
      </mesh>
    </>
  );
}
