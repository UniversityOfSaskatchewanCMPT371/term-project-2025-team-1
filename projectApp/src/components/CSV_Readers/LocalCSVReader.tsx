import * as fsPromise from 'fs/promises';
import Papa from 'papaparse';

import {CSVHeaders, TimeSeriesData} from '../../types/CSVInterfaces';


/**  
* Reads the headers of a CSV file and returns them.
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}, A promise that resolves to the CSV headers.
**/
export async function LocalCSVHeaders(file:string): Promise<CSVHeaders> {
    return LocalCSVReader(file).then((timeSeries) => {
        return ({ headers: Object.keys(timeSeries[0]) } as CSVHeaders); // Extract headers from the first row.
    // Rethrowing errors
    }).catch((err:unknown) => {
        //logger.error("LocalCSVHeaders Error", err);
        throw (err as Error);
    });
}

/**  
* Reads a CSV file and returns an array of time series data.
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export async function LocalCSVReader(file:string): Promise<TimeSeriesData[]>{
    if(!file.endsWith('.csv') && !file.endsWith('.txt')){
        // ensure input file is a csv
        throw new Error('File must be .csv or .txt');
    }
    return fsPromise.readFile(file, 'utf8').then((data: string) => {
        let timeSeries: TimeSeriesData[] = []
        Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            complete: function(parsed: Papa.ParseResult<TimeSeriesData>){
                // ensures casting works
                timeSeries = parsed.data;
                if(timeSeries.length === 0){
                    throw new Error("LocalCSVReader is empty");
                }
            },
            error: function(parseError: Error) {
                throw parseError;
            }
        });
        return timeSeries;
    }).catch((err: unknown) => {
        // test for possible error catching
        throw (err as Error);
    });
};


/**  
* Reads a CSV file from a File Object (local reader) and returns an array of time series data.
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export function LocalCsvReader(file: File): Promise<TimeSeriesData[]>{
    return new Promise<TimeSeriesData[]>((resolve, reject) => {
        if(!file.name.endsWith('.csv') && !file.name.endsWith('.txt')){
            reject(new Error("file must be csv or txt"));
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target?.result as string; // Get file content as a string

            Papa.parse(fileContent, {
                header: true,
                dynamicTyping: true,
                complete: function (parsed: {data: TimeSeriesData[]}){
                    console.log("Successfully parsed CSV data", parsed.data);
                    const typedData: TimeSeriesData[] = parsed.data;
                    resolve(typedData); // Resolve the promise with parsed data
                },
                error: function (parseError: Error) {
                    console.error("Failed to parse CSV", file.name);
                    reject(parseError); // Reject the promise on parsing error
                }
            });
        };

        reader.onerror = () => {
            reject(new Error("Error")) // handles file reading errors
        }
        reader.readAsText(file);
        
    });
}
