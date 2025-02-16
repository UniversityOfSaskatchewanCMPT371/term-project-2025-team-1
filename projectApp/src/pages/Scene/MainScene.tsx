import { Text } from '@react-three/drei';

import { Create2DPoint } from '../../components/Graph_Components/Create2DPoint';
import DropdownUI from "../UI/DropdownUI"

/*
* The main scene being used in the current program
* For now contains shapes the could help with testing looking around in a VR Space
*/
export default function MainScene() {
    //TODO
    //Add a UI to the MainScene
    //Then make it possible for the ui to stay in view of the camera (maybe top left)

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
        <mesh position = {[3,1,-6]}>
            <boxGeometry args = {[4, 2, 2]}/>
            <meshBasicMaterial color="red"/>
        </mesh>
        <mesh position = {[3,1,-4.9]}>
            <Text> 
                Front 
            </Text>
        </mesh>

        {/* This is the floor of the Scene */}
        <mesh 
            rotation = {[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="gray"/>
        </mesh>

        {/* Displays the Sample Drop Down UI */}
        {/* <DropDownUI x={-2} y={1} z={1.3}/> */}
        <DropdownUI position={[-2, 1.5, -4]} xSize={4} ySize={3}></DropdownUI>
        <Create2DPoint position={[0, 1, -2]} selected={false} xData={'Time'} yData={89}/>
        </>
    );
};
