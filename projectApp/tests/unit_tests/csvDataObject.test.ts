import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import mainController from "../../src/controller/MainController";
import { PointObjectInterface } from "../../src/types/PointInterface";
import { PointObject } from "../../src/components/Graph_Components/Points/PointObject";

const mainBranchUrl =
  "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID4/csvTestFiles";
const indexedRealDataUrl = `${mainBranchUrl}/indexedRealData.csv`;

describe("testing csv data object stuff", () => {
  beforeAll(async () => {
    await mainController.getCSVController().loadURLFile(indexedRealDataUrl);
  });

  beforeEach(() => {
    const csvModelData = mainController.getCSVController().getModelData();
    csvModelData?.clearPoints();
    csvModelData?.setIsFirstDifferencing(false);
  });

  test("populating points without first differencing", () => {
    const csvModelData = mainController.getCSVController().getModelData();
    csvModelData?.populatePoints();
    const points = csvModelData?.getPoints();
    if (points) {
      expect(points[0].getTimeData()).toStrictEqual("0");
      expect(points[0].getYData()).toStrictEqual(1);
      expect(points[1].getTimeData()).toStrictEqual("1");
      expect(points[1].getYData()).toStrictEqual(2);
      expect(points[2].getTimeData()).toStrictEqual("2");
      expect(points[2].getYData()).toStrictEqual(13);
      expect(points[3].getTimeData()).toStrictEqual("3");
      expect(points[3].getYData()).toStrictEqual(33);
      expect(points[4].getTimeData()).toStrictEqual("4");
      expect(points[4].getYData()).toStrictEqual(48);
      expect(points[5].getTimeData()).toStrictEqual("5");
      expect(points[5].getYData()).toStrictEqual(61);
      expect(points[6].getTimeData()).toStrictEqual("6");
      expect(points[6].getYData()).toStrictEqual(87);
      expect(points[7].getTimeData()).toStrictEqual("7");
      expect(points[7].getYData()).toStrictEqual(124);
      expect(points[8].getTimeData()).toStrictEqual("8");
      expect(points[8].getYData()).toStrictEqual(147);
    }
  });

  test("populate points with first differencing enabled", () => {
    const csvModelData = mainController.getCSVController().getModelData();
    csvModelData?.setIsFirstDifferencing(true);
    csvModelData?.populatePoints();
    const points = csvModelData?.getPoints();
    if (points) {
      expect(points[0].getTimeData()).toStrictEqual("0");
      expect(points[0].getYData()).toStrictEqual(0);
      expect(points[1].getTimeData()).toStrictEqual("1");
      expect(points[1].getYData()).toStrictEqual(1);
      expect(points[2].getTimeData()).toStrictEqual("2");
      expect(points[2].getYData()).toStrictEqual(11);
      expect(points[3].getTimeData()).toStrictEqual("3");
      expect(points[3].getYData()).toStrictEqual(20);
      expect(points[4].getTimeData()).toStrictEqual("4");
      expect(points[4].getYData()).toStrictEqual(15);
      expect(points[5].getTimeData()).toStrictEqual("5");
      expect(points[5].getYData()).toStrictEqual(13);
      expect(points[6].getTimeData()).toStrictEqual("6");
      expect(points[6].getYData()).toStrictEqual(26);
      expect(points[7].getTimeData()).toStrictEqual("7");
      expect(points[7].getYData()).toStrictEqual(37);
      expect(points[8].getTimeData()).toStrictEqual("8");
      expect(points[8].getYData()).toStrictEqual(23);
    }
  });

  test("setting points in a csvDataObject", () => {
    const csvModelData = mainController.getCSVController().getModelData();
    const newPoints: PointObjectInterface[] = [];

    for (let i = 0; i < 3; i += 1) {
      const p = new PointObject();
      p.setTimeData(i.toString());
      p.setYData(i);
      newPoints.push(p);
    }
    csvModelData?.setPoints(newPoints);
    const points = csvModelData?.getPoints();
    if (points) {
      expect(points[0].getTimeData()).toStrictEqual("0");
      expect(points[0].getYData()).toStrictEqual(0);
      expect(points[1].getTimeData()).toStrictEqual("1");
      expect(points[1].getYData()).toStrictEqual(1);
    }
  });

  test("getting data for a time that doesn't exist", () => {
    const csvModelData = mainController.getCSVController().getModelData();
    csvModelData?.populatePoints();
    expect(csvModelData?.getDataByTime("145")).toBe(null);
  });
});
