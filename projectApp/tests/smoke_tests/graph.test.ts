import { describe, test, beforeAll, expect } from "vitest";
import "../../src/controller/MainController";
import { MainController } from "../../src/controller/MainController";
import { pathStrToFile } from "../unit_tests/__mocks__/mockFileReader";

const mainControllerTest = new MainController();
const mainBranchUrl =
  "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles";
const indexedDataUrl = `${mainBranchUrl}/indexedData.csv`;
const indexedDataPath = "../csvTestFiles/indexedData.csv";

describe("Test that graph objects are properly created", () => {
    beforeAll(async () => {
        const indexedDataFile = await pathStrToFile(indexedDataPath);
        await mainControllerTest.getCSVController().loadLocalFile(indexedDataFile);
        mainControllerTest.getCSVController().generate();
        const graphm = mainControllerTest.getGraphController().getModel();
    })
    test("expect graph model to contain a 10 point graph", async () =>{
        const graphm = mainControllerTest.getGraphController().getModel();
        expect(graphm.getData().at(0)?.getNumPoints()).toBe(10);
    });
});
