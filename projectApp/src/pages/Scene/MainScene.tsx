import DropdownUI from "../UI/DropdownUI";
import CreateTimeSeries from "../../components/Graph_Components/CreateTimeSeries";
import mainController from "../../controller/MainController";
import { useEffect, useRef, useState } from "react";
import { TimeSeriesGraphObject } from "../../components/Graph_Components/TimeSeriesGraphObject";
import { EmbeddedGraphObject } from "../../components/Graph_Components/EmbeddedGraphObject";
import { CreateEmbeddedGraph } from "../../components/Graph_Components/CreateEmbeddedGraph";

/*
 * The main scene being used in the current program
 * For now contains shapes the could help with testing looking around in a VR Space
 */
export default function MainScene(): React.JSX.Element {
  //TODO
  //Add a UI to the MainScene
  //Then make it possible for the ui to  stay in view of the camera (maybe top left)
  const [updateGraph, setUpdateGraph] = useState(false);
  const [graph, setGraph] = useState<TimeSeriesGraphObject>();
  const [emGraph, setEmGraph] = useState<EmbeddedGraphObject>();

  //Only runs on the begining, might keep graph on and update file on graph instead
  function updateScene(): void {
    setUpdateGraph(true);
  }
  const sceneRef = useRef({ updateScene });
  useEffect(() => {
    mainController.setSceneRef(sceneRef);
  });

  useEffect(() => {
    if (updateGraph) {
      const vrSelected = mainController.getCSVController().getVRSelected();
      if (mainController.getGraphController().getDataLength() > 0) {
        const newGraph = mainController
          .getGraphController()
          .generateTimeSeriesGraph(vrSelected);
        setGraph(newGraph);
      }
      if (mainController.getGraphController().getEmDataLength() > 0) {
        const newEmGraph = mainController
          .getGraphController()
          .generateEmbeddedGraph(vrSelected);
        setEmGraph(newEmGraph);
      }
    }
    setUpdateGraph(false);
  });
  return (
    <>
      {/* This block of code is the sign in front of the user
        A red box with the text Front */}
      <mesh position={[4.5, 1, -4.55]}>
        <boxGeometry args={[6, 5.5, 2]} />
        <meshBasicMaterial color="gray" />
      </mesh>

      {/* This is the floor of the Scene */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Displays the Sample Drop Down UI */}
      {/* <CreateTimeSeries graphObject={graph}></CreateTimeSeries> */}
      <DropdownUI position={[0, 1.5, -1]} xSize={4} ySize={3}></DropdownUI>
      {graph && <CreateTimeSeries graphObject={graph}></CreateTimeSeries>}
      {emGraph && <CreateEmbeddedGraph graphObject={emGraph} />}
    </>
  );
}
