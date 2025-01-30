import * as THREE from 'three';
import React from 'react';

/*interface csvUIprops {
    isVisible: boolean;
    onClose: () => void;
}*/

export default function csvUI() {

    return (
        <>
        <mesh position={[1,1,1]}>
            <planeGeometry args={[1,1]}/>
            <meshStandardMaterial color = "blue"/>
        </mesh>
        </>
    );
};