import { describe, it, expect, beforeEach, vi } from "vitest";
import { GraphObject } from "../../src/components/Graph_Components/GraphObject";
import mainController from "../../src/controller/MainController";
import { CSVDataObject } from "../../src/components/Csv_Components/CSVDataObject";

// Mock the PointObject so that its constructor does not require any arguments.
// This prevents errors due to the constructor expecting a parameter (ref)
vi.mock("./PointObject", () => {
  return {
    PointObject: class {
      position: number[];
      selected: boolean;
      xData: any;
      constructor(ref?: {
        position?: number[];
        selected?: boolean;
        xData?: any;
      }) {
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
describe("GraphObject", async () => {
  let csvDataMock: CSVDataObject;
  const url =
    "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv";
  await mainController.getCSVController().loadURLFile(url);
  beforeEach(() => {
    // Create a mock CSVDataObject
    csvDataMock = mainController.getCSVController().getModelData()!;
  });

  /**
   * Test: Initialization with CSVDataObject
   */

  it("initializes with correct properties from CSVDataObject", () => {
    const graph = new GraphObject(csvDataMock);

    // Verify id, position, and axes set by the constructor
    expect(graph.getPosition()).toEqual({ x: 1, y: 1, z: 0 });
    expect(graph.getAxes()).toEqual({
      xRange: [0, 0],
      yRange: [0, 0],
    });
  });

  /**
   * Test: Setting and Getting the ID, Dimensions, Position, and Axes
   */

  it("sets and gets the id correctly", () => {
    const graph = new GraphObject(csvDataMock);

    graph.setName("NewName");
    expect(graph.getName()).toBe("NewName");
  });

  it("sets and gets position correctly", () => {
    const graph = new GraphObject(csvDataMock);
    graph.setPosition(5, 6, 7);
    expect(graph.getPosition()).toEqual({ x: 5, y: 6, z: 7 });
  });

  it("sets and gets axes correctly", () => {
    const graph = new GraphObject(csvDataMock);
    const newAxes = {
      xLabel: "NewX",
      yLabel: "NewY",
      xRange: [10, 20] as [number, number],
      yRange: [30, 40] as [number, number],
    };
    graph.setAxes(newAxes);
    expect(graph.getAxes()).toEqual(newAxes);
  });

  /**
   * Test: Error Handling for invalid ID and Name
   */
  it("throws error when setting invalid name", () => {
    const graph = new GraphObject(csvDataMock);
    expect(() => {
      graph.setName("");
    }).toThrowError("Invalid Name");
  });

  /**
   * Test: Error Handling for invalid position
   */
  it("throws error when setting invalid position", () => {
    const graph = new GraphObject(csvDataMock);
    expect(() => {
      graph.setPosition("a" as unknown as number, 6, 7);
    }).toThrowError("Invalid Positions");
    expect(() => {
      graph.setPosition(5, "b" as unknown as number, 7);
    }).toThrowError("Invalid Positions");
    expect(() => {
      graph.setPosition(5, 6, "c" as unknown as number);
    }).toThrowError("Invalid Positions");
  });

  /**
   * Test: Error Handling for invalid axes configuration
   */
  it("throws error when setting invalid axes", () => {
    const graph = new GraphObject(csvDataMock);
    const invalidAxes1 = {
      xRange: [10, 0] as [number, number],
      yRange: [0, 10] as [number, number],
    };
    expect(() => {
      graph.setAxes(invalidAxes1);
    }).toThrowError("Invalid x axis range");

    const invalidAxes2 = {
      xRange: [0, 10] as [number, number],
      yRange: [10, 0] as [number, number],
    };
    expect(() => {
      graph.setAxes(invalidAxes2);
    }).toThrowError("Invalid y axis range");
  });

  /**
   * Test: Error Handling for invalid points array
   */
  it("throws error when setting invalid points array", () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      csvDataMock.setPoints(null as unknown as any[]);
    }).toThrowError("Invalid Points");
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      csvDataMock.setPoints([{}] as unknown as any[]);
    }).toThrowError("Invalid points");
  });
});
