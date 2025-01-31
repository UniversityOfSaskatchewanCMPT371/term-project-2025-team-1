import * as THREE from 'three';
import { Text } from "@react-three/drei";
import { useState, useRef } from "react";

interface DropDownProps {
    x: number;
    y: number;
    z: number;
}

interface DropDownButtonProps {
    buttonPosition: [number, number, number];
    label: string
    type: string
}

interface AlertProps {
    buttonPosition: [number, number, number];
    type: string
    
}

/*
* This function is for the sample Drop Down UI
*/
export default function DropDownUI({x, y, z}: DropDownProps){
    const posX = x;
    const posY = y;
    const posZ = z;
    const [ alertActive, alert ] = useState('');

    function DropDownButton({buttonPosition, label, type}: DropDownButtonProps){
        const [ hovered, hover ] = useState(false);
        const mesh = useRef<THREE.Mesh>(null);

        return(
            <mesh 
                ref={mesh}
                position = {buttonPosition}
                onClick = {() => alert(type)}
                onPointerOver = {() => hover(true)}
                onPointerOut = {() => hover(false)}>

                <planeGeometry 
                    attach = "geometry" 
                    args = {[0.4,0.1]}/>
                <meshStandardMaterial 
                    attach = "material" 
                    color ={hovered ? "grey" : "white"}/>

                <Text 
                    position = {[0, 0, 0.01]}
                    fontSize = {0.06}
                    color = {"black"}>
                    {label}
                </Text>

                <SelectionAlert 
                    buttonPosition = {buttonPosition}
                    type = {type}/>
            </mesh>
        )
    }

    function SelectionAlert({buttonPosition, type}: AlertProps){
        
        return(
            <>
            <mesh 
                position = {[posX -buttonPosition[0] + 2, posY - buttonPosition[1], 0.01]}
                visible = {type == alertActive}>

                <planeGeometry 
                    args = {[0.8,0.5]}/>
                <meshStandardMaterial 
                    attach = "material" 
                    color = {"burlywood"}/>
                <Text 
                    position = {[0, 0, 0.01]}
                    fontSize = {0.06}
                    color = {"black"}>
                        {type} Reader Clicked !
                </Text>
            </mesh>

            <mesh 
                position = {[posX -  buttonPosition[0] + 2, posY - buttonPosition[1], 0.01]}
                rotation = {[0, 3.14,0]}
                visible = {type == alertActive}>

                <planeGeometry 
                    args={[0.8,0.5]}/>
                <meshStandardMaterial 
                    attach="material" 
                    color ={"burlywood"}/>
            </mesh>
            </>
        )
    }

    return(
        <>
        {/* The First Mesh will handle the rotation, positioning and visibility 
        These values could later on be implemented as an interface
        P.S: Found possible libraries that can be used as a GUI */}
        <mesh 
            rotation = {[0, 1.57, 0]}
            position = {[posX - 1, posY - 1, posZ - 2]}
            visible = {true}>

            <mesh 
                position = {[posX, posY, posZ]}>
                <planeGeometry 
                    attach = "geometry" 
                    args = {[2.5,1.4]}/>
                <meshStandardMaterial 
                    attach = "material" 
                    color = "burlywood"/>
            </mesh>

            <mesh 
                rotation = {[0, 3.14,0]} 
                position = {[posX, posY, posZ]}>
                <planeGeometry 
                    attach = "geometry" 
                    args = {[2.8,1.7]}/>
                <meshStandardMaterial 
                    attach ="material" 
                    color = "burlywood"/>
            </mesh>

            <mesh 
                rotation = {[0,0,0]} 
                position = {[posX,posY + 0.5, posZ + 0.01]}>
                <Text 
                    fontSize = {0.2}
                    color = {"black"}>
                    Add a CSV File
                </Text>
            </mesh>

            {/* For Entering File By URL */}
            <mesh 
                rotation = {[0,0,0]} 
                position = {[posX - 0.8 ,posY + 0.1,posZ + 0.01]}>
                <Text 
                    fontSize = {0.1}
                    color = {"black"}>
                    Enter By URL:
                </Text>
            </mesh>

            <mesh 
                rotation = {[0,0,0]} 
                position = {[posX + 0.1,posY + 0.1,posZ + 0.01]}>
                <planeGeometry 
                    attach="geometry" 
                    args={[1,0.1]}/>
                <meshStandardMaterial 
                    attach="material" 
                    color = "white"/>
            </mesh>

            <DropDownButton
                buttonPosition = {[posX + 0.9, posY + 0.1, posZ + 0.01]}
                label = {"Enter"}
                type = {"URL"}/>

            {/* For Loading Local File */}
            <mesh 
                rotation = {[0,0,0]} 
                position = {[posX- 0.9,posY - 0.35,posZ + 0.01]}>
                <Text 
                    fontSize = {0.1}
                    color = {"black"}>
                    Load Local File: 
                </Text>
            </mesh>
            <DropDownButton 
                buttonPosition = {[posX - 0.25,posY - 0.35,posZ + 0.01]}
                label = {'Load File'}
                type = {"Local"}/>
        </mesh>
        </>
    )
};