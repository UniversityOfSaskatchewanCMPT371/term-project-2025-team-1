import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GraphObject } from '../src/components/Graph_Components/GraphObject';
import { CSVDataObject } from '../src/models/CSVDataObject';
import mainController from '../src/controller/MainController';

// Mock the PointObject so that its constructor does not require any arguments.
// This prevents errors due to the constructor expecting a parameter (ref)
vi.mock('./PointObject', () => {
  return {
    PointObject: class {
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

// Test Suite for GraphObject
describe('GraphObject', async () => {
  let csvDataMock: CSVDataObject;
  const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv";
  await mainController.getCSVController().loadURLFile(url);
  beforeEach(() => {
    // Create a mock CSVDataObject
    csvDataMock = mainController.getCSVController().getModelData()[0];
  });

  /**
   * Test: Initialization with CSVDataObject
   */

  it('initializes with correct properties from CSVDataObject', () => {
    const graph = new GraphObject(csvDataMock);

    // Verify id, dimensions, position, and axes set by the constructor
    graph.setId('TestGraph');
    expect(graph.getId()).toBe('TestGraph');
    // expect(graph.getDimensions()).toEqual({ width: 10, height: 10, depth: 10 });
    expect(graph.getPosition()).toEqual({ x: 1, y: 1, z: 0 });
    expect(graph.getAxes()).toEqual({
      xLabel: 'Time',
      yLabel: 'X',
      xRange: [0, 0],
      yRange: [0, 0],
    });
  });

  /**
   * Test: Setting and Getting the ID, Dimensions, Position, and Axes
   */

  it('sets and gets the id correctly', () => {
    const graph = new GraphObject(csvDataMock);
    graph.setId('NewGraphID');
    expect(graph.getId()).toBe('NewGraphID');

    graph.setName('NewName');
    expect(graph.getName()).toBe('NewName');
  });

  it('sets and gets position correctly', () => {
    const graph = new GraphObject(csvDataMock);
    graph.setPosition(5, 6, 7);
    expect(graph.getPosition()).toEqual({ x: 5, y: 6, z: 7 });
  });

  it('sets and gets axes correctly', () => {
    const graph = new GraphObject(csvDataMock);
    const newAxes = {
      xLabel: 'NewX',
      yLabel: 'NewY',
      xRange: [10, 20] as [number,number],
      yRange: [30, 40] as [number,number],
    };
    graph.setAxes(newAxes);
    expect(graph.getAxes()).toEqual(newAxes);
  });
  
});
