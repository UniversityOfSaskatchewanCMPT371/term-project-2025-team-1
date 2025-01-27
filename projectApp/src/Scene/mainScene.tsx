import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';

export default function MainScene() {

    useEffect(() => {

    })

    useFrame((state, delta) => {

    });

    return (
        <>
        <mesh position={[0, 0,6]}>
            <boxGeometry args={[2, 2, 2]}></boxGeometry>
            <meshBasicMaterial color="red"></meshBasicMaterial>
        </mesh>
        </>
    );
};