export default function DropdownUI(){

    return(
        <>
        <mesh>
            <planeGeometry attach="geometry" args={[1,1]}/>
            <meshStandardMaterial attach="material" color = "blue"/>
        </mesh>
        </>
    )
};