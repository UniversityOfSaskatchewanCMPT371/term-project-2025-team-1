import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { useFrame, useThree } from '@react-three/fiber';
import MainScene from './MainScene';

//Starting scene
export default function InitScene(){
    const { camera, scene, gl, clock } = useThree();
    //const player = useRef<THREE.Object3DEventMap | null>(null);
    const [controllers, setControllers] = useState<{ [ key: string]: any}>({
        left: null,
        right: null,
    });

    useEffect(() => {
        const startScene = async () => {
            const environment = new RoomEnvironment();
            const pmremGenerator = new THREE.PMREMGenerator(gl);
            scene.environment = pmremGenerator.fromScene(environment).texture;
        };
        startScene();

       // return () => {

       // }
    }, [gl,scene]);

    //This code is for updating the controls and looping animation
    //Again might not need!
    useFrame(() => {
            Object.values(controllers).forEach((controller) => {
                const delta = clock.getDelta();
                const time = clock.getElapsedTime()
                if(controller?.gamepad){
                    controllers.gamepad.update();
                }
            });
            gl.render(scene, camera);
        
    });
    

    return (
        <>
        <OrbitControls />
        <MainScene></MainScene>
        </>
    )
    
};
