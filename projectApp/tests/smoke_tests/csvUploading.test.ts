import { describe, expect, test, vi } from "vitest";
import "../../src/controller/MainController";
import mainController from "../../src/controller/MainController";
import MockFileReader, { pathStrToFile } from "../unit_tests/__mocks__/mockFileReader";
import MockFile from "../unit_tests/__mocks__/MockFile";
import { CSVDataObject } from "../../src/components/Csv_Components/CSVDataObject";

vi.stubGlobal("FileReader", MockFileReader);

vi.stubGlobal("File", MockFile);

const mainBranchUrl = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles"
const indexedDataUrl = `${mainBranchUrl}/indexedData.csv`
const indexedDataPath = "../csvTestFiles/indexedData.csv";

describe("Test that mainController a file",() => {
    test("expect mainController to load a url", async () => {
        await mainController.getCSVController().loadURLFile(indexedDataUrl);
        //should be Graph0
        const urlGraph = mainController.getCSVController().getDataByName("Graph0");
        expect(urlGraph).not.toBeNull();
        expect(urlGraph).toBeInstanceOf(CSVDataObject);
    });
    test("Test that mainController can load a local csv file", async () => {
        const indexedDataFile = await pathStrToFile(indexedDataPath);
        await mainController.getCSVController().loadLocalFile(indexedDataFile);
        //should be Graph1
        const fileGraph = mainController.getCSVController().getDataByName("Graph1");
        expect(fileGraph).not.toBeNull();
    });
});
