import { useFrame } from "@react-three/fiber";
import { useXRInputSourceState, XROrigin } from "@react-three/xr";
import { useRef } from "react";
import { Group } from "three";

/**
 * Creates an XROrigin component that allows user movement using the right controller
 * @param speed number multiplier for step distance
 * @preconditions
 * - `speed` = 1 for default step speed
 * - `speed` > 1 for increased step speed
 * - 0 < `speed` < 1 for decreased step speed
 * - `speed` < 0 inverts the controls
 * - `speed` = 0 disables movement
 * @postconditions
 * - returns an XROrigin component that allows the right controller thumbstick to move the user
 * - movement should be relative to the user's facing direction
 */
export default function Locomotion({ speed }: { speed: number }) {
  const controller = useXRInputSourceState("controller", "right");
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    // check that none of these are null
    if (ref.current == null || controller == null) {
      return;
    }
    const thumstickState = controller.gamepad["xr-standard-thumbstick"];
    if (thumstickState == null) {
      return;
    }

    const headset = ref.current.children[0]; // Assuming the first child is the camera

    // get headset rotation from its transfrom matrix, these values in atan return the angle
    const angle = Math.atan2(
      -headset.matrix.elements[8],
      headset.matrix.elements[10],
    );
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // scale movement by delta and speed values
    const deltaX = (thumstickState.xAxis ?? 0) * delta * speed;
    const deltaY = (thumstickState.yAxis ?? 0) * delta * speed;

    // apply directional movement
    // also thumbstickState uses x and y axes, while user position uses x and z
    const rotatedX = deltaX * cos - deltaY * sin;
    const rotatedZ = deltaX * sin + deltaY * cos;

    // Move the player
    ref.current.position.x += rotatedX;
    ref.current.position.z += rotatedZ;
  });
  return <XROrigin ref={ref} />;
}
