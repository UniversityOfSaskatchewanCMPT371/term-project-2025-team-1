import { describe, expect, test } from "vitest";
//import { sendLog } from "../src/logger-frontend";
import * as fs from 'fs';

import { fileContainsText } from "./fileParser";


describe('emulating csvLoader.feature', () => {
    const path = './logsCsv.txt';
    test('log file exists', () => {
        //const testInfo = `path to log file is ${path}`;
        //sendLog("info",testInfo);
        expect(fs.existsSync(path)).toBe(true);
        //expect(fileContinsText(path,testInfo));
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
        //let me know if some other logs are left out
    });

    test('emulating scenario: Confirming invalid URL CSV entry', async () => {
        //depends on what counts as invalid
        //was it a non .csv file?
        //either it was not .csv, or fetch could not find url, or file was empty, or other error
        //UrlCsvReader
        const UrlReaderNotCSV = "is not .csv or .txt";
        const UrlReaderIsEmpty = "URLCSVReader is empty";
        const UrlCSVReaderError = "URLCSVReader error";
        //CSVDataObject
        const loadCSVDataError = "loadCSVData error";
        //the error SHOULD be propegated to readURLFile, but it was caught and not rethrown by localCSVData
        //CSVReaderModel
        const readURLFileError = "readURLFile error";
        //again, if the error was caught by readURLFile, it wouldnt be rethrown to BrowserUI
        //also BrowserUI doesnt have a try/catch method, so there is no way to display the error message
        //BrowserUI
        const URLComponentLog = "URLComponent read:";

        const anyTrue = Promise.all([
            fileContainsText(path,UrlReaderNotCSV),
            fileContainsText(path,UrlReaderIsEmpty),
            fileContainsText(path,UrlCSVReaderError)
        ]).then((items) => items.includes(true));
        await expect(anyTrue).resolves.toBe(true);
        //expect that loadCSVDataError actually rethrows errors
        await expect(fileContainsText(path,loadCSVDataError)).resolves.toBe(true);
        //expect that readURLFileError ctually rethrows errors
        await expect(fileContainsText(path,readURLFileError)).resolves.toBe(true);
        //maybe replace this with whatever the error dialog should be
        await expect(fileContainsText(path,URLComponentLog)).resolves.toBe(true);
        //let me know if some other logs are left out
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
        //let me know if some other logs are left out
    });

    test('emulating scenario: Confirming invalid Local CSV entry', async () => {
        //depends on what counts as invalid
        //either it was not .csv, or fetch could not find url, or file was empty, or other error
        //LocalCsvReader
        const LocalReaderNotCSV = "is not .csv or .txt";
        //there is no method of checking if the file is empty with LocalCsvReader(file:File)
        const LocalCSVReaderError = "LocalCsvReader(file) has errored for";
        //CSVDataObject
        const loadCSVDataError = "loadCSVData error";
        //the error SHOULD be propegated to readURLFile, but it was caught and not rethrown by localCSVData
        //CSVReaderModel
        const readLocalFileError = "readLocalFile error";
        //again, if the error was caught by readURLFile, it wouldnt be rethrown to BrowserUI
        //also BrowserUI doesnt have a try/catch method, so there is no way to display the error message
        //BrowserUI
        const LoadComponentLog = "LoadComponent read:";

        const anyTrue = Promise.all([
            fileContainsText(path,LocalReaderNotCSV),
            fileContainsText(path,LocalCSVReaderError)
        ]).then((items) => items.includes(true));
        await expect(anyTrue).resolves.toBe(true);
        //expect that loadCSVDataError actually rethrows errors
        await expect(fileContainsText(path,loadCSVDataError)).resolves.toBe(true);
        //expect that readURLFileError ctually rethrows errors
        await expect(fileContainsText(path,readLocalFileError)).resolves.toBe(true);
        //maybe replace this with whatever the error dialog should be
        await expect(fileContainsText(path,LoadComponentLog)).resolves.toBe(true);
        //let me know if some other logs are left out
    });

    test('emulating scenario: Deleting a loaded CSV file', () => {
        //nothing? for now, since button has yet to have delete code implemented
        expect("There is no delete button yet").toBe("There is no delete button yet");
    });

});