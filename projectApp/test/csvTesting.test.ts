import { describe } from 'node:test';
import { afterEach, expect, Mock, RunnerTaskResult, test, vi } from 'vitest';

import { LocalCSVReader as localReader, LocalCSVHeaders as localHeaders, LocalCSVReader } from "../src/components/CSV_Readers/LocalCSVReader.tsx";
import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders, UrlCSVReader } from "../src/components/CSV_Readers/UrlCSVReader.tsx";
import { CSVHeaders, TimeSeriesData } from '../src/types/CSVInterfaces.tsx';


interface ReaderTest<T> {
    description: string,
    filepath: string,
    successful: boolean,
    testFuncion(input: string): Promise<T>
}

function runReaderTest(testObject: ReaderTest<any>) {
    test(testObject.description, async () => {
        const toRun = () => {return testObject.testFuncion(testObject.filepath)};
        try{
            if(testObject.successful){
                await expect(toRun()).resolves.toBeDefined();
            }
            else{
                await expect(toRun()).rejects.toBeDefined();
            }
        } catch(err: unknown){
            console.error("AHHH!!!");
            throw err;
        }
    });
}

describe("Testing the localCSVReader function", () => {
    //NOTE: these tests are for testing if it can read and recognize csv files, not for if the csv is formatted correctly
    const testList: ReaderTest<any>[] = [];

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

    const oneLessFile: ReaderTest<TimeSeriesData[]> = {
        description: "local headers: data should be read from file with one less header",
        filepath: "../csvTestFiles/oneLessHeader.csv",
        successful: true,
        testFuncion: localReader
    }
    testList.push(oneLessFile);

    const oneLessFileHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers: data should be read from file with one less header",
        filepath: "../csvTestFiles/oneLessHeader.csv",
        successful: true,
        testFuncion: localHeaders
    }
    testList.push(oneLessFileHeaders);

    const mockTimeSeries = vi.fn(async () => {return Promise.resolve([{"test":1},{"mock":2}]);})
    test("mock description", async () => {
        const toRun = () => {return mockTimeSeries()};
        try{
            await expect(toRun()).resolves.toBeDefined();
            expect(mockTimeSeries).toBeCalled();
        } catch(err: unknown){
            console.error("AHHH!!!");
            throw err;
        }
    });

    testList.forEach((test) => {runReaderTest(test)});
});

describe("Testing the urlCSVReader function", () => {
    //NOTE: these tests are for testing if it can read the file, not for if the csv is formatted correctly
    const testList: ReaderTest<any>[] = [];

    //what counts as "hard-coded"?
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

    testList.forEach((test) => {runReaderTest(test)});
});