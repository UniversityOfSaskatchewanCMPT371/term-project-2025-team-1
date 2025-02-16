import { PointRef } from "../../types/PointInterface";
import { GraphInterface } from "../../types/GraphInterface";

/**
 * The GraphClass represents a graph structure that manages points, dimensions, styling, and interactivity.
 */
export class GraphClass implements GraphInterface {
  id: string;
  type: '2D' | '3D';
  title?: string;
  dimensions: { width: number; height: number; depth?: number };
  points: PointRef[];
  position: { x: number; y: number; z?: number };
  axes: {
    xLabel: string;
    yLabel: string;
    zLabel?: string;
    xRange: [number, number];
    yRange: [number, number];
    zRange?: [number, number];
  };
  style?: {
    backgroundColor?: string;
    gridColor?: string;
    pointColor?: string;
    lineColor?: string;
    fontFamily?: string;
  };
  interactivity?: {
    isSelectable: boolean;
    isDraggable: boolean;
    isZoomable: boolean;
    isRotatable?: boolean;
  };
  metadata?: {
    dataSource?: string;
    lastUpdated?: Date;
    description?: string;
  };
  onPointSelect?: (point: PointRef) => void;

  /**
   * Constructs a new GraphClass instance.
   * @param graphData - An object conforming to GraphInterface
   */
  constructor(graphData: GraphInterface) {
    this.id = graphData.id;
    this.type = graphData.type;
    this.title = graphData.title;
    this.dimensions = graphData.dimensions;
    this.points = graphData.points;
    this.position = graphData.position;
    this.axes = graphData.axes;
    this.style = graphData.style;
    this.interactivity = graphData.interactivity;
    this.metadata = graphData.metadata;
    this.onPointSelect = graphData.onPointSelect;
  }

   // These methods are placeholders and should be implemented as needed
  // Basic getters and setters
  getId(): string {
    return this.id;
  }
  setId(id: string): void {
    this.id = id;
  }

  getType(): '2D' | '3D' {
    return this.type;
  }
  setType(type: '2D' | '3D'): void {
    this.type = type;
  }

  getTitle(): string | undefined {
    return this.title;
  }
  setTitle(title: string): void {
    this.title = title;
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
  setPosition(x: number, y: number, z?: number): void {
    this.position = { x, y, z };
  }

  // Points management
  getPoints(): PointRef[] {
    return this.points;
  }
  setPoints(points: PointRef[]): void {
    this.points = points;
  }
  addPoint(point: PointRef): void {
    this.points.push(point);
  }
  removePoint(point: PointRef): void {
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
    zLabel?: string;
    xRange: [number, number];
    yRange: [number, number];
    zRange?: [number, number];
  } {
    return this.axes;
  }
  setAxes(axes: {
    xLabel: string;
    yLabel: string;
    zLabel?: string;
    xRange: [number, number];
    yRange: [number, number];
    zRange?: [number, number];
  }): void {
    this.axes = axes;
  }
  setAxisLabel(axis: 'x' | 'y' | 'z', label: string): void {
    if (axis === 'x') {
      this.axes.xLabel = label;
    } else if (axis === 'y') {
      this.axes.yLabel = label;
    } else if (this.axes.zLabel !== undefined) {
      this.axes.zLabel = label;
    }
  }
  setAxisRange(axis: 'x' | 'y' | 'z', range: [number, number]): void {
    if (axis === 'x') {
      this.axes.xRange = range;
    } else if (axis === 'y') {
      this.axes.yRange = range;
    } else if (this.axes.zLabel !== undefined) {
      this.axes.zRange = range;
    }
  }

  // Style management
  getStyle():
    | {
        backgroundColor?: string;
        gridColor?: string;
        pointColor?: string;
        lineColor?: string;
        fontFamily?: string;
      }
    | undefined {
    return this.style;
  }
  setStyle(style: {
    backgroundColor?: string;
    gridColor?: string;
    pointColor?: string;
    lineColor?: string;
    fontFamily?: string;
  }): void {
    this.style = style;
  }

  // Interactivity management
  getInteractivity():
    | { isSelectable: boolean; isDraggable: boolean; isZoomable: boolean; isRotatable?: boolean }
    | undefined {
    return this.interactivity;
  }
  setInteractivity(settings: {
    isSelectable: boolean;
    isDraggable: boolean;
    isZoomable: boolean;
    isRotatable?: boolean;
  }): void {
    this.interactivity = settings;
  }

  // Metadata management
  getMetadata():
    | { dataSource?: string; lastUpdated?: Date; description?: string }
    | undefined {
    return this.metadata;
  }
  setMetadata(metadata: { dataSource?: string; lastUpdated?: Date; description?: string }): void {
    this.metadata = metadata;
  }
  updateMetadata(updates: Partial<{ dataSource: string; lastUpdated: Date; description: string }>): void {
    if (!this.metadata) {
      this.metadata = {};
    }
    this.metadata = { ...this.metadata, ...updates };
  }

  // Event handler
  setOnPointSelect(handler: (point: PointRef) => void): void {
    this.onPointSelect = handler;
  }
}
