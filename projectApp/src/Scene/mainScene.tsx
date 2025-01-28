import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';

export default function MainScene() {

   // useEffect(() => {
        
    //});

   // useFrame((delta, time) => {

    //});

    return (
        <>
        <mesh position={[0,1,6]}>
            <boxGeometry args={[2, 2, 2]}></boxGeometry>
            <meshBasicMaterial color="red"></meshBasicMaterial>
        </mesh>
        <mesh position={[1,1,-6]}>
            <boxGeometry args={[2, 2, 2]}></boxGeometry>
            <meshBasicMaterial color="red"></meshBasicMaterial>
        </mesh>
        {/*<mesh position={[0,0,0]}>
            <boxGeometry args={[10,0,10]}></boxGeometry>
            <meshBasicMaterial color="grey"></meshBasicMaterial>
        </mesh>*/}
        {/*<mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="gray" />
    </mesh>*/}
        </>
    );
};