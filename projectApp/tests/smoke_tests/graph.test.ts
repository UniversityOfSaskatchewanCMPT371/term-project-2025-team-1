import { describe, test, beforeAll, expect } from "vitest";
import "../../src/controller/MainController";
import mainController from "../../src/controller/MainController";

const mainBranchUrl =
  "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID4/csvTestFiles";
const indexedDataUrl = `${mainBranchUrl}/indexedData.csv`;

describe("Test that graph objects are properly created", () => {
  // Before any of the tests are run, load a URL CSV file and generate a graph
  beforeAll(async () => {
    await mainController.getCSVController().loadURLFile(indexedDataUrl);
    mainController.getCSVController().generate(1, false);
  });
  test("expect Time Series graph model to contain a 10 point graph", () => {
    // Get the Time Series model and check that 10 points are generated
    const graphm = mainController.getGraphController().getModel();
    expect(graphm.getData()?.getNumPoints()).toBe(10);
  });
  test("expect Embedded graph model to contain a 10 point graph", () => {
    // Get the Embedded model and check that 10 points are generated
    const graphm = mainController.getGraphController().getModel();
    expect(graphm.getEmbeddedGraphData()?.getPoints3D().length).toBe(10);
  });
  test("expect correct Time Series Graph points to be calculated", () => {
    // Test each x and y point individually after getting each point object
    const graphm = mainController.getGraphController().getModel();
    const points = graphm.getData()?.get2DPoints();
    if (points) {
      expect(points[0].getObject().getTimeData()).toBe("0");
      expect(points[0].getObject().getYData()).toBe(1);
      expect(points[1].getObject().getTimeData()).toBe("1");
      expect(points[1].getObject().getYData()).toBe(2);
      expect(points[2].getObject().getTimeData()).toBe("2");
      expect(points[2].getObject().getYData()).toBe(3);
      expect(points[3].getObject().getTimeData()).toBe("3");
      expect(points[3].getObject().getYData()).toBe(4);
      expect(points[4].getObject().getTimeData()).toBe("4");
      expect(points[4].getObject().getYData()).toBe(5);
      expect(points[5].getObject().getTimeData()).toBe("5");
      expect(points[5].getObject().getYData()).toBe(6);
      expect(points[6].getObject().getTimeData()).toBe("6");
      expect(points[6].getObject().getYData()).toBe(7);
      expect(points[7].getObject().getTimeData()).toBe("7");
      expect(points[7].getObject().getYData()).toBe(8);
      expect(points[8].getObject().getTimeData()).toBe("8");
      expect(points[8].getObject().getYData()).toBe(9);
      expect(points[9].getObject().getTimeData()).toBe("9");
      expect(points[9].getObject().getYData()).toBe(10);
    }
  });
  test("expect correct Embedded Graph points to be calculated", () => {
    // Test each x and y point individually after getting each point object
    const graphm = mainController.getGraphController().getModel();
    const points = graphm.getEmbeddedGraphData()?.getPoints3D();
    if (points) {
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
    }
  });
  test("expect correct Time Series range", () => {
    const graphm = mainController.getGraphController().getModel();
    const graphaxes = graphm.getData()?.getMaxYRange();
    expect(graphaxes).toBe(0);
    // Currently expect y range to be zero, waiting on future implementation
  });
});
