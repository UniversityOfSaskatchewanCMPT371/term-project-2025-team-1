import Papa from "papaparse";
import * as fsPromise from 'fs/promises';
import { CSVHeaders, TimeSeriesData } from "../../types/CSVInterfaces";
import { sendError, sendLog } from "../../logger-frontend";

/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
*
* Pre-conditions: file path must be a valid file path to a .csv or .txt file.
* Post-conditions:
*    None (the function does not modify any external state).
*    The returned promise resolves to an object containing the headers of the CSV file.
*    If the file is empty or cannot be parsed, an error is thrown.
**/    
export async function LocalCSVHeaders(file:string): Promise<CSVHeaders> {
    return LocalCSVReader(file).then((timeSeries) => {
        const headers: CSVHeaders = { headers: Object.keys(timeSeries[0]) };
        sendLog("info",`LocalCSVHeaders returns\n${headers}`);
        return (headers);
    // Rethrowing errors
    }).catch((err:unknown) => {
        sendError(err,`LocalCSVHeaders error`);
        throw (err as Error);
    });
}

/**
 * Get the headers of a file at a url
 * 
 * @param url address of the file
 * 
 * @precondition url must be a valid url to a csv file
 * @postcondition returns the headers of the file as a CSVHeaders
 * 
 * @returns Headers of the file as a CSVHeaders
 */
export async function UrlCSVHeaders(url:string): Promise<CSVHeaders> {
    return UrlCSVReader(url).then((timeSeries) => {
        const headers: CSVHeaders = { headers: Object.keys(timeSeries[0]) };
        sendLog("info",`UrlCSVHeaders returns\n${headers}`);
        return (headers);
    // Rethrowing errors
    }).catch((err: unknown) => {
        sendError(err,`LocalCSVHeaders error`);
        throw (err as Error);
    });
 }

/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
*
* Pre-conditions: file path must be a valid file path to a .csv or .txt file.
* Post-conditions:
*    None (the function does not modify any external state).
*    The returned promise resolves to an object containing the headers of the CSV file.
*    If the file is empty or cannot be parsed, an error is thrown.
**/
export async function LocalCSVReader(file:string): Promise<TimeSeriesData[]>{
    if(!file.endsWith('.csv') && !file.endsWith('.txt')){
        const nonCSVErr = new Error('File must be .csv or .txt');
        sendError(nonCSVErr,`LocalCSVReader ${file} is not .csv or .txt`);
        throw nonCSVErr;
    }
    return fsPromise.readFile(file, 'utf8').then((data: string) => {
        let timeSeries: TimeSeriesData[] = []
        Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            complete: function(parsed: Papa.ParseResult<TimeSeriesData>){
                timeSeries = parsed.data;
                if(timeSeries.length === 0){
                    throw new Error("LocalCSVReader is empty");
                }
                sendLog("info",`LocalCSVReader has successfully parsed\n${JSON.stringify(timeSeries)}`);
            },
            error: function(parseError: Error) {
                // this will be caught by promise.catch
                throw parseError;
            }
        });
        return timeSeries;
    }).catch((err: unknown) => {
        sendError(err,"LocalCSVReader error");
        throw (err as Error);
    });
};


/**  
* Reads a CSV file from a File Object (local reader) and returns an array of time series data.
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
*
* Pre-conditions: file path must be a valid file path to a .csv or .txt file.
* Post-conditions:
*    None (the function does not modify any external state).
*    The returned promise resolves to an object containing the headers of the CSV file.
*    If the file is empty or cannot be parsed, an error is thrown.
**/
export function LocalCsvReader(file: File): Promise<TimeSeriesData[]>{
    return new Promise<TimeSeriesData[]>((resolve, reject) => {
        if(!file.name.endsWith('.csv') && !file.name.endsWith('.txt')){
            const nonCSVErr = new Error("file must be csv or txt");
            sendError(nonCSVErr,`LocalCsvReader(file) ${file.name} is not .csv or .txt`);
            reject(nonCSVErr);
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target?.result as string;

            if(!fileContent.trim()){
                const emptyFileErr = new Error("Empty file set");
                sendError(emptyFileErr,`LocalCsvReader(file) ${file.name} is empty`);
                reject(emptyFileErr);
                return;
            }

            Papa.parse(fileContent, {
                header: true,
                dynamicTyping: true,
                complete: function (parsed: {data: TimeSeriesData[]}){
                    sendLog("info",`LocalCsvReader(file) has read data\n${JSON.stringify(parsed.data)}`);
                    const typedData: TimeSeriesData[] = parsed.data;
                    resolve(typedData); // Resolve the promise with parsed data
                },
                error: function (parseError: Error) {
                    sendError(parseError,`LocalCsvReader(file) has errored for ${file.name}`);
                    reject(parseError); // Reject the promise on parsing error
                }
            });
        };

        reader.onerror = () => {
            const readerErr = new Error("reader error");
            sendError(readerErr,`LocalCsvReader(file) has errored for ${file.name}`);
            reject(readerErr);
        }
        reader.readAsText(file);
        
    });
}

/**
 * Get the time series data from a file at a url
 * 
 * @param url address of the file
 * @precondition url must be a valid url to a csv file
 * @postcondition returns the data of the file formatted as TimeSeriesData[]
 * @returns data of file formatted as TimeSeriesData[]
 */
export async function UrlCSVReader(url:string): Promise<TimeSeriesData[]>{
    if(!url.endsWith('.csv') && !url.endsWith('.txt')){
        const nonCSVErr = new Error('url must be .csv or .txt');
        sendError(nonCSVErr,`UrlCSVReader ${url} is not .csv or .txt`);
        throw nonCSVErr;
    }
    else{
        return fetch(url).then((response: Response) =>{
            if (!response.ok) {
                const badResponseErr = Error(`Failed to fetch the file. Status: ${response.status.toString()}`);
                sendError(badResponseErr,"UrlCSVReader response is not ok");
                throw badResponseErr;
            }
            return response.text();
        }).then((csvData: string) => {
            let timeSeries: TimeSeriesData[] = [];
            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed: Papa.ParseResult<TimeSeriesData>) {
                    timeSeries = parsed.data;
                    if(timeSeries.length === 0){
                        throw new Error("URLCSVReader is empty");
                    }
                    sendLog("info",`URLCSVReader has successfully parsed\n${JSON.stringify(timeSeries)}`);
                },
                error: function(parseError: Error){
                    //this will be caught by promise.catch
                    throw parseError;
                }
            });
            return timeSeries;
        }).catch((err: unknown) => {
            sendError(err,"URLCSVReader error");
            throw (err as Error);
        });
    };
    
}