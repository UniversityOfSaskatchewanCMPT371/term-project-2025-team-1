import { useFrame } from "@react-three/fiber";
import { useXRInputSourceState, XROrigin } from "@react-three/xr";
import { useRef } from "react";
import { Group } from "three";

export default function Locomotion({ speed }: { speed: number }) {
  const controller = useXRInputSourceState("controller", "right");
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current == null || controller == null) {
      return;
    }
    const thumstickState = controller.gamepad["xr-standard-thumbstick"];
    if (thumstickState == null) {
      return;
    }
    const headset = ref.current.children[0]; // Assuming the first child is the camera

    // Apply headset rotation (approximating quaternion application without `three.js`)
    const angle = Math.atan2(
      -headset.matrix.elements[8],
      headset.matrix.elements[10],
    );
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const deltaX = (thumstickState.xAxis ?? 0) * delta * speed;
    const deltaY = (thumstickState.yAxis ?? 0) * delta * speed;
    const rotatedX = deltaX * cos - deltaY * sin;
    const rotatedZ = deltaX * sin + deltaY * cos;

    // Move the player
    ref.current.position.x += rotatedX;
    ref.current.position.z += rotatedZ;
  });
  return <XROrigin ref={ref} />;
}
