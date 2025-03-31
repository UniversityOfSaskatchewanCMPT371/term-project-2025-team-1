import { OrbitControls } from "@react-three/drei";
import MainScene from "./MainScene";
import TestScene from "./TestScene";

/**
 * Starting scene used by the program
 * All of the other used scenes will get called here
 * @param inVR boolean for vr functions
 * @returns the initial scene the contains the orbital controls and the main scene
 */
export default function InitScene({
  inVR,
}: {
  inVR: boolean;
}): React.JSX.Element {
  return (
    <>
      <OrbitControls />
      {/* Over here we could specify the scene */}
      {import.meta.env.VITE_TEST_MODE === "true" && <TestScene inVR={inVR} />}
      <MainScene inVR={inVR} />
    </>
  );
}
