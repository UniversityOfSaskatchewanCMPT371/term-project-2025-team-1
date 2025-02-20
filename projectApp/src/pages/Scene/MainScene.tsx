import { Text } from '@react-three/drei';
import DropdownUI from "../UI/DropdownUI"
import { CreateTimeSeries } from '../../components/Graph_Components/CreateTimeSeries';
import mainController from '../../controller/MainController';
import { useEffect, useRef, useState } from 'react';
import { TimeSeriesGraphClass } from '../../components/Graph_Components/TimeSeriesGraphClass';

/*
* The main scene being used in the current program
* For now contains shapes the could help with testing looking around in a VR Space
*/
export default function MainScene() {
    //TODO
    //Add a UI to the MainScene
    //Then make it possible for the ui to  stay in view of the camera (maybe top left)
    let [updateGraph, setUpdateGraph] = useState(false);
    let [graph, setGraph] = useState<(TimeSeriesGraphClass)>();
    
    //Only runs on the begining, might keep graph on and update file on graph instead
    function updateScene(){
        setUpdateGraph(true);
    }
    const sceneRef = useRef({updateScene});
    useEffect(() => {
        mainController.setSceneRef(sceneRef);
    },);
    useEffect(() => {
        if(updateGraph) {
            const vrSelected = mainController.getCSVController().getVRSelected();
            if(vrSelected && mainController.getGraphController().getModel().getData().length > 0){
                const newGraph = mainController.getGraphController().generateTimeSeriesGraph(vrSelected);
                setGraph(newGraph);
            }
        }
        setUpdateGraph(false);
    });
    return (
        <>
        {/* This block of code is the sign behind the user
        A red box with the text Look Back */}
        <mesh position = {[3,1,6]}>
            <boxGeometry args = {[5, 2, 2]}/>
            <meshBasicMaterial color = "red"/>
        </mesh>
        <mesh rotation = {[0, 3.14, 0]} position = {[3,1,4.8]}>
            <Text>Look Back</Text>
        </mesh>

        {/* This block of code is the sign in front of the user
        A red box with the text Front */}
        <mesh position = {[4.5,1,-4.55]}>
            <boxGeometry args = {[6, 5.5, 2]}/>
            <meshBasicMaterial color="red"/>
        </mesh>
        

        {/* This is the floor of the Scene */}
        <mesh 
            rotation = {[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="gray"/>
        </mesh>

        {/* Displays the Sample Drop Down UI */}
        {/* <CreateTimeSeries graphObject={graph}></CreateTimeSeries> */}
        <DropdownUI position={[-2, 1.5, -4]} xSize={4} ySize={3}></DropdownUI>
        {graph && <CreateTimeSeries graphObject={graph}></CreateTimeSeries>}
        </>
    );
};
