import { describe, expect, test } from "vitest";
import { fileContainsText } from "./fileParser";

describe("log file parser tests", () => {
  const filePath = "./tests/logConfirmationTests/testlogfile.txt";

  test("file contains exact matching text", async () => {
    const response = await fileContainsText(filePath, "end of test file");
    expect(response).toBe(true);
  });

  test("file does not contain given text", async () => {
    const response = await fileContainsText(filePath, "error");
    expect(response).toBe(false);
  });

  test("file contains matching text ignoring case", async () => {
    const response = await fileContainsText(filePath, "TEST");
    expect(response).toBe(true);
  });

  test("file does not exist", async () => {
    const response = await fileContainsText("./test.txt", "TEST");
    expect(response).toBeFalsy();
  });
});
