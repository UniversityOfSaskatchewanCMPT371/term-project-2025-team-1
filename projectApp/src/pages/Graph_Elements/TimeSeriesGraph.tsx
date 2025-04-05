import { Root, Container, Text } from "@react-three/uikit";
import { Line } from "@react-three/drei";
import { TimeSeriesGraphObject } from "../../components/Graph_Components/TimeSeriesGraphObject";
import { useState } from "react";
import { sendLog } from "../../logger-frontend";
import { Point2DObject } from "../../components/Graph_Components/Points/Point2DObject";
import Create2DPoint from "../../components/Graph_Components/Points/Create2DPoint";
import mainController from "../../controller/MainController";
import { useFrame } from "@react-three/fiber";
import { PointObject } from "../../components/Graph_Components/Points/PointObject";

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
  const [selectedPoints, setSelectedPoints] = useState<PointObject[]>([]); // New state for selected point value

  // Values used to space Points in the X axis
  const totalSpace = 6.38;
  const divider = totalSpace / graph.getNumPoints();
  let current = -2.62 + divider / 2;

  // Values used to position lines, currently set to starting position
  let currentLine: [number, number, number] = [0, 0, 0.01];
  let lastLine: [number, number, number] = [0, 0, 0.01];

  // Spacing used by X and Y axis
  const xSpacing = 100 / graph.getNumPoints();
  const ySpacing = 100 / graph.getYRangeLength();

  const xAxis = graph.timeSeriesXRange();
  const xAxisInterval = graph.intervalForXAxis(xAxis);

  const pointRadius = mainController.getGraphController().getPointSize() / 4;

  // Checking and updating based on the list of selected points
  useFrame(() => {
    if (
      selectedPoints.length !== graph.getCSVData().getSelectedPoints().length
    ) {
      setSelectedPoints(graph.getCSVData().getSelectedPoints());
    }
  });
  /**
   * Renders the container left of the graph with a skyblue background.
   * This will show the the data sets of selected points
   * @preconditions None
   * @postconditions returns the left side container for showing graph data
   */
  function GenerateSideBar(): React.JSX.Element {
    sendLog(
      "trace",
      "a TimeSeriesGraph object sidebar was created (TimeSeriesGraph.tsx)",
    );
    return (
      <Container
        width={"10%"}
        height={"100%"}
        backgroundColor={"skyblue"}
        flexDirection={"column"}
      >
        {/* Section for showing point data sets */}
        <Container
          height={"100%"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Text fontSize={13}>Point Value</Text>
          <Text fontSize={13}>(x, y):</Text>
          {selectedPoints.map((point) => {
            return (
              <Text fontSize={8} fontWeight={"bold"}>
                {" "}
                {"("}
                {point.getTimeData()}, {point.getYData()}
                {")"}
              </Text>
            );
          })}
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

    /**
     * Arranges point position in the Y axis,
     * Takes the Point data and then translates it to its position on the graph container
     *
     * Data value - minimum range / total range (which is max range - min range)
     * Then translates its position to the graph
     * maximum height of graph = 1.45
     * ySpacing = container of a 2D graph y-axis point in percent form, we then scale it
     * minimum height of graph = 1.05
     */
    point.setXAxisPos(current);
    point.setYAxisPos(
      ((point.getObject().getYData() - graph.getMinYRange()) /
        graph.getTotalYRange()) *
        (1.45 - (ySpacing / 100) * 2 + 1.05) -
        1.05,
    );

    const index = graph.getPoints2D().indexOf(point);
    if (index === 0) {
      lastLine = [point.getXPosition(), point.getYPosition(), 0.01];
    }

    //Updating the position of the lines based off the point position
    currentLine = lastLine;
    lastLine = [point.getXPosition(), point.getYPosition(), 0.01];
    sendLog(
      "trace",
      "a visual representation of points was created for a TimeSeriesGraph object (TimeSeriesGraph.tsx)",
    );

    return <Create2DPoint pointRef={point} />;
  }

  /**
   * Renders the line which connects the previous and current points
   * @preconditions 'currentLine' and 'lastLine' properties are valid point positions
   * @postconditions returns The line connecting the points in the 2D Time Series Graph
   */
  function GenerateLines(): React.JSX.Element {
    current = current + divider;
    sendLog(
      "trace",
      "the lines on a TimeSeriesGraph object were created (TimeSeriesGraph.tsx)",
    );
    return (
      <Line
        points={[
          [
            currentLine[0] - pointRadius,
            currentLine[1] + pointRadius,
            currentLine[2],
          ],
          [lastLine[0] - pointRadius, lastLine[1] + pointRadius, lastLine[2]],
        ]}
        color={"black"}
        lineWidth={mainController.getGraphController().getPointSize() * 10}
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
      "trace",
      "a visual representation of the Y range was created for a TimeSeriesGraph object (TimeSeriesGraph.tsx)",
    );
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
          justifyContent={"flex-start"}
        >
          <Container
            width={"100%"}
            height={"100%"}
            flexDirection={"row-reverse"}
            alignContent={"center"}
            justifyContent={"flex-start"}
            positionBottom={"50%"}
          >
            <Text fontSize={12}>{num.toString()} -</Text>
          </Container>
        </Container>
      </Container>
    );
  }

  /**
   * Generates the main graph of the Time Series Graph
   * - This generates both the X and Y axis of the graph with its assigned value
   * @preconditions none
   * @postconditions returns the body of the graph with a properly loaded X and Y axis and its components
   */
  function GenerateGraph(): React.JSX.Element {
    sendLog(
      "trace",
      "a TimeSeriesGraph visualization is being created (TimeSeriesGraph.tsx)",
    );
    return (
      <>
        {/* Container responsible for Y section of the graph */}
        <Container width={"90%"} height={"100%"} flexDirection={"row"}>
          <Container width={"8%"} flexDirection={"row-reverse"}>
            {/* This is the line on the left side */}
            <Container width={"4%"} height={"85%"} backgroundColor={"black"} />

            <Container
              width={"100%"}
              height={"85%"}
              flexDirection={"column-reverse"}
            >
              <Container
                height={`${ySpacing}%`}
                width={"100%"}
                alignContent={"flex-end"}
                justifyContent={"flex-start"}
                flexDirection={"column-reverse"}
              >
                <Container
                  width={"100%"}
                  height={"100%"}
                  flexDirection={"column-reverse"}
                  alignContent={"center"}
                  justifyContent={"flex-start"}
                >
                  <Container
                    width={"100%"}
                    height={"100%"}
                    flexDirection={"row-reverse"}
                    alignContent={"center"}
                    justifyContent={"flex-start"}
                    positionBottom={"50%"}
                  >
                    <Text fontSize={12}>{graph.axes.yRange[0]} -</Text>
                  </Container>
                </Container>
              </Container>
              {graph.timeSeriesYRange().map((range) => {
                return <GenerateYRange num={range} />;
              })}
              ;
            </Container>
          </Container>

          {/* Container responsible for X section of the graph */}
          <Container width={"92%"} flexDirection={"column"}>
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
                {xAxis.map((data, index) => {
                  if (index % xAxisInterval === 0) {
                    return (
                      <Container
                        height={"100%"}
                        width={`${xSpacing}%`}
                        justifyContent={"center"}
                      >
                        <Container
                          width={"100%"}
                          height={"100%"}
                          flexDirection={"column"}
                        >
                          <Container
                            width={"100%"}
                            flexDirection={"row"}
                            alignContent={"center"}
                            justifyContent={"center"}
                          >
                            <Text>|</Text>
                          </Container>
                          <Container
                            width={"100%"}
                            flexDirection={"row"}
                            alignContent={"center"}
                            justifyContent={"center"}
                          >
                            <Text fontSize={12}>{data.toString()}</Text>
                          </Container>
                        </Container>
                      </Container>
                    );
                  } else {
                    return (
                      <Container
                        height={"100%"}
                        width={`${xSpacing}%`}
                        justifyContent={"center"}
                      />
                    );
                  }
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
        <Root sizeX={8} sizeY={3} backgroundColor={"lightgrey"}>
          <Container flexDirection={"row"} width={"100%"} height={"100%"}>
            {/* Bodies of the Graph */}
            <GenerateSideBar />
            <GenerateGraph />
            <Container width={"2.5%"} flexDirection={"row"}>
              {/* This is the line on the right side of the graph*/}
              <Container
                width={"8%"}
                height={"85%"}
                backgroundColor={"black"}
              />
            </Container>
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
