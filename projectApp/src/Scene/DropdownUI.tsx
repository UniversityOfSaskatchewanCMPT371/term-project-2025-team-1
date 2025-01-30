import { Text } from "@react-three/drei";
import { events } from "@react-three/fiber";
import { useState } from "react";
import { label } from "three/tsl";

interface DropDownProps {
    x: number;
    y: number;
    z: number;
}

interface DropDownButtonProps {
    buttonPosition: [number, number, number];
    label: string
}
export default function DropDownUI({x, y, z}: DropDownProps){
    const posX = x;
    const posY = y;
    const posZ = z;

    function DropDownButton({buttonPosition, label}: DropDownButtonProps){
        const [hovered,hover]=useState(false);

        return(
            <mesh 
            position={buttonPosition}
            onPointerOver={(e) => hover(true)}
            onPointerOut={(e) => hover(false)}>
            <planeGeometry attach="geometry" args={[0.4,0.1]}/>
            <meshStandardMaterial attach="material" color ={hovered ? "grey" : "white"}/>

            <Text 
            position={[posX + 2, posY -2, posZ + 0.01]}
            fontSize={0.06}
            color={"black"}>
                {label}
            </Text>
            </mesh>
            
        )
    }

    return(
        <>
        {/* The First Mesh will handle the rotation, positioning and visibility 
        These values could later on be implemented as an interface
        P.S: Found possible libraries that can be used as a GUI */}
        <mesh 
            rotation={[0, 1.57, 0]}
            position={[posX - 1, posY - 1, posZ - 2]}
            visible={true}>
            <mesh position={[posX, posY, posZ]}>
                <planeGeometry attach="geometry" args={[2.8,1.7]}/>
                <meshStandardMaterial attach="material" color = "blue"/>
            </mesh>
            <mesh rotation={[0, 3.14,0]} position={[posX, posY, posZ]}>
                <planeGeometry attach="geometry" args={[2.8,1.7]}/>
                <meshStandardMaterial attach="material" color = "blue"/>
            </mesh>
            <mesh rotation={[0,0,0]} position={[posX,posY + 0.5, posZ + 0.01]}>
                <Text fontSize={0.2}>
                    Add a CSV File
                </Text>
            </mesh>
            <mesh rotation={[0,0,0]} position={[posX - 0.8 ,posY + 0.1,posZ + 0.01]}>
                <Text fontSize={0.1}>
                    Enter By URL:
                </Text>
            </mesh>
            <mesh rotation={[0,0,0]} position={[posX + 0.1,posY + 0.1,posZ + 0.01]}>
                <planeGeometry attach="geometry" args={[1,0.1]}/>
                <meshStandardMaterial attach="material" color = "white"/>
            </mesh>
            <DropDownButton
                buttonPosition={[posX + 0.9, posY + 0.1, posZ + 0.01]}
                label={"Enter"}/>

            <mesh rotation={[0,0,0]} position={[posX- 0.9,posY - 0.35,posZ + 0.01]}>
                <Text fontSize={0.1}>
                    Load Local File: 
                </Text>
            </mesh>
            <DropDownButton 
                buttonPosition={[posX - 0.25,posY - 0.35,posZ + 0.01]}
                label={'Load File'}/>
        </mesh>
        </>
    )
};