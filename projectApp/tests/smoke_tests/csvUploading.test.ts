import { describe, expect, test, vi } from "vitest";
import "../../src/controller/MainController";
import { MainController } from "../../src/controller/MainController";
import MockFileReader, {
  pathStrToFile,
} from "../unit_tests/__mocks__/mockFileReader";
import MockFile from "../unit_tests/__mocks__/MockFile";
import { CSVDataObject } from "../../src/components/Csv_Components/CSVDataObject";

vi.stubGlobal("FileReader", MockFileReader);

vi.stubGlobal("File", MockFile);

const mainControllerTest = new MainController();
const mainBranchUrl =
  "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles";
const indexedDataUrl = `${mainBranchUrl}/indexedData.csv`;
const indexedDataPath = "../csvTestFiles/indexedData.csv";

describe("Test that a csv file can be loaded when called starting from mainController", () => {
  test("expect csvController in mainController to create a graph from csv url input", async () => {
    await mainControllerTest.getCSVController().loadURLFile(indexedDataUrl);
    //should be Graph0
    const urlGraph = mainControllerTest
      .getCSVController()
      .getDataByName("Graph0");
    expect(urlGraph).not.toBeNull();
    expect(urlGraph).toBeInstanceOf(CSVDataObject);
  });
  test("expect csvController in mainController to create a graph from csv file input", async () => {
    const indexedDataFile = await pathStrToFile(indexedDataPath);
    await mainControllerTest.getCSVController().loadLocalFile(indexedDataFile);
    //should be Graph1
    const fileGraph = mainControllerTest
      .getCSVController()
      .getDataByName("Graph1");
    expect(fileGraph).not.toBeNull();
    expect(fileGraph).toBeInstanceOf(CSVDataObject);
  });
});
