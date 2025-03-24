import { OrbitControls } from "@react-three/drei";
import MainScene from "./MainScene";
import TestScene from "./TestScene";

/* Starting scene used by the program
 * All of the other used scenes will get called here
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
