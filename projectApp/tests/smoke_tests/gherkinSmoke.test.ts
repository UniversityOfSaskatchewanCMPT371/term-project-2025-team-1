import { describe, expect, test } from "vitest";
import { fileContainsText } from "../logConfirmationTests/fileParser";
import * as fs from "fs";

// Testing the smoke, minimum functionality, for logs
// Run this test after following smokeTest.feature Gherkin in Tests (outside of projectApp)
const filePath = "./tests/smoke_tests/smokeTestLogs.txt";
// to run, put logs.txt into /smoke_tests and rename it to smokeTestLogs.txt
test("log file exists", () => {
  expect(fs.existsSync(filePath)).toBe(true);
});

describe("Scenario: Testing the local CSV Loader functionality for csvLoading", () => {

  const filename = "indexedData.csv"
  // note: this indexedDataString is for ID4-SmokeTest branch locally, update this when pushed to main
  const indexedDataString = "[{\\\"Time\\\":0,\\\"Some\\\":1,\\\"B\\\":2},{\\\"Time\\\":1,\\\"Some\\\":2,\\\"B\\\":4},{\\\"Time\\\":2,\\\"Some\\\":3,\\\"B\\\":6},{\\\"Time\\\":3,\\\"Some\\\":4,\\\"B\\\":8},{\\\"Time\\\":4,\\\"Some\\\":5,\\\"B\\\":10},{\\\"Time\\\":5,\\\"Some\\\":6,\\\"B\\\":12},{\\\"Time\\\":6,\\\"Some\\\":7,\\\"B\\\":14},{\\\"Time\\\":7,\\\"Some\\\":8,\\\"B\\\":16},{\\\"Time\\\":8,\\\"Some\\\":9,\\\"B\\\":18},{\\\"Time\\\":9,\\\"Some\\\":10,\\\"B\\\":20}]"
  // might not be the best idea to have done ${csv}, considering how long this is
  // i suggest replacing it, but it can be done at a later time

  // Check that LoadComponent sends its log
  test("BrowserUI LoadComponent should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      `LoadComponent read: ${filename}`
    );
    expect(response).toBe(true);
  });

  // Check that readLocalFile sends its log
  test("CSVReaderModel readLocalFile should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      `readLocalFile read a file\\n${indexedDataString}`
    );
    expect(response).toBe(true);
  });

  // Check that loadCSVData sends its log
  test("CSVDataObject loadCSVData should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      `loadCSVData has loaded csv data\\n${indexedDataString}`
    );
    expect(response).toBe(true);
  });

  // Check that LocalCSVReader sends its log
  test("CSVReaders LocalCSVReader should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      `LocalCsvReader(file) has read data\\n${indexedDataString}`
    );
    expect(response).toBe(true);
  });

  // CSVDataObject setData currently does not have a log, although it should since it modifies something

  // Check that initializing the data object sets its name to Graph0
  test("CSVDataObject setName should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      "setName,  will now be called Graph0"
    ); // this is because the original name of this graph is "" empty string
    expect(response).toBe(true);
  });

  // Check that initializing the data object sets its yheader to first header (Some)
  test("CSVDataObject setYHeader should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      "setYHeader, Graph0 yHeader is set to Some"
    ); // in main branch, the first yHeader is X
    expect(response).toBe(true);
  });

  // Im not sure if loadedCsvBrowser is necessary since it is being changed to only one graph at a time?
  // either way ill make a test for it
  // Check that loadedCsvBrowser has Graph0
  test("CSVReaderModel loadedCsvBrowser should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      "loadedCsvBrowser() returns list\\n[[\\\"Graph0\\\",false]]"
    );
    expect(response).toBe(true);
  });

});

describe("Scenario: Testing the URL CSV Loader functionality for csvLoading", () => {

  const fileUrl = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/indexedData.csv"
  const indexedDataString = "[{\\\"Time\\\":0,\\\"X\\\":1,\\\"B\\\":2},{\\\"Time\\\":1,\\\"X\\\":2,\\\"B\\\":4},{\\\"Time\\\":2,\\\"X\\\":3,\\\"B\\\":6},{\\\"Time\\\":3,\\\"X\\\":4,\\\"B\\\":8},{\\\"Time\\\":4,\\\"X\\\":5,\\\"B\\\":10},{\\\"Time\\\":5,\\\"X\\\":6,\\\"B\\\":12},{\\\"Time\\\":6,\\\"X\\\":7,\\\"B\\\":14},{\\\"Time\\\":7,\\\"X\\\":8,\\\"B\\\":16},{\\\"Time\\\":8,\\\"X\\\":9,\\\"B\\\":18},{\\\"Time\\\":9,\\\"X\\\":10,\\\"B\\\":20}]"
  // might not be the best idea to have done ${csv}, considering how long this is
  // i suggest replacing it, but it can be done at a later time

  // Check that LoadComponent sends its log
  test("BrowserUI LoadComponent should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      `URLComponent read: ${fileUrl}`
    );
    expect(response).toBe(true);
  });

  // Check that readLocalFile sends its log
  test("CSVReaderModel readLocalFile should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      `readURLFile read a file\\n${indexedDataString}`
    );
    expect(response).toBe(true);
  });

  // Check that loadCSVData sends its log
  test("CSVDataObject loadCSVData should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      `loadCSVData has loaded csv data\\n${indexedDataString}`
    );
    expect(response).toBe(true);
  });

  // Check that LocalCSVReader sends its log
  test("CSVReaders LocalCSVReader should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      `URLCSVReader has successfully parsed\\n${indexedDataString}`
    );
    expect(response).toBe(true);
  });

  // CSVDataObject setData currently does not have a log, although it should since it modifies something

  // Check that initializing the data object sets its name to Graph0
  test("CSVDataObject setName should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      "setName,  will now be called Graph0"
    ); // this is because the original name of this graph is "" empty string
    expect(response).toBe(true);
  });

  // Check that initializing the data object sets its yheader to first header (Some)
  test("CSVDataObject setYHeader should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      "setYHeader, Graph0 yHeader is set to X"
    );
    expect(response).toBe(true);
  });

  // Im not sure if loadedCsvBrowser is necessary since it is being changed to only one graph at a time?
  // either way ill make a test for it
  // Check that loadedCsvBrowser has Graph0
  test("CSVReaderModel loadedCsvBrowser should send a log", async () => {
    const response = await fileContainsText(
      filePath,
      "loadedCsvBrowser() returns list\\n[[\\\"Graph0\\\",false]]"
    );
    expect(response).toBe(true);
  });

});