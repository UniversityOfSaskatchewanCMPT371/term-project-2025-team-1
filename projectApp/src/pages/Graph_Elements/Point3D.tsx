import { useEffect, useState } from "react";
import { Point3DObject } from "../../components/Graph_Components/Points/Point3DObject";

export default function Point3D({
  pointRef,
}: {
  pointRef: Point3DObject;
}): React.JSX.Element {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useEffect(() => {
    if (!clicked && pointRef.getObject().getSelected()) {
      click(true);
    } else if (clicked && !pointRef.getObject().getSelected()) {
      click(false);
    }
  });
  function setOnClick(): void {
    pointRef.getObject().setSelected(!pointRef.getObject().getSelected());
    click(pointRef.getObject().getSelected());
  }

  return (
    <>
      <mesh
        position={[
          pointRef.getXPosition(),
          pointRef.getYPosition(),
          pointRef.getZPosition(),
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
