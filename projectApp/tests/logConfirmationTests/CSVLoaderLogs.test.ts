import { describe, expect, test } from "vitest";
import * as fs from "fs";
import { fileContainsText } from "./fileParser";

// Testing BrowserUI and its subsequent calls give the correct logs
// Run this test after following csvLoader.feature Gherkin steps

describe("emulating csvLoader.feature", () => {
  const path = "./tests/logConfirmationTests/logConfirmationlogs.txt";
  test("log file exists", () => {
    expect(fs.existsSync(path)).toBe(true);
  });

  test("emulating scenario: Confirming URL CSV entry", async () => {
    // UrlCsvReader
    const URLCSVReaderSuccess = "URLCSVReader has successfully parsed"; // omitting {csv} string
    await expect(fileContainsText(path, URLCSVReaderSuccess)).resolves.toBe(
      true,
    );

    const CSVDataObjectSetData =
      "setData() was called, data has been set (CSVDataObject.ts)";
    await expect(fileContainsText(path, CSVDataObjectSetData)).resolves.toBe(
      true,
    );

    // CSVDataObject
    const CSVDataObjectSetName = "setName,  will now be called Graph0";
    await expect(fileContainsText(path, CSVDataObjectSetName)).resolves.toBe(
      true,
    );

    const CSVDataObjectFindTimeHeader =
      "findTimeHeader() was called, the time header in the data set has been found (CSVDataObject.ts)";
    await expect(
      fileContainsText(path, CSVDataObjectFindTimeHeader),
    ).resolves.toBe(true);

    const CSVDataObjectSetTimeHeader =
      "setTimeHeader() was called, finding the time header in the data set (CSVDataObject.ts)";
    await expect(
      fileContainsText(path, CSVDataObjectSetTimeHeader),
    ).resolves.toBe(true);

    const CSVDataObjectFindFirstHeader =
      "findFirstHeader() was called, the first header was found Some (CSVDataObject.ts)";
    await expect(
      fileContainsText(path, CSVDataObjectFindFirstHeader),
    ).resolves.toBe(true);

    const CSVDataObjectSetYHeader = "setYHeader, Graph0 yHeader is set to Some";
    await expect(fileContainsText(path, CSVDataObjectSetYHeader)).resolves.toBe(
      true,
    );

    const CSVDataObjectLoadSuccess = "loadCSVData has loaded csv data";
    await expect(
      fileContainsText(path, CSVDataObjectLoadSuccess),
    ).resolves.toBe(true);
    // CSVReaderModel

    const readURLFileSuccess = "readURLFile read a file"; // omitting url path
    await expect(fileContainsText(path, readURLFileSuccess)).resolves.toBe(
      true,
    );

    // BrowserUI
    const URLComponentLog = "URLComponent read:"; // omitting url path
    await expect(fileContainsText(path, URLComponentLog)).resolves.toBe(true);
  });

  test("emulating scenario: Confirming invalid URL CSV entry", async () => {
    //depends on what counts as invalid
    //it was not .csv, or fetch could not find url, or file was empty, or other error
    //UrlCsvReader
    const UrlReaderNotCSV = "Final URL destination is not csv readable";
    const UrlReaderIsEmpty = "URLCSVReader is empty";
    const UrlReaderFetchFail = "Failed to fetch the file";
    const urlAnyInvalid = Promise.all([
      fileContainsText(path, UrlReaderNotCSV),
      fileContainsText(path, UrlReaderIsEmpty),
      fileContainsText(path, UrlReaderFetchFail),
    ]).then((items) => items.includes(true));
    await expect(urlAnyInvalid).resolves.toBe(true);

    const UrlCSVReaderError = "URLCSVReader error";
    await expect(fileContainsText(path, UrlCSVReaderError)).resolves.toBe(true);

    //CSVDataObject
    const loadCSVDataError = "loadCSVData error";
    await expect(fileContainsText(path, loadCSVDataError)).resolves.toBe(true);

    //CSVReaderModel
    const readURLFileError = "readURLFile error";
    await expect(fileContainsText(path, readURLFileError)).resolves.toBe(true);

    // CSVController
    const loadURLFileError = "loadURLFile Error";
    await expect(fileContainsText(path, loadURLFileError)).resolves.toBe(true);

    //BrowserUI
    const URLComponentLog = "URLComponent read:";
    await expect(fileContainsText(path, URLComponentLog)).resolves.toBe(true);
  });

  test("emulating scenario: Confirming Local CSV entry", async () => {
    //LocalCsvReader
    const LocalCSVReaderSuccess = "LocalCsvReader(file) has read data"; // omitting {csv} string
    await expect(fileContainsText(path, LocalCSVReaderSuccess)).resolves.toBe(
      true,
    );

    const CSVDataObjectSetData =
      "setData() was called, data has been set (CSVDataObject.ts)";
    await expect(fileContainsText(path, CSVDataObjectSetData)).resolves.toBe(
      true,
    );

    // CSVDataObject
    const CSVDataObjectFindTimeHeader =
      "findTimeHeader() was called, the time header in the data set has been found (CSVDataObject.ts)";
    await expect(
      fileContainsText(path, CSVDataObjectFindTimeHeader),
    ).resolves.toBe(true);

    const CSVDataObjectSetTimeHeader =
      "setTimeHeader() was called, finding the time header in the data set (CSVDataObject.ts)";
    await expect(
      fileContainsText(path, CSVDataObjectSetTimeHeader),
    ).resolves.toBe(true);

    const CSVDataObjectFindFirstHeader =
      "findFirstHeader() was called, the first header was found Some (CSVDataObject.ts)";
    await expect(
      fileContainsText(path, CSVDataObjectFindFirstHeader),
    ).resolves.toBe(true);

    const CSVDataObjectSetYHeader = "setYHeader, Graph0 yHeader is set to Some";
    await expect(fileContainsText(path, CSVDataObjectSetYHeader)).resolves.toBe(
      true,
    );

    const CSVDataObjectLoadSuccess = "loadCSVData has loaded csv data";
    await expect(
      fileContainsText(path, CSVDataObjectLoadSuccess),
    ).resolves.toBe(true);

    //CSVReaderModel
    const readLocalFileSuccess = "readLocalFile read a file"; // omitting file path
    await expect(fileContainsText(path, readLocalFileSuccess)).resolves.toBe(
      true,
    );

    //BrowserUI
    const LoadComponentLog = "LoadComponent read:"; // omitting file path
    await expect(fileContainsText(path, LoadComponentLog)).resolves.toBe(true);
  });

  test("emulating scenario: Confirming invalid Local CSV entry", async () => {
    //depends on what counts as invalid
    //it was not .csv, or file was empty, or other error
    //UrlCsvReader
    const LocalReaderNotCSV = "LocalCsvReader(file) receives a non csv file";
    const LocalReaderIsEmpty = "Empty file set";
    const LocalCSVReaderError = "LocalCsvReader(file) has errored";
    const urlAnyInvalid = Promise.all([
      fileContainsText(path, LocalReaderNotCSV),
      fileContainsText(path, LocalReaderIsEmpty),
      fileContainsText(path, LocalCSVReaderError),
    ]).then((items) => items.includes(true));
    await expect(urlAnyInvalid).resolves.toBe(true);

    //CSVDataObject
    const loadCSVDataError = "loadCSVData error";
    await expect(fileContainsText(path, loadCSVDataError)).resolves.toBe(true);

    //CSVReaderModel
    const readLocalFileError = "readLocalFile error";
    await expect(fileContainsText(path, readLocalFileError)).resolves.toBe(
      true,
    );

    // CSVController
    const loadLocalFileError = "loadLocalFile Error";
    await expect(fileContainsText(path, loadLocalFileError)).resolves.toBe(
      true,
    );

    //BrowserUI
    const LoadComponentLog = "LoadComponent Return Error";
    await expect(fileContainsText(path, LoadComponentLog)).resolves.toBe(true);
  });
});
