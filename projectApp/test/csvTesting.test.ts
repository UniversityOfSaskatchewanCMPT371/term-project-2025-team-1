import { describe } from 'node:test';
import { afterEach, beforeEach, expect, onTestFinished, TaskState, test, TestContext } from 'vitest';

import { LocalCSVReader as localReader, LocalCSVHeaders as localHeaders } from "../src/components/CSV_Readers/LocalCSVReader.tsx";
import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders } from "../src/components/CSV_Readers/UrlCSVReader.tsx";

import logger from "../src/logging/logs.js";

describe("Testing the localCSVReader function", () => {
    beforeEach((context) => {
        console.log("yeehaw");
    })
    afterEach((test) => {
        const state: TaskState | undefined = test.task.result?.state;
        console.log(test.task.name,state);
        if(state==='pass'){
            logger.info(test.task.name,state);
        }
        else{
            logger.error(test.task.name,state);
        }
    })

    test("data should be read from valid file", async () => {
        await expect(localReader("../csvTestFiles/test.csv")).resolves.toBeDefined();
    });
    test("data should not read from nonexistant file", async () => {
        await expect(localReader("../csvTestFiles/fakeFile.csv")).rejects.toBeDefined();
    });
    test("data should not read from nonexistant file", async () => {
        await expect(localHeaders("../csvTestFiles/fakeFile.csv")).resolves.toBeDefined();
    });
});