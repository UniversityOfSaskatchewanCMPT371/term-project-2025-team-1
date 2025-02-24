import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GraphClass } from '../src/components/Graph_Components/GraphClass';
import { CSVDataObject } from '../src/models/CSVDataObject';
import mainController from '../src/controller/MainController';

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

// Test Suite for GraphClass
describe('GraphClass', async () => {
  let csvDataMock: CSVDataObject;
  await mainController.getCSVController().getModel().readURLFile("https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv");
  beforeEach(() => {
    // Create a mock CSVDataObject
    csvDataMock = mainController.getCSVController().getModel().getData()[0];
  });

  /**
   * Test: Constructor Error Handling
   */
  it('throws error when constructed with invalid CSVDataObject', () => {
    expect(() => new GraphClass(null as unknown as CSVDataObject)).toThrowError("CSVDataObject is required to create a GraphClass instance.");
  });
  
  /**
   * Test: Initialization with CSVDataObject
   */

  it('initializes with correct properties from CSVDataObject', () => {
    const graph = new GraphClass(csvDataMock);

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
    const graph = new GraphClass(csvDataMock);
    graph.setId('NewGraphID');
    expect(graph.getId()).toBe('NewGraphID');

    graph.setName('NewName');
    expect(graph.getName()).toBe('NewName');
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
    const graph = new GraphClass(csvDataMock);
    expect(() => { graph.setId(""); }).toThrowError("ID must be a non-empty string.");
  });

  it('throws error when setting invalid name', () => {
    const graph = new GraphClass(csvDataMock);
    expect(() => { graph.setName(""); }).toThrowError("Name must be a non-empty string.");
  });

  /**
   * Test: Error Handling for invalid position
   */
  it('throws error when setting invalid position', () => {
    const graph = new GraphClass(csvDataMock);
    expect(() => { graph.setPosition("a" as unknown as number, 6, 7); }).toThrowError("Position coordinates must be numbers.");
    expect(() => { graph.setPosition(5, "b" as unknown as number, 7); }).toThrowError("Position coordinates must be numbers.");
    expect(() => {graph.setPosition(5, 6, "c" as unknown as number); }).toThrowError("Position coordinates must be numbers.");
  });

  /**
   * Test: Error Handling for invalid axes configuration
   */
  it('throws error when setting invalid axes', () => {
    const graph = new GraphClass(csvDataMock);
    const invalidAxes1 = { xLabel: "", yLabel: "Y", xRange: [0, 10] as [number, number], yRange: [0, 10] as [number, number] };
    expect(() => { graph.setAxes(invalidAxes1); }).toThrowError("Invalid xLabel: must be a non-empty string");

    const invalidAxes2 = { xLabel: "X", yLabel: "", xRange: [0, 10] as [number, number], yRange: [0, 10] as [number, number] };
    expect(() => { graph.setAxes(invalidAxes2); }).toThrowError("Invalid yLabel: must be a non-empty string");

    const invalidAxes3 = { xLabel: "X", yLabel: "Y", xRange: [10, 0] as [number, number], yRange: [0, 10] as [number, number] };
    expect(() => { graph.setAxes(invalidAxes3); }).toThrowError("Invalid xRange: must be an array of two numbers in non-decreasing order");

    const invalidAxes4 = { xLabel: "X", yLabel: "Y", xRange: [0, 10] as [number, number], yRange: [10, 0] as [number, number] };
    expect(() => { graph.setAxes(invalidAxes4); }).toThrowError("Invalid yRange: must be an array of two numbers in non-decreasing order");
  });

  /**
   * Test: Error Handling for invalid points array
   */
  it('throws error when setting invalid points array', () => {
    const graph = new GraphClass(csvDataMock);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(() => { graph.setPoints(null as unknown as any[]); }).toThrowError("Invalid points: must be an array of PointClass instances");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    expect(() => { graph.setPoints([{}] as unknown as any[]); }).toThrowError("Invalid point: each element must be an instance of PointClass");
  });

  
  
});
