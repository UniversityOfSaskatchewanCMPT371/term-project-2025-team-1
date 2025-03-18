import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { EmbeddedGraphObject } from "../../src/components/Graph_Components/EmbeddedGraphObject";
import mainController from "../../src/controller/MainController";

describe("Embedded Graph test", () => {
  let graph: EmbeddedGraphObject;
  // TODO - update url when file being used is in main
  const url =
    "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID3-3DGraph-VectorCalculation/csvTestFiles/indexedData.csv";

  beforeAll(async () => {
    await mainController.getCSVController().loadURLFile(url);
  });

  beforeEach(() => {
    const csv = mainController.getCSVController().getModelData()[0];
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
    expect(points[0].getPosition()).toStrictEqual([0.1, 0.1, 0]);
    expect(points[1].getPosition()).toStrictEqual([0.2, 0.2, 0]);
    expect(points[2].getPosition()).toStrictEqual([0.3, 0.3, 0.1]);
    expect(points[3].getPosition()).toStrictEqual([0.4, 0.4, 0.2]);
    expect(points[4].getPosition()).toStrictEqual([0.5, 0.5, 0.3]);
    expect(points[5].getPosition()).toStrictEqual([0.6, 0.6, 0.4]);
    expect(points[6].getPosition()).toStrictEqual([0.7, 0.7, 0.5]);
    expect(points[7].getPosition()).toStrictEqual([0.8, 0.8, 0.6]);
    expect(points[8].getPosition()).toStrictEqual([0.9, 0.9, 0.7]);
    expect(points[9].getPosition()).toStrictEqual([1, 1, 0.8]);
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
    expect(points[0].getPosition()).toStrictEqual([0.1, 0.1, 0]);
    expect(points[1].getPosition()).toStrictEqual([0.2, 0.2, 0]);
    expect(points[2].getPosition()).toStrictEqual([0.3, 0.3, 0.1]);
    expect(points[3].getPosition()).toStrictEqual([0.4, 0.4, 0.2]);
    expect(points[4].getPosition()).toStrictEqual([0.5, 0.5, 0.3]);
    expect(points[5].getPosition()).toStrictEqual([0.6, 0.6, 0.4]);
    expect(points[6].getPosition()).toStrictEqual([0.7, 0.7, 0.5]);
    expect(points[7].getPosition()).toStrictEqual([0.8, 0.8, 0.6]);
    expect(points[8].getPosition()).toStrictEqual([0.9, 0.9, 0.7]);
    expect(points[9].getPosition()).toStrictEqual([1, 1, 0.8]);
  });

  test("vector calculation with tao=2", () => {
    graph.getCSVData().populatePoints();
    graph.setTao(2);
    graph.addPoints();
    const points = graph.getPoints3D();
    expect(points[0].getPosition()).toStrictEqual([0.1, 0.1, 0]);
    expect(points[1].getPosition()).toStrictEqual([0.2, 0.2, 0]);
    expect(points[2].getPosition()).toStrictEqual([0.3, 0.3, 0]);
    expect(points[3].getPosition()).toStrictEqual([0.4, 0.4, 0]);
    expect(points[4].getPosition()).toStrictEqual([0.5, 0.5, 0.1]);
    expect(points[5].getPosition()).toStrictEqual([0.6, 0.6, 0.2]);
    expect(points[6].getPosition()).toStrictEqual([0.7, 0.7, 0.3]);
    expect(points[7].getPosition()).toStrictEqual([0.8, 0.8, 0.4]);
    expect(points[8].getPosition()).toStrictEqual([0.9, 0.9, 0.5]);
    expect(points[9].getPosition()).toStrictEqual([1, 1, 0.6]);
  });

  test("setting tao to an invalid value", () => {
    expect(() => {
      graph.setTao(-1);
    }).toThrowError("Tao must be greater than or equal to 1");
  });
});
