import { vi, describe, it, expect, beforeEach } from "vitest";

import { CSVReaderModel } from "../../src/models/CSVReaderModel";
import { CSVDataObject } from "../../src/components/Csv_Components/CSVDataObject";
import * as logger from "../../src/logger-frontend";
import * as testScene from "../../src/pages/Scene/TestScene";

beforeEach(() => {
  // Clear all previous mocks
  vi.clearAllMocks();

  // Create spies on the module functions. This ensures that the functions used in CSVReaderModel are spied on.
  vi.spyOn(logger, "sendError").mockImplementation(() => {
    /* no-op */
  });
  vi.spyOn(logger, "sendLog").mockImplementation(() => {
    /* no-op */
  });
  vi.spyOn(testScene, "addTestSceneInfo").mockImplementation(() => {
    /* no-op */
  });
});

describe("CSVReaderModel", () => {
  describe("getCSVFile", () => {
    it("should throw error and log if data is undefined", () => {
      const model = new CSVReaderModel();
      expect(() => model.getCSVFile()).toThrowError(Error);
      expect(logger.sendError).toHaveBeenCalled();
    });

    it("should return CSVDataObject if data is defined", () => {
      const model = new CSVReaderModel();
      const dummyData = new CSVDataObject();
      model.data = dummyData;
      expect(model.getCSVFile()).toBe(dummyData);
    });
  });

  describe("readLocalFile", () => {
    it("should read a local file, log, add test scene info, and set data", async () => {
      const model = new CSVReaderModel();
      const file = new File(["col1,col2\nval1,val2"], "test.csv", {
        type: "text/csv",
      });

      // Spy on CSVDataObject prototype method loadCSVData
      const loadCSVDataSpy = vi
        .spyOn(CSVDataObject.prototype, "loadCSVData")
        .mockResolvedValue();

      // Spy on getData to simulate returning valid CSV data (an array of objects with a "key" property)
      vi.spyOn(CSVDataObject.prototype, "getData").mockReturnValue([
        { key: { col1: "val1", col2: "val2" } },
      ]);

      await model.readLocalFile(file);

      expect(loadCSVDataSpy).toHaveBeenCalledWith(file, false);
      expect(logger.sendLog).toHaveBeenCalled(); // Verify logging was done
      expect(testScene.addTestSceneInfo).toHaveBeenCalled();
      expect(model.data).toBeInstanceOf(CSVDataObject);
    });

    it("should handle error when loadCSVData rejects in readLocalFile", async () => {
      const model = new CSVReaderModel();
      const file = new File(["col1,col2\nval1,val2"], "test.csv", {
        type: "text/csv",
      });
      const error = new Error("load failed");

      vi.spyOn(CSVDataObject.prototype, "loadCSVData").mockRejectedValue(error);

      await expect(model.readLocalFile(file)).rejects.toThrowError(error);
      expect(logger.sendError).toHaveBeenCalledWith(
        error,
        "readLocalFile error",
      );
    });
  });

  describe("readURLFile", () => {
    it("should read a URL file, log, add test scene info, and set data", async () => {
      const model = new CSVReaderModel();
      const url = "http://example.com/test.csv";

      const loadCSVDataSpy = vi
        .spyOn(CSVDataObject.prototype, "loadCSVData")
        .mockResolvedValue();

      vi.spyOn(CSVDataObject.prototype, "getData").mockReturnValue([
        { key: { col1: "val1", col2: "val2" } },
      ]);

      await model.readURLFile(url);

      expect(loadCSVDataSpy).toHaveBeenCalledWith(url, true);
      expect(logger.sendLog).toHaveBeenCalled();
      expect(testScene.addTestSceneInfo).toHaveBeenCalled();
      expect(model.data).toBeInstanceOf(CSVDataObject);
    });

    it("should handle error when loadCSVData rejects in readURLFile", async () => {
      const model = new CSVReaderModel();
      const url = "http://example.com/test.csv";
      const error = new Error("url load failed");

      vi.spyOn(CSVDataObject.prototype, "loadCSVData").mockRejectedValue(error);

      await expect(model.readURLFile(url)).rejects.toThrowError(error);
      expect(logger.sendError).toHaveBeenCalledWith(error, "readURLFile error");
    });
  });

  describe("getData", () => {
    it("should return the current CSVDataObject", () => {
      const model = new CSVReaderModel();
      const dummyData = new CSVDataObject();
      model.data = dummyData;
      expect(model.getData()).toBe(dummyData);
    });

    it("should return undefined if data is not set", () => {
      const model = new CSVReaderModel();
      model.data = undefined;
      expect(model.getData()).toBeUndefined();
    });
  });
});
