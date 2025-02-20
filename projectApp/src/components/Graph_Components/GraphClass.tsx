import { PointClass } from "./PointClass";
import { CSVDataObject } from "../../models/CSVDataObject";
import { GraphInterface } from "../../types/GraphInterface";

/**
 * The GraphClass represents a graph structure that manages points, dimensions, styling, and interactivity.
 */
export class GraphClass implements GraphInterface {
  id: string;
  dimensions: { width: number; height: number; depth?: number };
  points: PointClass[];
  position: { x: number; y: number; z: number };
  axes: {
    xLabel: string;
    yLabel: string;
    xRange: [number, number];
    yRange: [number, number];
  };


  /**
   * Constructs a new GraphClass instance.
   * @param CSVDataObject - An object of the CSVDataObject class
   */
  constructor(csvdata: CSVDataObject ) {
    this.id = csvdata.getName();
    this.dimensions = { width: 10, height: 10, depth: 10 };
    this.points = [];
    this.position ={ x: 1, y: 1, z: 0 };
    this.axes = { 
      xLabel: csvdata.getCSVHeaders()[0], // First column header
      yLabel: csvdata.getCSVHeaders()[1], // Second column header
      xRange: [0, 100], //Default values
      yRange: [0, 100]  //Default values
  };
  csvdata.getData().forEach(() => {
    const newPoint = new PointClass();
    newPoint.setPosition([0,0,0.01])
    this.points.push(newPoint);
})

  }

  getId(): string {
    return this.id;
  }
  setId(id: string): void {
    this.id = id;
  }

  // Dimension getters and setters
  getDimensions(): { width: number; height: number; depth?: number } {
    return this.dimensions;
  }
  setDimensions(width: number, height: number, depth?: number): void {
    this.dimensions = { width, height, depth };
  }

  // Position getters and setters
  getPosition(): { x: number; y: number; z?: number } {
    return this.position;
  }
  setPosition(x: number, y: number, z: number): void {
    this.position = { x, y, z };
  }

  getPoints(): PointClass[] {
    return this.points;
  }
  
  setPoints(points: PointClass[]): void {
    this.points = points;
  }
  addPoint(point: PointClass): void {
    this.points.push(point);
  }
  removePoint(point: PointClass): void {
    const index = this.points.indexOf(point);
    if (index !== -1) {
      this.points.splice(index, 1);
    }
  }
  clearPoints(): void {
    this.points = [];
  }

  // Axes management
  getAxes(): {
    xLabel: string;
    yLabel: string;
    xRange: [number, number];
    yRange: [number, number];
  } {
    return this.axes;
  }
  setAxes(axes: {
    xLabel: string;
    yLabel: string;
    xRange: [number, number];
    yRange: [number, number];
  }): void {
    this.axes = axes;
  }

}
