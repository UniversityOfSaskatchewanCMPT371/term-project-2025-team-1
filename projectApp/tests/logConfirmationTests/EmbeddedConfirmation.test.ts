import { describe, test, expect } from "vitest";
import { fileContainsText } from "./fileParser";

/**
 * Testing the 3D Embedded Graph logging functionality
 * Run this test after following embedded_graph.feature
 */
describe("Embedded graph log tests", () => {
  const filePath = "./tests/logConfirmationTests/logConfirmationlogs.txt";

  // Check if the CreateEmbeddedGraph log calls are being reached
  test("file contains CreateEmbeddedGraph logging", async () => {
    const response = await fileContainsText(
      filePath,
      "an EmbeddedGraph has been created (CreateEmbeddedGraph.tsx)",
    );
    expect(response).toBe(true);
  });

  // Check if the addPoints() log calls are being reached
  test("file contains addPoints() logging", async () => {
    const response = await fileContainsText(
      filePath,
      "Points added to EmbeddedGraphObject (EmbeddedGraphObject.addPoints())",
    );
    expect(response).toBe(true);
  });

  // Check if the calculateVectorPosition() log calls are being reached
  test("file contains calculateVectorPosition() logging", async () => {
    const response = await fileContainsText(
      filePath,
      `vector position calculated for data at index/time 0 (EmbeddedGraphObject.calculateVectorPosition())`,
    );
    expect(response).toBe(true);
  });

  // Check if the generate() log calls are being reached
  test("file contains generate() logging", async () => {
    const response = await fileContainsText(
      filePath,
      "generate has pushed a new graph",
    );
    expect(response).toBe(true);
  });

  // Check if the UpdateGraph() log calls are being reached
  test("file contains UpdateGraph() logging", async () => {
    const response = await fileContainsText(
      filePath,
      "an EmbeddedGraph object was updated (EmbeddedGraph.tsx)",
    );
    expect(response).toBe(false);
  });

  // Check if the GenerateGraph() log calls are being reached
  test("file contains GenerateGraph() logging", async () => {
    const response = await fileContainsText(
      filePath,
      "an EmbeddedGraph visualization is being created (EmbeddedGraph.tsx)",
    );
    expect(response).toBe(true);
  });

  // Check that tau can be updated for EmbeddedGraph
  test("file contains tau value logging", async () => {
    const newTau = await fileContainsText(
      filePath,
      "value of tau in EmbeddedGraphObject updated to the value",
    );
    expect(newTau).toBe(true);
  });

  // Checking if logs for setting first differencing true is reached
  test("file contains logging for setting first differencing true", async () => {
    const activateFirstDif = await fileContainsText(
      filePath,
      "setIsFirstDifferencing() was called, first differencing is set to true",
    );
    expect(activateFirstDif).toBe(true);
  });

  // Checking if logs for calculating points for first differencing is reached
  test("file contains logs for calculating first differencing points", async () => {
    const calculateFirstDif = await fileContainsText(
      filePath,
      "first differencing point calculation completed",
    );
    expect(calculateFirstDif).toBe(true);
  });
});
