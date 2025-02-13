import { Root, Container, Text } from '@react-three/uikit';
import { useState } from 'react';
import mainController from "../../controller/MainController.tsx";

interface dropDownProps {
    position : [number, number, number];
    xSize: number;
    ySize: number;
}

export default function ReDropDown(props: dropDownProps){
    const [pressed, press] = useState(false);
    const [ active, setActive ] = useState(false);
    
    function DropDownBody(){
        
        return (
            <>
            {/* USE THE COMPONENT Fullscreen of uikit 
                For Now its okay to keep it static*/}
            <mesh position={props.position}>
                
            <mesh position={[(-0.5) - (props.xSize/2), 0, 0]}>
                <Root  sizeX={0.5} sizeY={0.5}>
                    <Container
                    flexGrow={1}
                    onClick={() => {setActive(!active)}}
                    backgroundColor={"grey"}
                    backgroundOpacity={0.5}
                    hover={{backgroundOpacity: 1}}>
                    
                    </Container>

                </Root>
            </mesh>
            <mesh position={[0,0,0]} visible={active}>
                <Root backgroundColor="grey" sizeX={props.xSize} sizeY={props.ySize} flexDirection={"column"}>   
                    <Container flexGrow={0.25} margin={2} hover={{backgroundColor:"skyblue"}} backgroundColor={"lightgray"}>
                        
                    <Text fontWeight={"bold"} positionLeft={20}>
                        Loaded Graphs</Text>
                        </Container>

                    <Container
                        flexGrow={1.25}
                        margin={2}
                        onClick={() => press(!pressed)}
                        backgroundColor={pressed? "pink" : "lightgray"}
                        backgroundOpacity={0.5}
                        hover={{backgroundOpacity: 1}}>
                            {/* Create objects representing loaded graphs in model 
                                Each will have a button that sets a use state for selected
                                Then a button for loading selected graph, activate use state
                                Then on a useFrame if activated true, try using backend function*/}

                    </Container>
                </Root>
            </mesh>
            
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