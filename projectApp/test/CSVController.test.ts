import { describe, test, expect, beforeEach } from "vitest";
import { CSVController } from "../src/controller/CSVController";
import { CSVReaderModel } from "../src/models/CSVReaderModel";
import { CSVDataObject } from "../src/models/CSVDataObject";

/*
* For testing CSVController
* Which in turn tests, CSVReaderModel methods as well as CSVDataObject
*/
describe("CSVController Tests", () => {
    let csvController: CSVController;

    //Before each test, initialize a new MainController
    beforeEach(() => {
        csvController = new CSVController();
    });

    test("Test if CSVController able to get instance of model", () => {
        const model = csvController.getModel();
        expect(model).toBeInstanceOf(CSVReaderModel);
    })

    //Test getters
    test("Getting Model data by controller", () => {
        const model = csvController.getModel();
        expect(model.getData()).toStrictEqual([]);
        expect(model.getNum()).toBe(0);
    })

    //Testing parsing csv files locally and by url
    test("Testing methods of CSVReaderModel that parse csv files", async () => {
        //Maybe a proper file would work better
        //Does show that it still accepts blank files
        //Then create a function that tests both Local and URl
        //As well as methods of csv Objects
        const fake = new File([""], "fake.csv", {type: "fake/csv"});

        await csvController.getModel().readLocalFile(fake);
        expect(csvController.getModel().getData().length).toBe(1);
        expect(csvController.getModel().getNum()).toBe(1);

        //URL link for testing
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv";

        await csvController.getModel().readURLFile(url);
        expect(csvController.getModel().getNum()).toBe(2);

        const getByName = csvController.getModel().getCSVFileByName("Graph1");
        
        expect(getByName).toBeInstanceOf(CSVDataObject);
        expect(getByName?.getName()).toBe("Graph1");

        getByName?.setYHeader("X");
        expect(getByName?.getYHeader()).toBe("X");
        expect(getByName?.getDataByTime("2025-01-19")).toBe(20);

        expect(getByName?.getBrowserSelected()).toBe(false);
        expect(getByName?.getVRSelected()).toBe(false);

        getByName?.setBrowserSelected(true);
        expect(getByName?.getBrowserSelected()).toBe(true);

        getByName?.setVRSelected(true);
        expect(getByName?.getVRSelected()).toBe(true);
    })

})