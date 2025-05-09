import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { EmbeddedGraphObject } from "../../src/components/Graph_Components/EmbeddedGraphObject";
import mainController from "../../src/controller/MainController";

describe("Embedded Graph test", () => {
  let graph: EmbeddedGraphObject;
  // TODO - update url when file being used is in main
  const url =
    "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID4/csvTestFiles/indexedData.csv";
  beforeAll(async () => {
    await mainController.getCSVController().loadURLFile(url);
  });

  beforeEach(() => {
    const csv = mainController.getCSVController().getModelData()!;
    graph = new EmbeddedGraphObject(csv);
  });

  test("points get added to points array", () => {
    graph.getCSVData().populatePoints();
    graph.addPoints();
    expect(graph.getCSVData().getPoints().length).toBeGreaterThan(0);
  });
  // TODO - change data set names, when label isn't hardcoded
  test("vectors gets calculated correctly for X data set", () => {
    graph.getCSVData().populatePoints();
    graph.addPoints();
    const points = graph.getPoints3D();
    expect(points[0].getPosition()).toStrictEqual([1, 0, 0]);
    expect(points[1].getPosition()).toStrictEqual([2, 1, 0]);
    expect(points[2].getPosition()).toStrictEqual([3, 2, 1]);
    expect(points[3].getPosition()).toStrictEqual([4, 3, 2]);
    expect(points[4].getPosition()).toStrictEqual([5, 4, 3]);
    expect(points[5].getPosition()).toStrictEqual([6, 5, 4]);
    expect(points[6].getPosition()).toStrictEqual([7, 6, 5]);
    expect(points[7].getPosition()).toStrictEqual([8, 7, 6]);
    expect(points[8].getPosition()).toStrictEqual([9, 8, 7]);
    expect(points[9].getPosition()).toStrictEqual([10, 9, 8]);
  });

  test("vectors calculation for header row B", () => {
    const axes = graph.getAxes();
    const newAxes = {
      xLabel: graph.getCSVData().getTimeHeader(),
      yLabel: "B",
      xRange: axes.xRange,
      yRange: axes.yRange,
    };
    graph.setAxes(newAxes);

    graph.getCSVData().setYHeader("B");
    graph.getCSVData().populatePoints();
    graph.addPoints();
    const points = graph.getPoints3D();
    expect(points[0].getPosition()).toStrictEqual([2, 0, 0]);
    expect(points[1].getPosition()).toStrictEqual([4, 2, 0]);
    expect(points[2].getPosition()).toStrictEqual([6, 4, 2]);
    expect(points[3].getPosition()).toStrictEqual([8, 6, 4]);
    expect(points[4].getPosition()).toStrictEqual([10, 8, 6]);
    expect(points[5].getPosition()).toStrictEqual([12, 10, 8]);
    expect(points[6].getPosition()).toStrictEqual([14, 12, 10]);
    expect(points[7].getPosition()).toStrictEqual([16, 14, 12]);
    expect(points[8].getPosition()).toStrictEqual([18, 16, 14]);
    expect(points[9].getPosition()).toStrictEqual([20, 18, 16]);
  });

  test("vector calculation with tau=2", () => {
    graph.getCSVData().setYHeader("Some");
    graph.setTau(2);
    graph.addPoints();
    const points = graph.getPoints3D();
    expect(points[0].getPosition()).toStrictEqual([1, 0, 0]);
    expect(points[1].getPosition()).toStrictEqual([2, 0, 0]);
    expect(points[2].getPosition()).toStrictEqual([3, 1, 0]);
    expect(points[3].getPosition()).toStrictEqual([4, 2, 0]);
    expect(points[4].getPosition()).toStrictEqual([5, 3, 1]);
    expect(points[5].getPosition()).toStrictEqual([6, 4, 2]);
    expect(points[6].getPosition()).toStrictEqual([7, 5, 3]);
    expect(points[7].getPosition()).toStrictEqual([8, 6, 4]);
    expect(points[8].getPosition()).toStrictEqual([9, 7, 5]);
    expect(points[9].getPosition()).toStrictEqual([10, 8, 6]);
  });

  test("setting tau to an invalid value", () => {
    expect(() => {
      graph.setTau(-1);
    }).toThrowError("Tau must be greater than or equal to 1");
  });

  test("getTau returns current tau value", () => {
    graph.setTau(5);

    expect(graph.getTau()).toBe(5);
  });

  // test updatePoints() and addPoints()
  test("updating point selection status", () => {
    graph.getCSVData().populatePoints();
    graph.addPoints();

    graph.getPoints3D()[0].getObject().setSelected(true);
    graph.updatePoints();
    expect(graph.getPoints3D()[0].getObject().selected).toBe(false);
  });

  // Testing updateEmbeddedPoints()
  test("updateEmbeddedPoints recreates points array", () => {
    graph.addPoints();
    const originalPoints = graph.getPoints3D();

    graph.updateEmbeddedPoints();
    const newPoints = graph.getPoints3D();

    expect(newPoints).not.toBe(originalPoints); // Should be new array
    expect(newPoints.length).toBe(originalPoints.length);
  });

  test("testing if RangeError will be thrown when CSV data is empty", () => {
    // An empty array
    const originalGetData = graph.getCSVData().getData();
    graph.getCSVData().getData = () => [];

    expect(() => {
      graph.addPoints();
    }).toThrowError(RangeError);

    // Putting everything back
    graph.getCSVData().data = originalGetData;
  });

  // Testing getRange()
  test("returns yRange[1] if valid else, throws error", () => {
    // Test valid range return
    graph.getAxes().yRange = [1, 10];
    expect(graph.getMaxRange()).toBe(10);

    // Test different valid value
    graph.getAxes().yRange = [5, 100];
    expect(graph.getMaxRange()).toBe(100);
  });

  test("setting time to a negative value", () => {
    expect(() => {
      graph.calculateVectorPosition(-1, [
        {
          key: {},
        },
      ]);
    }).toThrowError("time must be >= 0");
  });

  test("getPoints3D throws error when empty", () => {
    graph.points3D = [];
    expect(() => graph.getPoints3D()).toThrow();
  });
});
