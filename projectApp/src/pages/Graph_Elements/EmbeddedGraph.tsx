// TODO - View aspect of embedded graph

import { Container } from "@react-three/uikit";
import { Plane } from "@react-three/drei";
//import { PointObject } from "../../components/Graph_Components/PointObject";
import React from "react";
//import { useState } from "react";
import mainController from "../../controller/MainController";
import { EmbeddedGraphObject } from "../../components/Graph_Components/EmbeddedGraphObject";
import { sendLog } from "../../logger-frontend";

/**
 * This function will create an Embedded Graph in the VR environment using a EmbeddedGraphObject.
 * This graph will be 3D.
 * @preconditions A defined EmbeddedGraphObject.
 * @postconditions Returns a React JSX Element that represents a 3D Embedded Graph.
 */

export function EmbeddedGraph({graph}:{graph: EmbeddedGraphObject}): React.JSX.Element{
    //const [ header, setHeader ] = useState("");                   //useState for changes in the graph's Y header
    
    // Values used to space Points in the X axis
    //const totalSpace = 5;                                      
    //const divider = (totalSpace/graph.getNumPoints());
    //let current = (-1.8) + (divider/2);
    
    // Values used to position lines, currently set to starting position
    //let currentLine:[number,number,number]= ([0,0,0.01]);
    //let lastLine:[number,number,number] = ([-1.8, -1, 0.01])
    
    // Spacing used by X and Y axis
    //const xSpacing = 100/graph.getNumPoints();
    //const ySpacing = 100/(graph.timeSeriesYRange().length + 1);

    //Used to update the graph
    function UpdateGraph(): void{
        //graph.updatePointPosition();
        //setHeader(graph.getYHeader);
        mainController.updateMainScene();
        sendLog("info", "an EmbeddedGraph object was updated (EmbeddedGraph.tsx)");
    }

    /**
     * Will use a PointObject to display a 3D point in the Embedded Graph
     * @precondition PointObject, used to show Point
     * @postcondition Interactable 3D point in the graph
     */
    /*function GeneratePoints({point}:{point: PointObject}): React.JSX.Element{
        //Updating the position of the point
        point.setXPosition((current));
        point.setYPosition(((point.getYData()/100) * (graph.getYRange()/(graph.timeSeriesYRange().length))) - (1));
        
        //Updating the position of the lines based off the point position
        currentLine = lastLine;
        lastLine = ([point.getXPosition(), point.getYPosition(), 0.01])
        sendLog("info", "a visual representation of points was created for a TimeSeriesGraph object (TimeSeriesGraph.tsx)");
            
        return (
            <>
            <Create3DPoint pointRef={point}></Create3DPoint>
            </>
        )
    }*/

    /**
     * Updates the current position and then creates the Line which connects the last two points
     * @postconditions The Line connecting the Points in the 3D Embedded Graph
     */
    /*function GenerateLines(): React.JSX.Element{
        //current = current + (divider);
        sendLog("info", "the lines on a EmbeddedGraph object were created (EmbeddedGraph.tsx)");
        return(
        <>
            <Line points={[[currentLine[0],currentLine[1],currentLine[2]], [lastLine[0],lastLine[1],lastLine[2]]]}
                color={"black"} lineWidth={2}></Line>
        </>
        )
    }*/

    /**
     * This Function creates the main graph of the Embedded Graph
     * @postcondition Body of the graph
     */
    function GenerateGraph(): React.JSX.Element{
        sendLog("info", "an EmbeddedGraph visualization is being created [not yet functioning] (EmbeddedGraph.tsx)");
        return (
            <Container>
                <Plane>

                </Plane>
            </Container>
        )
    }

    return(
        <mesh position={[4, 2, -3.5]}>
            <text>A 3D Graph will be here someday, but here's a plane in the meantime!</text>
            <GenerateGraph/>
        </mesh>
    )
}