import { describe, it, expect } from 'vitest';
import { GraphClass } from './GraphClass'; 
import { PointRef } from '../../types/PointInterface';
import { GraphInterface } from '../../types/GraphInterface';

// Mock data for testing
describe('GraphClass', () => {
  const mockGraphData: GraphInterface = {
      id: 'graph1',
      type: '2D',
      title: 'Test Graph',
      dimensions: { width: 500, height: 400 },
      points: [],
      position: { x: 0, y: 0 },
      axes: {
          xLabel: 'X-Axis',
          yLabel: 'Y-Axis',
          xRange: [0, 10],
          yRange: [0, 10],
      },
      style: { backgroundColor: 'white' },
      interactivity: { isSelectable: true, isDraggable: true, isZoomable: true },
      metadata: { dataSource: 'test', lastUpdated: new Date() },
      getId: function (): string {
          throw new Error('Function not implemented.');
      },
      setId: function (id: string): void {
          throw new Error('Function not implemented.');
      },
      getType: function (): '2D' | '3D' {
          throw new Error('Function not implemented.');
      },
      setType: function (type: '2D' | '3D'): void {
          throw new Error('Function not implemented.');
      },
      getTitle: function (): string | undefined {
          throw new Error('Function not implemented.');
      },
      setTitle: function (title: string): void {
          throw new Error('Function not implemented.');
      },
      getDimensions: function (): { width: number; height: number; depth?: number; } {
          throw new Error('Function not implemented.');
      },
      setDimensions: function (width: number, height: number, depth?: number): void {
          throw new Error('Function not implemented.');
      },
      getPosition: function (): { x: number; y: number; z?: number; } {
          throw new Error('Function not implemented.');
      },
      setPosition: function (x: number, y: number, z?: number): void {
          throw new Error('Function not implemented.');
      },
      getPoints: function (): PointRef[] {
          throw new Error('Function not implemented.');
      },
      setPoints: function (points: PointRef[]): void {
          throw new Error('Function not implemented.');
      },
      addPoint: function (point: PointRef): void {
          throw new Error('Function not implemented.');
      },
      removePoint: function (point: PointRef): void {
          throw new Error('Function not implemented.');
      },
      clearPoints: function (): void {
          throw new Error('Function not implemented.');
      },
      getAxes: function (): { xLabel: string; yLabel: string; zLabel?: string; xRange: [number, number]; yRange: [number, number]; zRange?: [number, number]; } {
          throw new Error('Function not implemented.');
      },
      setAxes: function (axes: { xLabel: string; yLabel: string; zLabel?: string; xRange: [number, number]; yRange: [number, number]; zRange?: [number, number]; }): void {
          throw new Error('Function not implemented.');
      },
      setAxisLabel: function (axis: 'x' | 'y' | 'z', label: string): void {
          throw new Error('Function not implemented.');
      },
      setAxisRange: function (axis: 'x' | 'y' | 'z', range: [number, number]): void {
          throw new Error('Function not implemented.');
      },
      getStyle: function (): { backgroundColor?: string; gridColor?: string; pointColor?: string; lineColor?: string; fontFamily?: string; } | undefined {
          throw new Error('Function not implemented.');
      },
      setStyle: function (style: { backgroundColor?: string; gridColor?: string; pointColor?: string; lineColor?: string; fontFamily?: string; }): void {
          throw new Error('Function not implemented.');
      },
      getInteractivity: function (): { isSelectable: boolean; isDraggable: boolean; isZoomable: boolean; isRotatable?: boolean; } | undefined {
          throw new Error('Function not implemented.');
      },
      setInteractivity: function (settings: { isSelectable: boolean; isDraggable: boolean; isZoomable: boolean; isRotatable?: boolean; }): void {
          throw new Error('Function not implemented.');
      },
      getMetadata: function (): { dataSource?: string; lastUpdated?: Date; description?: string; } | undefined {
          throw new Error('Function not implemented.');
      },
      setMetadata: function (metadata: { dataSource?: string; lastUpdated?: Date; description?: string; }): void {
          throw new Error('Function not implemented.');
      },
      updateMetadata: function (updates: Partial<{ dataSource: string; lastUpdated: Date; description: string; }>): void {
          throw new Error('Function not implemented.');
      },
      setOnPointSelect: function (handler: (point: PointRef) => void): void {
          throw new Error('Function not implemented.');
      }
  };

// Test cases for GraphClass methods and properties
// Initialize graph with mock data
  it('should initialize correctly', () => {
    const graph = new GraphClass(mockGraphData);
    expect(graph.getId()).toBe('graph1');
    expect(graph.getType()).toBe('2D');
    expect(graph.getTitle()).toBe('Test Graph');
    expect(graph.getDimensions()).toEqual({ width: 500, height: 400 });
    expect(graph.getPosition()).toEqual({ x: 0, y: 0 });
    expect(graph.getAxes()).toEqual(mockGraphData.axes);
    expect(graph.getStyle()).toEqual(mockGraphData.style);
    expect(graph.getInteractivity()).toEqual(mockGraphData.interactivity);
    expect(graph.getMetadata()).toEqual(mockGraphData.metadata);
  });

//   Test cases for GraphClass set properties  
  it('should set and get properties correctly', () => {
    const graph = new GraphClass(mockGraphData);
    graph.setId('graph2');
    expect(graph.getId()).toBe('graph2');

    graph.setType('3D');
    expect(graph.getType()).toBe('3D');

    graph.setTitle('New Title');
    expect(graph.getTitle()).toBe('New Title');
  });

//   Test cases for GraphClass dimensions
    it('should update dimensions correctly', () => {
        const graph = new GraphClass(mockGraphData);
        graph.setDimensions(800, 600);
        expect(graph.getDimensions()).toEqual({ width: 800, height: 600 });
    });


// //   Test cases for GraphClass points management, 
//     it('should manage points correctly', () => {
//         const graph = new GraphClass(mockGraphData);
//         const point: PointRef = { id: 'point1', x: 5, y: 5 };
//         graph.addPoint(point);
//         expect(graph.getPoints()).toContain(point);

//         graph.removePoint(point);
//         expect(graph.getPoints()).not.toContain(point);

//         graph.clearPoints();
//         expect(graph.getPoints()).toEqual([]);
//     });

//  Test cases for GraphClass update poisition
  it('should update position correctly', () => {
    const graph = new GraphClass(mockGraphData);
    graph.setPosition(10, 20, 30);
    expect(graph.getPosition()).toEqual({ x: 10, y: 20, z: 30 });
  });

//   Test cases for GraphClass axes labels and ranges
  it('should manage axes labels and ranges correctly', () => {
    const graph = new GraphClass(mockGraphData);
    graph.setAxisLabel('x', 'New X');
    expect(graph.getAxes().xLabel).toBe('New X');

    graph.setAxisRange('y', [5, 15]);
    expect(graph.getAxes().yRange).toEqual([5, 15]);
  });

//   Test cases for GraphClass metadata
  it('should update metadata correctly', () => {
    const graph = new GraphClass(mockGraphData);
    graph.updateMetadata({ description: 'Updated description' });
    expect(graph.getMetadata()?.description).toBe('Updated description');
  });

//   Test cases for GraphClass onPointSelect handler
    it('should set onPointSelect handler correctly', () => {
        const graph = new GraphClass(mockGraphData);
        const handler = (point: PointRef) => console.log(point);
        graph.setOnPointSelect(handler);
        expect(graph.onPointSelect).toBe(handler);
    });
});
