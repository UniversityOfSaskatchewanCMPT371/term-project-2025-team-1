import { describe, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { GraphController } from "../../src/controller/GraphController";
import { GraphModel } from "../../src/models/GraphModel";
import { TimeSeriesGraphObject } from "../../src/components/Graph_Components/TimeSeriesGraphObject";
import { CSVDataObject } from "../../src/components/Csv_Components/CSVDataObject";
import { EmbeddedGraphObject } from "../../src/components/Graph_Components/EmbeddedGraphObject";

// mocking CSVDataObject, TimeSeriesGraphObject, and EmbeddedGraphObject
vi.mock("../../src/components/Csv_Components/CSVDataObject", async () => {
  const actual = await vi.importActual<
    typeof import("../../src/components/Csv_Components/CSVDataObject")
  >("../../src/components/Csv_Components/CSVDataObject");
  return {
    ...actual,
    CSVDataObject: class extends actual.CSVDataObject {
      // implement any overrides
    },
  };
});

vi.mock(
  "../../src/components/Graph_Components/TimeSeriesGraphObject",
  async () => {
    const actual = await vi.importActual<
      typeof import("../../src/components/Graph_Components/TimeSeriesGraphObject")
    >("../../src/components/Graph_Components/TimeSeriesGraphObject");
    return {
      ...actual,
      TimeSeriesGraphObject: class extends actual.TimeSeriesGraphObject {
        // implement any overrides
      },
    };
  },
);

vi.mock(
  "../../src/components/Graph_Components/EmbeddedGraphObject",
  async () => {
    const actual = await vi.importActual<
      typeof import("../../src/components/Graph_Components/EmbeddedGraphObject")
    >("../../src/components/Graph_Components/EmbeddedGraphObject");
    return {
      ...actual,
      EmbeddedGraphObject: class extends actual.EmbeddedGraphObject {
        // implement any overrides
      },
    };
  },
);

describe("Tests for methods in GraphController", () => {
  let gc: GraphController; // is reset before each test
  let tsgo: TimeSeriesGraphObject; // is set before all
  let ego: EmbeddedGraphObject; // is set before all

  beforeAll(() => {
    const csv = new CSVDataObject();
    const data = [
      { Time: 10, A: 2, B: 3 },
      { Time: 20, A: 4, B: 5 },
      { Time: 30, A: 7, B: 8 },
    ] as unknown as { key: Record<string, string | number> }[];
    csv.setData(data);
    csv.csvHeaders = Object.keys(data[0]);
    csv.setYHeader("A");
    tsgo = new TimeSeriesGraphObject(csv);
    ego = new EmbeddedGraphObject(csv);
  });

  beforeEach(() => {
    gc = new GraphController();
  });

  test("GraphController constructor initializes correctly", () => {
    expect(gc.getModel()).toBeInstanceOf(GraphModel); // model must be valid
  });

  test("pushDataToModel sets the data in the model", () => {
    gc.pushDataToModel(tsgo, ego);
    // expect equality using gc.getModel get data
    expect(gc.getModel().getData()).toBe(tsgo);
    expect(gc.getModel().getEmbeddedGraphData()).toBe(ego);
    // expect equality using gc get data
    expect(gc.getModelData()).toBe(tsgo);
    expect(gc.getModelEmData()).toBe(ego);
  });

  test("generateTimeSeriesGraph and generateEmbeddedGraph", () => {
    gc.pushDataToModel(tsgo, ego);

    const generatedTSGO = gc.generateTimeSeriesGraph();
    // expect it to not throw assertions or errors, and return a valud TSGO
    expect(generatedTSGO).toBeTruthy();

    const generatedEGO = gc.generateEmbeddedGraph();
    // expect it to not throw assertions or errors, and return a valud EGO
    expect(generatedEGO).toBeTruthy();
  });

  test("getEmbeddedRange", () => {
    gc.pushDataToModel(tsgo, ego);
    const range = gc.getEmbeddedRange();
    expect(range).toBe(10); // highest A value from mock
  });

  test("getTauForDropDown", () => {
    gc.pushDataToModel(tsgo, ego);
    const range = gc.getTauForDropDown();
    expect(range).toBe("1"); // default tau of 1 (string)
  });
});
