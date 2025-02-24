import { useState } from "react";
import { PointClass } from "../../components/Graph_Components/PointClass";

export function Point2D({pointRef} : {pointRef: PointClass}){
    const [ hovered, hover ] = useState(false);
    const [ clicked, click ] = useState(false);

    function setOnClick(){
        click(!(clicked));
        pointRef.setSelected(!(pointRef.getSelected()))
    }

    return (
        <mesh
            position={pointRef.getPosition()}
            onClick={() => {setOnClick()}}
            onPointerOver={()=>{hover(true)}}
            onPointerOut={()=>{hover(false)}}>
                
                <circleGeometry 
                    attach = "geometry"
                    args={[0.06, 32]}/>
                    

                <meshStandardMaterial
                    color={clicked? "blue": "skyblue"}
                    opacity={ hovered? 1.00 : 0.50}/>
        </mesh>
    )
}