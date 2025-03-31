import DropdownUI from "../UI/DropdownUI";
import CreateTimeSeries from "../../components/Graph_Components/CreateTimeSeries";
import mainController from "../../controller/MainController";
import { useEffect, useRef, useState } from "react";
import { TimeSeriesGraphObject } from "../../components/Graph_Components/TimeSeriesGraphObject";
import { EmbeddedGraphObject } from "../../components/Graph_Components/EmbeddedGraphObject";
import { CreateEmbeddedGraph } from "../../components/Graph_Components/CreateEmbeddedGraph";

/**
 * The main scene being used in the current program
 * For now contains shapes the could help with testing looking around in a VR Space
 * @param inVR boolean for vr functions
 * @returns main scene that holds the geometry for the vr environment
 */
export default function MainScene({
  inVR,
}: {
  inVR: boolean;
}): React.JSX.Element {
  const [updateGraph, setUpdateGraph] = useState(false);
  const [graph, setGraph] = useState<TimeSeriesGraphObject>();
  const [emGraph, setEmGraph] = useState<EmbeddedGraphObject>();

  /** 
   * This is used as a reference so that the controller can update the main scene.
   * Only runs on the begining, might keep graph on and update file on graph instead
   * @precondition none
   * @postcondition the scene is updated
   * */
  function updateScene(): void {
    setUpdateGraph(true);
  }
  const sceneRef = useRef({ updateScene });
  useEffect(() => {
    mainController.setSceneRef(sceneRef);
  });

  useEffect(() => {
    const graphData = mainController.getCSVController().getModelData();
    if (!graphData) {
      return; // Stop execution if vrSelected is undefined
    }
    const newGraph = mainController
      .getGraphController()
      .generateTimeSeriesGraph();
    setGraph(newGraph);
    const newEmGraph = mainController
      .getGraphController()
      .generateEmbeddedGraph();
    setEmGraph(newEmGraph);
    setUpdateGraph(false);
  }, [updateGraph]);
  return (
    <>
      {/* This block of code is the sign in front of the user
        A gray box with the that shows where graph is displayed */}
      <mesh position={[-1, 1.8, -3.65]}>
        <boxGeometry args={[6, 3.6, 0.25]} />
        <meshBasicMaterial color="gray" />
      </mesh>

      {/* This is the floor of the Scene */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Displays the Drop Down UI for generating graphs */}
      <DropdownUI inVR={inVR} />
      {graph && <CreateTimeSeries graphObject={graph} />}
      {emGraph && <CreateEmbeddedGraph graphObject={emGraph} />}
    </>
  );
}
