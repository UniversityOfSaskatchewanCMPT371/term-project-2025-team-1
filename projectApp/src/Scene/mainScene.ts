import * as THREE from 'three';

export function mainScene({scene, camera, renderer, player, controllers}){
    const cubeGeometry = new THREE.BoxGeometry(1,1,1);
    const cubeMaterial = new THREE.MeshStandardMaterial({color: 'red'});
    const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    scene.add(cube);
    cube.position.set(-1.5, 0.5, -1.5);
    cube.rotateY(Math.PI / 4);
}

/*
* Just blank for now
*/
export function onFrame(
    delta,
    time,
    {scene, camera, renderer, player, controllers},
){

};