import { useFrame } from "@react-three/fiber";
import { Container, Fullscreen, Text } from "@react-three/uikit";
import { useState } from "react";

let info: string[] = [];
let infoTau = "";
let infoRange = "";
let infoHeader = "";
let infoFirstDifferencing = "";
export function addTestSceneInfo(s: string) {
  if (import.meta.env.VITE_TEST_MODE === "true") {
    info = [...info.slice(-4), s];
  }
}
export function getGraphdataTest(
  tau: string,
  header: string,
  differencing: string,
  range: string,
) {
  infoTau = tau;
  infoHeader = header;
  infoRange = range;
  infoFirstDifferencing = differencing;
}
export default function TestScene({
  inVR,
}: {
  inVR: boolean;
}): React.JSX.Element {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useFrame(() => {
    setLogs([...info]);
  });

  return (
    <>
      {/* Maybe fullscreen component stay displaying, but the container can chang visibility, so theres always that fullscreen button top left */}
      <Fullscreen
        flexDirection={"column"}
        distanceToCamera={inVR ? 1 : 0.1}
        pointerEvents={"none"}
      >
        {/* Top bar with Drop Down and Test Scene Button */}
        <Container
          width="100%"
          height="10%"
          flexDirection="row"
          justifyContent={inVR ? "flex-start" : "space-between"}
        //   paddingLeft={inVR ? 20 : 0}
        // paddingTop={inVR ? 20 : 0}
        // gap={inVR ? 220 : 0}
        
        >
          <Container width="20%" > 
            {/* Drop Down button area (you can add your actual button here) */}
          </Container>
          <Container
            width="10%"
            height="80%"
            backgroundOpacity={hovered ? 0.9 : 0.25}
            backgroundColor={"gray"}
            borderColor={"darkgray"}
            borderWidth={0.5}
            pointerEvents={"auto"}
            onPointerEnter={() => { setHovered(true); }}
            onPointerLeave={() => { setHovered(false); }}
            onClick={() => {setClicked(!clicked); }}
            borderRadius={10}
            alignContent="center"
            justifyContent="center"
            // paddingTop={inVR ? 200 : 0}
            positionType={inVR ? "absolute" : "relative"}
            positionRight={inVR ? 340 : 0}
            positionTop={inVR ? 200 : 0}

          >
            <Text fontSize={12} color={"white"}>
              Test Scene
            </Text>
          </Container>
        </Container>

        {/* Main body: test info panel should sit on the right */}
        <Container
          width="100%"
          height="90%"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          paddingRight={60}
          paddingBottom={300}
        >
          {/* Test Scene Info Panel */}
          <Container
            width="20%"
            height="30%"
            display={clicked ? "flex" : "none"}
            flexDirection="column"
            backgroundOpacity={0}
            borderWidth={0}
            zIndex={-1}
            positionType="absolute"
            positionRight={170}
            positionBottom={190}
          >
            <Text fontSize={16} fontWeight={"bold"} color={"black"}>
              Graph Information:
            </Text>
            <Text fontSize={14} color={"black"}>
              Tau Value: {infoTau}
            </Text>
            <Text fontSize={14} color={"black"}>
              Selected Header: {infoHeader}
            </Text>
            <Text fontSize={14} color={"black"}>
              First Differencing: {infoFirstDifferencing}
            </Text>
            <Text fontSize={14} color={"black"}>
              EG Range: {infoRange}
            </Text>

            <Text
              fontSize={16}
              fontWeight={"bold"}
              color={"black"}
              marginTop={10}
            >
              Debug Logs:
            </Text>
            {logs.map((item, index) => (
              <Text key={index} fontSize={14} color={"black"}>
                {item}
              </Text>
            ))}
          </Container>
        </Container>
      </Fullscreen>
    </>
  );
}
