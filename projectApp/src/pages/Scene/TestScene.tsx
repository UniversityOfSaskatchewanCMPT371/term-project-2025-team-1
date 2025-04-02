import { useFrame } from "@react-three/fiber";
import { Container, Fullscreen, Text } from "@react-three/uikit";
import { useState } from "react";

let info: string[] = [];
let infoTau="";
  let infoRange = "";
  let infoHeader = "";
  let infoFirstDifferencing= "";
export function addTestSceneInfo(s: string) {
  if (import.meta.env.VITE_TEST_MODE === "true") {
    info = [...info.slice(-4), s];
  }
}
export function getGraphdataTest(tau: string, header: string, differencing:string, range: string, headers: string) {
  infoTau=tau; infoHeader = header; infoRange = range;  infoFirstDifferencing = differencing; headers = headers;
    
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
              borderWidth={2}
              borderColor={"black"}
              justifyContent={"center"}
              alignContent={"center"}
              display={clicked ? "flex" : "none"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              {/* Items to be displayed in test scene will go here */}
              <Container
                width={"100%"}
                height={"50%"}
                alignContent={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                marginTop={10}
                alignItems={"center"}
              >
                <Text fontSize={16} fontWeight={"bold"} color={"black"}>
                  Debug Logs:
                </Text>
                {logs.map((item, index) => (
                  <Text key={index} fontSize={14} color={"black"}>
                    {item}
                  </Text>
                ))}
              </Container>
            </Container>
            {/* Graph information */}
        <Container
                width={"15%"}
                height={"15%"}
                flexDirection={"column"}
                alignContent={"flex-start"}
                justifyContent={"flex-end"}
                display={clicked ? "flex" : "none"}
                paddingTop={10}
                paddingX={22}
              >
                <Text fontSize={16} fontWeight={"bold"} color={"black"} positionLeft={20}>
                  Graph Information:
                </Text>
                <Text fontSize={14} color={"black"} positionLeft={20}>
                  Tau Value: {infoTau}
                </Text>
                <Text fontSize={14} color={"black"} positionLeft={20}>
                  Selected Header: {infoHeader}
                </Text>
                <Text fontSize={14} color={"black"} positionLeft={20}>
                  First Differencing: {infoFirstDifferencing}
                </Text>
                <Text fontSize={14} color={"black"} positionLeft={20}>
                  EG Range: {infoRange}
                </Text>
                
              </Container>
          </Container>
        </Container>
      </Fullscreen>
    </>
  );
}
