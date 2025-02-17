import { Root, Container, Text } from '@react-three/uikit';
import { Line } from "@react-three/drei";
import { Create2DPoint } from '../../components/Graph_Components/Create2DPoint';
import { GraphClass2 } from '../../components/Graph_Components/GraphClass2';
import { PointClass } from '../../components/Graph_Components/PointClass';

/**
 * This class will handle creating and updating a 2D Time Series graph based on the GraphClass.
 */

export function TimeSeriesGraph({graph}:{graph: GraphClass2}){
  const graphClass = graph;
  let totalSpace = 4;
  let divider = (totalSpace/graphClass.getPoints().length);
  let current = divider - (divider * 2);
  let currentLine:[number,number,number]= ([0,0,0]);
  let lastLine:[number,number,number] = ([0,0,0])
  // function HeaderSelection(){
  //   return(
  //     <>
  //     </>
  //   )

  // }
  function GenerateSideBar(){
    return(
      <>
        <Container width={"15%"} height={"100%"} backgroundColor={"skyblue"}
        flexDirection={"column"}>
          <Container height={"50%"} alignItems={"flex-start"} justifyContent={"center"}>
            <Text positionTop={10}>Y Value </Text>
          </Container>
        <Container height={"50%"} alignItems={"flex-start"} justifyContent={"center"}>
          <Text>X Value {graphClass.getPoints().length.toString()}</Text>
        </Container>
      </Container>
      </>
    )
  }
  function GeneratePoints({point}:{point: PointClass}){
    //Update the container values;
    console.log(point.getPosition()[0])
    return (
      <>
      {/* <Create2DPoint position={[-1, 1, 0.01]} selected={false} xData={'Time'} yData={89}/> */}
       <Create2DPoint position={point.getPosition()} selected={point.getSelected()} 
       xData={point.getXData()} yData={point.getYData()}></Create2DPoint>
      
      </>
    )
  }
  function GenerateLines(){
    current = current + divider;
    console.log("Current :", currentLine)
    console.log("Last: ",lastLine)
    currentLine = lastLine
    return(
      <>
        <Line points={[[currentLine[0],currentLine[1],currentLine[2]], [lastLine[0],lastLine[1],lastLine[2]]]}
            color={"black"} lineWidth={2}></Line>
      </>
    )
  }
  function GenerateGraph(){
    return (
      <>
        <Container width={"85%"} height={"100%"} flexDirection={"row"}>
          <Container width={"10%"} flexDirection={"row-reverse"}>
          
            <Container
              width = {"4%"} 
              height = {"85%"}
              backgroundColor= {"black"} ></Container>
            
          </Container>

        <Container width={"90%"} flexDirection={"column"}>
          <Container height={"85%"} alignItems={"center"} justifyContent={"center"}></Container>
          
          <Container height={"15%"}>
            <Container
              width = {"100%"} 
              height = {"4%"}
              backgroundColor= {"black"} >
            </Container>
          </Container>
        </Container>

      </Container>
      </>
      )
    
  }
  return (
    <>
    <mesh position={[4, 2,-3.5]}>
      <Root sizeX={7} sizeY={3} backgroundColor={"lightgrey"}>
        <Container 
          flexDirection={'row'}
          width={"100%"}
          height={"100%"}>

            <GenerateSideBar/>
            <GenerateGraph/>
        </Container>
        
      </Root>

        {lastLine = ([-1.8, -1, 0.01])}
        {graphClass.getPoints().map((points) => {
          points.setXPosition(current);
          currentLine = lastLine;
          lastLine = ([points.getXPosition(), points.getYPosition(), -0.01])
          return(
            <>
            <GenerateLines/>
            <GeneratePoints point={points}></GeneratePoints>
            </>
          )
        })}
    </mesh>
    
    </>
  )
}