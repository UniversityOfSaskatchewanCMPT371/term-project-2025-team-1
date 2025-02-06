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
            onClick={() => pointRef.setSelected(!(pointRef.getSelected()))}
            onPointerOver={()=>hover(true)}
            onPointerOut={()=>hover(false)}>

                <circleGeometry 
                    args={[1,1,1]}>
                    </circleGeometry>

                <meshStandardMaterial
                    color={"blue"}
                    opacity={ hovered? 1.00 : 0.70}></meshStandardMaterial>
        </mesh>
    )
}