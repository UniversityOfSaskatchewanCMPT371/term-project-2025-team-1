import * as fsPromise from 'fs/promises';
import Papa from 'papaparse';

import {CSVHeaders, TimeSeriesData} from '../../types/CSVInterfaces';
import { sendError, sendLog } from '../../logger-frontend';


/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export async function LocalCSVHeaders(file:string): Promise<CSVHeaders> {
    return LocalCSVReader(file).then((timeSeries) => {
        const csvheaders: CSVHeaders = { headers: Object.keys(timeSeries[0]) };
        sendLog("info",`LocalCSVReader.LocalCSVHeader() has returned ${JSON.stringify(csvheaders)}`);
        return csvheaders;
    }).catch((err:unknown) => {
        sendError(err,`LocalCSVReader.LocalCSVHeader() error for file ${file}`);
        throw (err as Error);
    });
}

/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export async function LocalCSVReader(file:string): Promise<TimeSeriesData[]>{
    if(!file.endsWith('.csv') && !file.endsWith('.txt')){
        const typeError = new TypeError('File must be .csv or .txt');
        sendError(typeError,`LocalCSVReader.LocalCSVReader() ${file} is not .csv or .txt`);
        throw typeError;
    }
    return fsPromise.readFile(file, 'utf8').then((data: string) => {
        let timeSeries: TimeSeriesData[] = []
        Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            complete: function(parsed: Papa.ParseResult<TimeSeriesData>){
                timeSeries = parsed.data;
                if(timeSeries.length === 0){
                    throw new RangeError("LocalCSVReader is empty");
                }
                sendLog("info",`LocalCSVReader.LocalCSVReader() has successfully parsed\n${JSON.stringify(timeSeries)}`);
            },
            error: function(parseError: Error) {
                //this will be caught by promise.catch
                throw parseError;
            }
        });
        return timeSeries;
    }).catch((err: unknown) => {
        sendError(err,"LocalCSVReader.LocalCSVReader() error");
        throw (err as Error);
    });
};


//This one is for local reader but refactored to read a file

export function LocalCsvReader(file: File): Promise<TimeSeriesData[]>{
    return new Promise<TimeSeriesData[]>((resolve, reject) => {
        //hey yall, async functions are implicitly returning promises,
        //even if they dont resolve to anything, they'd be Promise<void>
        //returning a promise will result in a Promise<Promise<TimeSeriesData[]>>
        //which thankfully resolves back to TSD when awaited or then chained
        //i wont change how things are implemented, just letting yall know
        if(!file.name.endsWith('.csv') && !file.name.endsWith('.txt')){
            const typeError = new TypeError('File must be .csv or .txt');
            sendError(typeError,`LocalCSVReader.LocalCsvReader(file) ${file.name} is not .csv or .txt`);
            throw typeError;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target?.result as string;

            Papa.parse(fileContent, {
                header: true,
                dynamicTyping: true,
                complete: function (parsed: {data: TimeSeriesData[]}){
                    sendLog("info",`LocalCSVReader.LocalCsvReader(file) has read data\n${JSON.stringify(parsed.data)}`);
                    const typedData: TimeSeriesData[] = parsed.data;
                    resolve(typedData); // Resolve the promise with parsed data
                },
                error: function (parseError: Error) {
                    sendError(parseError,`LocalCSVReader.LocalCsvReader(file) has errored for ${file.name}`);
                    reject(parseError); // Reject the promise on parsing error
                }
            });
        };

        reader.onerror = () => {
            const undescriptiveError = new Error("Error");
            sendError(undescriptiveError,`LocalCSVReader.LocalCsvReader(file) has errored for ${file.name}`);
            reject(undescriptiveError);

        }
        reader.readAsText(file);
        
    });
}
