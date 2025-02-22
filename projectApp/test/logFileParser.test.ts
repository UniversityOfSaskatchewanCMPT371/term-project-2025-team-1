import { describe, expect, test } from "vitest";
import { hasText } from "./logFileParser";


describe('log file parser tests', () => {
    const filePath = "./test/logs.txt"

    test('file contains exact matching text', async() => {
        const response = await hasText(filePath, "end of test file");
        expect(response).toBe(true);
    });

    test("file does not contain given text", async() => {
        const response = await hasText(filePath, "error");
        expect(response).toBe(false);
    });

    test("file contains matching text ignoring case", async() => {
        const response = await hasText(filePath, "TEST");
        expect(response).toBe(true);
    });

    test("file does not exist", async() => {
        const response = await hasText("./test.txt", "TEST");
        expect(response).toBeFalsy();
    });

});