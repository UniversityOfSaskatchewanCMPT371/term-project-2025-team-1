//TODO
//The Time Series Graph That Will Be Displayed on the Scene
//Will require x, y positions and the number of rows
//More expected
import React, { useRef } from 'react';
import { Point2D } from './Point2D'; // Point2D file in the same directory
import { GraphClass } from "../../components/Graph_Components/GraphClass"; // GraphClass file isn't currently in the same direction
import { Canvas } from "@react-three/fiber"; // For the 3D canvas, since code will run on meta quest 3
import { PointClass } from '../../components/Graph_Components/PointClass';
import * as THREE from 'three';


export class TimeSeriesGraph {
  private scene: THREE.Scene;
  private graph: GraphClass;
  private pointsMesh: THREE.Group;

  constructor(graph: GraphClass, scene: THREE.Scene) {
    this.graph = graph;
    this.scene = scene;
    this.pointsMesh = new THREE.Group();
    this.scene.add(this.pointsMesh);
    this.updateGraph();
  }

  public updateGraph(rows?: number): void {
    this.pointsMesh.clear();
    const points = this.graph.getPoints();
    points.forEach((pointRef, index) => {
      const point = pointRef.getPoint();
      const x = point.x;
      const y = point.y;
      const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(x, y, 0);
      this.pointsMesh.add(sphere);
    });
  }

  public clearGraph(): void {
    this.pointsMesh.clear();
  }
}
