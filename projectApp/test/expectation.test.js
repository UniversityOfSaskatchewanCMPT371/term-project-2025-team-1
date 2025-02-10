import { describe } from 'node:test';
import { expect, test } from 'vitest';

async function expectEmpty(input){
    return new Promise((resolve, reject) => {
        if(typeof input == "string" && input === ""){
            resolve("string is empty");
        }
        else{
            reject(new Error("should be empty"));
        }
    });
}

describe("empty should resolve", () => {
    test("data should be read from valid file", async () => {
        return expect(expectEmpty("")).resolves.toBe("string is empty");
    })
    test("nonempty should error", async () => {
        return expect(expectEmpty("no")).rejects.toThrow("should be empty");
    })
});
