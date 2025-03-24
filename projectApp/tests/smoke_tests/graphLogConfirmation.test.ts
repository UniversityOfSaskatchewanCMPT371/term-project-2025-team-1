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

describe("Scenario: ", () => {

  test("Check that the main scene was updated with a TimeSeriesGraph", async () => {
    const response = await fileContainsText(
        filePath,
        `a visual representation of points was created for a TimeSeriesGraph object`,
    );
    expect(response).toBe(true);
  });

  test("Check that setYData() was called", async () => {
    const response = await fileContainsText(
        filePath,
        `setYData() was called; y Data of Point set`,
    );
    expect(response).toBe(true);
  });

  test("Check that setTimeData() was called", async () => {
    const response = await fileContainsText(
        filePath,
        `setTimeData() was called; time Data of Point set`,
    );
    expect(response).toBe(true);
  });

  test("Check that the points were populated", async () => {
    const response = await fileContainsText(
        filePath,
        `populatePoints() was called`,
    );
    expect(response).toBe(true);
  });

  test("Check that 3D point positions were set", async () => {
    const response = await fileContainsText(
        filePath,
        `setPoint3DPosition() was called`,
    );
    expect(response).toBe(true);
  });

  test("Check that vector position is calculated along with point position setting", async () => {
    const response = await fileContainsText(
        filePath,
        `vector position calculated`,
    );
    expect(response).toBe(true);
  });

  test("Check that the embedded graph is instantiated with points", async () => {
    const response = await fileContainsText(
        filePath,
        `Points added to EmbeddedGraphObject`,
    );
    expect(response).toBe(true);
  });

  test("Check that each graph was created from a properly read CSV object", async () => {
    const response = await fileContainsText(
        filePath,
        `pushDataToModel() was called`,
    );
    expect(response).toBe(true);
  });

  test("Check that main scene is aware of the graph object update", async () => {
    const response = await fileContainsText(
        filePath,
        `Update main scene`,
    );
    expect(response).toBe(true);
  });

  test("Check that a TimeSeries Graph was generated", async () => {
    const response = await fileContainsText(
        filePath,
        `generateTimeSeriesGraph() was called`,
    );
    expect(response).toBe(true);
  });

});