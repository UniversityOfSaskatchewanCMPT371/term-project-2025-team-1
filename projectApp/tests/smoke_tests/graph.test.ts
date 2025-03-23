import { describe, test, beforeAll, expect } from "vitest";
import "../../src/controller/MainController";
import { MainController } from "../../src/controller/MainController";

const mainControllerTest = new MainController();
const mainBranchUrl =
  "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles";
const indexedDataUrl = `${mainBranchUrl}/indexedData.csv`;

describe("Test that graph objects are properly created", () => {
    beforeAll(async () => {
        //const indexedDataFile = await pathStrToFile(indexedDataPath);
        await mainControllerTest.getCSVController().loadURLFile(indexedDataUrl);
        mainControllerTest.getCSVController().generate();
    })
    test("expect graph model to contain a 10 point graph", async () =>{
        const graphm = mainControllerTest.getGraphController().getModel();
        expect(graphm.getData().at(0)?.getNumPoints()).toBe(10);
    });
    test("expect correct points to be calculated", async () =>{
        const graphm = mainControllerTest.getGraphController().getModel();
        const points = graphm.getData()[0].getPoints();
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
    test("expect correct range for both axes", async () =>{
        const graphm = mainControllerTest.getGraphController().getModel();
        const graphaxes = graphm.getData()[0].getAxes();
        expect(graphaxes.xRange[1]).toBe(10);
        expect(graphaxes.yRange[1]).toBe(10);
    });

});
