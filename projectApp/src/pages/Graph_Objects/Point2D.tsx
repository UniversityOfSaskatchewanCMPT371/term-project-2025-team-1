//TODO
//The 2D Point that will be displayed on the Time Series Graph
//Will require x, y positions and possibly size (depends on total number of Time values)

import { useState } from "react";
import { PointClass } from "../../components/Graph_Components/PointClass";

export function Point2D({pointRef} : {pointRef: PointClass}){
    const [ hovered, hover ] = useState(false);
    return (
        <mesh
            position={pointRef.getPosition()}
            onClick={() => {pointRef.setSelected(!(pointRef.getSelected()))}}
            onPointerOver={()=>{hover(true)}}
            onPointerOut={()=>{hover(false)}}>

                <circleGeometry 
                attach = "geometry"
                    args={[0.3, 32]}>
                    </circleGeometry>

                <meshStandardMaterial
                    color={hovered? "blue": "skyblue"}
                    // opacity={ hovered? 1.00 : 0.50}
                    ></meshStandardMaterial>
        </mesh>
    )
}