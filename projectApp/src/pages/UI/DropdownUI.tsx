import { Container, Text, Fullscreen } from "@react-three/uikit";
import { useState } from "react";
import mainController from "../../controller/MainController";
import { CSVDataInterface } from "../../types/CSVInterfaces";
import { sendLog } from "../../logger-frontend.ts";

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
  const [selectTau, setSelectTau] = useState(1);
  const [infoTau, setInfoTau] = useState("");

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
          />
        </Container>
      </>
    );
  }

  /*
   * Generates the graph, and then updates main scene
   */
  function update(): void {
    mainController.getCSVController().generate(selectTau);
    setInfoTau(mainController.getGraphController().getTauForDropDown()); //Later change this to getting tau value from the graph itself rather than the other useState
    mainController.updateMainScene();
  }

  /**
   * Generates the list of loaded csv files and assigned RowObjectButtons
   * Also in charge of generating a new Time Series Graph
   * @precondition none
   * @postcondition Lists all loaded csv files and assigned components
   */
  function GenerateList(): React.JSX.Element {
    const modelData = mainController.getCSVController().getModelData();

    return (
      <>
        <Container flexDirection={"column"} width={"100%"}>
          <Container
            height={"15%"}
            width={"100%"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {/* Reading through Model csv data files */}
            {modelData ? (
              <GenerateRowObject data={modelData} key={modelData.getName()} />
            ) : (
              <Text>No data available</Text>
            )}
          </Container>

          {/* The options body that allows the user to set values when generating the graph */}
          <GenerateOptionsList />

          {/* This container will contain the Generate button, which generates the graph when clicked */}
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

  /**
   * This function creates a React JSX Component which is the body of the Drop Down UI.
   * It allows the user to set the tau value and shows an information box for the current graph
   * @returns the body of the drop down UI
   */
  function GenerateOptionsList(): React.JSX.Element {
    return (
      <>
        <Container
          width={"100%"}
          height={"75%"}
          flexDirection={"row"}
          alignContent={"center"}
          justifyContent={"center"}
        >
          {/* Container for the options list that the user can interact with */}
          <Container
            width={"50%"}
            height={"100%"}
            flexDirection={"column"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            {/* This contains for selecting Tau value on start up */}
            <Container
              width={"100%"}
              height={"50%"}
              flexDirection={"column"}
              alignContent={"center"}
            >
              <Container
                width={"100%"}
                height={"50%"}
                flexDirection={"row"}
                justifyContent={"center"}
              >
                <Text>Set Time Delay</Text>
              </Container>
              <GenerateTauSelector />
            </Container>

            {/* Planned Time Window selector */}
            <Container
              width={"100%"}
              height={"50%"}
              flexDirection={"column"}
              alignContent={"center"}
            >
              <Container
                width={"100%"}
                height={"50%"}
                flexDirection={"row"}
                justifyContent={"center"}
              >
                <Text>Set Time Window</Text>
              </Container>
            </Container>
          </Container>

          {/* Information container?  */}
          <Container
            width={"50%"}
            height={"100%"}
            flexDirection={"column"}
            alignContent={"center"}
            justifyContent={"flex-start"}
            borderWidth={1}
            borderColor={"black"}
          >
            <Container
              width={"100%"}
              height={"15%"}
              flexDirection={"row"}
              alignContent={"center"}
              justifyContent={"flex-start"}
            >
              <Text positionLeft={10}>Tau Value: {infoTau}</Text>
            </Container>
          </Container>
        </Container>
      </>
    );
  }

  /**
   * This function is used when the user wants to increase the tau value
   */
  function setOnTauIncrease(): void {
    //For now max tau will be set to 5
    if (selectTau != 5) {
      setSelectTau(selectTau + 1);
    }
  }

  /**
   * This function is used when the user wants to decrease the tau value
   */
  function setOnTauDecrease(): void {
    if (selectTau != 1) {
      setSelectTau(selectTau - 1);
    }
  }

  /**
   * Thhis function creates the component for setting the Tau value on generation.
   * Shows the buttons for both decreasing and increasing the tau value, it will also display the current Tau value
   * @returns the Tau selector component
   */
  function GenerateTauSelector(): React.JSX.Element {
    return (
      <>
        <Container
          width={"100%"}
          height={"50%"}
          flexDirection={"row"}
          alignContent={"center"}
          justifyContent={"center"}
        >
          {/* The container for the button that decreases the Tau value */}
          <Container
            width={"45%"}
            height={"100%"}
            flexDirection={"row"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Container
              width={"60%"}
              height={"30%"}
              flexDirection={"row"}
              alignContent={"center"}
              justifyContent={"center"}
              backgroundColor={"gray"}
              backgroundOpacity={0.5}
              hover={{ backgroundOpacity: 1 }}
              borderRadius={15}
              borderWidth={2}
              borderColor={"gray"}
              onClick={() => {
                setOnTauDecrease();
              }}
            >
              <Text>&lt;</Text>
            </Container>
          </Container>

          {/* Container for showing the current Tau value of the selector */}
          <Container
            width={"10%"}
            height={"20%"}
            flexDirection={"row"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Text fontWeight={"bold"} positionTop={4}>
              {selectTau.toString()}
            </Text>
          </Container>

          {/* The container for the button that increases the Tau value */}
          <Container
            width={"45%"}
            height={"100%"}
            flexDirection={"row"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Container
              width={"60%"}
              height={"30%"}
              flexDirection={"row"}
              alignContent={"center"}
              justifyContent={"center"}
              backgroundColor={"gray"}
              backgroundOpacity={0.5}
              hover={{ backgroundOpacity: 1 }}
              borderRadius={15}
              borderWidth={2}
              borderColor={"gray"}
              onClick={() => {
                setOnTauIncrease();
              }}
            >
              <Text>&gt;</Text>
            </Container>
          </Container>
        </Container>
      </>
    );
  }

  /**
   * The main display of the DropDownUI, along with the button that displays it
   * @preconditions none
   * @postconditions The activation button and the drop down UI
   */
  function DropDownBody(): React.JSX.Element {
    return (
      <Fullscreen
        flexDirection={"row"}
        distanceToCamera={inVR ? 1 : 0.1}
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
    );
  }

  return (
    <>
      <DropDownBody />
    </>
  );
}
