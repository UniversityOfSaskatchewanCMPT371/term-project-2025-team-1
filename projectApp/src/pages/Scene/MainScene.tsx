import { Text } from '@react-three/drei';
import { TimeSeriesGraph } from '../Graph_Objects/TimeSeriesGraph';

import { Create2DPoint } from '../../components/Graph_Components/Create2DPoint';
import DropdownUI from "../UI/DropdownUI"

/*
* The main scene being used in the current program
* Contains shapes that helps user look around in a VR Space
*/
export default function MainScene() {
    return (
        <>
        {/* A red box with the text "Look Back" */}
        <mesh position = {[3,1,6]}>
            <boxGeometry args = {[5, 2, 2]}/>
            <meshBasicMaterial color = "red"/>
        </mesh>
        <mesh rotation = {[0, 3.14, 0]} position = {[3,1,4.8]}>
            <Text>Look Back</Text>
        </mesh>

        {/* A red box with the text "Front" */}
        <mesh position = {[3,1,-6]}>
            <boxGeometry args = {[4, 2, 2]}/>
            <meshBasicMaterial color="red"/>
        </mesh>
        <mesh position = {[3,1,-4.9]}>
            <Text> 
                Front 
            </Text>
        </mesh>

        {/* The floor of the Scene */}
        <mesh 
            rotation = {[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="gray"/>
        </mesh>

        {/* Displays the Sample Drop Down UI */}
        <TimeSeriesGraph></TimeSeriesGraph>
        <DropdownUI position={[-2, 1.5, -4]} xSize={4} ySize={3}></DropdownUI>
        <Create2DPoint position={[0, 1, -2]} selected={false} xData={'Time'} yData={89}/>
        </>
    );
};
