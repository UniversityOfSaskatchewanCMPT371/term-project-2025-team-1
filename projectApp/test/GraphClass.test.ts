import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GraphObject } from '../src/components/Graph_Components/GraphObject';
import mainController from '../src/controller/MainController';
import { CSVDataObject } from '../src/components/Csv_Components/CSVDataObject';

// Mock the PointObject so that its constructor does not require any arguments.
// This prevents errors due to the constructor expecting a parameter (ref)
vi.mock('./PointObject', () => {
  return {
    PointObject: class {
      position: number[];
      selected: boolean;
      xData: any;
      constructor(ref?: { position?: number[]; selected?: boolean; xData?: any }) {
        // replace || with ?? to avoid nullish coalescing error for linting
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

    // Verify id, position, and axes set by the constructor
    graph.setId('TestGraph');
    expect(graph.getId()).toBe('TestGraph');
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

  /**
   * Test: Error Handling for invalid ID and Name
   */
  it('throws error when setting invalid id', () => {
    const graph = new GraphObject(csvDataMock);
    expect(() => { graph.setId(""); }).toThrowError("ID must be a non-empty string.");
  });

  it('throws error when setting invalid name', () => {
    const graph = new GraphObject(csvDataMock);
    expect(() => { graph.setName(""); }).toThrowError("Name must be a non-empty string.");
  });

  /**
   * Test: Error Handling for invalid position
   */
  it('throws error when setting invalid position', () => {
    const graph = new GraphObject(csvDataMock);
    expect(() => { graph.setPosition("a" as unknown as number, 6, 7); }).toThrowError("Position coordinates must be numbers.");
    expect(() => { graph.setPosition(5, "b" as unknown as number, 7); }).toThrowError("Position coordinates must be numbers.");
    expect(() => {graph.setPosition(5, 6, "c" as unknown as number); }).toThrowError("Position coordinates must be numbers.");
  });

  /**
   * Test: Error Handling for invalid axes configuration
   */
  it('throws error when setting invalid axes', () => {
    const graph = new GraphObject(csvDataMock);
    const invalidAxes1 = { xLabel: "", yLabel: "Y", xRange: [0, 10] as [number, number], yRange: [0, 10] as [number, number] };
    expect(() => { graph.setAxes(invalidAxes1); }).toThrowError("Invalid xLabel: must be a non-empty string");

    const invalidAxes2 = { xLabel: "X", yLabel: "", xRange: [0, 10] as [number, number], yRange: [0, 10] as [number, number] };
    expect(() => { graph.setAxes(invalidAxes2); }).toThrowError("Invalid yLabel: must be a non-empty string");
  });

  /**
   * Test: Error Handling for invalid points array
   */
  it('throws error when setting invalid points array', () => {
    const graph = new GraphObject(csvDataMock);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(() => { graph.setPoints(null as unknown as any[]); }).toThrowError("Invalid points: must be an array of PointClass instances");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(() => { graph.setPoints([{}] as unknown as any[]); }).toThrowError("Invalid point: each element must be an instance of PointClass");
  });

  
  
});
