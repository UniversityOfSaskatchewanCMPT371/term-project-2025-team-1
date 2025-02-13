import { describe } from 'node:test';
import { expect, test } from 'vitest';

import { LocalCSVReader as localReader, LocalCSVHeaders as localHeaders } from "../src/components/CSV_Readers/LocalCSVReader.tsx";
import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders } from "../src/components/CSV_Readers/UrlCSVReader.tsx";
import { CSVHeaders, TimeSeriesData } from '../src/types/CSVInterfaces.tsx';


interface ReaderTest<T> {
    description: string,
    filepath: string,
    successful: boolean,
    testFuncion(input: string): Promise<T>
}

function runReaderTest(testObject: ReaderTest<any>): void {
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
    const localCsvTestList: ReaderTest<any>[] = [];

    const regularFileReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from existing file",
        filepath: "../csvTestFiles/test.csv",
        successful: true,
        testFuncion: localReader
    };
    localCsvTestList.push(regularFileReader);

    const regularFileHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should be read from existing file",
        filepath: "../csvTestFiles/test.csv",
        successful: true,
        testFuncion: localHeaders
    };
    localCsvTestList.push(regularFileHeaders);

    const fakeFileReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should not be read from nonexistant file",
        filepath: "../csvTestFiles/fakeFile.csv",
        successful: false,
        testFuncion: localReader
    };
    localCsvTestList.push(fakeFileReader);

    const fakeFileHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should not be read from nonexistant file",
        filepath: "../csvTestFiles/fakeFile.csv",
        successful: false,
        testFuncion: localHeaders
    };
    localCsvTestList.push(fakeFileHeaders);

    const oneLessReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with one less header",
        filepath: "../csvTestFiles/oneLessHeader.csv",
        successful: true,
        testFuncion: localReader
    }
    localCsvTestList.push(oneLessReader);

    const oneLessHeader: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should be read from file with one less header",
        filepath: "../csvTestFiles/oneLessHeader.csv",
        successful: true,
        testFuncion: localHeaders
    }
    localCsvTestList.push(oneLessHeader);

    const oneMoreReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with one more header",
        filepath: "../csvTestFiles/oneMoreHeader.csv",
        successful: true,
        testFuncion: localReader
    }
    localCsvTestList.push(oneMoreReader);

    const oneMoreHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should be read from file with one more header",
        filepath: "../csvTestFiles/oneMoreHeader.csv",
        successful: true,
        testFuncion: localHeaders
    }
    localCsvTestList.push(oneMoreHeaders);

    const unevenDataReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with uneven data",
        filepath: "../csvTestFiles/unevenData.csv",
        successful: true,
        testFuncion: localReader
    }
    localCsvTestList.push(unevenDataReader);

    const unevenDataHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should be read from file with uneven data",
        filepath: "../csvTestFiles/unevenData.csv",
        successful: true,
        testFuncion: localHeaders
    }
    localCsvTestList.push(unevenDataHeaders);

    const differentTypesReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be read from file with different data types",
        filepath: "../csvTestFiles/differentTypes.csv",
        successful: true,
        testFuncion: localReader
    }
    localCsvTestList.push(differentTypesReader);

    const differentTypesHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should be read from file with different data types",
        filepath: "../csvTestFiles/differentTypes.csv",
        successful: true,
        testFuncion: localHeaders
    }
    localCsvTestList.push(differentTypesHeaders);

    const inputHtmlReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should not be read from non-csv file",
        filepath: "../csvTestFiles/notCsv.html",
        successful: false,
        testFuncion: localReader
    }
    localCsvTestList.push(inputHtmlReader);

    const inputHtmlHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should not be read from non-csv file",
        filepath: "../csvTestFiles/notCsv.html",
        successful: false,
        testFuncion: localHeaders
    }
    localCsvTestList.push(inputHtmlHeaders);

    const emptyFileReader: ReaderTest<TimeSeriesData[]> = {
        description: "local reader:\tdata should be not read from empty csv file",
        filepath: "../csvTestFiles/empty.csv",
        successful: false,
        testFuncion: localReader
    }
    localCsvTestList.push(emptyFileReader);

    const emptyFileHeaders: ReaderTest<CSVHeaders> = {
        description: "local headers:\theaders should not be read from empty csv file",
        filepath: "../csvTestFiles/empty.csv",
        successful: false,
        testFuncion: localHeaders
    }
    localCsvTestList.push(emptyFileHeaders);

    localCsvTestList.forEach((test) => {runReaderTest(test)});
}).catch((err: unknown) => {
    console.error((err as Error));
    throw (err as Error);
});

describe("Testing the urlCSVReader function", () => {
    //NOTE: these tests are for testing if it can read the file, not for if the csv is formatted correctly
    const urlCsvTestList: ReaderTest<any>[] = [];

    //what counts as "hard-coded"?
    const regularFileUrl: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from existing file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv",
        successful: true,
        testFuncion: urlReader
    };
    urlCsvTestList.push(regularFileUrl);

    const regularFileUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from existing file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv",
        successful: true,
        testFuncion: urlHeaders
    };
    urlCsvTestList.push(regularFileUrlHeaders);

    const fakeFileUrl: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should not be read from nonexistant file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/fakeFile.csv",
        successful: false,
        testFuncion: urlReader
    };
    urlCsvTestList.push(fakeFileUrl);

    const fakeFileUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should not be read from nonexistant file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/fakeFile.csv",
        successful: false,
        testFuncion: urlHeaders
    };
    urlCsvTestList.push(fakeFileUrlHeaders);

    const oneLessUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with one less header",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/oneLessHeader.csv",
        successful: true,
        testFuncion: urlReader
    }
    urlCsvTestList.push(oneLessUrlReader);

    const oneLessUrlHeader: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from file with one less header",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/oneLessHeader.csv",
        successful: true,
        testFuncion: urlHeaders
    }
    urlCsvTestList.push(oneLessUrlHeader);

    const oneMoreUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with one more header",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/oneMoreHeader.csv",
        successful: true,
        testFuncion: urlReader
    }
    urlCsvTestList.push(oneMoreUrlReader);

    const oneMoreUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from file with one more header",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/oneMoreHeader.csv",
        successful: true,
        testFuncion: urlHeaders
    }
    urlCsvTestList.push(oneMoreUrlHeaders);

    const unevenDataUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with uneven data",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/unevenData.csv",
        successful: true,
        testFuncion: urlReader
    }
    urlCsvTestList.push(unevenDataUrlReader);

    const unevenDataUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from file with uneven data",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/unevenData.csv",
        successful: true,
        testFuncion: urlHeaders
    }
    urlCsvTestList.push(unevenDataUrlHeaders);

    const differentTypesUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from file with different data types",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/differentTypes.csv",
        successful: true,
        testFuncion: urlReader
    }
    urlCsvTestList.push(differentTypesUrlReader);

    const differentTypesUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from file with different data types",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/differentTypes.csv",
        successful: true,
        testFuncion: urlHeaders
    }
    urlCsvTestList.push(differentTypesUrlHeaders);

    const inputHtmlUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should not be read from non-csv file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/notCsv.html",
        successful: false,
        testFuncion: urlReader
    }
    urlCsvTestList.push(inputHtmlUrlReader);

    const inputHtmlUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should not be read from non-csv file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/notCsv.html",
        successful: false,
        testFuncion: urlHeaders
    }
    urlCsvTestList.push(inputHtmlUrlHeaders);

    const emptyFileUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be not read from empty csv file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/empty.csv",
        successful: false,
        testFuncion: urlReader
    }
    urlCsvTestList.push(emptyFileUrlReader);

    const emptyFileUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should not be read from empty csv file",
        filepath: "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/empty.csv",
        successful: false,
        testFuncion: urlHeaders
    }
    urlCsvTestList.push(emptyFileUrlHeaders);

    const w3schoolUrlReader: ReaderTest<TimeSeriesData[]> = {
        description: "url reader:\tdata should be read from an online csv file from another website",
        filepath: "https://www.w3schools.com/python/pandas/data.csv",
        successful: true,
        testFuncion: urlReader
    }
    urlCsvTestList.push(w3schoolUrlReader);

    const w3schoolUrlHeaders: ReaderTest<CSVHeaders> = {
        description: "url headers:\theaders should be read from an online csv file from another website",
        filepath: "https://www.w3schools.com/python/pandas/data.csv",
        successful: true,
        testFuncion: urlHeaders
    }
    urlCsvTestList.push(w3schoolUrlHeaders);

    urlCsvTestList.forEach((test) => {runReaderTest(test)});
}).catch((err: unknown) => {
    console.error((err as Error));
    throw (err as Error);
});