import { describe, expect, test, vi } from "vitest";
import { sendError, sendLog } from "../src/logger-frontend";
import * as fs from 'fs';

import { fileContainsText } from "./fileParser";


describe('emulating csvLoader.feature', () => {
    const path = __dirname + '/../logsCsv.txt';
    test('log file exists', () => {
        const path = __dirname + '/../logs.txt';
        sendLog("info",`path to log file is ${path}`);
        expect(fs.existsSync(path)).toBe(true);
    });
    test('emulating scenario: Confirming URL CSV entry', () => {
        //CSVDataObject
        const URLCSVReaderSuccess = "URLCSVReader has successfully parsed";
        const CSVDataObjectSetData = "data is set to";
        const CSVDataObjectSetName = "will now be called";
        const CSVDataObjectSetYHeader = "yHeader is set to";
        const loadCSVDataSuccess = "loadCSVData has loaded csv data";
        //CSVReaderModel
        const readURLFileSuccess = "readURLFile read a file";
        //BrowserUI
        const LoadComponentLog = "URLComponent read:";
        expect(fileContainsText(path,URLCSVReaderSuccess)).resolves.toBe(true);
        expect(fileContainsText(path,CSVDataObjectSetData)).resolves.toBe(true);
        expect(fileContainsText(path,CSVDataObjectSetName)).resolves.toBe(true);
        expect(fileContainsText(path,CSVDataObjectSetYHeader)).resolves.toBe(true);
        expect(fileContainsText(path,loadCSVDataSuccess)).resolves.toBe(true);
        expect(fileContainsText(path,readURLFileSuccess)).resolves.toBe(true);
        expect(fileContainsText(path,LoadComponentLog)).resolves.toBe(true);
        //let me know if some other logs are left out
    });

});