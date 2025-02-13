import { Root, Container, Text } from '@react-three/uikit';
import { useState } from 'react';
// import { Text } from "@react-three/drei";
import mainController from '../../controller/MainController';

interface dropDownProps {
    position : [number, number, number];
    xSize: number;
    ySize: number;
}

export default function ReDropDown(props: dropDownProps){
    const [pressed, press] = useState(false);
    const [ active, setActive ] = useState(false);
    //const handlButtonClick = () => {
        //Works
        //console.log("Maybe?")
        //But calling printConsole from mainController doesn't

    //}
    function DropDownBody(){
        
        return (
            <>
            {/* USE THE COMPONENT Fullscreen of uikit */}
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