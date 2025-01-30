import { Text } from "@react-three/drei";
import { events } from "@react-three/fiber";
import { useState } from "react";

export default function DropDownUI(){

    function DropDownButton(props: any){
        const [hovered,hover]=useState(false);

        return(
            <mesh 
            {...props}
            onPointerOver={(e) => hover(true)}
            onPointerOut={(e) => hover(false)}>
            <planeGeometry attach="geometry" args={[0.4,0.1]}/>
            <meshStandardMaterial attach="material" color ={hovered ? "grey" : "white"}/>
            </mesh>
        )
    }

    return(
        <>
        <mesh position={[-2, 2, 0]}>
            <planeGeometry attach="geometry" args={[4,2]}/>
            <meshStandardMaterial attach="material" color = "blue"/>
        </mesh>
        <mesh rotation={[0,0,0]} position={[-2,2.6,0.01]}>
            <Text fontSize={0.1}>
                Add a CSV File
            </Text>
        </mesh>
        <mesh rotation={[0,0,0]} position={[-2,2.1,0.01]}>
            <Text fontSize={0.1}>
                Enter a CSV File URL
            </Text>
        </mesh>
        <mesh rotation={[0,0,0]} position={[-2,1.9,0.01]}>
            <planeGeometry attach="geometry" args={[1,0.1]}/>
            <meshStandardMaterial attach="material" color = "white"/>
        </mesh>
        <mesh rotation={[0,0,0]} position={[-2,1.65,0.01]}>
            <Text fontSize={0.1}>
                Browse for local CSV File
            </Text>
        </mesh>
        <DropDownButton position={[-2,1.4,0.01]}/>
        </>
    )
};