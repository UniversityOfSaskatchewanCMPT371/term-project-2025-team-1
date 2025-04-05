import { describe, test, expect, beforeEach, vi } from "vitest";
import { CSVController } from "../../src/controller/CSVController";
import mainController from "../../src/controller/MainController";
import { CSVDataObject } from "../../src/components/Csv_Components/CSVDataObject";
import { CSVReaderModel } from "../../src/models/CSVReaderModel";
import * as logger from "../../src/logger-frontend";
import { TimeSeriesGraphObject } from "../../src/components/Graph_Components/TimeSeriesGraphObject";
import { EmbeddedGraphObject } from "../../src/components/Graph_Components/EmbeddedGraphObject";
import { GraphController } from "../../src/controller/GraphController";

/*
 * For testing CSVController
 * Which in turn tests, CSVReaderModel methods as well as CSVDataObject
 */
describe("CSVController Tests", () => {
  let csvController: CSVController;

  //Before each test, get a fresh instance of CSVController via the mainController singleton.
  beforeEach(() => {
    csvController = mainController.getCSVController();
    // Reset any existing model data to undefined
    csvController.getModel().data = undefined;

    // Clear mocks.
    vi.clearAllMocks();

    // Spy on the logger functions so that we can assert their calls.
    vi.spyOn(logger, "sendError").mockImplementation(() => {
      /* no-op */
    });
    vi.spyOn(logger, "sendLog").mockImplementation(() => {
      /* no-op */
    });
  });

  test("Test if CSVController able to get instance of model", () => {
    const model = csvController.getModel();
    expect(model).toBeInstanceOf(CSVReaderModel);
  });

  //Test getters
  test("Getting Model data by controller should return undefined initially", () => {
    const model = csvController.getModel();
    expect(model.getData()).toBeUndefined();
  });

  //Testing parsing csv files locally and by url
  test("loadURLFile should parse CSV from URL and update CSVDataObject", async () => {
    //URL link for testing
    const url =
      "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv";

    await csvController.loadURLFile(url);

    const getByName = csvController.getModelData();

    expect(getByName).toBeInstanceOf(CSVDataObject);
    getByName?.setName("test.csv");
    expect(getByName?.getName()).toBe("test.csv");

    getByName?.setYHeader("X");
    expect(getByName?.getYHeader()).toBe("X");
    expect(getByName?.getDataByTime("2025-01-19")).toBe(40);

    expect(getByName?.getBrowserSelected()).toBe(false);
    expect(getByName?.getVRSelected()).toBe(false);

    getByName?.setBrowserSelected(true);
    expect(getByName?.getBrowserSelected()).toBe(true);

    getByName?.setVRSelected(true);
    expect(getByName?.getVRSelected()).toBe(true);
  });

  test("loadURLFile should handle error and log via sendError", async () => {
    const error = new Error("test load error");
    // Force the model's readURLFile to reject.
    vi.spyOn(csvController.getModel(), "readURLFile").mockRejectedValue(error);
    await expect(csvController.loadURLFile("invalid-url")).rejects.toThrowError(
      error,
    );
    expect(logger.sendError).toHaveBeenCalledWith(error, "loadURLFile Error");
  });

  test("loadLocalFile should call model.readLocalFile with the provided file", async () => {
    const file = new File(["col1,col2\nval1,val2"], "dummy.csv", {
      type: "text/csv",
    });
    const readLocalFileSpy = vi
      .spyOn(csvController.getModel(), "readLocalFile")
      .mockResolvedValue();
    await csvController.loadLocalFile(file);
    expect(readLocalFileSpy).toHaveBeenCalledWith(file, expect.any(Function));
  });

  test("loadLocalFile should handle errors and log via sendError", async () => {
    const file = new File(["invalid data"], "dummy.csv", { type: "text/csv" });
    const error = new Error("load error");
    vi.spyOn(csvController.getModel(), "readLocalFile").mockRejectedValue(
      error,
    );
    await expect(csvController.loadLocalFile(file)).rejects.toThrowError(error);
    expect(logger.sendError).toHaveBeenCalledWith(error, "loadLocalFile Error");
  });

  test("generate should throw an error and log if no CSVDataObject is available", () => {
    // Force getData to return undefined.
    vi.spyOn(csvController.getModel(), "getData").mockReturnValue(undefined);
    expect(() => {
      csvController.generate(5, false, "");
    }).toThrowError(Error);
    expect(logger.sendError).toHaveBeenCalled();
  });

  test("generate should create graphs and push them to the main controller", () => {
    // Create a dummy CSVDataObject and stub necessary methods.
    const dummyData = new CSVDataObject();
    const setVRSelectedSpy = vi
      .spyOn(dummyData, "setVRSelected")
      .mockImplementation(() => {
        /* no-op */
      });
    const populatePointsSpy = vi
      .spyOn(dummyData, "populatePoints")
      .mockImplementation(() => {
        /* no-op */
      });
    const getNameSpy = vi
      .spyOn(dummyData, "getName")
      .mockReturnValue("TestGraph");

    // Force the model to return our dummy data.
    vi.spyOn(csvController.getModel(), "getData").mockReturnValue(dummyData);

    // Spy on TimeSeriesGraphObject and EmbeddedGraphObject methods.
    const tsSetNameSpy = vi
      .spyOn(TimeSeriesGraphObject.prototype, "setName")
      .mockImplementation(() => {
        /* no-op */
      });
    const tsAddPointsSpy = vi
      .spyOn(TimeSeriesGraphObject.prototype, "addPoints")
      .mockImplementation(() => {
        /* no-op */
      });
    const emSetNameSpy = vi
      .spyOn(EmbeddedGraphObject.prototype, "setName")
      .mockImplementation(() => {
        /* no-op */
      });
    const emSetTauSpy = vi
      .spyOn(EmbeddedGraphObject.prototype, "setTau")
      .mockImplementation(() => {
        /* no-op */
      });
    const emAddPointsSpy = vi
      .spyOn(EmbeddedGraphObject.prototype, "addPoints")
      .mockImplementation(() => {
        /* no-op */
      });

    // Override mainController.getGraphController to return an object with a spy for pushDataToModel.
    const pushDataToModelSpy = vi.fn();
    // Create a dummy GraphController by extending GraphController.
    class DummyGraphController extends GraphController {
      pushDataToModel(ts: any, em: any): void {
        pushDataToModelSpy(ts, em);
      }
    }
    const dummyGraphController = new DummyGraphController();
    vi.spyOn(mainController, "getGraphController").mockReturnValue(
      dummyGraphController,
    );

    // Spy on sendLog so we can verify logging.
    const sendLogSpy = vi.spyOn(logger, "sendLog").mockImplementation(() => {
      /* no-op */
    });

    // Call generate with a tau value.
    csvController.generate(10, false, "Some");

    // Verify CSVDataObject interactions.
    expect(setVRSelectedSpy).toHaveBeenCalledWith(true);
    expect(populatePointsSpy).toHaveBeenCalled();
    expect(getNameSpy).toHaveBeenCalled();

    // Verify graph object interactions.
    expect(tsSetNameSpy).toHaveBeenCalledWith("TestGraph");
    expect(tsAddPointsSpy).toHaveBeenCalled();
    expect(emSetNameSpy).toHaveBeenCalledWith("");
    expect(emSetTauSpy).toHaveBeenCalledWith(10);
    expect(emAddPointsSpy).toHaveBeenCalled();

    // Verify that pushDataToModel was called with two graph instances.
    expect(pushDataToModelSpy).toHaveBeenCalled();
    const [tsGraph, emGraph] = pushDataToModelSpy.mock.calls[0];
    expect(tsGraph).toBeInstanceOf(TimeSeriesGraphObject);
    expect(emGraph).toBeInstanceOf(EmbeddedGraphObject);

    // Verify that a log was sent.
    expect(sendLogSpy).toHaveBeenCalledWith(
      "info",
      "generate has pushed a new graph",
    );
  });
});
