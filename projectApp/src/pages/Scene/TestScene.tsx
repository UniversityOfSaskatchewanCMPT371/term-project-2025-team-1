import { Container, Fullscreen } from "@react-three/uikit";
import { useState } from "react";

export default function TestScene(): React.JSX.Element{
    const [clicked, setClicked] = useState(false);

    return(
        <>
        {/* Maybe fullscreen component stay displaying, but the container can chang visibility, so theres always that fullscreen button top left */}
            <Fullscreen flexDirection={"row"} display={clicked? "flex" : "none"}>
                <Container flexGrow={1} backgroundOpacity={0.5} backgroundColor={"red"} onClick={()=> setClicked(!clicked)}>

                </Container>
                <Container flexGrow={1} backgroundOpacity={0.5} backgroundColor={"blue"}>

                </Container>
            </Fullscreen>
        </>
    )
} 