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

    // Verify axes set by the constructor
    expect(graph.getAxes()).toEqual({
      xRange: [0, 0],
      yRange: [0, 0],
    });
  });

  /**
   * Test: Setting and Getting the Axes
   */

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
    }).toThrowError("assert failed");

    const invalidAxes2 = {
      xRange: [0, 10] as [number, number],
      yRange: [10, 0] as [number, number],
    };
    expect(() => {
      graph.setAxes(invalidAxes2);
    }).toThrowError("assert failed");
  });

  /**
   * Test: Error Handling for invalid points array
   */
  it("throws error when setting invalid points array", () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      csvDataMock.setPoints(null as unknown as any[]);
    }).toThrowError("assert failed");
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      csvDataMock.setPoints([{}] as unknown as any[]);
    }).toThrowError("assert failed");
  });
});
