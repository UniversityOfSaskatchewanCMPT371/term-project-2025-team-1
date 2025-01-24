import * as THREE from 'three';

import { mainScene, onFrame } from './mainScene';
import { GamepadWrapper } from 'gamepad-wrapper';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';

export async function startScene(){
    const container = document.createElement('div');
    document.body.appendChild(container);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080);

    const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        100,
    );
    camera.position.set(0, 1.6, 3);

    const controls = new OrbitControls(camera, container);
    controls.target.set(0, 1.6, 0);
    controls.update();

    const renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    const environment = new RoomEnvironment();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(environment).texture;

    //Creating the player model and adding it to the scene
    const player = new THREE.Group();
    scene.add(player);
    player.add(camera);

    const controllerModelFactory = new XRControllerModelFactory();
    const controllers = {
        left: null,
        right: null,
    }

    //Initializing controller models for left and right hand
    for(var i = 0; i < 2; i++){
        const raySpace = renderer.xr.getController(i);
        const gripSpace = renderer.xr.getControllerGrip(i);
        const mesh = controllerModelFactory.createControllerModel(gripSpace);

        gripSpace.add(mesh);
        player.add(raySpace, gripSpace);
        raySpace.visible = false;
        gripSpace.visible = false;

        gripSpace.addEventListener('connected', (e) => {
            raySpace.visible = true;
            gripSpace.visible = true;
            const handedness =e.data.handedness;

            controllers[handedness] = {
                raySpace,
                gripSpace,
                mesh,
                gamepad: new GamepadWrapper(e.data.gamepad),
            };
        });

        gripSpace.addEventListener('disconnected', (e) => {
            raySpace.visible = false;
            gripSpace.visible = false;
            const handedness = e.data.handedness;

            controllers[handedness] = null;
        });
    };

    const globals = {
        scene,
        camera,
        renderer,
        player,
        controllers,
    };
    mainScene(globals);

    function windowsResizing(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', windowsResizing);

    const clock = new THREE.Clock();
    
    function animationLoop(){
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();
    
        Object.values(controllers).forEach((controller) => {
            if(controller?.gamepad) {
                controller.gamepad.update();
            }
        });
        onFrame(delta, time, globals);
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animationLoop);

    document.body.appendChild(VRButton.createButton(renderer));
}