import * as THREE from 'three';

export function mainScene({scene, camera, renderer, player, controllers}){
    const boardBorderGeometry = new THREE.BoxGeometry(16.5,11.5,1);
    const boardBorderMaterial = new THREE.MeshStandardMaterial({color: 'darkslategray'});
    const boardBorder = new THREE.Mesh(boardBorderGeometry,boardBorderMaterial);
    scene.add(boardBorder);
    boardBorder.position.set(0, 2, -15.05);

    const frontBoardGeometry = new THREE.BoxGeometry(15,10,1);
    const frontBoardMaterial = new THREE.MeshStandardMaterial({color: 'dimgray'});
    const frontBoard = new THREE.Mesh(frontBoardGeometry,frontBoardMaterial);
    scene.add(frontBoard);
    frontBoard.position.set(0, 2, -15.0);
    
    const floorGeometry = new THREE.BoxGeometry(15, 1, 15);
    const floorMaterial = new THREE.MeshStandardMaterial({color:'darkslategray'});
    const floor = new THREE.Mesh(floorGeometry,floorMaterial);
    scene.add(floor);
    floor.position.set(0,-1,0);
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