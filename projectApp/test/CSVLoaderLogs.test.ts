import { describe, expect, test } from "vitest";
//import { sendLog } from "../src/logger-frontend";
import * as fs from 'fs';

import { fileContainsText } from "./fileParser";


describe('emulating csvLoader.feature', () => {
    const path = "./logConfirmationlogs.txt";
    test('log file exists', () => {
        /*
        const testInfo = `test for log at path ${path}`;
        const testError = new Error("test error");
        const testErrMessage = `test for error at path ${path}`;
        */
        expect(fs.existsSync(path)).toBe(true);
        /*
        sendLog("info",testInfo);
        expect(fileContinsText(path,testInfo));
        sendError(testError,testErrMessage);
        expect(fileContinsText(path,testError));
        expect(fileContinsText(path,testErrMessage));
        */
        //re-add these when actual gherkin testing is done
    });
    test('emulating scenario: Confirming URL CSV entry', async () => {
        //UrlCsvReader
        const URLCSVReaderSuccess = "URLCSVReader has successfully parsed";
        //CSVDataObject
        const CSVDataObjectSetData = "data is set to";
        const CSVDataObjectSetName = "will now be called";
        const CSVDataObjectSetYHeader = "yHeader is set to";
        const loadCSVDataSuccess = "loadCSVData has loaded csv data";
        //CSVReaderModel
        const readURLFileSuccess = "readURLFile read a file";
        //BrowserUI
        const URLComponentLog = "URLComponent read:";
        await expect(fileContainsText(path,URLCSVReaderSuccess)).resolves.toBe(true);
        await expect(fileContainsText(path,CSVDataObjectSetData)).resolves.toBe(true);
        await expect(fileContainsText(path,CSVDataObjectSetName)).resolves.toBe(true);
        await expect(fileContainsText(path,CSVDataObjectSetYHeader)).resolves.toBe(true);
        await expect(fileContainsText(path,loadCSVDataSuccess)).resolves.toBe(true);
        await expect(fileContainsText(path,readURLFileSuccess)).resolves.toBe(true);
        await expect(fileContainsText(path,URLComponentLog)).resolves.toBe(true);
    });

    test('emulating scenario: Confirming invalid URL CSV entry', async () => {
        //depends on what counts as invalid
        //it was not .csv, or fetch could not find url, or file was empty, or other error
        //UrlCsvReader
        const UrlReaderNotCSV = "is not .csv or .txt";
        const UrlReaderIsEmpty = "URLCSVReader is empty";
        const UrlCSVReaderError = "URLCSVReader error";
        //CSVDataObject
        const loadCSVDataError = "loadCSVData error";
        //CSVReaderModel
        const readURLFileError = "readURLFile error";
        //BrowserUI
        const URLComponentLog = "URLComponent read:";
        const urlAnyInvalid = Promise.all([
            fileContainsText(path,UrlReaderNotCSV),
            fileContainsText(path,UrlReaderIsEmpty),
            fileContainsText(path,UrlCSVReaderError)
        ]).then((items) => items.includes(true));
        await expect(urlAnyInvalid).resolves.toBe(true);
        //expect that loadCSVDataError rethrows errors
        await expect(fileContainsText(path,loadCSVDataError)).resolves.toBe(true);
        //expect that readURLFileError rethrows errors
        await expect(fileContainsText(path,readURLFileError)).resolves.toBe(true);
        //when URLComponent implements try/catch error, replace with its message
        await expect(fileContainsText(path,URLComponentLog)).resolves.toBe(true);
    });

    test('emulating scenario: Confirming Local CSV entry', async () => {
        //LocalCsvReader
        const LocalCSVReaderSuccess = "LocalCsvReader(file) has read data";
        //CSVDataObject
        const CSVDataObjectSetData = "data is set to";
        const CSVDataObjectSetName = "will now be called";
        const CSVDataObjectSetYHeader = "yHeader is set to";
        const loadCSVDataSuccess = "loadCSVData has loaded csv data";
        //CSVReaderModel
        const readLocalFileSuccess = "readLocalFile read a file";
        //BrowserUI
        const LoadComponentLog = "LoadComponent read:";
        await expect(fileContainsText(path,LocalCSVReaderSuccess)).resolves.toBe(true);
        await expect(fileContainsText(path,CSVDataObjectSetData)).resolves.toBe(true);
        await expect(fileContainsText(path,CSVDataObjectSetName)).resolves.toBe(true);
        await expect(fileContainsText(path,CSVDataObjectSetYHeader)).resolves.toBe(true);
        await expect(fileContainsText(path,loadCSVDataSuccess)).resolves.toBe(true);
        await expect(fileContainsText(path,readLocalFileSuccess)).resolves.toBe(true);
        await expect(fileContainsText(path,LoadComponentLog)).resolves.toBe(true);
    });

    test('emulating scenario: Confirming invalid Local CSV entry', async () => {
        //depends on what counts as invalid
        //it was not .csv, or fetch could not find url, or file was empty, or other error
        //LocalCsvReader
        const LocalReaderNotCSV = "is not .csv or .txt";
        //there is no method of checking if the file is empty with LocalCsvReader(file:File)
        const LocalCSVReaderError = "LocalCsvReader(file) has errored for";
        //CSVDataObject
        const loadCSVDataError = "loadCSVData error";
        //CSVReaderModel
        const readLocalFileError = "readLocalFile error";
        //BrowserUI
        const LoadComponentLog = "LoadComponent read:";

        const localAnyInvalid = Promise.all([
            fileContainsText(path,LocalReaderNotCSV),
            fileContainsText(path,LocalCSVReaderError)
        ]).then((items) => items.includes(true));
        await expect(localAnyInvalid).resolves.toBe(true);
        //expect that loadCSVDataError rethrows errors
        await expect(fileContainsText(path,loadCSVDataError)).resolves.toBe(true);
        //expect that readURLFileError rethrows errors
        await expect(fileContainsText(path,readLocalFileError)).resolves.toBe(true);
        //when LoadComponent implements try/catch error, replace with its message
        await expect(fileContainsText(path,LoadComponentLog)).resolves.toBe(true);
    });
});