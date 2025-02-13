import * as THREE from 'three';
import { Text } from "@react-three/drei";
import { useState, useRef } from "react";
import { sendLog } from '../../logger-frontend';

//Interface which tracks the location of the Sample DropDown UI
interface DropDownProps {
    x: number;  //x position on plane
    y: number;  //y position on plane
    z: number;  //z position on plane
}

/*Interface for the Interactable Button
* Will track position, and the text of the button
*/
interface DropDownButtonProps {
    buttonPosition: [number, number, number];   //Location of the button (Using DropDown Location)
    label: string                               //Text displayed on button
    type: string                                //The button's type (Used for alert)
}

//Interface for the Alert which allows the user to know that they interacted with the button
interface AlertProps {
    buttonPosition: [number, number, number];   //Location of the Alert in respect to the DropDown UI
    type: string                                //Specify which type is displayed on the Alert box
    
}

/*
* This function is for the sample Drop Down UI
* It will show a display for the Different CSV Reader types
* As well as having an interable button in the program
*/
export default function DropDownUI({x, y, z}: DropDownProps){
    const posX = x;
    const posY = y;
    const posZ = z;
    const [ alertActive, alert ] = useState('');

    function clicked() {
        console.log("front end");
        sendLog("info", "🦖🦕🦖🦕🦖🦕🦖🦕🦖🦕");
    }

    //This function creates the interactable button, takes an interface of DropDownButtonProps
    function DropDownButton({buttonPosition, label, type}: DropDownButtonProps){
        const [ hovered, hover ] = useState(false);
        const mesh = useRef<THREE.Mesh>(null);

        return(
            // Initializing the mesh of the button
            <mesh 
            // Assigning position, and usestates for the button
                ref={mesh}
                position = {buttonPosition}
                onClick = {clicked}
                onPointerOver = {() => {hover(true)}}
                onPointerOut = {() => {hover(false)}}>

                {/* The Button Object with the text */}
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

                {/* Assigning an alert type to the button */}
                <SelectionAlert 
                    buttonPosition = {buttonPosition}
                    type = {type}/>
            </mesh>
        )
    }

    //This function is the Alert sent when a button is selected, takes an interface of AlertProps
    function SelectionAlert({buttonPosition, type}: AlertProps){
        
        return(
            <>
            {/* The alert object */}
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

            {/* This is so that the back of the alert isn't transparent */}
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
        P.S: Found possible libraries that can be used as a GUI Instead of Geometries*/}
        <mesh 
            rotation = {[0, 1.57, 0]}
            position = {[posX - 1, posY - 1, posZ - 2]}
            visible = {true}>

            {/* The plane of the Sample Drop Down UI and its back */}
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
                    args = {[2.5,1.4]}/>
                <meshStandardMaterial 
                    attach ="material" 
                    color = "burlywood"/>
            </mesh>

            {/* Title of the DropDownUI */}
            <mesh 
                rotation = {[0,0,0]} 
                position = {[posX,posY + 0.5, posZ + 0.01]}>
                <Text 
                    fontSize = {0.2}
                    color = {"black"}>
                    Add a CSV File
                </Text>
            </mesh>

            {/* These next blocks are for Entering File By URL */}
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

            {/* These next blocks are for Loading Local File */}
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