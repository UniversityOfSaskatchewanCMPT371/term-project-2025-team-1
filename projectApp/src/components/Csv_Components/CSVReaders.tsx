import Papa from "papaparse";
import * as fsPromise from 'fs/promises';
import { CSVHeaders, TimeSeriesData } from "../../types/CSVInterfaces";

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
        return ({ headers: Object.keys(timeSeries[0]) } as CSVHeaders);
    }).catch((err:unknown) => {
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
         return ({ headers: Object.keys(timeSeries[0]) } as CSVHeaders);
     }).catch((err: unknown) => {
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
        throw new Error('File must be .csv or .txt');
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
            },
            error: function(parseError: Error) {
                throw parseError;
            }
        });
        return timeSeries;
    }).catch((err: unknown) => {
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
            reject(new Error("file must be csv or txt"));
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target?.result as string;

            if(!fileContent.trim()){
                reject(new Error("Empty file set"));
                return;
            }

            Papa.parse(fileContent, {
                header: true,
                dynamicTyping: true,
                complete: function (parsed: {data: TimeSeriesData[]}){
                    const typedData: TimeSeriesData[] = parsed.data;
                    resolve(typedData); // Resolve the promise with parsed data
                },
                error: function (parseError: Error) {
                    reject(parseError); // Reject the promise on parsing error
                }
            });
        };

        reader.onerror = () => {
            reject(new Error("Error"))
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
        throw new Error('url must be .csv or .txt');
    }
    else{
        return fetch(url).then((response: Response) =>{
            if (!response.ok) {
                throw new Error(`Failed to fetch the file. Status: ${response.status.toString()}`);
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
                },
                error: function(parseError: Error){
                    throw parseError;
                }
            });
            return timeSeries;
        }).catch((err: unknown) => {
            throw ((err as Error));
        });
    };
    
}