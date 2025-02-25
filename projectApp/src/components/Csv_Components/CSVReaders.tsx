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
    // Rethrowing errors
    }).catch((err:unknown) => {
        throw (err as Error);
    });
}

/**
 * Get the headers of a file at a url
 * @param url address of the file
 * @returns Headers of the file as a CSVHeaders
 */
export async function UrlCSVHeaders(url:string): Promise<CSVHeaders> {
    // logger.info("Calling URLCSVHeader ", url);
     return UrlCSVReader(url).then((timeSeries) => {
         //logger.info("Successful URLCSVHeader", Object.keys(timeSeries[0]))
         return ({ headers: Object.keys(timeSeries[0]) } as CSVHeaders);
     //Rethrowing errors
     }).catch((err: unknown) => {
         //logger.error("UrlCSVHeaders Error");
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
        // Ensures input file is a csv
        throw new Error('File must be .csv or .txt');
    }
    return fsPromise.readFile(file, 'utf8').then((data: string) => {
        let timeSeries: TimeSeriesData[] = []
        Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            complete: function(parsed: Papa.ParseResult<TimeSeriesData>){
                // Ensures casting works
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
        //test for possible error catching
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

        // handles file reading errors
        reader.onerror = () => {
            reject(new Error("Error"))
        }
        reader.readAsText(file);
        
    });
}

/**
 * Get the time series data from a file at a url
 * @param url address of the file
 * @returns data of file formatted as TimeSeriesData[]
 */
export async function UrlCSVReader(url:string): Promise<TimeSeriesData[]>{
    //logger.info("Calling URLCSVReader ", url);
    if(!url.endsWith('.csv') && !url.endsWith('.txt')){
        //logger.error("URLCSVReader File isn't .csv or .txt file", url);
        throw new Error('url must be .csv or .txt');
    }
    else{
        //will only work if url gives permissions
        //test with other urls?
        //logger.info("URLCSVReader Reading file", url);
        return fetch(url).then((response: Response) =>{
            if (!response.ok) {
                //logger.error("URLCSVReader Failed Parse", url);
                throw new Error(`Failed to fetch the file. Status: ${response.status.toString()}`);
            }
            //test for responses that are not ok?
            return response.text();
        }).then((csvData: string) => {
            let timeSeries: TimeSeriesData[] = [];
            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed: Papa.ParseResult<TimeSeriesData>) {
                    //logger.info("URLCSVReader Successfully parsed", url);
                    //test if casting works
                    timeSeries = parsed.data;
                    if(timeSeries.length === 0){
                        throw new Error("URLCSVReader is empty");
                    }
                    //logger.info("URLCSVReader Parsed value", parsed);
                },
                error: function(parseError: Error){
                    //logger.error("URLCSVReader Failed Parse", url);
                    throw parseError;
                }
            });
            return timeSeries;
        }).catch((err: unknown) => {
            //test for possible error catching
            //logger.error("UrlCSVReader Error", err);
            throw ((err as Error));
        });
    };
    
}