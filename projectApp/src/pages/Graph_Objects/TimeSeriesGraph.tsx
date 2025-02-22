import { Root, Container, Text } from '@react-three/uikit';
import { Line } from "@react-three/drei";
import { Create2DPoint } from '../../components/Graph_Components/Create2DPoint';
import { TimeSeriesGraphClass } from '../../components/Graph_Components/TimeSeriesGraphClass';
import { PointClass } from '../../components/Graph_Components/PointClass';
import { useState } from 'react';
import mainController from '../../controller/MainController';

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

  let yRange = 0; // tracks the y-axis range in the graph and increments by 5
  const ySpacing = 100/(graphClass.timeSeriesYRange().length + 1);

  function UpdateGraph(){
    graphClass.updatePointPosition();
    setHeader(graphClass.getYHeader());
    mainController.updateMainScene();

    change(!isChanged)
  }

  // Displays the current Y-axis header
  function HeaderSelection(){
    setHeader(graphClass.getYHeader());
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

  // Sidebar displaying Y-header selection and point value information
  function GenerateSideBar(){
    return(
      <>
        <Container width={"15%"} height={"100%"} backgroundColor={"skyblue"}
        flexDirection={"column"}> {/* Sidebar container for Y header and point values */}
          <Container height={"50%"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
            <Text>Y Header </Text>
            <HeaderSelection></HeaderSelection>
          </Container>
        <Container height={"50%"} alignItems={"flex-start"} justifyContent={"center"}>
          <Text> Point Value:</Text>
          {/* Point data will be displayed here if selected */}
        </Container>
      </Container>
      </>
    )
  }

  // Generates a point on the graph with its X and Y positions based on the data
  function GeneratePoints({point}:{point: PointClass}){
    point.setXPosition((current));
    point.setYPosition(((point.getYData()/100) * (graphClass.getYRange()/(graphClass.timeSeriesYRange().length))) - (1));
    currentLine = lastLine;
    lastLine = ([point.getXPosition(), point.getYPosition(), 0.01])
    return (
      <>
      
       <Create2DPoint position={point.getPosition()} selected={point.getSelected()} 
       xData={point.getXData()} yData={point.getYData()}></Create2DPoint> {/* Generate a 2D point for each graph point */}
      </>
    )
  }

  // Generates a line connecting two points
  function GenerateLines(){
    current = current + (divider);
    return(
      <>
        <Line points={[[currentLine[0],currentLine[1],currentLine[2]], [lastLine[0],lastLine[1],lastLine[2]]]}
            color={"black"} lineWidth={2}></Line>
      </>
    )
  }

  // increments the yRange by 5 and returns a <Text> element displaying the current value with a hyphen.
  function GenerateYRange(){
    yRange = yRange + 5;
    const curVal = yRange;
    return(
      <>
      <Text positionTop={10}>{curVal.toString()} -</Text>
      </>
    )
  }

  // Displays the points and lines
  function GenerateGraph(){
    return (
      <>
        <Container width={"85%"} height={"100%"} flexDirection={"row"}> {/* Container for graph and sidebar */}
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

        {/* displays points and connecting lines */}
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
