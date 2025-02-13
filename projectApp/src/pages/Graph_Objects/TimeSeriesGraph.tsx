//TODO
//The Time Series Graph That Will Be Displayed on the Scene
//Will require x, y positions and the number of rows
//More expected
import React, { useRef } from 'react';
import { Point2D } from './Point2D'; // Point2D file in the same directory
import { GraphClass } from "../../components/Graph_Components/GraphClass";
import { Canvas } from "@react-three/fiber"; // For the 3D canvas, since code will run on meta quest 3
import { PointClass } from '../../components/Graph_Components/PointClass';
import * as THREE from 'three';


/**
 * This class will handle creating and updating a 2D Time Series graph based on the GraphClass.
 */
export class TimeSeriesGraph {
  private scene: THREE.Scene;
  private graph: GraphClass;
  private pointsMesh: THREE.Group;

  /**
   * Constructs a new TimeSeriesGraph instance.
   * @param graph - The GraphClass instance (containts the points and other graph data)
   * @param scene - The THREE.Scene where the graph will be displayed.
   */
  constructor(graph: GraphClass, scene: THREE.Scene) {
    this.graph = graph;
    this.scene = scene;
    this.pointsMesh = new THREE.Group(); // holds all point meshes
    this.scene.add(this.pointsMesh);

    // Initialize the graph
    this.addGraphBackground();
    this.updateGraph();
  }

    /**
   * Square object for time series graph to represent the graph
   */
  private addGraphBackground(): void {
    const boxGeometry = new THREE.BoxGeometry(10, 10, 0.1); // A square grid box (flattened on the Z-axis)
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    this.scene.add(box); // Adds the box to the scene as the background for the graph
  }

  /**
   * Updates the graph visualization based on the current state of the GraphClass.
   * @param rows - The number of rows
   */
  public updateGraph(rows?: number): void {
    this.pointsMesh.clear();

    // Get the points from the GraphClass
    const points = this.graph.getPoints();

    // Calculate spacing to make it more organized?
    // const rowSpacing = rows ? 1 / rows : 0;

    // Create a "mesh" for each point
    points.forEach((pointRef, index) => {
      <Point2D key={index} pointRef={pointRef} /> // Use the Point2D component

      // Add the sphere to the points group
      this.pointsMesh.add(pointRef);
    });
  }

  /**
   * Clears the graph visualization.
   */
  public clearGraph(): void {
    this.pointsMesh.clear();
  }
}
