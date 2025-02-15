import { Root, Container, Text, Input } from '@react-three/uikit';
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

    function GenerateRowObject({name} : {name: string}){
        //The list of objects/loaded csv files row by row

        return(
            <>
            
                <Container flexDirection={"row"} hover={{backgroundColor: "gray"}}
                alignItems={"flex-start"} justifyContent={"flex-start"} width={"100%"} height={"10%"}>
                    <Text fontWeight={"bold"} positionLeft={20} positionTop={5}>{name}</Text>
                    
                </Container>
            
            </>
        )
    }
    function GenerateList(){
        //Layout of the body, and loading of RowObjects, then a Generate button, bottom right
        return (
        <>
        <Container flexDirection={"column"} flexGrow={props.xSize}>
            <Container height={"90%"} width={"100%"} flexDirection={"column"} 
            alignItems={"flex-start"} justifyContent={"flex-start"}>

                {/* Assign board number to Model maybe? */}
        {mainController.getGraphController().getReaderModel().getCSVFiles().map((graph, index) => (
            
            <GenerateRowObject name={graph.getName()}></GenerateRowObject>
        ))}
        </Container>

        <Container flexDirection={"row"} alignItems={"flex-end"} justifyContent={"flex-end"}
        height={"8%"} width={"95%"}> 

            {/* Attach ON Click here */}
            <Container width={"25%"} height={"100%"} backgroundColor={"gray"} backgroundOpacity={0.5}
            hover={{backgroundOpacity: 0.75}}>
            <Text fontWeight={"bold"} positionLeft={"25%"} positionBottom={"5%"}>Load</Text>
            </Container>
            
        </Container>
        </Container>
        </>
        )
    }
    
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
                    <Container flexGrow={0.25} margin={2} backgroundColor={"lightgray"}>
                        
                    <Text fontWeight={"bold"} positionLeft={20}>
                        Loaded Graphs</Text>
                        </Container>

                    <Container
                        flexGrow={1.25}
                        margin={2}
                        onClick={() => press(!pressed)}
                        backgroundColor={ "lightgray"}
                        >
                            {/* Create objects representing loaded graphs in model 
                                Each will have a button that sets a use state for selected
                                Then a button for loading selected graph, activate use state
                                Then on a useFrame if activated true, try using backend function*/}
                                <GenerateList></GenerateList>

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