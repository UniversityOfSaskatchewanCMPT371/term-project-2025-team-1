import { Root, Container, Text } from "@react-three/uikit";
import { useState } from "react";
import mainController from "../../controller/MainController.tsx";
import { CSVDataInterface } from "../../types/CSVInterfaces.tsx";
import { sendLog } from "../../logger-frontend.ts";

//Props for drop down UI
interface dropDownProps {
  position: [number, number, number]; //x, y, z position of dropdown UI on VR scene
  xSize: number; //Width of UI
  ySize: number; //Height of UI
}

/**
 * This function is for creating the Dropdown UI in the VR Scene
 * This displays loaded csv files and allows the generation of a TimeSeriesGraph
 * @preconditions props used for position in the VR scene
 * @postconditions the specified drop down UI
 */
export default function DropdownUI(props: dropDownProps) {
  const [pressed, press] = useState(false);
  const [active, setActive] = useState(false);

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
            <RowObjectButtons data={data} />
          </Container>
        </Container>
      </>
    );
  }

  /**
   * Buttons used for changing the display board
   * @precondition A csv data linked to these button updates
   * @postconditions Two buttons for incrementing and decrementing, the current display board number
   */
  function RowObjectButtons({
    data,
  }: {
    data: CSVDataInterface;
  }): React.JSX.Element {
    return (
      <>
        <Container>
          {/* Displaying the < button */}
          <Container
            backgroundColor={"gray"}
            width={"25%"}
            alignItems={"center"}
            justifyContent={"center"}
            positionRight={2}
            backgroundOpacity={0.5}
            hover={{ backgroundOpacity: 0.75 }}
            onClick={() => {
              data.decrementDisplayBoard();
              sendLog("info", "RowObjectButtons [<] pressed");
            }}
          >
            <Text fontWeight={"bold"}>&lt;</Text>
          </Container>

          {/* Displaying the board number */}
          <Container
            width={"30%"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text fontWeight={"bold"}>{data.getDisplayBoard().toString()}</Text>
          </Container>

          {/* Displaying the > button */}
          <Container
            backgroundColor={"gray"}
            width={"25%"}
            alignItems={"center"}
            justifyContent={"center"}
            positionLeft={2}
            backgroundOpacity={0.5}
            hover={{ backgroundOpacity: 0.75 }}
            onClick={() => {
              data.incrementDisplayBoard();
              sendLog("info", "RowObjectButtons []>] pressed");
            }}
          >
            <Text fontWeight={"bold"}>&gt;</Text>
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
    const modelData = mainController.getCSVController().getModelData();
    
    return (
      <>
        <Container flexDirection={"column"} flexGrow={props.xSize}>
          <Container
            height={"90%"}
            width={"100%"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
          >
            {/* Reading through Model csv data files */}
            {modelData ? (
              <GenerateRowObject data={modelData} key={modelData.getName()} />
            ) : (
              <Text>No data available</Text>
            )}
          </Container>

          <Container
            flexDirection={"row"}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            height={"8%"}
            width={"95%"}
          >
            <Container
              width={"30%"}
              height={"100%"}
              backgroundColor={"gray"}
              backgroundOpacity={0.5}
              hover={{ backgroundOpacity: 0.75 }}
              onClick={() => {
                update();
                sendLog("info", "GenerateList [BUTTON]? pressed");
              }}
            >
              <Text
                fontWeight={"bold"}
                positionLeft={"20%"}
                positionBottom={"5%"}
              >
                Generate
              </Text>
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
      <>
        {/* Use the component <Fullscreen> of uikit 
                For Now its okay to keep it static*/}
        <mesh position={props.position}>
          <mesh position={[-0.5 - props.xSize / 2, 0, 0]}>
            <Root sizeX={0.5} sizeY={0.5}>
              <Container
                flexGrow={1}
                onClick={() => {
                  setActive(!active);
                  sendLog("info", "DropDownBody [active] button pressed");
                }}
                backgroundColor={"black"}
                backgroundOpacity={0.7}
                hover={{ backgroundOpacity: 1 }}
              ></Container>
            </Root>
          </mesh>
          <mesh position={[0, 0, 0]} visible={active}>
            <Root
              backgroundColor="grey"
              sizeX={props.xSize}
              sizeY={props.ySize}
              flexDirection={"column"}
            >
              <Container
                height={"10%"}
                width={"99%"}
                margin={1}
                backgroundColor={"lightgray"}
              >
                <Text fontWeight={"bold"} positionLeft={20}>
                  Loaded Graphs
                </Text>
              </Container>

              <Container
                height={"88%"}
                width={"99%"}
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
            </Root>
          </mesh>
        </mesh>
      </>
    );
  }

  return (
    <>
      <DropDownBody />
    </>
  );
}
