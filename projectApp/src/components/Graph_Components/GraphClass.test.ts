import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GraphClass } from './GraphClass';
import { CSVDataObject } from '../../models/CSVDataObject';

// Mock the PointClass so that its constructor does not require any arguments.
// This prevents errors due to the constructor expecting a parameter (ref)
vi.mock('./PointClass', () => {
  return {
    PointClass: class {
      position: number[];
      selected: boolean;
      xData: any;
      constructor(ref?: { position?: number[]; selected?: boolean; xData?: any }) {
        // Provide default values if no ref is passed.
        this.position = ref?.position ?? [0, 0, 0];
        this.selected = ref?.selected ?? false;
        this.xData = ref?.xData ?? [];
      }
      setPosition(pos: number[]) {
        this.position = pos;
      }
    },
  };
});

// Test Suite for GraphClass
describe('GraphClass', () => {
  let csvDataMock: CSVDataObject;

  beforeEach(() => {
    // Create a mock CSVDataObject
    csvDataMock = {
      getName: vi.fn(() => 'TestGraph'),
      getCSVHeaders: vi.fn(() => ['X', 'Y']),
      getData: vi.fn(() => [1, 2, 3]) // simulate 3 rows of data to generate 3 points
    } as unknown as CSVDataObject;
  });

  /**
   * Test: Initialization with CSVDataObject
   */

  it('initializes with correct properties from CSVDataObject', () => {
    const graph = new GraphClass(csvDataMock);

    // Verify id, dimensions, position, and axes set by the constructor
    expect(graph.getId()).toBe('TestGraph');
    expect(graph.getDimensions()).toEqual({ width: 10, height: 10, depth: 10 });
    expect(graph.getPosition()).toEqual({ x: 1, y: 1, z: 0 });
    expect(graph.getAxes()).toEqual({
      xLabel: 'X',
      yLabel: 'Y',
      xRange: [0, 100],
      yRange: [0, 100],
    });

    // Verify that points were created for each element in the CSV data
    expect(graph.getPoints()).toHaveLength(3);
  });

  /**
   * Test: Setting and Getting the ID, Dimensions, Position, and Axes
   */

  it('sets and gets the id correctly', () => {
    const graph = new GraphClass(csvDataMock);
    graph.setId('NewGraphID');
    expect(graph.getId()).toBe('NewGraphID');
  });

  it('sets and gets dimensions correctly', () => {
    const graph = new GraphClass(csvDataMock);
    graph.setDimensions(20, 30, 40);
    expect(graph.getDimensions()).toEqual({ width: 20, height: 30, depth: 40 });
  });

  it('sets and gets position correctly', () => {
    const graph = new GraphClass(csvDataMock);
    graph.setPosition(5, 6, 7);
    expect(graph.getPosition()).toEqual({ x: 5, y: 6, z: 7 });
  });

  it('sets and gets axes correctly', () => {
    const graph = new GraphClass(csvDataMock);
    const newAxes = {
      xLabel: 'NewX',
      yLabel: 'NewY',
      xRange: [10, 20],
      yRange: [30, 40],
    };
    graph.setAxes(newAxes);
    expect(graph.getAxes()).toEqual(newAxes);
  });

  /**
   * Test: Managing Points
   */

//   it('manages points correctly', () => {
//     const graph = new GraphClass(csvDataMock);
//     // Import the mocked PointClass
//     const { PointClass } = require('./PointClass');
//     const newPoint = new PointClass();
//     newPoint.setPosition([10, 20, 30]);

//     // Add a point and verify it is added
//     graph.addPoint(newPoint);
//     expect(graph.getPoints()).toContain(newPoint);

//     // Remove the point and verify it is removed
//     graph.removePoint(newPoint);
//     expect(graph.getPoints()).not.toContain(newPoint);

//     // Clear points and verify the points array is empty
//     graph.clearPoints();
//     expect(graph.getPoints()).toHaveLength(0);
//   });

  
});
