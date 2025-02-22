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
                    args={[0.05, 32]}>
                    </circleGeometry>

                <meshStandardMaterial
                    color={hovered? "blue": "skyblue"}
                    ></meshStandardMaterial>
        </mesh>
    )
}
