//TODO
//The Time Series Graph That Will Be Displayed on the Scene
//Will require x, y positions and the number of rows
//More expected
import { Root, Container, Text } from '@react-three/uikit';
import { Line } from "@react-three/drei";
import { Create2DPoint } from '../../components/Graph_Components/Create2DPoint';


/**
 * This class will handle creating and updating a 2D Time Series graph based on the GraphClass.
 */
// export class TimeSeriesGraph {
//   private scene: THREE.Scene;
//   private graph: GraphClass;
//   private pointsMesh: THREE.Group;

//   /**
//    * Constructs a new TimeSeriesGraph instance.
//    * @param graph - The GraphClass instance (containts the points and other graph data)
//    * @param scene - The THREE.Scene where the graph will be displayed.
//    */
//   constructor(graph: GraphClass, scene: THREE.Scene) {
//     this.graph = graph;
//     this.scene = scene;
//     this.pointsMesh = new THREE.Group(); // holds all point meshes
//     this.scene.add(this.pointsMesh);

//     // Initialize the graph
//     this.addGraphBackground();
//     this.updateGraph();
//   }

//     /**
//    * Square object for time series graph to represent the graph
//    */
//   private addGraphBackground(): void {
//     const boxGeometry = new THREE.BoxGeometry(10, 10, 0.1); // A square grid box (flattened on the Z-axis)
//     const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
//     const box = new THREE.Mesh(boxGeometry, boxMaterial);
//     this.scene.add(box); // Adds the box to the scene as the background for the graph
//   }

//   /**
//    * Updates the graph visualization based on the current state of the GraphClass.
//    * @param rows - The number of rows
//    */
//   public updateGraph(rows?: number): void {
//     this.pointsMesh.clear();

//     // Get the points from the GraphClass
//     const points = this.graph.getPoints();

//     // Calculate spacing to make it more organized?
//     // const rowSpacing = rows ? 1 / rows : 0;

//     // Create a "mesh" for each point
//     // Add Point2D components to the scene
//     points.forEach(point => {
//       const pointGeometry = new THREE.CircleGeometry(0.1, 32); // Smaller points
//       const pointMesh = new THREE.Mesh(pointGeometry);
//       pointMesh.position.set(point.position[0], point.position[1], point.position[2] || 0);
//       this.pointsMesh.add(pointMesh);
//     });

//       // Add the sphere to the points group
//       this.pointsMesh.add(pointRef);
//     });
//   }

//   /**
//    * Clears the graph visualization.
//    */
//   public clearGraph(): void {
//     this.pointsMesh.clear();
//   }
// }

export function TimeSeriesGraph(){
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
          <Text positionTop={10}>
            Y Value
          </Text>
        </Container>
        <Container height={"50%"} alignItems={"flex-start"} justifyContent={"center"}>
        <Text>X Value</Text>
        </Container>

      </Container>
      </>
    )
  }
  // function GeneratePoints(){
  //   return (
  //     <>
  //     </>
  //   )
  // }
    function GenerateGraph(){
      return (
      <>
      <Container width={"85%"} height={"100%"} flexDirection={"row"}>
        <Container width={"10%"} flexDirection={"row-reverse"}>
          
        <Container
                width = {"4%"} 
                height = {"85%"}
                backgroundColor= {"black"} 
              
            ></Container>
            
        </Container>

        <Container width={"90%"} flexDirection={"column"}>
          <Container height={"85%"} alignItems={"center"} justifyContent={"center"}>
            
            {/* Generate containers based on number of points, and get thoes containers position values
                Pass these values to the point and to the line, maybe store values in a useState first
                Then generate the objects after the contianer */}
          </Container>

          <Container height={"15%"}>
          <Container
                width = {"100%"} 
                height = {"4%"}
                backgroundColor= {"black"} 
              >

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

      <Line
          points={[[-1, 1, 0], [1, 0, 0]]}  // Line between two points
          color="black"
          lineWidth={2}
        />
        <Create2DPoint position={[-1, 1, 0.1]} selected={false} xData={'Time'} yData={89}/>
        <Create2DPoint position={[1, 0, 0.1]} selected={false} xData={'Time'} yData={89}/>
    </mesh>
    
    </>
  )
}