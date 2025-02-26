import { Root, Container, Text } from '@react-three/uikit';
import { Line } from "@react-three/drei";
import { Create2DPoint } from '../../components/Graph_Components/Create2DPoint';
import { TimeSeriesGraphObject } from '../../components/Graph_Components/TimeSeriesGraphObject';
import { PointObject } from '../../components/Graph_Components/PointObject';
import { useState } from 'react';
import mainController from '../../controller/MainController';
import { sendLog } from '../../logger-frontend';

/**
 * This class will handle creating and updating a 2D Time Series graph based on the Graph Object.
 */

export function TimeSeriesGraph({graph}:{graph: TimeSeriesGraphObject}){
  const [ header, setHeader ] = useState("");

  const totalSpace = 5;
  const divider = (totalSpace/graph.getNumPoints());
  let current = (-1.8) + (divider/2);

  let currentLine:[number,number,number]= ([0,0,0.01]);
  let lastLine:[number,number,number] = ([-1.8, -1, 0.01])

  const xSpacing = 100/graph.getNumPoints();
  const ySpacing = 100/(graph.timeSeriesYRange().length + 1);

  function UpdateGraph(): void{
    graph.updatePointPosition();
    setHeader(graph.getYHeader());
    mainController.updateMainScene();
    sendLog("info", "a TimeSeriesGraph object was updated (TimeSeriesGraph.tsx)");
  }

  function HeaderSelection(): React.JSX.Element{
    setHeader(graph.getYHeader());
    sendLog("info", "a TimeSeriesGraph object header was selected and visually updated to reflect selection (TimeSeriesGraph.tsx)");

    return(
      <>
        <Container height={"30%"}>
          <Text>{header}</Text>
        </Container>

        <Container height={"50%"} width={"100%"} justifyContent={"space-evenly"}>

          <Container width={"40%"} height={"30%"} backgroundColor={"gray"} backgroundOpacity={0.8}
          justifyContent={"center"} hover={{backgroundOpacity: 0.95}} onClick={() => {graph.decrementYHeader(); UpdateGraph()}}>
            <Text fontWeight={"bold"}>&lt;</Text>
          </Container>
          <Container width={"40%"} height={"30%"} backgroundColor={"gray"} backgroundOpacity={0.8}
          justifyContent={"center"} hover={{backgroundOpacity: 0.95}} onClick={() => {graph.incrementYHeader(); UpdateGraph()}}>
            <Text fontWeight={"bold"}>&gt;</Text>
          </Container>

        </Container>
      </>
    )

  }
  function GenerateSideBar(): React.JSX.Element{
    sendLog("info", "a TimeSeriesGraph object sidebar was created (TimeSeriesGraph.tsx)");
    return(
      <>
        <Container width={"15%"} height={"100%"} backgroundColor={"skyblue"}
        flexDirection={"column"}>
          <Container height={"50%"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
            <Text>Y Header </Text>
            <HeaderSelection></HeaderSelection>
          </Container>
        <Container height={"50%"} alignItems={"flex-start"} justifyContent={"center"}>
          <Text> Point Value:</Text>
          {/* For Each point, check selected and then print the data */}
        </Container>
      </Container>
      </>
    )
  }

  function GeneratePoints({point}:{point: PointObject}): React.JSX.Element{
    point.setXPosition((current));
    point.setYPosition(((point.getYData()/100) * (graph.getYRange()/(graph.timeSeriesYRange().length))) - (1));
    currentLine = lastLine;
    lastLine = ([point.getXPosition(), point.getYPosition(), 0.01])
    sendLog("info", "a visual representation of points was created for a TimeSeriesGraph object (TimeSeriesGraph.tsx)");
    return (
      <>
       <Create2DPoint pointRef={point}></Create2DPoint>
      </>
    )
  }
  function GenerateLines(): React.JSX.Element{
    current = current + (divider);
    sendLog("info", "the lines on a TimeSeriesGraph object were created (TimeSeriesGraph.tsx)");
    return(
      <>
        <Line points={[[currentLine[0],currentLine[1],currentLine[2]], [lastLine[0],lastLine[1],lastLine[2]]]}
            color={"black"} lineWidth={2}></Line>
      </>
    )
  }

  function GenerateYRange({num} : {num:number}): React.JSX.Element{
    return(
      <>
      <Text positionTop={10}>{num.toString()} -</Text>
      </>
    )
  }

  function GenerateGraph(): React.JSX.Element{
    sendLog("info", "a TimeSeriesGraph visualization is being created (TimeSeriesGraph.tsx)");
    return (
      <>
        <Container width={"85%"} height={"100%"} flexDirection={"row"}>
          <Container width={"10%"} flexDirection={"row-reverse"}>
            <Container
              width = {"4%"} 
              height = {"85%"}
              backgroundColor= {"black"} ></Container>

            <Container width={"100%"} height={"85%"} flexDirection={"column-reverse"}>
              <Container height={`${ySpacing}%`} alignContent={"baseline"} flexDirection={"row-reverse"}> 
                <Text  positionTop={10}>0 -</Text></Container>
              {graph.timeSeriesYRange().map((range) => {
                return (
                  <>
                  <Container width={"100%"} height={`${ySpacing}%`} alignContent={"baseline"} flexDirection={"row-reverse"}>
                    <GenerateYRange num={range}></GenerateYRange>
                  </Container>
                  </>
                )
              })}

            </Container>
            
            
          </Container>

        <Container width={"90%"} flexDirection={"column"}>
          <Container height={"85%"} alignItems={"center"} justifyContent={"center"}>
          </Container>
          
          <Container height={"15%"} flexDirection={"column"}>
            <Container
              width = {"100%"} 
              height = {"4%"}
              backgroundColor= {"black"} >
            </Container>

            <Container height={"96%"} width={"100%"}>
            {graph.timeSeriesXRange().map((data) => {
              return(
                <Container height={"100%"} width={`${xSpacing}%`} justifyContent={"center"}>
                  <Text>{data}</Text>

            </Container>
              )
            })}
            </Container>
          </Container>
        </Container>

      </Container>
      </>
      )
    
  }
  return (
    <>
    <mesh position={[4, 2,-3.5]} >
      <Root sizeX={7} sizeY={3} backgroundColor={"lightgrey"}>
        <Container 
          flexDirection={'row'}
          width={"100%"}
          height={"100%"}>

            <GenerateSideBar/>
            <GenerateGraph/>
        </Container>
      </Root>

        {/* {lastLine = ([-1.8, -1, 0.01])} */}
        {graph.getPoints().map((points) => {
          return(
            <>
            <GeneratePoints point={points}/>
            <GenerateLines/>
            </>
          )
        })}
    </mesh>
    
    </>
  )
}