import { describe } from 'node:test';
import { afterEach, beforeEach, expect, RunnerTaskResult, test } from 'vitest';

import { LocalCSVReader as localReader, LocalCSVHeaders as localHeaders } from "../src/components/CSV_Readers/LocalCSVReader.tsx";
import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders } from "../src/components/CSV_Readers/UrlCSVReader.tsx";

import logger from "../src/logging/logs.js";

let testResults: Promise<any> = Promise.resolve("placeholder");

describe("Testing the localCSVReader function", () => {
    beforeEach(() => {
        console.log("yeehaw");
    })
    afterEach(async (test) => {
        const result: RunnerTaskResult = test.task.result!;
        if(result.state==='pass'){
            console.log("this is shown on test = expected");
            try{
                const data = await testResults;
                console.log(data);
                logger.info(test.task.name+"; "+result.state.toString(),data);
            }
            catch(error: unknown){
                const data = "expected error: "+(error as Error).message;
                console.log(data);
                logger.info(test.task.name+"; "+result.state.toString(),data);
            }
        }
        else{
            console.log("this is shown on test not = expected");
            const testErrors: TestError[] = test.task.result?.errors as TestError[];
            logger.error(test.task.name+"; "+result.state.toString(),testErrors);
        }
    })

    test("data should be read from valid file", async () => {
        //expect test to succeed, and it does
        const toRun = () => localReader("../csvTestFiles/test.csv");
        await expect(toRun()).resolves.toBeDefined();
        testResults = toRun();
    });
    test("data should not read from nonexistant file", async () => {
        //expect test to fail, and it does
        const toRun = () => localReader("../csvTestFiles/fakeFile.csv");
        await expect(toRun()).rejects.toBeDefined();
        testResults = toRun();
    });
    test("data should not read from nonexistant file", async () => {
        //experiment with test failure
        const toRun = () => localReader("../csvTestFiles/fakeFile.csv");
        await expect(toRun()).resolves.toBeDefined();
        testResults = toRun();
    });
});