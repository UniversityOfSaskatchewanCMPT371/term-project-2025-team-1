import { Text } from "@react-three/drei";
import { events } from "@react-three/fiber";
import { useState } from "react";

export default function DropdownUI(){

    /*function ButtonDD(){
        const [hovered,hover]=useState(false);

        return(
            <mesh onPointerOver={(e) => hover(true)}
            onPointerOut={(e) => hover(false)}>
            </mesh><planeGeometry attach="geometry" args={[0.4,0.1]}/>
            <meshStandardMaterial attach="material" color = "red"/>
            />
        )
    }*/

    return(
        <>
        <mesh position={[-2, 0, 0]}>
            <planeGeometry attach="geometry" args={[4,2]}/>
            <meshStandardMaterial attach="material" color = "blue"/>
        </mesh>
        <mesh rotation={[0,0,0]} position={[-2,0.6,0.01]}>
            <Text fontSize={0.1}>
                Add a CSV File
            </Text>
        </mesh>
        <mesh rotation={[0,0,0]} position={[-2,0.1,0.01]}>
            <Text fontSize={0.1}>
                Enter a CSV File URL
            </Text>
        </mesh>
        <mesh rotation={[0,0,0]} position={[-2,-0.1,0.01]}>
            <planeGeometry attach="geometry" args={[1,0.1]}/>
            <meshStandardMaterial attach="material" color = "white"/>
        </mesh>
        <mesh rotation={[0,0,0]} position={[-2,-0.35,0.01]}>
            <Text fontSize={0.1}>
                Browse for local CSV File
            </Text>
        </mesh>
        <mesh rotation={[0,0,0]} position={[-2,-0.6,0.01]}>
            <planeGeometry attach="geometry" args={[0.4,0.1]}/>
            <meshStandardMaterial attach="material" color = "red"/>
        </mesh>
        </>
    )
};