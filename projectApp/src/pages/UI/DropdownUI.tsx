import { Container, Text, Fullscreen } from "@react-three/uikit";
import { useState } from "react";
import mainController from "../../controller/MainController.tsx";
import { CSVDataInterface } from "../../types/CSVInterfaces.tsx";
import { sendLog } from "../../logger-frontend.ts";
import { C } from "vitest/dist/chunks/reporters.66aFHiyX.js";

/**
 * This function is for creating the Dropdown UI in the VR Scene
 * This displays loaded csv files and allows the generation of a TimeSeriesGraph
 * @preconditions props used for position in the VR scene
 * @postconditions the specified drop down UI
 */
export default function DropdownUI({
  inVR,
}: {
  inVR: boolean;
}): React.JSX.Element {
  const [pressed, press] = useState(false);
  const [active, setActive] = useState(false);
  const [ tau, setTau ] = useState("");

  /**
   * This is the function for creating a loaded csv object displayed in the DropDown UI
   * @preconditions A csv data to be displayed
   * @postcondition Display loaded csv file
   */
  function GenerateRowObject({
    data,
  }: {
    data: CSVDataInterface;
  }): React.JSX.Element {
    //The list of objects/loaded csv files row by row
    return (
      <>
        <Container
          flexDirection={"row"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          width={"100%"}
          height={"10%"}
        >
          <Container width={"50%"} height={"100%"}>
            <Text fontWeight={"bold"} positionLeft={20}>
              {data.getName()}
            </Text>
          </Container>
          <Container
            width={"50%"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
          >
          </Container>
        </Container>
      </>
    );
  }

  /*
   * Generates the graph, and then updates main scene
   */
  function update(): void {
    mainController.getCSVController().generate();
    mainController.updateMainScene();
  }

  /**
   * Generates the list of loaded csv files and assigned RowObjectButtons
   * Also in charge of generating a new Time Series Graph
   * @precondition none
   * @postcondition Lists all loaded csv files and assigned components
   */
  function GenerateList(): React.JSX.Element {
    setTau(mainController.getGraphController().getTauForDropDown());

    return (
      <>
        <Container flexDirection={"column"} width={"100%"}>
          <Container
            height={"20%"}
            width={"100%"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {/* Reading through Model csv data files */}
            {mainController
              .getCSVController()
              .getModelData()
              .map((graph) => (
                <GenerateRowObject data={graph} key={graph.getName()} />
              ))}
          </Container>

          <GenerateOptionsList></GenerateOptionsList>

          <Container
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            height={"10%"}
            width={"100%"}
            borderWidth={1}
            borderColor={"black"}
          >
            <Container
              width={"30%"}
              height={"70%"}
              backgroundColor={"gray"}
              backgroundOpacity={0.5}
              borderRadius={5}
              justifyContent={"center"}
              positionRight={10}
              pointerEvents={"auto"}
              hover={{ backgroundOpacity: 0.75 }}
              onClick={() => {
                update();
                sendLog("info", "GenerateList [BUTTON]? pressed");
              }}
            >
              <Text fontWeight={"bold"}>Generate</Text>
            </Container>
          </Container>
        </Container>
      </>
    );
  }

  function GenerateOptionsList(): React.JSX.Element {

    return( 
      <>
      <Container width={"100%"} height={"70%"} flexDirection={"row"} alignContent={"center"} justifyContent={"center"} >
        {/* Tao container */}
        <Container width={"50%"} height={"100%"} flexDirection={"column"} alignContent={"center"} justifyContent={"center"}>
          <Container width={"100%"} height={"50%"} flexDirection={"column"} alignContent={"center"}>
            <Container width={"100%"} height={"50%"} flexDirection={"row"} justifyContent={"center"}>
                <Text>Set Time Delay</Text>
            </Container>
            <GenerateTauSelector></GenerateTauSelector>
            <Container width={"100%"} height={"50%"} flexDirection={"row"} justifyContent={"center"}>

            </Container>
          </Container>

          <Container width={"100%"} height={"50%"} flexDirection={"column"} alignContent={"center"}>
            <Container width={"100%"} height={"50%"} flexDirection={"row"} justifyContent={"center"}>
              <Text>
                Set Time Window
              </Text>
            </Container>
          </Container>
        </Container>

        {/* Information container?  */}
        <Container width={"50%"} height={"100%"} flexDirection={"column"} alignContent={"center"} justifyContent={"flex-start"} borderWidth={1} borderColor={"black"}>
          <Text> Information box</Text>
        </Container>

      </Container>
      </>
    )
  }

  function GenerateTauSelector(): React.JSX.Element{
    
    return(
      <>
      <Container width={"100%"} height={"100%"} flexDirection={"row"} alignContent={"center"} justifyContent={"center"}>
        <Container width={"45%"} height={"100%"} flexDirection={"row"} alignContent={"center"} justifyContent={"center"}>
        <Container width={"60%"} height={"20%"} flexDirection={"row"} alignContent={"center"} justifyContent={"center"} 
          backgroundColor={"gray"} backgroundOpacity={0.5} hover={{backgroundOpacity:1}}
          borderRadius={15}>
            <Text>&lt;</Text>
          </Container>
        </Container>
        <Container width={"10%"} height={"100%"} flexDirection={"row"} alignContent={"center"} justifyContent={"center"}>
          <Text>
            {tau}
          </Text>
        </Container>
        <Container width={"45%"} height={"100%"} flexDirection={"row"} alignContent={"center"} justifyContent={"center"}>
          <Container width={"60%"} height={"20%"} flexDirection={"row"} alignContent={"center"} justifyContent={"center"} 
          backgroundColor={"gray"} backgroundOpacity={0.5} hover={{backgroundOpacity:1}}
          borderRadius={15}>
            <Text>&gt;</Text>
          </Container>
        </Container>
      </Container>
      </>
    )
  }

  /**
   * The main display of the DropDownUI, along with the button that displays it
   * @preconditions none
   * @postconditions The activation button and the drop down UI
   */
  function DropDownBody(): React.JSX.Element {
    return (
      <>
        <Fullscreen
          flexDirection={"row"}
          distanceToCamera={inVR? 1: 0.1}
          pointerEvents={"none"}
        >
          <Container
            width={"100%"}
            height={"100%"}
            alignContent={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Container width={"100%"} height={inVR ? "24%" : "0%"} />

            <Container
              width={"100%"}
              height={"7%"}
              flexDirection={"column"}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <Container
                width={"100%"}
                height={"100%"}
                flexDirection={"row-reverse"}
                alignContent={"center"}
              >
                <Container
                  width={inVR ? "57%" : "90%"}
                  height={"5%"}
                  backgroundOpacity={0.4}
                />

                <Container
                  width={"15%"}
                  height={"70%"}
                  borderRadius={5}
                  onClick={() => {
                    setActive(!active);
                    sendLog("info", "DropDownBody [active] button pressed");
                  }}
                  backgroundColor={"black"}
                  backgroundOpacity={0.5}
                  hover={{ backgroundOpacity: 1 }}
                  pointerEvents={"auto"}
                  justifyContent={"center"}
                >
                  <Text color={"white"}>Drop Down</Text>
                </Container>
              </Container>
            </Container>

            {/* Container displaying loaded CSV files */}
            <Container
              width={"100%"}
              height={inVR ? "54%" : "93%"}
              flexDirection={"row-reverse"}
              alignContent={"flex-start"}
              justifyContent={"flex-start"}
            >
              <Container
                width={inVR ? "80%" : "90%"}
                height={"80%"}
                flexDirection={"column"}
                display={active ? "flex" : "none"}
              >
                <Container
                  width={"100%"}
                  height={"90%"}
                  positionLeft={5}
                  flexDirection={"column"}
                  alignContent={"center"}
                  justifyContent={"center"}
                >
                  {/* Title Container */}
                  <Container
                    height={"10%"}
                    width={"70%"}
                    margin={1}
                    backgroundColor={"lightgray"}
                  >
                    <Text fontWeight={"bold"} positionLeft={20}>
                      Loaded Graphs
                    </Text>
                  </Container>

                  {/* Body Container */}
                  <Container
                    height={"90%"}
                    width={"70%"}
                    margin={1}
                    onClick={() => {
                      press(!pressed);
                      sendLog("info", "DropDownBody [create] button pressed");
                    }}
                    backgroundColor={"lightgray"}
                    backgroundOpacity={0.8}
                  >
                    {/* Create objects representing loaded graphs in model 
                                    Each will have a button that sets a use state for selected
                                    Then a button for loading selected graph, activate use state
                                    Then on a useState, update*/}
                    <GenerateList />
                  </Container>
                </Container>
              </Container>
            </Container>
          </Container>
        </Fullscreen>
      </>
    );
  }

  return (
    <>
      <DropDownBody />
    </>
  );
}
