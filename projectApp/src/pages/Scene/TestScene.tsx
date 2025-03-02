import { Container, Fullscreen } from "@react-three/uikit";
import { useState } from "react";

export default function TestScene(): React.JSX.Element{
    const [clicked, setClicked] = useState(false);

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
                    <Container width={"10%"} height={"10%"} backgroundOpacity={0.5} backgroundColor={"blue"} onClick={()=> setClicked(!clicked)}>

                    </Container>
                </Container>
            </Fullscreen>
        </>
    )
} 