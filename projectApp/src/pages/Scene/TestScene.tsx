import { Container, Fullscreen, Text } from "@react-three/uikit";
import { useEffect, useState } from "react";
import { clearInterval } from "timers";
import { sendLog } from "../../logger-frontend";

export default function TestScene({
  inVR,
}: {
  inVR: boolean;
}): React.JSX.Element {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [logs, setStrings] = useState<string[]>([]);

  const fetchLog = async () => {
    try {
      const response = await fetch("../../../public/tlog.txt");
      const text = await response.text();
      setStrings(text.split("\n").filter((line) => line.trim() !== ""));
    } catch (error) {
      sendLog("info", "Can't fetch the log file for TestScene.tsx");
    }
  };

  useEffect(() => {
    fetchLog();
    const interval = setInterval(fetchLog, 2000);
    return () => clearInterval(interval);
  }, []);

  // Temporary example array to use for displaying values
  //const strings: string[] = ["string 1","string 2","string 3", "string 4", "string 5"];


  return (
    <>
      {/* Maybe fullscreen component stay displaying, but the container can change visibility, so theres always that fullscreen button top left */}
      <Fullscreen
        flexDirection={"row"}
        distanceToCamera={0.8}
        pointerEvents={"none"}
      >
        {/* Main Container that encapsulates Test Scene */}
        {/* Possibly make some sizes dependent when inside or outside vr */}
        <Container
          width={"100%"}
          height={"100%"}
          backgroundColor={"darkgray"}
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
              <Text>TEST BODY</Text>

              <Container
                width={"100%"}
                alignContent={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
                marginTop={10}
                alignItems={"center"}
                >
                  {logs.map((item, index) => (
                    <Text key={index} fontSize={14} color={"black"}>
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
