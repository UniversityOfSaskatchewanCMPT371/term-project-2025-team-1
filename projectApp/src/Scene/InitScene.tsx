import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { GamepadWrapper } from 'gamepad-wrapper';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import MainScene from './MainScene';

//Starting scene
export default function InitScene(){
    const { camera, scene, gl } = useThree();
    const player = useRef<THREE.Object3D | null>(null);
    const [controllers, setControllers] = useState<{ [ key: string]: any}>({
        left: null,
        right: null,
    });

    useEffect(() => {
        const startScene = async () => {
            let nativeWebXRSupport = false;
            if(navigator.xr){
                nativeWebXRSupport = await navigator.xr.isSessionSupported('immersive-vr');
            }
            //document.body.appendChild(VRButton.createButton(gl));

            // if(player.current){
            //     player.current.add(camera);
            //      player.current.position.set(0, 1.6, 5);
            //      camera.position.set(player.current.position.x, player.current.position.y, player.current.position.z);
            //      camera.lookAt(player.current.position);
            // }

            //Background environment for the scene
            const environment = new RoomEnvironment();
            const pmremGenerator = new THREE.PMREMGenerator(gl);
            scene.environment = pmremGenerator.fromScene(environment).texture;

            //Setting the controller models for left and right controllers
            const controllerModelFactory = new XRControllerModelFactory();
            for(var i = 0; i < 2; i++){
                const raySpace = gl.xr.getController(i);
                const gripSpace = gl.xr.getControllerGrip(i);
                const mesh = controllerModelFactory.createControllerModel(gripSpace);
        
                gripSpace.add(mesh);
                scene.add(raySpace, gripSpace);
                raySpace.visible = false;
                gripSpace.visible = false;
        
                gripSpace.addEventListener('connected', (e: any) => {
                    raySpace.visible = true;
                    gripSpace.visible = true;
                    const handedness =e.data.handedness;
        
                    setControllers((controller) => ({
                        ...controller,[handedness]: {
                            raySpace,
                            gripSpace,
                            mesh,
                            gamepad: new GamepadWrapper(e.data.gamepad),
                        },
                    }));
                });
        
                gripSpace.addEventListener('disconnected', (e: any) => {
                    raySpace.visible = false;
                    gripSpace.visible = false;
                    const handedness = e.data.handedness;
        
                    setControllers((controller) => ({
                        ...controller,[handedness]: null,
                    }));
                });
            };
        };
        startScene();

        return () => {

        }
    }, [gl,scene, player.current]);

    useFrame(() => {
        const clock = new THREE.Clock();
        Object.values(controllers).forEach((controller) => {
            const delta = clock.getDelta();
            const time = clock.getElapsedTime()
            if(controller?.gamepad){
                controllers.gamepad.update();
            }
        });
        
    });
    

    return (
        <>
        <OrbitControls />
        <MainScene></MainScene>
        </>
    )
    
};