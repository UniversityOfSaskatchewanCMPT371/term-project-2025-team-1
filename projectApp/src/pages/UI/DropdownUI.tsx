import { Root, Container, Text } from '@react-three/uikit';
import { useState } from 'react';
import mainController from "../../controller/MainController.tsx";

interface dropDownProps {
    position : [number, number, number];
    xSize: number;
    ySize: number;
}

// Dropdown UI component
export default function DropdownUI(props: dropDownProps){
    const [pressed, press] = useState(false);
    const [ active, setActive ] = useState(false);

    // Creates an object to be displayed in the DropDown UI
    function GenerateRowObject({name} : {name: string}){
        //The list of objects/loaded csv files row by row
        return(
            <>
                <Container flexDirection={"row"} 
                alignItems={"flex-start"} justifyContent={"flex-start"} width={"100%"} height={"10%"}
                >
                    <Container width={"50%"} height={"100%"}>
                    <Text fontWeight={"bold"} positionLeft={20} >{name}</Text>
                    </Container>
                    {/* < for decreaing the number, used for board; 0 = None, past 0 goes to 4
                        > For increasing number, past 4 goes to None (0)*/}
                    <Container width={"50%"} height={"100%"}
                    alignItems={"center"} justifyContent={"center"}>
                        <RowObjectButtons/>
                    </Container>
                </Container>
            
            </>
        )
    }
    
    // Buttons for row object in dropdown
    function RowObjectButtons(){
        return (
            <>
            <Container>
                {/* Displaying the < button */}
                <Container backgroundColor={"gray"} width={"25%"} 
                alignItems={"center"} justifyContent={"center"} positionRight={2}
                backgroundOpacity={0.5}
                hover={{backgroundOpacity: 0.75}}>
                    <Text fontWeight={"bold"}>&lt;</Text>
                </Container>
                {/* Displaying the board number */}
                <Container width={"30%"} alignItems={"center"} justifyContent={"center"}>
                    <Text fontWeight={"bold"}>1</Text>
                </Container>

                {/* Displaying the > button */}
                <Container backgroundColor={"gray"} width={"25%"} 
                alignItems={"center"} justifyContent={"center"} positionLeft={2}
                backgroundOpacity={0.5}
                hover={{backgroundOpacity: 0.75}}>
                    <Text fontWeight={"bold"}>&gt;</Text>
                </Container>
            </Container>
            </>
        )
    }

    // Generates list of row objects
    function GenerateList(){
        //Layout of the body, and loading of RowObjects, then a Generate button, bottom right
        return (
        <>
        <Container flexDirection={"column"} flexGrow={props.xSize}>
            <Container height={"90%"} width={"100%"} flexDirection={"column"} 
            alignItems={"flex-start"} justifyContent={"flex-start"}>

                {/* Assign board number to Model maybe? */}
        {mainController.getCSVController().getModel().getData().map((graph, _index) => (
            
            <GenerateRowObject name={graph.getName()}></GenerateRowObject>
        ))}
        </Container>

        <Container flexDirection={"row"} alignItems={"flex-end"} justifyContent={"flex-end"}
        height={"8%"} width={"95%"}> 

            {/* Attach ON Click here */}
            <Container width={"30%"} height={"100%"} backgroundColor={"gray"} backgroundOpacity={0.5}
            hover={{backgroundOpacity: 0.75}}>
            <Text fontWeight={"bold"} positionLeft={"20%"} positionBottom={"5%"}>Generate</Text>
            </Container>
            
        </Container>
        </Container>
        </>
        )
    }

    // Creates the dropdown UI with a button to open it and a list of loaded graphs when it's active.
    function DropDownBody(){
        
        return (
            <>
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
                    <Container height={"10%"} width={"99%"} margin={1} backgroundColor={"lightgray"}>
                        
                    <Text fontWeight={"bold"} positionLeft={20}>
                        Loaded Graphs</Text>
                        </Container>

                    <Container
                        height={"88%"}
                        width={"99%"}
                        margin={1}
                        onClick={() => {press(!pressed)}}
                        backgroundColor={"lightgray"}
                        backgroundOpacity={0.8}
                        >
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
