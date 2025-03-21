import { Root, Container, Text } from "@react-three/uikit";
import { Line } from "@react-three/drei";
import Create2DPoint from "../../components/Graph_Components/Create2DPoint";
import { TimeSeriesGraphObject } from "../../components/Graph_Components/TimeSeriesGraphObject";
import { PointObject } from "../../components/Graph_Components/PointObject";
import { useState } from "react";
import mainController from "../../controller/MainController";
import { sendLog } from "../../logger-frontend";

/**
 * This function will create a Time Series Graph on the VR scene using a TimeSeriesGraphObject.
 * A 2D Graph that will have the csv data's time for it's X values with the other columns as Y values
 * Will contain Points connected by lines to represent the values of the specified data fields
 * @preconditions A defined TimeSeriesGraphObject
 * @postconditions returns a React JSX Element that represents a 2D Time Series Graph
 */

export default function TimeSeriesGraph({
  graph,
}: {
  graph: TimeSeriesGraphObject;
}): React.JSX.Element {
  const [header, setHeader] = useState(""); //useState for changes in the graph's Y header
  const [selectedPoint, setSelectedPoint] = useState<PointObject | null>(null); // New state for selected point value

  // Values used to space Points in the X axis
  const totalSpace = 5;
  const divider = totalSpace / graph.getNumPoints();
  let current = -1.8 + divider / 2;

  // Values used to position lines, currently set to starting position
  let currentLine: [number, number, number] = [0, 0, 0.01];
  let lastLine: [number, number, number] = [-1.8, -1, 0.01];

  // Spacing used by X and Y axis
  const xSpacing = 100 / graph.getNumPoints();
  const ySpacing = 100 / (graph.timeSeriesYRange().length + 1);

  //Used to update the graph, currently updates on Y header change
  function UpdateGraph(): void {
    graph.updatePointPosition();
    setHeader(graph.getYHeader());
    mainController.updateMainScene();
    sendLog(
      "info",
      "a TimeSeriesGraph object was updated (TimeSeriesGraph.tsx)",
    );
  }

  /**
   * This function is responsible for changing the Y Header
   * @preconditions None
   * @postconditions The container that shows the current Y header and allows the cycle of the Graph's Y Header
   */
  function HeaderSelection(): React.JSX.Element {
    setHeader(graph.getYHeader());
    sendLog(
      "info",
      "a TimeSeriesGraph object header was selected and visually updated to reflect selection (TimeSeriesGraph.tsx)",
    );

    return (
      <>
        {/* Shows the current header */}
        <Container height={"30%"}>
          <Text>{header}</Text>
        </Container>

        {/* These next couple of containers is the interactable element that allows the cycle of Y Headers */}
        <Container
          height={"50%"}
          width={"100%"}
          justifyContent={"space-evenly"}
        >
          <Container
            width={"40%"}
            height={"30%"}
            backgroundColor={"gray"}
            backgroundOpacity={0.8}
            justifyContent={"center"}
            hover={{ backgroundOpacity: 0.95 }}
            onClick={() => {
              graph.decrementYHeader();
              UpdateGraph();
            }}
          >
            <Text fontWeight={"bold"}>&lt;</Text>
          </Container>

          <Container
            width={"40%"}
            height={"30%"}
            backgroundColor={"gray"}
            backgroundOpacity={0.8}
            justifyContent={"center"}
            hover={{ backgroundOpacity: 0.95 }}
            onClick={() => {
              graph.incrementYHeader();
              UpdateGraph();
            }}
          >
            <Text fontWeight={"bold"}>&gt;</Text>
          </Container>
        </Container>
      </>
    );
  }

  /**
   * The container left of the graph with a skyblue background.
   * This will show the HeaderSelection() and in the future, the data sets of selected points
   * @preconditions None
   * @postconditions  Container for showing graph data
   */
  function GenerateSideBar(): React.JSX.Element {
    sendLog(
      "info",
      "a TimeSeriesGraph object sidebar was created (TimeSeriesGraph.tsx)",
    );
    return (
      <>
        <Container
          width={"15%"}
          height={"100%"}
          backgroundColor={"skyblue"}
          flexDirection={"column"}
        >
          {/* Section for showing and cycling of Y Header */}
          <Container
            height={"50%"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Text>Y Header </Text>
            <HeaderSelection />
          </Container>

          {/* Section for showing point data sets */}
          <Container
            height={"50%"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text>Point Value</Text>
            <Text>(x, y):</Text>
            <Text>
              {selectedPoint !== null
                ? `(${selectedPoint.getXData()}, ${selectedPoint.getYData()})`
                : "None"}
            </Text>
          </Container>
        </Container>
      </>
    );
  }

  /**
   * Will use a PointObject to display a 2D on the Time Series Graph
   * @preconditions PointObject, used to show Point
   * @postconditions  Interactable 2D Point in the Graph
   */
  function GeneratePoints({
    point,
  }: {
    point: PointObject;
  }): React.JSX.Element {
    //Updating the position of the point
    point.setXPosition(current);
    point.setYPosition(
      (point.getYData() / 100) *
        (graph.getYRange() / graph.timeSeriesYRange().length) -
        1,
    );

    //Updating the position of the lines based off the point position
    currentLine = lastLine;
    lastLine = [point.getXPosition(), point.getYPosition(), 0.01];
    sendLog(
      "info",
      "a visual representation of points was created for a TimeSeriesGraph object (TimeSeriesGraph.tsx)",
    );

    return (
      <group
        onClick={() => {
          setSelectedPoint(point);
        }}
      >
        <Create2DPoint pointRef={point} />
      </group>
    );
  }

  /**
   * Updates the current position and then creates the Line which connects the last two points
   * @postconditions The Line connecting the Points in the 2D Time Series Graph
   */
  function GenerateLines(): React.JSX.Element {
    current = current + divider;
    sendLog(
      "info",
      "the lines on a TimeSeriesGraph object were created (TimeSeriesGraph.tsx)",
    );
    return (
      <>
        <Line
          points={[
            [currentLine[0], currentLine[1], currentLine[2]],
            [lastLine[0], lastLine[1], lastLine[2]],
          ]}
          color={"black"}
          lineWidth={2}
        ></Line>
      </>
    );
  }

  /**
   * The range of the Y header values, and creates the ticks with a value
   * @preconditions num > 0
   * @postconditions The num value with a tick mark displayed on graph
   */
  function GenerateYRange({ num }: { num: number }): React.JSX.Element {
    sendLog(
      "info",
      "a visual representation of the Y range was created for a TimeSeriesGraph object (TimeSeriesGraph.tsx)",
    );
    return (
      <>
        <Text positionTop={10}>{num.toString()} -</Text>
      </>
    );
  }

  /**
   * This Function creates the main graph of the Time Series Graph
   * This generates both the X and Y axis of the graph with it's assigned value
   * @postcondition Body of the graph with a properly loaded X and Y axis
   */
  function GenerateGraph(): React.JSX.Element {
    sendLog(
      "info",
      "a TimeSeriesGraph visualization is being created (TimeSeriesGraph.tsx)",
    );
    return (
      <>
        {/* Container responsible for Y section of the graph */}
        <Container width={"85%"} height={"100%"} flexDirection={"row"}>
          <Container width={"10%"} flexDirection={"row-reverse"}>
            {/* This is the line on the left side */}
            <Container width={"4%"} height={"85%"} backgroundColor={"black"} />

            <Container
              width={"100%"}
              height={"85%"}
              flexDirection={"column-reverse"}
            >
              <Container
                height={`${ySpacing}%`}
                alignContent={"flex-end"}
                justifyContent={"flex-start"}
                flexDirection={"column-reverse"}
              >
                <Container width={"100%"} flexDirection={"row-reverse"}>
                  <Text positionTop={5}>0 -</Text>
                </Container>
              </Container>
              {graph.timeSeriesYRange().map((range) => {
                return (
                  <>
                    <Container
                      width={"100%"}
                      height={`${ySpacing}%`}
                      alignContent={"flex-end"}
                      justifyContent={"flex-start"}
                      flexDirection={"column-reverse"}
                    >
                      <Container width={"100%"} flexDirection={"row-reverse"}>
                        <GenerateYRange num={range}></GenerateYRange>
                      </Container>
                    </Container>
                  </>
                );
              })}
              ;
            </Container>
          </Container>

          {/* Container responsible for X section of the graph */}
          <Container width={"90%"} flexDirection={"column"}>
            <Container
              height={"85%"}
              alignItems={"center"}
              justifyContent={"center"}
            />
            {/* This is the line on the bottom of the graph body */}
            <Container height={"15%"} flexDirection={"column"}>
              <Container
                width={"100%"}
                height={"4%"}
                backgroundColor={"black"}
              ></Container>

              <Container height={"96%"} width={"100%"}>
                {graph.timeSeriesXRange().map((data) => {
                  return (
                    <Container
                      height={"100%"}
                      width={`${xSpacing}%`}
                      justifyContent={"center"}
                    >
                      <Text>{data.toString()}</Text>
                    </Container>
                  );
                })}
                ;
              </Container>
            </Container>
          </Container>
        </Container>
      </>
    );
  }

  return (
    <>
      {/* Sets the mesh of the Time Series Graph in the scene */}
      <mesh position={[4, 2, -3.5]}>
        <Root sizeX={7} sizeY={3} backgroundColor={"lightgrey"}>
          <Container flexDirection={"row"} width={"100%"} height={"100%"}>
            {/* Bodies of the Graph */}
            <GenerateSideBar />
            <GenerateGraph />
          </Container>
        </Root>

        {/* Create the points and the lines */}
        {graph.getPoints().map((points) => {
          return (
            <>
              <GeneratePoints point={points} />
              <GenerateLines />
            </>
          );
        })}
      </mesh>
    </>
  );
}
