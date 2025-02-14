import { describe } from 'node:test';
import { expect, test } from 'vitest';

import { LocalCSVReader as localReader, LocalCSVHeaders as localHeaders } from "../src/components/CSV_Readers/LocalCSVReader.tsx";
import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders } from "../src/components/CSV_Readers/UrlCSVReader.tsx";
import { CSVHeaders, TimeSeriesData } from '../src/types/CSVInterfaces.tsx';


interface ReaderTest<T> {
    description: string,
    filepath: string,
    successful: boolean,
    testFunction(input: string): Promise<T>
}

function runReaderTest(testObject: ReaderTest<any>): void {
    test(testObject.description, async () => {
        const toRun = () => {return testObject.testFunction(testObject.filepath)};
        if(testObject.successful){
            await expect(toRun()).resolves.toBeDefined();
        }
        else{
            await expect(toRun()).rejects.toBeDefined();
        }
    });
}

describe("Testing the localCSVReader function", () => {
    //NOTE: these tests are for testing if it can read and recognize csv files, not for if the csv is formatted correctly

    const regularFileReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from existing file",
        filepath: "../csvTestFiles/test.csv",
        successful: true,
        testFunction: localReader
    };
    runReaderTest(regularFileReader);

    const regularFileHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should be read from existing file",
        filepath: "../csvTestFiles/test.csv",
        successful: true,
        testFunction: localHeaders
    };
    runReaderTest(regularFileHeaders);

    const fakeFileReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should not be read from nonexistant file",
        filepath: "../csvTestFiles/fakeFile.csv",
        successful: false,
        testFunction: localReader
    };
    runReaderTest(fakeFileReader);

    const fakeFileHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should not be read from nonexistant file",
        filepath: "../csvTestFiles/fakeFile.csv",
        successful: false,
        testFunction: localHeaders
    };
    runReaderTest(fakeFileHeaders);

    const oneLessReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with one less header",
        filepath: "../csvTestFiles/oneLessHeader.csv",
        successful: true,
        testFunction: localReader
    }
    runReaderTest(oneLessReader);

    const oneLessHeader: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should be read from file with one less header",
        filepath: "../csvTestFiles/oneLessHeader.csv",
        successful: true,
        testFunction: localHeaders
    }
    runReaderTest(oneLessHeader);

    const oneMoreReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with one more header",
        filepath: "../csvTestFiles/oneMoreHeader.csv",
        successful: true,
        testFunction: localReader
    }
    runReaderTest(oneMoreReader);

    const oneMoreHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should be read from file with one more header",
        filepath: "../csvTestFiles/oneMoreHeader.csv",
        successful: true,
        testFunction: localHeaders
    }
    runReaderTest(oneMoreHeaders);

    const unevenDataReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with uneven data",
        filepath: "../csvTestFiles/unevenData.csv",
        successful: true,
        testFunction: localReader
    }
    runReaderTest(unevenDataReader);

    const unevenDataHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should be read from file with uneven data",
        filepath: "../csvTestFiles/unevenData.csv",
        successful: true,
        testFunction: localHeaders
    }
    runReaderTest(unevenDataHeaders);

    const differentTypesReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with different data types",
        filepath: "../csvTestFiles/differentTypes.csv",
        successful: true,
        testFunction: localReader
    }
    runReaderTest(differentTypesReader);

    const differentTypesHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should be read from file with different data types",
        filepath: "../csvTestFiles/differentTypes.csv",
        successful: true,
        testFunction: localHeaders
    }
    runReaderTest(differentTypesHeaders);

    const inputHtmlReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should not be read from non-csv file",
        filepath: "../csvTestFiles/notCsv.html",
        successful: false,
        testFunction: localReader
    }
    runReaderTest(inputHtmlReader);

    const inputHtmlHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should not be read from non-csv file",
        filepath: "../csvTestFiles/notCsv.html",
        successful: false,
        testFunction: localHeaders
    }
    runReaderTest(inputHtmlHeaders);

    const emptyFileReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be not read from empty csv file",
        filepath: "../csvTestFiles/empty.csv",
        successful: false,
        testFunction: localReader
    }
    runReaderTest(emptyFileReader);

    const emptyFileHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should not be read from empty csv file",
        filepath: "../csvTestFiles/empty.csv",
        successful: false,
        testFunction: localHeaders
    }
    runReaderTest(emptyFileHeaders);

}).catch((err: unknown) => {
    console.error((err as Error));
    throw (err as Error);
});

describe("Testing the urlCSVReader function", () => {
    //NOTE: these tests are for testing if it can read the file, not for if the csv is formatted correctly

    //urls used in tests
    const githubID2Dev = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID2Dev/csvTestFiles";
    const urlRegularFile    = `${githubID2Dev}/test.csv`;
    const urlFakeFile       = `${githubID2Dev}/FakeCSV.csv`;
    const urlOneLessHeader  = `${githubID2Dev}/oneLessHeader.csv`;
    const urlOneMoreHeader  = `${githubID2Dev}/oneMoreHeader.csv`;
    const urlUnevenData     = `${githubID2Dev}/unevenData.csv`;
    const urlDifferentTypes = `${githubID2Dev}/differentTypes.csv`;
    const urlNotCSV         = `${githubID2Dev}/notCsv.html`;
    const urlEmptyFile      = `${githubID2Dev}/empty.csv`;
    const urlW3Pandas       = "https://www.w3schools.com/python/pandas/data.csv";

    const regularFileUrl: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from existing file",
        filepath: urlRegularFile,
        successful: true,
        testFunction: urlReader
    };
    runReaderTest(regularFileUrl);

    const regularFileUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from existing file",
        filepath: urlRegularFile,
        successful: true,
        testFunction: urlHeaders
    };
    runReaderTest(regularFileUrlHeaders);

    const fakeFileUrl: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should not be read from nonexistant file",
        filepath: urlFakeFile,
        successful: false,
        testFunction: urlReader
    };
    runReaderTest(fakeFileUrl);

    const fakeFileUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should not be read from nonexistant file",
        filepath: urlFakeFile,
        successful: false,
        testFunction: urlHeaders
    };
    runReaderTest(fakeFileUrlHeaders);

    const oneLessUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with one less header",
        filepath: urlOneLessHeader,
        successful: true,
        testFunction: urlReader
    }
    runReaderTest(oneLessUrlReader);

    const oneLessUrlHeader: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from file with one less header",
        filepath: urlOneLessHeader,
        successful: true,
        testFunction: urlHeaders
    }
    runReaderTest(oneLessUrlHeader);

    const oneMoreUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with one more header",
        filepath: urlOneMoreHeader,
        successful: true,
        testFunction: urlReader
    }
    runReaderTest(oneMoreUrlReader);

    const oneMoreUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from file with one more header",
        filepath: urlOneMoreHeader,
        successful: true,
        testFunction: urlHeaders
    }
    runReaderTest(oneMoreUrlHeaders);

    const unevenDataUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with uneven data",
        filepath: urlUnevenData,
        successful: true,
        testFunction: urlReader
    }
    runReaderTest(unevenDataUrlReader);

    const unevenDataUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from file with uneven data",
        filepath: urlUnevenData,
        successful: true,
        testFunction: urlHeaders
    }
    runReaderTest(unevenDataUrlHeaders);

    const differentTypesUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with different data types",
        filepath: urlDifferentTypes,
        successful: true,
        testFunction: urlReader
    }
    runReaderTest(differentTypesUrlReader);

    const differentTypesUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from file with different data types",
        filepath: urlDifferentTypes,
        successful: true,
        testFunction: urlHeaders
    }
    runReaderTest(differentTypesUrlHeaders);

    const inputHtmlUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should not be read from non-csv file",
        filepath: urlNotCSV,
        successful: false,
        testFunction: urlReader
    }
    runReaderTest(inputHtmlUrlReader);

    const inputHtmlUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should not be read from non-csv file",
        filepath: urlNotCSV,
        successful: false,
        testFunction: urlHeaders
    }
    runReaderTest(inputHtmlUrlHeaders);

    const emptyFileUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be not read from empty csv file",
        filepath: urlEmptyFile,
        successful: false,
        testFunction: urlReader
    }
    runReaderTest(emptyFileUrlReader);

    const emptyFileUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should not be read from empty csv file",
        filepath: urlEmptyFile,
        successful: false,
        testFunction: urlHeaders
    }
    runReaderTest(emptyFileUrlHeaders);

    const w3schoolUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from an online csv file from another website",
        filepath: urlW3Pandas,
        successful: true,
        testFunction: urlReader
    }
    runReaderTest(w3schoolUrlReader);

    const w3schoolUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from an online csv file from another website",
        filepath: urlW3Pandas,
        successful: true,
        testFunction: urlHeaders
    }
    runReaderTest(w3schoolUrlHeaders);

}).catch((err: unknown) => {
    console.error((err as Error));
    throw (err as Error);
});