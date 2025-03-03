// TODO - View aspect of embedded graph

import { Root, Container, Text } from "@react-three/uikit";
import { Line, Plane } from "@react-three/drei";
import { PointObject } from "../../components/Graph_Components/PointObject";
import React from "react";
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