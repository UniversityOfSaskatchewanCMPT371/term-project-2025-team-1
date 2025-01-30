import { Text } from '@react-three/drei';
import DropDownUI from './DropdownUI';

export default function MainScene() {

   // useEffect(() => {
        
    //});

   // useFrame((delta, time) => {

    //});

    return (
        <>
        <mesh position={[0,1,6]}>
            <boxGeometry args={[5, 2, 2]}></boxGeometry>
            <meshBasicMaterial color="red"></meshBasicMaterial>
        </mesh>

        <mesh rotation={[0, 3.14, 0]} position={[0,1,4.8]}>
            <Text>
                Look Back
            </Text>
        </mesh>

        <mesh position={[1,1,-6]}>
            <boxGeometry args={[4, 2, 2]}></boxGeometry>
            <meshBasicMaterial color="red"></meshBasicMaterial>
        </mesh>

        <mesh position={[1,1,-4.9]}>
            <Text> Front </Text>
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="gray" />
        </mesh>
        <DropDownUI x={-2} y={2} z={0}></DropDownUI>
        </>
    );
};
