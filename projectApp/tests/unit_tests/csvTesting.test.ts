import { describe, expect, test } from 'vitest';

import {
    LocalCSVReader as localReader,
    LocalCSVHeaders as localHeaders,
    UrlCSVReader as urlReader,
    UrlCSVHeaders as urlHeaders,
    //LocalCsvReader as localFileReader
} from "../../src/components/Csv_Components/CSVReaders.tsx";
import { CSVHeaders, TimeSeriesData } from '../../src/types/CSVInterfaces.tsx';
//import { readFileSync } from 'fs';


interface TestFormat<Input,Output> {
    description: string;
    inputVars: Input | Promise<Input>;
    expectSuccess: boolean;
    useFunction(input: Input): Promise<Output>;
}

function runReaderTest(testObject: TestFormat<string | File, TimeSeriesData[] | CSVHeaders>): void {
    test(testObject.description, async () => {
        if(testObject.expectSuccess){
            if(testObject.inputVars instanceof Promise){
                await expect(testObject.inputVars).resolves.toBeDefined()
            }
            const awaitPath = await testObject.inputVars;
            const toRun = () => testObject.useFunction(awaitPath);
            await expect(toRun()).resolves.toBeDefined();
        } else {
            try{
                //expect either filePath gives errors or toRun gives errors
                const awaitPath = await testObject.inputVars;
                const toRun = () => testObject.useFunction(awaitPath);
                await expect(toRun()).rejects.toBeDefined();
            } catch(err:unknown){
                if(testObject.inputVars instanceof Promise){
                    await expect(testObject.inputVars).rejects.toBeDefined();
                }
                else{
                    console.log((err as Error).message);
                }
            }
        }
    });
}

//filepaths for localCSVReader(path) and Headers and localCsvReader(file):
const relativePathToFiles   = "../csvTestFiles"
const localRegularFile      = `${relativePathToFiles}/test.csv`;
const localFakeFile         = `${relativePathToFiles}/fakeFile.csv`;
const localOneLessHeader    = `${relativePathToFiles}/oneLessHeader.csv`;
const localOneMoreHeader    = `${relativePathToFiles}/oneMoreHeader.csv`;
const localUnevenData       = `${relativePathToFiles}/unevenData.csv`;
const localDifferentTypes   = `${relativePathToFiles}/differentTypes.csv`;
const localNotCSV           = `${relativePathToFiles}/notCsv.html`;
const localEmptyFile        = `${relativePathToFiles}/empty.csv`;

describe("Testing the localCSVReader(string) function", () => {
    //NOTE: these tests are for testing if it can read and recognize csv files, not for if the csv is formatted correctly

    const regularFileReader: TestFormat<string,TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from existing file",
        inputVars: localRegularFile,
        expectSuccess: true,
        useFunction: localReader
    };
    runReaderTest(regularFileReader);

    const regularFileHeaders: TestFormat<string,CSVHeaders> = {
        description: "local headers:\theaders should be read from existing file",
        inputVars: localRegularFile,
        expectSuccess: true,
        useFunction: localHeaders
    };
    runReaderTest(regularFileHeaders);

    const fakeFileReader: TestFormat<string,TimeSeriesData[]> = {
        description: "local reader:\tdata should not be read from nonexistant file",
        inputVars: localFakeFile,
        expectSuccess: false,
        useFunction: localReader
    };
    runReaderTest(fakeFileReader);

    const fakeFileHeaders: TestFormat<string,CSVHeaders> = {
        description: "local headers:\theaders should not be read from nonexistant file",
        inputVars: localFakeFile,
        expectSuccess: false,
        useFunction: localHeaders
    };
    runReaderTest(fakeFileHeaders);

    const oneLessReader: TestFormat<string,TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with one less header",
        inputVars: localOneLessHeader,
        expectSuccess: true,
        useFunction: localReader
    }
    runReaderTest(oneLessReader);

    const oneLessHeader: TestFormat<string,CSVHeaders> = {
        description: "local headers:\theaders should be read from file with one less header",
        inputVars: localOneLessHeader,
        expectSuccess: true,
        useFunction: localHeaders
    }
    runReaderTest(oneLessHeader);

    const oneMoreReader: TestFormat<string,TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with one more header",
        inputVars: localOneMoreHeader,
        expectSuccess: true,
        useFunction: localReader
    }
    runReaderTest(oneMoreReader);

    const oneMoreHeaders: TestFormat<string,CSVHeaders> = {
        description: "local headers:\theaders should be read from file with one more header",
        inputVars: localOneMoreHeader,
        expectSuccess: true,
        useFunction: localHeaders
    }
    runReaderTest(oneMoreHeaders);

    const unevenDataReader: TestFormat<string,TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with uneven data",
        inputVars: localUnevenData,
        expectSuccess: true,
        useFunction: localReader
    }
    runReaderTest(unevenDataReader);

    const unevenDataHeaders: TestFormat<string,CSVHeaders> = {
        description: "local headers:\theaders should be read from file with uneven data",
        inputVars: localUnevenData,
        expectSuccess: true,
        useFunction: localHeaders
    }
    runReaderTest(unevenDataHeaders);

    const differentTypesReader: TestFormat<string,TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with different data types",
        inputVars: localDifferentTypes,
        expectSuccess: true,
        useFunction: localReader
    }
    runReaderTest(differentTypesReader);

    const differentTypesHeaders: TestFormat<string,CSVHeaders> = {
        description: "local headers:\theaders should be read from file with different data types",
        inputVars: localDifferentTypes,
        expectSuccess: true,
        useFunction: localHeaders
    }
    runReaderTest(differentTypesHeaders);

    const inputHtmlReader: TestFormat<string,TimeSeriesData[]> = {
        description: "local reader:\tdata should not be read from non-csv file",
        inputVars: localNotCSV,
        expectSuccess: false,
        useFunction: localReader
    }
    runReaderTest(inputHtmlReader);

    const inputHtmlHeaders: TestFormat<string,CSVHeaders> = {
        description: "local headers:\theaders should not be read from non-csv file",
        inputVars: localNotCSV,
        expectSuccess: false,
        useFunction: localHeaders
    }
    runReaderTest(inputHtmlHeaders);

    const emptyFileReader: TestFormat<string,TimeSeriesData[]> = {
        description: "local reader:\tdata should be not read from empty csv file",
        inputVars: localEmptyFile,
        expectSuccess: false,
        useFunction: localReader
    }
    runReaderTest(emptyFileReader);

    const emptyFileHeaders: TestFormat<string,CSVHeaders> = {
        description: "local headers:\theaders should not be read from empty csv file",
        inputVars: localEmptyFile,
        expectSuccess: false,
        useFunction: localHeaders
    }
    runReaderTest(emptyFileHeaders);

});

// apparently FileReader can only exist in the web app environment, it cant be tested in nodejs/vitest
/*
async function pathStrToFile(filePath: string): Promise<File> {
    const reader = readFileSync(filePath, "utf-8");
    return new File([reader],filePath);
}

describe("Testing localCsvReader(file) function", async () => {

    const regularFileReader: TestFormat<File,TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from existing file",
        inputVars: pathStrToFile(localRegularFile),
        expectSuccess: true,
        useFunction: localFileReader
    };
    runReaderTest(regularFileReader);

    const fakeFileReader: TestFormat<File,TimeSeriesData[]> = {
        description: "local reader:\tdata should not be read from nonexistant file",
        inputVars: pathStrToFile(localFakeFile),
        expectSuccess: false,
        useFunction: localFileReader
    };
    runReaderTest(fakeFileReader);

    const oneLessReader: TestFormat<File,TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with one less header",
        inputVars: pathStrToFile(localOneLessHeader),
        expectSuccess: true,
        useFunction: localFileReader
    }
    runReaderTest(oneLessReader);

    const oneMoreReader: TestFormat<File,TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with one more header",
        inputVars: pathStrToFile(localOneMoreHeader),
        expectSuccess: true,
        useFunction: localFileReader
    }
    runReaderTest(oneMoreReader);

    const unevenDataReader: TestFormat<File,TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with uneven data",
        inputVars: pathStrToFile(localUnevenData),
        expectSuccess: true,
        useFunction: localFileReader
    }
    runReaderTest(unevenDataReader);

    const differentTypesReader: TestFormat<File,TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with different data types",
        inputVars: pathStrToFile(localDifferentTypes),
        expectSuccess: true,
        useFunction: localFileReader
    }
    runReaderTest(differentTypesReader);

    const inputHtmlReader: TestFormat<File,TimeSeriesData[]> = {
        description: "local reader:\tdata should not be read from non-csv file",
        inputVars: pathStrToFile(localNotCSV),
        expectSuccess: false,
        useFunction: localFileReader
    }
    runReaderTest(inputHtmlReader);

    const emptyFileReader: TestFormat<File,TimeSeriesData[]> = {
        description: "local reader:\tdata should be not read from empty csv file",
        inputVars: pathStrToFile(localEmptyFile),
        expectSuccess: false,
        useFunction: localFileReader
    }
    runReaderTest(emptyFileReader);
})
*/

//urls used in urlCSVReader and Headers
const githubID2Dev      = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID2Dev/csvTestFiles";
const urlRegularFile    = `${githubID2Dev}/test.csv`;
const urlFakeFile       = `${githubID2Dev}/fakeFile.csv`;
const urlOneLessHeader  = `${githubID2Dev}/oneLessHeader.csv`;
const urlOneMoreHeader  = `${githubID2Dev}/oneMoreHeader.csv`;
const urlUnevenData     = `${githubID2Dev}/unevenData.csv`;
const urlDifferentTypes = `${githubID2Dev}/differentTypes.csv`;
const urlNotCSV         = `${githubID2Dev}/notCsv.html`;
const urlEmptyFile      = `${githubID2Dev}/empty.csv`;
const urlW3Pandas       = "https://www.w3schools.com/python/pandas/data.csv";

describe("Testing the urlCSVReader function", () => {

    //NOTE: these tests are for testing if it can read the file, not for if the csv is formatted correctly


    const regularFileUrl: TestFormat<string,TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from existing file",
        inputVars: urlRegularFile,
        expectSuccess: true,
        useFunction: urlReader
    };
    runReaderTest(regularFileUrl);

    const regularFileUrlHeaders: TestFormat<string,CSVHeaders> = {
        description: "url headers:\theaders should be read from existing file",
        inputVars: urlRegularFile,
        expectSuccess: true,
        useFunction: urlHeaders
    };
    runReaderTest(regularFileUrlHeaders);

    const fakeFileUrl: TestFormat<string,TimeSeriesData[]> = {
        description: "url reader:\tdata should not be read from nonexistant file",
        inputVars: urlFakeFile,
        expectSuccess: false,
        useFunction: urlReader
    };
    runReaderTest(fakeFileUrl);

    const fakeFileUrlHeaders: TestFormat<string,CSVHeaders> = {
        description: "url headers:\theaders should not be read from nonexistant file",
        inputVars: urlFakeFile,
        expectSuccess: false,
        useFunction: urlHeaders
    };
    runReaderTest(fakeFileUrlHeaders);

    const oneLessUrlReader: TestFormat<string,TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with one less header",
        inputVars: urlOneLessHeader,
        expectSuccess: true,
        useFunction: urlReader
    }
    runReaderTest(oneLessUrlReader);

    const oneLessUrlHeader: TestFormat<string,CSVHeaders> = {
        description: "url headers:\theaders should be read from file with one less header",
        inputVars: urlOneLessHeader,
        expectSuccess: true,
        useFunction: urlHeaders
    }
    runReaderTest(oneLessUrlHeader);

    const oneMoreUrlReader: TestFormat<string,TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with one more header",
        inputVars: urlOneMoreHeader,
        expectSuccess: true,
        useFunction: urlReader
    }
    runReaderTest(oneMoreUrlReader);

    const oneMoreUrlHeaders: TestFormat<string,CSVHeaders> = {
        description: "url headers:\theaders should be read from file with one more header",
        inputVars: urlOneMoreHeader,
        expectSuccess: true,
        useFunction: urlHeaders
    }
    runReaderTest(oneMoreUrlHeaders);

    const unevenDataUrlReader: TestFormat<string,TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with uneven data",
        inputVars: urlUnevenData,
        expectSuccess: true,
        useFunction: urlReader
    }
    runReaderTest(unevenDataUrlReader);

    const unevenDataUrlHeaders: TestFormat<string,CSVHeaders> = {
        description: "url headers:\theaders should be read from file with uneven data",
        inputVars: urlUnevenData,
        expectSuccess: true,
        useFunction: urlHeaders
    }
    runReaderTest(unevenDataUrlHeaders);

    const differentTypesUrlReader: TestFormat<string,TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with different data types",
        inputVars: urlDifferentTypes,
        expectSuccess: true,
        useFunction: urlReader
    }
    runReaderTest(differentTypesUrlReader);

    const differentTypesUrlHeaders: TestFormat<string,CSVHeaders> = {
        description: "url headers:\theaders should be read from file with different data types",
        inputVars: urlDifferentTypes,
        expectSuccess: true,
        useFunction: urlHeaders
    }
    runReaderTest(differentTypesUrlHeaders);

    const inputHtmlUrlReader: TestFormat<string,TimeSeriesData[]> = {
        description: "url reader:\tdata should not be read from non-csv file",
        inputVars: urlNotCSV,
        expectSuccess: false,
        useFunction: urlReader
    }
    runReaderTest(inputHtmlUrlReader);

    const inputHtmlUrlHeaders: TestFormat<string,CSVHeaders> = {
        description: "url headers:\theaders should not be read from non-csv file",
        inputVars: urlNotCSV,
        expectSuccess: false,
        useFunction: urlHeaders
    }
    runReaderTest(inputHtmlUrlHeaders);

    const emptyFileUrlReader: TestFormat<string,TimeSeriesData[]> = {
        description: "url reader:\tdata should be not read from empty csv file",
        inputVars: urlEmptyFile,
        expectSuccess: false,
        useFunction: urlReader
    }
    runReaderTest(emptyFileUrlReader);

    const emptyFileUrlHeaders: TestFormat<string,CSVHeaders> = {
        description: "url headers:\theaders should not be read from empty csv file",
        inputVars: urlEmptyFile,
        expectSuccess: false,
        useFunction: urlHeaders
    }
    runReaderTest(emptyFileUrlHeaders);

    const w3schoolUrlReader: TestFormat<string,TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from an online csv file from another website",
        inputVars: urlW3Pandas,
        expectSuccess: true,
        useFunction: urlReader
    }
    runReaderTest(w3schoolUrlReader);

    const w3schoolUrlHeaders: TestFormat<string,CSVHeaders> = {
        description: "url headers:\theaders should be read from an online csv file from another website",
        inputVars: urlW3Pandas,
        expectSuccess: true,
        useFunction: urlHeaders
    }
    runReaderTest(w3schoolUrlHeaders);
});