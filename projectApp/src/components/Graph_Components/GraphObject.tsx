import { GraphInterface } from "../../types/GraphInterface";
import { PointInterface } from "../../types/PointInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";

/**
 * The GraphObject represents a graph structure that manages points, dimensions, styling, and interactivity.
 */
export class GraphObject implements GraphInterface {
  id: string;
  name: string;
  csvData: CSVDataObject;
  dimensions: { width: number; height: number; depth?: number };
  points: PointInterface[];
  position: { x: number; y: number; z: number };
  axes: {
    xLabel: string;
    yLabel: string;
    xRange: [number, number];
    yRange: [number, number];
  }; 


  /**
   * Constructs a new GraphObject instance.
   * @param CSVDataObject - An object of the CSVDataObject class
   */
  constructor(csvdata: CSVDataObject) {
    this.id = csvdata.getName();
    this.name = csvdata.getName();
    this.csvData = csvdata;
    this.dimensions = { width: 10, height: 10, depth: 10 };
    this.points = [];
    this.position ={ x: 1, y: 1, z: 0 };
    this.axes = { 
      xLabel: csvdata.getTimeHeader(), // Time columne for x header
      yLabel: csvdata.getYHeader(), // Second column header
      xRange: [0, 0], //Default values
      yRange: [0, 0]  //Default values
  };
  }

  getId(): string {
    return this.id;
  }
  setId(id: string): void {
    this.id = id;
  }

  getName(): string{
      return this.name;
  }
  setName(title: string): void {
      this.name = title;
  }

  // Position getters and setters
  getPosition(): { x: number; y: number; z?: number } {
    return this.position;
  }
  setPosition(x: number, y: number, z: number): void {
    this.position = { x, y, z };
  }

  getPoints(): PointInterface[] {
    return this.points;
  }
  
  setPoints(points: PointInterface[]): void {
    this.points = points;
  }
  removePoint(point: PointInterface): void {
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
