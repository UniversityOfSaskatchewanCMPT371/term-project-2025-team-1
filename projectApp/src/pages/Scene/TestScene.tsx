import { useFrame } from "@react-three/fiber";
import { Container, Fullscreen, Text } from "@react-three/uikit";
import { useState } from "react";

// persists outside the component
let info: string[] = [];
let infoTau = "";
let infoRange = "";
let infoHeader = "";
let infoFirstDifferencing = "";

/**
 * add a log to the TestScene
 * @param s log string to be put into 'info'
 * @preconditions `import.meta.env.VITE_TEST_MODE` must be true
 * @postconditions
 * - on success, `s` is pushed into info array
 * - if 'info' has more than 4 entries, slice out the first (oldest)
 * - if `VITE_TEST_MODE` is false, nothing happens
 */
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
/**
 * Peek at test info while in the vr environment
 * @param inVr boolean for vr functions
 * @postconditions returns the test scene for tester information within the vr environment
 */
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
        flexDirection={"row"}
        distanceToCamera={inVR ? 1 : 0.1}
        pointerEvents={"none"}
      >
        {/* Main Container that encapsulates Test Scene */}
        {/* Possibly make some sizes dependent when inside or outside vr */}
        <Container
          width={"100%"}
          height={"100%"}
          backgroundOpacity={clicked ? 0.5 : 0.01}
          alignContent={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          {/* Top filler */}
          <Container width={"100%"} height={inVR ? "30%" : "0%"} />

          <Container
            width={"100%"}
            height={"7%"}
            flexDirection={"column"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Container width={"100%"} height={"100%"} flexDirection={"row"}>
              <Container
                width={inVR ? "57%" : "90%"}
                height={"5%"}
                backgroundOpacity={0.4}
              />

              {/* Button to open Test Scene */}
              <Container
                width={"10%"}
                height={"80%"}
                backgroundOpacity={hovered ? 0.9 : 0.25}
                backgroundColor={"gray"}
                borderColor={"darkgray"}
                borderWidth={0.5}
                pointerEvents={"auto"}
                onPointerEnter={() => {
                  setHovered(true);
                }}
                onPointerLeave={() => {
                  setHovered(false);
                }}
                onClick={() => {
                  setClicked(!clicked);
                }}
                borderRadius={10}
                alignContent={"center"}
                justifyContent={"center"}
                positionTop={5}
                positionRight={5}
              >
                <Text fontSize={12} color={"white"}>
                  Test Scene
                </Text>
              </Container>
            </Container>
          </Container>

          {/* The Test Body Container */}
          <Container
            width={"100%"}
            height={inVR ? "62%" : "90%"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Container
              width={"50%"}
              height={"75%"}
              justifyContent={"center"}
              alignContent={"center"}
              display={clicked ? "flex" : "none"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              {/* Left Container */}
              <Container
                width={"50%"}
                height={"100%"}
                alignContent={"flex-start"}
                justifyContent={"flex-start"}
                flexDirection={"column"}
                marginTop={10}
                alignItems={"flex-start"}
              >
                <Text
                  fontSize={inVR ? 12 : 16}
                  fontWeight={"bold"}
                  color={"black"}
                >
                  Graph Information:
                </Text>
                <Text fontSize={inVR ? 10 : 14} color={"black"}>
                  Tau Value: {infoTau}
                </Text>
                <Text fontSize={inVR ? 10 : 14} color={"black"}>
                  Selected Header: {infoHeader}
                </Text>
                <Text fontSize={inVR ? 10 : 14} color={"black"}>
                  First Differencing: {infoFirstDifferencing}
                </Text>
                <Text fontSize={inVR ? 10 : 14} color={"black"}>
                  EG Range: {infoRange}
                </Text>
              </Container>

              <Container
                width={"50%"}
                height={"100%"}
                alignContent={"flex-start"}
                justifyContent={"flex-start"}
                flexDirection={"column"}
                marginTop={10}
                alignItems={"flex-end"}
              >
                {/* Right  */}
                <Text fontWeight={"bold"} fontSize={inVR ? 12 : 16}>
                  Debug Logs:
                </Text>
                {logs.map((item, index) => (
                  <Text key={index} fontSize={inVR ? 10 : 14} color={"black"}>
                    {item}
                  </Text>
                ))}
              </Container>
            </Container>
          </Container>
        </Container>
      </Fullscreen>
    </>
  );
}
