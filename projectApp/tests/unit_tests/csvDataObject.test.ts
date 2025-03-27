import { beforeAll, describe, test } from "vitest";
import mainController from "../../src/controller/MainController";

const mainBranchUrl =
  "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID4/csvTestFiles";
const indexedDataUrl = `${mainBranchUrl}/indexedRealData.csv`;

describe("testing csv data object stuff", () => {

    beforeAll(async ()=> {
        await mainController.getCSVController().loadURLFile(indexedDataUrl);
    });

    test("first diff", () => {
        const mData = mainController.getCSVController().getModelData()
        const r = mData?.calculateFirstDifferencingValues();
        console.log(r)
    })

});