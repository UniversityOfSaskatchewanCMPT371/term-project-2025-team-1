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
    //this will be removed in a later version, but for now ill add logging to it
    return LocalCSVReader(file).then((timeSeries) => {
        sendLog("info",`LocalCSVHeader has returned ${JSON.stringify({ headers: Object.keys(timeSeries[0]) })}`);
        return ({ headers: Object.keys(timeSeries[0]) } as CSVHeaders);
    }).catch((err:unknown) => {
        sendError(err,`LocalCSVHeader error for file ${file}`);
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
        //sorry! cant add new variables! just have to live with repeating repetitions
        sendError(new Error('File must be .csv or .txt'),`LocalCSVReader ${file} is not .csv or .txt`);
        throw new Error('File must be .csv or .txt');
    }
    //logger.info("LocalCSVReader Reading file", file);
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
                //this will be caught by promise.catch
                throw parseError;
            }
        });
        return timeSeries;
    }).catch((err: unknown) => {
        sendError(err,"LocalCSVReader error");
        throw (err as Error);
    });
};


//This one is for local reader but refactored to read a file

export function LocalCsvReader(file: File): Promise<TimeSeriesData[]>{
    return new Promise<TimeSeriesData[]>((resolve, reject) => {
        if(!file.name.endsWith('.csv') && !file.name.endsWith('.txt')){
            sendError(new Error("file must be csv or txt"),`LocalCsvReader(file) ${file.name} is not .csv or .txt`);
            reject(new Error("file must be csv or txt"));
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target?.result as string;

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
            sendError(new Error("sorry no better description for this, it just says \"Error\""),`LocalCsvReader(file) has errored for ${file.name}`);
            reject(new Error("Error"))
        }
        reader.readAsText(file);
        
    });
}
