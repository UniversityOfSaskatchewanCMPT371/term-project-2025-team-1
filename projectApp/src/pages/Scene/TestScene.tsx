import { Container, Fullscreen, Text } from "@react-three/uikit";
import { useState } from "react";

export default function TestScene(): React.JSX.Element{
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    return(
        <>
        {/* Maybe fullscreen component stay displaying, but the container can chang visibility, so theres always that fullscreen button top left */}
            <Fullscreen flexDirection={"row"}>
                {/* Main Container that encapsulates Test Scene */}
                <Container width={"100%"} height={"100%"} backgroundColor={"purple"} backgroundOpacity={clicked? 0.5:0.01}>
                    <Container width={"10%"} backgroundOpacity={0.5}>

                    </Container>

                    {/* Body */}
                    <Container width={"80%"}>
                        <Container width={"100%"} backgroundOpacity={0.5} backgroundColor={"purple"} display={clicked? "flex" : "none"}>

                        </Container>
                    </Container>

                    {/* Button to open Test Scene */}
                    <Container 
                        width={"10%"} height={"5%"} 
                        backgroundOpacity={hovered? 0.9:0.25} backgroundColor={"gray"} 
                        borderColor={"darkgray"} borderWidth={0.5}
                        onPointerEnter={()=>setHovered(true)}
                        onPointerLeave={() => setHovered(false)}
                        onClick={()=> setClicked(!clicked)}
                        borderRadius={10} 
                        alignContent={"center"} justifyContent={"center"} 
                        positionTop={5} positionRight={5}>
                            <Text fontSize={12} color={"white"}>
                                Test Scene
                            </Text>
                    </Container>
                </Container>
            </Fullscreen>
        </>
    )
} 