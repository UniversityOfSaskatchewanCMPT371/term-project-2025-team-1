import { Root, Container } from '@react-three/uikit';

interface dropDownProps {
    position : [number, number, number];
}

export default function ReDropDown(props: dropDownProps){

    function dropDown(){
        
        return(
            <mesh position={props.position}>
                <Root backgroundColor="red" >


                </Root>
            </mesh>
        )
    }
    return (
        <>
        </>
    )
}