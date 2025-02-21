import { describe, expect, test } from "vitest";
import { hasText } from "./logFileParser";


describe('log file parser tests', () => {

    test('file contains exact matching text', async() => {
        const response = await hasText("Hello");
        expect(response).toBe(true);
    });

    test("file does not contain given text", async() => {
        const response = await hasText("error");
        expect(response).toBe(false);
    });

    test("file contains matching text ignoring case", async() => {
        const response = await hasText("hello");
        expect(response).toBe(true);
    })

});