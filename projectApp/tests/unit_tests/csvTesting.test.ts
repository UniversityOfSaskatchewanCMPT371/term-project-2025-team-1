import { describe, expect, test, vi } from "vitest";

import {
  UrlCSVReader as urlReader,
  LocalCsvReader as localFileReader,
} from "../../src/components/Csv_Components/CSVReaders.ts";
import MockFile from "./__mocks__/MockFile.ts";
import MockFileReader, { pathStrToFile } from "./__mocks__/mockFileReader";

interface TestFormat<Input, Output> {
  description: string;
  inputVars: Input | Promise<Input>;
  expectSuccess: boolean;
  useFunction(input: Input): Promise<Output>;
}

function runReaderTest(
  testObject: TestFormat<
    string | File,
    { key: Record<string, string | number> }[]
  >,
): void {
  test(testObject.description, async () => {
    if (testObject.expectSuccess) {
      if (testObject.inputVars instanceof Promise) {
        await expect(testObject.inputVars).resolves.toBeDefined();
      }
      const awaitPath = await testObject.inputVars;
      const toRun = () => testObject.useFunction(awaitPath);
      await expect(toRun()).resolves.toBeDefined();
    } else {
      try {
        //expect either filePath gives errors or toRun gives errors
        const awaitPath = await testObject.inputVars;
        const toRun = () => testObject.useFunction(awaitPath);
        await expect(toRun()).rejects.toBeDefined();
      } catch (err: unknown) {
        if (testObject.inputVars instanceof Promise) {
          await expect(testObject.inputVars).rejects.toBeDefined();
        } else {
          throw err;
        }
      }
    }
  });
}

//filepaths for localCSVReader(path) and Headers and localCsvReader(file):
const relativePathToFiles = "../csvTestFiles";
const localRegularFile = `${relativePathToFiles}/test.csv`;
const localFakeFile = `${relativePathToFiles}/fakeFile.csv`;
const localOneLessHeader = `${relativePathToFiles}/oneLessHeader.csv`;
const localOneMoreHeader = `${relativePathToFiles}/oneMoreHeader.csv`;
const localUnevenData = `${relativePathToFiles}/unevenData.csv`;
const localDifferentTypes = `${relativePathToFiles}/differentTypes.csv`;
const localNotCSV = `${relativePathToFiles}/notCsv.html`;
const localEmptyFile = `${relativePathToFiles}/empty.csv`;

// apparently FileReader can only exist in the web app environment, it cant be tested in normally in nodejs/vitest
// so these mocks will simulate FileReader and File
// Mock FileReader globally
vi.stubGlobal("FileReader", MockFileReader);

// Mock File class
vi.stubGlobal("File", MockFile);

// These tests should now work in non-browser API
describe("Testing localCsvReader(file) function", () => {
  const regularFileReader: TestFormat<
    File,
    { key: Record<string, string | number> }[]
  > = {
    description: "local file reader:\tdata should be read from existing file",
    inputVars: pathStrToFile(localRegularFile),
    expectSuccess: true,
    useFunction: localFileReader,
  };
  runReaderTest(regularFileReader);

  const fakeFileReader: TestFormat<
    File,
    { key: Record<string, string | number> }[]
  > = {
    description:
      "local file reader:\tdata should not be read from nonexistant file",
    inputVars: pathStrToFile(localFakeFile),
    expectSuccess: false,
    useFunction: localFileReader,
  };
  runReaderTest(fakeFileReader);

  const oneLessReader: TestFormat<
    File,
    { key: Record<string, string | number> }[]
  > = {
    description:
      "local file reader:\tdata should be read from file with one less header",
    inputVars: pathStrToFile(localOneLessHeader),
    expectSuccess: true,
    useFunction: localFileReader,
  };
  runReaderTest(oneLessReader);

  const oneMoreReader: TestFormat<
    File,
    { key: Record<string, string | number> }[]
  > = {
    description:
      "local file reader:\tdata should be read from file with one more header",
    inputVars: pathStrToFile(localOneMoreHeader),
    expectSuccess: true,
    useFunction: localFileReader,
  };
  runReaderTest(oneMoreReader);

  const unevenDataReader: TestFormat<
    File,
    { key: Record<string, string | number> }[]
  > = {
    description:
      "local file reader:\tdata should be read from file with uneven data",
    inputVars: pathStrToFile(localUnevenData),
    expectSuccess: true,
    useFunction: localFileReader,
  };
  runReaderTest(unevenDataReader);

  const differentTypesReader: TestFormat<
    File,
    { key: Record<string, string | number> }[]
  > = {
    description:
      "local file reader:\tdata should be read from file with different data types",
    inputVars: pathStrToFile(localDifferentTypes),
    expectSuccess: true,
    useFunction: localFileReader,
  };
  runReaderTest(differentTypesReader);

  const inputHtmlReader: TestFormat<
    File,
    { key: Record<string, string | number> }[]
  > = {
    description:
      "local file reader:\tdata should not be read from non-csv file",
    inputVars: pathStrToFile(localNotCSV),
    expectSuccess: false,
    useFunction: localFileReader,
  };
  runReaderTest(inputHtmlReader);

  const emptyFileReader: TestFormat<
    File,
    { key: Record<string, string | number> }[]
  > = {
    description:
      "local file reader:\tdata should be not read from empty csv file",
    inputVars: pathStrToFile(localEmptyFile),
    expectSuccess: false,
    useFunction: localFileReader,
  };
  runReaderTest(emptyFileReader);
});

//urls used in urlCSVReader and Headers
const githubID2Dev =
  "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID2Dev/csvTestFiles";
const urlRegularFile = `${githubID2Dev}/test.csv`;
const urlFakeFile = `${githubID2Dev}/fakeFile.csv`;
const urlOneLessHeader = `${githubID2Dev}/oneLessHeader.csv`;
const urlOneMoreHeader = `${githubID2Dev}/oneMoreHeader.csv`;
const urlUnevenData = `${githubID2Dev}/unevenData.csv`;
const urlDifferentTypes = `${githubID2Dev}/differentTypes.csv`;
const urlNotCSV = `${githubID2Dev}/notCsv.html`;
const urlEmptyFile = `${githubID2Dev}/empty.csv`;
const urlW3Pandas = "https://www.w3schools.com/python/pandas/data.csv";

describe("Testing the urlCSVReader function", () => {
  //NOTE: these tests are for testing if it can read the file, not for if the csv is formatted correctly

  const regularFileUrl: TestFormat<
    string,
    { key: Record<string, string | number> }[]
  > = {
    description: "url reader:\tdata should be read from existing file",
    inputVars: urlRegularFile,
    expectSuccess: true,
    useFunction: urlReader,
  };
  runReaderTest(regularFileUrl);

  const fakeFileUrl: TestFormat<
    string,
    { key: Record<string, string | number> }[]
  > = {
    description: "url reader:\tdata should not be read from nonexistant file",
    inputVars: urlFakeFile,
    expectSuccess: false,
    useFunction: urlReader,
  };
  runReaderTest(fakeFileUrl);

  const oneLessUrlReader: TestFormat<
    string,
    { key: Record<string, string | number> }[]
  > = {
    description:
      "url reader:\tdata should be read from file with one less header",
    inputVars: urlOneLessHeader,
    expectSuccess: true,
    useFunction: urlReader,
  };
  runReaderTest(oneLessUrlReader);

  const oneMoreUrlReader: TestFormat<
    string,
    { key: Record<string, string | number> }[]
  > = {
    description:
      "url reader:\tdata should be read from file with one more header",
    inputVars: urlOneMoreHeader,
    expectSuccess: true,
    useFunction: urlReader,
  };
  runReaderTest(oneMoreUrlReader);

  const unevenDataUrlReader: TestFormat<
    string,
    { key: Record<string, string | number> }[]
  > = {
    description: "url reader:\tdata should be read from file with uneven data",
    inputVars: urlUnevenData,
    expectSuccess: true,
    useFunction: urlReader,
  };
  runReaderTest(unevenDataUrlReader);

  const differentTypesUrlReader: TestFormat<
    string,
    { key: Record<string, string | number> }[]
  > = {
    description:
      "url reader:\tdata should be read from file with different data types",
    inputVars: urlDifferentTypes,
    expectSuccess: true,
    useFunction: urlReader,
  };
  runReaderTest(differentTypesUrlReader);

  const inputHtmlUrlReader: TestFormat<
    string,
    { key: Record<string, string | number> }[]
  > = {
    description: "url reader:\tdata should not be read from non-csv file",
    inputVars: urlNotCSV,
    expectSuccess: false,
    useFunction: urlReader,
  };
  runReaderTest(inputHtmlUrlReader);

  const emptyFileUrlReader: TestFormat<
    string,
    { key: Record<string, string | number> }[]
  > = {
    description: "url reader:\tdata should be not read from empty csv file",
    inputVars: urlEmptyFile,
    expectSuccess: false,
    useFunction: urlReader,
  };
  runReaderTest(emptyFileUrlReader);

  const w3schoolUrlReader: TestFormat<
    string,
    { key: Record<string, string | number> }[]
  > = {
    description:
      "url reader:\tdata should be read from an online csv file from another website",
    inputVars: urlW3Pandas,
    expectSuccess: true,
    useFunction: urlReader,
  };
  runReaderTest(w3schoolUrlReader);
});
