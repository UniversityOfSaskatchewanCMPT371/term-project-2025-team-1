import { Root, Container, Text } from "@react-three/uikit";
import { Line } from "@react-three/drei";
import { TimeSeriesGraphObject } from "../../components/Graph_Components/TimeSeriesGraphObject";
import { useState } from "react";
import { sendLog } from "../../logger-frontend";
import { Point2DObject } from "../../components/Graph_Components/Points/Point2DObject";
import Create2DPoint from "../../components/Graph_Components/Points/Create2DPoint";

/**
 * Create a Time Series Graph in the VR envirornment using a TimeSeriesGraphObject.
 * - This graph will be 2D Graph that has the csv data's time for it's X values with the other columns as Y values.
 * - Will contain Points connected by lines to represent the values of the specified data fields.
 * @param graph the TimeSeriesGraphObject this graph visualizes.
 * @preconditions `graph` must be a defined TimeSeriesGraphObject.
 * @postconditions returns a React JSX Element that represents a 2D Time Series Graph.
 */

export default function TimeSeriesGraph({
  graph,
}: {
  graph: TimeSeriesGraphObject;
}): React.JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Point2DObject | null>(
    null,
  ); // New state for selected point value

  // Values used to space Points in the X axis
  const totalSpace = 5;
  const divider = totalSpace / graph.getNumPoints();
  let current = -1.8 + divider / 2;

  // Values used to position lines, currently set to starting position
  let currentLine: [number, number, number] = [0, 0, 0.01];
  let lastLine: [number, number, number] = [-1.85, -1.05, 0.01];

  // Spacing used by X and Y axis
  const xSpacing = 100 / graph.getNumPoints();
  const ySpacing = 100 / graph.getYRangeLength() + 1;

  /**
   * Renders the container left of the graph with a skyblue background.
   * This will show the HeaderSelection() and in the future, the data sets of selected points
   * @preconditions None
   * @postconditions returns the left side container for showing graph data
   */
  function GenerateSideBar(): React.JSX.Element {
    sendLog(
      "info",
      "a TimeSeriesGraph object sidebar was created (TimeSeriesGraph.tsx)",
    );
    return (
      <Container
        width={"15%"}
        height={"100%"}
        backgroundColor={"skyblue"}
        flexDirection={"column"}
      >
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
              ? `(${selectedPoint.getObject().getTimeData()}, ${selectedPoint.getObject().getYData()})`
              : "None"}
          </Text>
        </Container>
      </Container>
    );
  }

  /**
   * Renders the 2D point used in the graph
   * @param point a reference to the 2D Point object
   * @preconditions `point` is an accepted 2D Point object in this graph
   * @postconditions returns an interactable 2D Point for the graph
   */
  function GeneratePoint({
    point,
  }: {
    point: Point2DObject;
  }): React.JSX.Element {
    // Updating the position of the point

    point.setXAxisPos(current);
    point.setYAxisPos(
      (point.getObject().getYData() / graph.getYRange()) *
        (1.5 - (ySpacing / 100) * 2 + 1.05) -
        1.05,
    );

    // Updating the position of the lines based off the point position
    currentLine = lastLine;
    lastLine = [point.getXPosition(), point.getYPosition(), 0.01];
    sendLog(
      "info",
      "a visual representation of points was created for a TimeSeriesGraph object (TimeSeriesGraph.tsx)",
    );
    return (
      <group
        onClick={() => {
          if (point.getObject().getSelected()) {
            setSelectedPoint(point);
          } else {
            setSelectedPoint(null);
          }
        }}
      >
        <Create2DPoint pointRef={point} />
      </group>
    );
  }

  /**
   * Renders the line which connects the previous and current points
   * @preconditions 'currentLine' and 'lastLine' properties are valid point positions
   * @postconditions returns The line connecting the points in the 2D Time Series Graph
   */
  function GenerateLines(): React.JSX.Element {
    current = current + divider;
    sendLog(
      "info",
      "the lines on a TimeSeriesGraph object were created (TimeSeriesGraph.tsx)",
    );
    return (
      <Line
        points={[
          [currentLine[0], currentLine[1], currentLine[2]],
          [lastLine[0], lastLine[1], lastLine[2]],
        ]}
        color={"black"}
        lineWidth={2}
      />
    );
  }

  /**
   * Renders the range of the Y header values entered with a value
   * @param num the value of the y header
   * @preconditions `num` is a positive integer
   * @postconditions returns The num value with a tick mark displayed on graph
   */
  function GenerateYRange({ num }: { num: number }): React.JSX.Element {
    sendLog(
      "info",
      "a visual representation of the Y range was created for a TimeSeriesGraph object (TimeSeriesGraph.tsx)",
    );
    return <Text positionLeft={30}>{num.toString()} -</Text>;
  }

  /**
   * Generates the main graph of the Time Series Graph
   * - This generates both the X and Y axis of the graph with its assigned value
   * @preconditions none
   * @postconditions returns the body of the graph with a properly loaded X and Y axis and its components
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
                <Container
                  width={"100%"}
                  height={"100%"}
                  flexDirection={"column-reverse"}
                  alignContent={"center"}
                  justifyContent={"center"}
                >
                  <Container width={"100%"} positionBottom={"50%"}>
                    <Text positionLeft={30}>0 -</Text>
                  </Container>
                </Container>
              </Container>
              {graph.timeSeriesYRange().map((range) => {
                return (
                  <Container
                    width={"100%"}
                    height={`${ySpacing}%`}
                    alignContent={"flex-end"}
                    justifyContent={"flex-start"}
                    flexDirection={"column-reverse"}
                  >
                    <Container
                      width={"100%"}
                      height={"100%"}
                      flexDirection={"column-reverse"}
                      alignContent={"center"}
                      justifyContent={"center"}
                    >
                      <Container width={"100%"} positionBottom={"50%"}>
                        <GenerateYRange num={range} />
                      </Container>
                    </Container>
                  </Container>
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
              />

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
      <mesh position={[-1, 2, -3.5]}>
        <Root sizeX={7} sizeY={3} backgroundColor={"lightgrey"}>
          <Container flexDirection={"row"} width={"100%"} height={"100%"}>
            {/* Bodies of the Graph */}
            <GenerateSideBar />
            <GenerateGraph />
          </Container>
        </Root>

        {/* Create the points and the lines */}
        {graph.getPoints2D().map((point) => {
          return (
            <>
              <GeneratePoint point={point} />
              <GenerateLines />
            </>
          );
        })}
      </mesh>
    </>
  );
}
