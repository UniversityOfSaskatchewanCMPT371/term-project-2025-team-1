import { describe } from 'node:test';
import { afterEach, expect, RunnerTaskResult, test } from 'vitest';

import { LocalCSVReader as localReader, LocalCSVHeaders as localHeaders, LocalCSVReader } from "../src/components/CSV_Readers/LocalCSVReader.tsx";
import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders, UrlCSVReader } from "../src/components/CSV_Readers/UrlCSVReader.tsx";
import { CSVHeaders, TimeSeriesData } from '../src/types/CSVInterfaces.tsx';


let testResults: Promise<any> = Promise.resolve("placeholder");

interface ReaderTest<T> {
    description: string,
    filepath: string,
    successful: boolean,
    testFuncion(input: string): Promise<T>
}

function runReaderTest(testObject: ReaderTest<any>) {
    test(testObject.description, async () => {
        const toRun = () => testObject.testFuncion(testObject.filepath);
        if(testObject.successful){
            await expect(toRun()).resolves.toBeDefined();
        }
        else{
            await expect(toRun()).rejects.toBeDefined();
        }
        testResults = toRun();
    });
}

describe("Testing the localCSVReader function", () => {

    const testList: ReaderTest<any>[] = [];

    afterEach(async (test) => {
        const result: RunnerTaskResult = test.task.result!;
        if(result.state==='pass'){
            try{
                const data = await testResults;
                console.log(test.task.name+"; "+result.state.toString()+"\n",data);
            }
            catch(error: unknown){
                const data = "expected error: "+(error as Error).message;
                console.log(test.task.name+"; "+result.state.toString()+"\n",data);
            }
        }
    });

    const regularFile: ReaderTest<TimeSeriesData[]> = {
        description: "local reader: data should be read from existing file",
        filepath: "../csvTestFiles/test.csv",
        successful: true,
        testFuncion: localReader
    };

    testList.push(regularFile);

    const regularFileHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers: data should be read from existing file",
        filepath: "../csvTestFiles/test.csv",
        successful: true,
        testFuncion: localHeaders
    };

    testList.push(regularFileHeaders);

    const fakeFile: ReaderTest<TimeSeriesData[]> = {
        description: "local reader: data should not read from nonexistant file",
        filepath: "../csvTestFiles/fakeFile.csv",
        successful: false,
        testFuncion: localReader
    };

    testList.push(fakeFile);

    const fakeFileHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers: data should not read from nonexistant file",
        filepath: "../csvTestFiles/fakeFile.csv",
        successful: false,
        testFuncion: localHeaders
    };

    testList.push(fakeFileHeaders);

    testList.forEach((test) => runReaderTest(test));
});

describe("Testing the urlCSVReader function", () => {

    const testList: ReaderTest<any>[] = [];

    afterEach(async (test) => {
        const result: RunnerTaskResult = test.task.result!;
        if(result.state==='pass'){
            try{
                const data = await testResults;
                console.log(test.task.name+"; "+result.state.toString()+"\n",data);
            }
            catch(error: unknown){
                const data = "expected error: "+(error as Error).message;
                console.log(test.task.name+"; "+result.state.toString()+"\n",data);
            }
        }
    });

    const regularFileUrl: ReaderTest<TimeSeriesData[]> = {
        description: "Url reader: data should not read from nonexistant file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv",
        successful: true,
        testFuncion: urlReader
    };

    testList.push(regularFileUrl);

    const regularFileUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "Url headers: data should not read from nonexistant file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv",
        successful: true,
        testFuncion: urlHeaders
    };

    testList.push(regularFileUrlHeaders);

    const fakeFileUrl: ReaderTest<TimeSeriesData[]> = {
        description: "Url reader: data should not read from nonexistant file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/fakeFile.csv",
        successful: false,
        testFuncion: urlReader
    };

    testList.push(fakeFileUrl);

    const fakeFileUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "Url headers: data should not read from nonexistant file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/fakeFile.csv",
        successful: false,
        testFuncion: urlHeaders
    };

    testList.push(fakeFileUrlHeaders);

    testList.forEach((test) => runReaderTest(test));
});