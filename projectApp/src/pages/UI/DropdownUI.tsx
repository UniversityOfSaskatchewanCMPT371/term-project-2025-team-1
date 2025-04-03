import { Container, Text, Fullscreen } from "@react-three/uikit";
import { useEffect, useState } from "react";
import mainController from "../../controller/MainController";
import { CSVDataInterface } from "../../types/CSVInterfaces";
import { sendLog } from "../../logger-frontend.ts";

/**
 * Create the Dropdown UI in the VR Scene
 * This displays loaded csv files and allows the generation of a TimeSeriesGraph
 * @param inVR boolean for vr functions
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
  const [infoRange, setInfoRange] = useState("");
  const [infoHeader, setInfoHeader] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const itemsPerColumn = 6; // Number of items per column for headers
  /*  itemGroup creates an array of "groups" which represent the columns in the list of headers (info box).
      First an undefined array is created based on the number of items per column.
      Then, we use map and slice to divide the contents of headers among the columns.
  */
  const itemGroup = [...Array(Math.ceil(headers.length / itemsPerColumn))].map(
    (_, i) => headers.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn),
  );
  const [isFirstDifferencing, setIsFirstDifferencing] =
    useState<boolean>(false);
  const [infoFirstDifferencing, setInfoFirstDifferencing] =
    useState<string>("");

  const [selectedHeaderIndex, setSelectedHeaderIndex] = useState<number>(-1);
  const [headerList, setHeaderList] = useState<string[]>([]);

  useEffect(() => {
    const csvData = mainController.getCSVController().getModelData();

    if (csvData) {
      const h = csvData.getCSVHeaders();
      const yHeader = csvData.getYHeader();
      const yHeaderIndex = h.indexOf(yHeader);
      setSelectedHeaderIndex(yHeaderIndex);
      setHeaderList(h);
    }
  }, [active]);

  /**
   * Create a loaded csv object displayed in the DropDown UI
   * @param data data for row object
   * @preconditions A csv data to be displayed
   * @postconditions Display loaded csv file
   */
  function GenerateRowObject({
    data,
  }: {
    data: CSVDataInterface;
  }): React.JSX.Element {
    // The list of objects/loaded csv files row by row
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

  /**
   * Generates the graph, and then updates main scene
   * @preconditions
   * - `mainController` has a `CSVController`, `GraphController`, and `MainScene`
   * @postconditions updates the main scene
   */
  function update(): void {
    mainController
      .getCSVController()
      .generate(
        selectTau,
        isFirstDifferencing,
        headerList[selectedHeaderIndex],
      );
    const graphController = mainController.getGraphController();
    const csvData = graphController.getModelEmData().getCSVData();

    // setting use states for the information box
    setInfoTau(graphController.getTauForDropDown()); //Later change this to getting tau value from the graph itself rather than the other useState
    setInfoRange(graphController.getEmbeddedRange().toString());
    setInfoHeader(csvData.getYHeader());
    setHeaders(csvData.getCSVHeaders());
    setInfoFirstDifferencing(
      csvData.getIsFirstDifferencing() ? "Enabled" : "Disabled",
    );

    mainController.updateMainScene();
  }

  /**
   * Generates the list of loaded csv files and assigned RowObjectButtons
   * Also in charge of generating a new Time Series Graph
   * @preconditions none
   * @postconditions Lists all loaded csv files and assigned components
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
   * Create a React JSX Component which is the body of the Drop Down UI.
   * It allows the user to set the tau value and shows an information box for the current graph
   * @preconditions none
   * @postconditions returns the body of the drop down UI
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
            <Container
              width={"100%"}
              height={"33%"}
              flexDirection={"column"}
              alignContent={"center"}
            >
              <Container
                width={"100%"}
                height={"50%"}
                flexDirection={"row"}
                justifyContent={"center"}
              >
                <Text>Selected Header</Text>
              </Container>
              <GenerateHeaderSelector />
            </Container>

            <Container
              width={"100%"}
              height={"33%"}
              flexDirection={"column"}
              alignContent={"center"}
            >
              <Container
                width={"100%"}
                height={"50%"}
                flexDirection={"row"}
                justifyContent={"center"}
              >
                <Text>First Differencing</Text>
              </Container>
              <GenerateFirstDifferencingSelector />
            </Container>
            {/* This contains for selecting Tau value on start up */}
            <Container
              width={"100%"}
              height={"33%"}
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
          </Container>

          {/* Information container?  */}
          {/* TODO - add first differencing to info container???? */}
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
            <Text positionLeft={10}>Selected Header: {infoHeader}</Text>
            <Text positionLeft={10} positionTop={15}>
              First Differencing: {infoFirstDifferencing}
            </Text>
            <Text positionLeft={10} positionTop={15}>
              EG Range: {infoRange}
            </Text>
            <Container
              flexDirection={"row"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              positionLeft={10}
              positionTop={30}
            >
              <Text>Headers:</Text>
              {itemGroup.map((group, col) => (
                <Container
                  key={col}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  marginRight={20}
                  positionTop={25}
                  positionLeft={15}
                >
                  {group.map((header, row) => (
                    <Text key={row}>{header}</Text>
                  ))}
                </Container>
              ))}
            </Container>
          </Container>
        </Container>
      </>
    );
  }

  /**
   * increments the header to be used to generate the graph forward 1
   * @preconditions none
   * @postconditions selectedHeaderIndex is incremented forward to the next valid header
   * - selectedHeaderIndex will not refer to the Time header
   * - if at end of headers wraps back around to the beginning of the headers
   */
  function setOnHeaderIncrease(): void {
    if (headerList.length < 3) {
      return;
    }

    const timeHeader = mainController
      .getCSVController()
      .getModelData()
      ?.getTimeHeader();

    let start = selectedHeaderIndex;
    start += 1;
    if (start >= headerList.length) {
      start = 0;
    }

    if (headerList[start] == timeHeader) {
      start += 1;
      if (start >= headerList.length) {
        start = 0;
      }
    }

    setSelectedHeaderIndex(start);
  }

  /**
   * decrements the header to be used to generate the graph forward 1
   * @preconditions none
   * @postconditions selectedHeaderIndex is decremented backwards to the next valid header
   * - selectedHeaderIndex will not refer to the Time header
   * - if at beginning of headers wraps back around to the end of the headers
   */
  function setOnHeaderDecrease(): void {
    if (headerList.length < 3) {
      return;
    }

    const timeHeader = mainController
      .getCSVController()
      .getModelData()
      ?.getTimeHeader();

    let start = selectedHeaderIndex;
    start -= 1;
    if (start < 0) {
      start = headerList.length - 1;
    }

    if (headerList[start] == timeHeader) {
      start -= 1;
      if (start < 0) {
        start = headerList.length - 1;
      }
    }
    setSelectedHeaderIndex(start);
  }

  /**
   * Creates the components for selecting which header is used for graph generation
   * Shows buttons for cycling through forward and backwards through the headers of the loaded csv file
   * @postconditions returns the header selection component
   */
  function GenerateHeaderSelector(): React.JSX.Element {
    return (
      <Container
        width={"100%"}
        height={"50%"}
        flexDirection={"row"}
        alignContent={"center"}
        justifyContent={"center"}
      >
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
            backgroundColor={"grey"}
            backgroundOpacity={0.5}
            hover={{ backgroundOpacity: 1 }}
            borderRadius={15}
            borderWidth={2}
            borderColor={"grey"}
            pointerEvents={"auto"}
            onClick={() => {
              setOnHeaderDecrease();
            }}
          >
            <Text>&lt;</Text>
          </Container>
        </Container>

        <Container
          width={"10%"}
          height={"20%"}
          flexDirection={"row"}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Text fontWeight={"bold"} positionTop={4}>
            {selectedHeaderIndex >= 0 && selectedHeaderIndex < headerList.length
              ? headerList[selectedHeaderIndex]
              : "No Header Selected"}
          </Text>
        </Container>

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
            pointerEvents={"auto"}
            onClick={() => {
              setOnHeaderIncrease();
            }}
          >
            <Text>&gt;</Text>
          </Container>
        </Container>
      </Container>
    );
  }

  /**
   * This function is used when the user wants to enable first differencing
   */
  function setOnFDIncrease(): void {
    if (!isFirstDifferencing) {
      setIsFirstDifferencing(!isFirstDifferencing);
    }
  }

  /**
   * This fuction is used when the user wants to disable first differencing
   */
  function setOnFDDecrease(): void {
    if (isFirstDifferencing) {
      setIsFirstDifferencing(!isFirstDifferencing);
    }
  }

  /**
   * Creates the component for enabling and disabling the first differencing effect
   * Shows buttons for cycling through enabling and diabling first differencing
   * @postconditions returns the first differencing selector component
   */
  function GenerateFirstDifferencingSelector(): React.JSX.Element {
    return (
      <Container
        width={"100%"}
        height={"50%"}
        flexDirection={"row"}
        alignContent={"center"}
        justifyContent={"center"}
      >
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
            backgroundColor={"grey"}
            backgroundOpacity={0.5}
            hover={{ backgroundOpacity: 1 }}
            borderRadius={15}
            borderWidth={2}
            borderColor={"grey"}
            pointerEvents={"auto"}
            onClick={() => {
              setOnFDDecrease();
            }}
          >
            <Text>&lt;</Text>
          </Container>
        </Container>

        <Container
          width={"10%"}
          height={"20%"}
          flexDirection={"row"}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Text fontWeight={"bold"} positionTop={4}>
            {isFirstDifferencing ? "Enabled" : "Disabled"}
          </Text>
        </Container>

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
            pointerEvents={"auto"}
            onClick={() => {
              setOnFDIncrease();
            }}
          >
            <Text>&gt;</Text>
          </Container>
        </Container>
      </Container>
    );
  }

  /**
   * Increase the tau value
   * @preconditions expect tau to be between 1 and 5 (inclusive)
   * @postconditions if tau is less than 5, increase it by 1. Otherwise leave it at 5
   */
  function setOnTauIncrease(): void {
    if (selectTau != 5) {
      setSelectTau(selectTau + 1);
    }
  }

  /**
   * Decrease the tau value
   * @preconditions expect tau to be between 1 and 5 (inclusive)
   * @postconditions if tau is more than 1, decrease it by 1. Otherwise leave it at 1
   */
  function setOnTauDecrease(): void {
    if (selectTau != 1) {
      setSelectTau(selectTau - 1);
    }
  }

  /**
   * This function creates the component for setting the Tau value on generation.
   * Shows the buttons for both decreasing and increasing the tau value, it will also display the current Tau value
   * @postconditions none
   * @postconditions returns the Tau selector component
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
              pointerEvents={"auto"}
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
              pointerEvents={"auto"}
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
   * @postconditions returns the activation button and the drop down UI
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
