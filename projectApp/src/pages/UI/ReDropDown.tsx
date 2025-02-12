import { Root, Container } from '@react-three/uikit';
import { useState } from 'react';

interface dropDownProps {
    position : [number, number, number];
}

export default function ReDropDown(props: dropDownProps){
    const [pressed, press] = useState(false);
    function DropDownBody(){
        return (
            <>
            <mesh position={props.position}>
                <Root backgroundColor="red" >   
                    <Container flexGrow={1} margin={16} hover={{backgroundColor:"skyblue"}} backgroundColor={"green"}/>

                    <Container
                    flexGrow={1}
                    margin={16}
                    onClick={() => press(!pressed)}
                    backgroundColor={pressed? "pink" : "blue"}
                    backgroundOpacity={0.5}
                    hover={{backgroundOpacity: 1}}>
                    </Container>
                </Root>
            </mesh>
            </>
        )
    }

    return (
        <>
        <DropDownBody/>
        </>
    )
}