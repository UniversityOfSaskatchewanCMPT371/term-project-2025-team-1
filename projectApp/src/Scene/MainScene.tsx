import { Text } from '@react-three/drei';
import DropDownUI from './DropDownUI';

export default function MainScene() {

    return (
        <>
        <mesh 
            position = {[3,1,6]}
        >
            <boxGeometry 
                args = {[5, 2, 2]}
            ></boxGeometry>
            <meshBasicMaterial 
                color = "red"
            ></meshBasicMaterial>
        </mesh>

        <mesh 
            rotation = {[0, 3.14, 0]} 
            position = {[3,1,4.8]}>
            <Text>
                Look Back
            </Text>
        </mesh>

        <mesh 
            position = {[3,1,-6]}
        >
            <boxGeometry 
                args = {[4, 2, 2]}
            ></boxGeometry>
            <meshBasicMaterial 
                color="red"
            ></meshBasicMaterial>
        </mesh>

        <mesh 
            position = {[3,1,-4.9]}
        >
            <Text> 
                Front 
            </Text>
        </mesh>

        <mesh 
            rotation = {[-Math.PI / 2, 0, 0]}
        >
            <planeGeometry 
                args={[200, 200]} 
            />
            <meshStandardMaterial 
                color="gray" 
            />
        </mesh>
        <DropDownUI 
            x={-2} 
            y={1} 
            z={1.3}
        ></DropDownUI>
        </>
    );
};
