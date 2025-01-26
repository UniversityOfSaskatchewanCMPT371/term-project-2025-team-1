import { useEffect } from "react";
import { useThree } from '@react-three/fiber';

export default function windowsResizing(){
    const { camera, gl } = useThree();

    useEffect(() => { 
    /* This function is responsible for handling window resizing. 
    * When the user resizes the browser window, ensures that the scene's camera and renderer
    * adjusts to the new window dimensions.
    */
    const windowsResizing = () => {
        //camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        gl.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', windowsResizing);

    windowsResizing();

    return () => {
        window.removeEventListener('resize', windowsResizing);
    };
    }, [camera, gl]);

    return null;
};