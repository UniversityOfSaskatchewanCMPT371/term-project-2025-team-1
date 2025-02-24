import { Root, Container, Text } from '@react-three/uikit';
import { Line } from "@react-three/drei";
import { Create2DPoint } from '../../components/Graph_Components/Create2DPoint';
import { TimeSeriesGraphClass } from '../../components/Graph_Components/TimeSeriesGraphClass';
import { PointClass } from '../../components/Graph_Components/PointClass';
import { useState } from 'react';
import mainController from '../../controller/MainController';
import { sendLog } from '../../logger-frontend';

/**
 * This class will handle creating and updating a 2D Time Series graph based on the GraphClass.
 */

export function TimeSeriesGraph({graph}:{graph: TimeSeriesGraphClass}){
  const [ header, setHeader ] = useState("");
  const [ isChanged, change ] = useState(false);

  const graphClass = graph;
  const totalSpace = 5;
  const divider = (totalSpace/graphClass.getPoints().length);
  let current = (-1.8) + (divider/2);
  let currentLine:[number,number,number]= ([0,0,0.01]);
  let lastLine:[number,number,number] = ([-1.8, -1, 0.01])
  const separator = 100/graphClass.getPoints().length;

  let yRange = 0;
  const ySpacing = 100/(graphClass.timeSeriesYRange().length + 1);

  function UpdateGraph(){
    graphClass.updatePointPosition();
    setHeader(graphClass.getYHeader());
    mainController.updateMainScene();

    change(!isChanged)
    sendLog("info", "a TimeSeriesGraph object was updated");
  }

  function HeaderSelection(){
    setHeader(graphClass.getYHeader());
    sendLog("info", "a TimeSeriesGraph object header was selected and visually updated to reflect selection");
    return(
      <>
      <Container height={"30%"}>
      <Text>{header}</Text>
      </Container>
      <Container height={"50%"} width={"100%"} justifyContent={"space-evenly"}>

        {/* REFACTOR: Duplicate */}
        <Container width={"40%"} height={"30%"} backgroundColor={"gray"} backgroundOpacity={0.8}
        justifyContent={"center"} hover={{backgroundOpacity: 0.95}} onClick={() => {graphClass.decrementYHeader(); UpdateGraph()}}>
          <Text fontWeight={"bold"}>&lt;</Text>
        </Container>
        <Container width={"40%"} height={"30%"} backgroundColor={"gray"} backgroundOpacity={0.8}
        justifyContent={"center"} hover={{backgroundOpacity: 0.95}} onClick={() => {graphClass.incrementYHeader(); UpdateGraph()}}>
          <Text fontWeight={"bold"}>&gt;</Text>
        </Container>

      </Container>
      </>
    )

  }
  // console.log("Divider ", divider, " current :", current, " Cur + Div:", (current + (divider/2)))
  function GenerateSideBar(){
    sendLog("info", "a TimeSeriesGraph object sidebar was created");
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

  function GeneratePoints({point}:{point: PointClass}){
    point.setXPosition((current));
    point.setYPosition(((point.getYData()/100) * (graphClass.getYRange()/(graphClass.timeSeriesYRange().length))) - (1));
    currentLine = lastLine;
    lastLine = ([point.getXPosition(), point.getYPosition(), 0.01])
    sendLog("info", "a visual representation of points was created for a TimeSeriesGraph object");
    return (
      <>
      
       <Create2DPoint position={point.getPosition()} selected={point.getSelected()} 
       xData={point.getXData()} yData={point.getYData()}></Create2DPoint>
      </>
    )
  }
  function GenerateLines(){
    current = current + (divider);
    sendLog("info", "the lines on a TimeSeriesGraph object were created");
    return(
      <>
        <Line points={[[currentLine[0],currentLine[1],currentLine[2]], [lastLine[0],lastLine[1],lastLine[2]]]}
            color={"black"} lineWidth={2}></Line>
      </>
    )
  }

  function GenerateYRange(){
    yRange = yRange + 5;
    const curVal = yRange;
    sendLog("info", "a visual representation of the Y range was created for a TimeSeriesGraph object");
    return(
      <>
      <Text positionTop={10}>{curVal.toString()} -</Text>
      </>
    )
  }
  function GenerateGraph(){
    sendLog("info", "a TimeSeriesGraph visualization is being created");
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
              {graphClass.timeSeriesYRange().map(() => {
                return (
                  <>
                  <Container width={"100%"} height={`${ySpacing}%`} alignContent={"baseline"} flexDirection={"row-reverse"}>
                    <GenerateYRange></GenerateYRange>
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
            {graphClass.timeSeriesXRange().map((data) => {
              return(
                <Container height={"100%"} width={`${separator}%`} justifyContent={"center"}>
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
        {graphClass.getPoints().map((points) => {
          return(
            <>
            <GeneratePoints point={points}></GeneratePoints>
            <GenerateLines/>
            </>
          )
        })}
    </mesh>
    
    </>
  )
}