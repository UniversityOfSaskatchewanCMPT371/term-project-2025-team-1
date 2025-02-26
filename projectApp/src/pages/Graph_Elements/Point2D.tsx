import { useState } from "react";
import { PointObject } from "../../components/Graph_Components/PointObject";

/**
 * Renders a 2D point on a Time Series Graph.
 * The point can be interacted with through hover and click events.
 * @param props - Component props
 * @param {PointClass} props.pointRef - Reference to the point data and state
 * @precondition pointRef must be a valid PointClass instance with position and selected state
 * @postcondition Renders an interactive 2D point with hover and click functionality
 */
export function Point2D({pointRef} : {pointRef: PointObject}){
    const [ hovered, hover ] = useState(false);
    const [ clicked, click ] = useState(false);

    /**
     * Toggles the point's selected state and updates local click state
     * @precondition None
     * @postcondition Updates both local clicked state and pointRef's selected state
     */
    function setOnClick(): void{
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