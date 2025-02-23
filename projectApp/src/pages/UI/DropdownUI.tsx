import { Root, Container, Text } from '@react-three/uikit';
import { useState } from 'react';
import mainController from "../../controller/MainController.tsx";
import { CSVData } from '../../types/CSVInterfaces.tsx';
import { sendLog } from '../../logger-frontend.ts';

interface dropDownProps {
    position : [number, number, number];
    xSize: number;
    ySize: number;
}

//This function is for creating the Dropdown UI
export default function DropdownUI(props: dropDownProps){
    const [pressed, press] = useState(false);
    const [ active, setActive ] = useState(false);

    //This is the function for creating a object displayed in the DropDown UI
    function GenerateRowObject({data} : {data: CSVData}){
        //The list of objects/loaded csv files row by row
        return(
            <>
                <Container flexDirection={"row"} 
                alignItems={"flex-start"} justifyContent={"flex-start"} width={"100%"} height={"10%"}
                >
                    <Container width={"50%"} height={"100%"}>
                    <Text fontWeight={"bold"} positionLeft={20} >{data.getName()}</Text>
                    </Container>
                    {/* < for decreaing the number, used for board; 0 = None, past 0 goes to 4
                        > For increasing number, past 4 goes to None (0)*/}
                    <Container width={"50%"} height={"100%"}
                    alignItems={"center"} justifyContent={"center"}>
                        <RowObjectButtons data={data}/>
                    </Container>
                </Container>
            
            </>
        )
    }
    // For now Its probably okay to just display one graph
    function RowObjectButtons({data}:{data: CSVData}){
        return (
            <>
            <Container>
                {/* Displaying the < button */}
                <Container backgroundColor={"gray"} width={"25%"} 
                alignItems={"center"} justifyContent={"center"} positionRight={2}
                backgroundOpacity={0.5}
                hover={{backgroundOpacity: 0.75}} onClick={() => {
                    data.decrementDisplayBoard();
                    sendLog("info","DropdownUI.RowObjectButtons() [<] pressed");
                }}>
                    <Text fontWeight={"bold"}>&lt;</Text>
                </Container>
                {/* Displaying the board number */}
                <Container width={"30%"} alignItems={"center"} justifyContent={"center"}>
                    <Text fontWeight={"bold"}>{data.getDisplayBoard().toString()}</Text>
                </Container>

                {/* Displaying the > button */}
                <Container backgroundColor={"gray"} width={"25%"} 
                alignItems={"center"} justifyContent={"center"} positionLeft={2}
                backgroundOpacity={0.5}
                hover={{backgroundOpacity: 0.75}} onClick={() => {
                    data.incrementDisplayBoard();
                    sendLog("info","DropdownUI.RowObjectButtons() []>] pressed");
                }}>
                    <Text fontWeight={"bold"}>&gt;</Text>
                </Container>
            </Container>
            </>
        )
    }
    /*
    * Generates the graph, and then updates main scene
    */
    function update(){
        mainController.getCSVController().generate();
        mainController.updateMainScene();
    }
    function GenerateList(){
        //Layout of the body, and loading of RowObjects, then a Generate button, bottom right
        return (
        <>
        <Container flexDirection={"column"} flexGrow={props.xSize}>
            <Container height={"90%"} width={"100%"} flexDirection={"column"} 
            alignItems={"flex-start"} justifyContent={"flex-start"}>

                {/* Assign board number to Model maybe? */}
        {mainController.getCSVController().getModel().getData().map((graph) => (
            
            <GenerateRowObject data={graph} key={graph.getName()}></GenerateRowObject>
        ))}
        </Container>

        <Container flexDirection={"row"} alignItems={"flex-end"} justifyContent={"flex-end"}
        height={"8%"} width={"95%"}> 

            {/* Attach ON Click here */}
            <Container width={"30%"} height={"100%"} backgroundColor={"gray"} backgroundOpacity={0.5}
            hover={{backgroundOpacity: 0.75}} onClick={() => {
                update();
                sendLog("info","DropdownUI.GenerateList() [BUTTON]? pressed");
                }}>
            <Text fontWeight={"bold"} positionLeft={"20%"} positionBottom={"5%"}>Generate</Text>
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
                    onClick={() => {
                        setActive(!active);
                        sendLog("info","DropdownUI.DropDownBody() [active] button pressed");
                    }}
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
                        onClick={() => {
                            press(!pressed);
                            sendLog("info","DropdownUI.DropDownBody() [create] button pressed");
                        }}
                        backgroundColor={"lightgray"}
                        backgroundOpacity={0.8}
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