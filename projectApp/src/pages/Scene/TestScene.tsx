import { Container, Fullscreen, Text } from "@react-three/uikit";
import { useState } from "react";

export default function TestScene({inVR} : {inVR:boolean}): React.JSX.Element{
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    return(
        <>
        {/* Maybe fullscreen component stay displaying, but the container can chang visibility, so theres always that fullscreen button top left */}
            <Fullscreen flexDirection={"row"} distanceToCamera={0.8} pointerEvents={"none"}> 
                {/* Main Container that encapsulates Test Scene */}
                {/* Possibly make some sizes dependent when inside or outside vr */}
                <Container width={"100%"} height={"100%"} backgroundColor={"darkgray"} backgroundOpacity={clicked? 0.5:0.01}
                alignContent={"center"} justifyContent={"center"} flexDirection={"column"}>

                    {/* Top filler */}
                    <Container width={"100%"} height={inVR? "30%" : "0%"}/>

                    <Container width={"100%"} height={"7%"} flexDirection={"column"} alignContent={"center"} justifyContent={"center"}>
                        <Container width={"100%"} height={"100%"} flexDirection={"row"}>
                            <Container width={inVR? "57%": "90%"} height={"5%"} backgroundOpacity={0.4}/>
                            

                    {/* Button to open Test Scene */}
                            <Container 
                                width={"10%"} height={"80%"} 
                                backgroundOpacity={hovered? 0.9:0.25} backgroundColor={"gray"} 
                                borderColor={"darkgray"} borderWidth={0.5}
                                pointerEvents={"auto"}
                                onPointerEnter={()=> {setHovered(true)}}
                                onPointerLeave={() => {setHovered(false)}}
                                onClick={()=> {setClicked(!clicked)}}
                                borderRadius={10} 
                                alignContent={"center"} justifyContent={"center"} 
                                positionTop={5} positionRight={5}>
                                <Text fontSize={12} color={"white"}>
                                    Test Scene
                                </Text>
                            </Container>
                        </Container>
                    </Container>

                    {/* The Test Body Container */}
                    <Container width={"100%"} height={inVR? "62%": "90%"} alignContent={"center"} justifyContent={"center"}>
                        <Container width={"50%"}
                            height={"75%"} 
                            borderWidth={2}
                            borderColor={"black"}
                            justifyContent={"center"}
                            alignContent={"center"}
                            display={clicked? "flex":"none"}>
                                {/* Items to be displayed in test scene will go here */}
                            <Text>
                                TEST BODY
                            </Text>
                        </Container>
                    </Container>
                </Container>
            </Fullscreen>
        </>
    )
} 