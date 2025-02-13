import * as fsPromise from 'fs/promises';
import Papa from 'papaparse';

import {CSVHeaders, TimeSeriesData} from '../../types/CSVInterfaces';


/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export async function LocalCSVHeaders(file:File): Promise<CSVHeaders> {
    //logger.info("Calling LocalCSVHeader ", file);
    return LocalCsvReader(file).then((timeSeries) => {
        if(timeSeries === null){
            //logger.error("LocalCSVHeader Time Series is null", file);
            throw new Error("Time Series is null");
        }
        //if LocalCSVReader is tested, then above should be fine
        //test if output is expected
        //if no data, no headers
        if(timeSeries.length === 0){
            //logger.info("LocalCSVHeader received empty timeSeries");
            return { headers: [] };
        }
        else{
            //logger.info("Successful LocalCSVHeader", Object.keys(timeSeries[0]));
            return { headers: Object.keys(timeSeries[0]) };
        }
    // Rethrowing errors
    }).catch((err:unknown) => {
        //logger.error("LocalCSVHeaders Error", err);
        throw err;
    });
}

/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export async function LocalCSVReader(file:string): Promise<TimeSeriesData[]>{
    return new Promise<TimeSeriesData[]>((resolve, reject) => {
        // if(!fs.existsSync(file)){
        //     //test for nonexistant files
        //     logger.error("LocalCSVReader File doesn't exist", file);
        //     reject(new Error("File doesn't exist"));
        //     return;
        // }
        //else 
        if(!file.endsWith('.csv') && !file.endsWith('.txt')){
            //test for files that are NOT .csv
            reject(new Error('File must be .csv or .txt'));
            return;
        }
        fsPromise.readFile(file, 'utf8').then((data: string) => {
            Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed: any){
                    const typedData: TimeSeriesData[] = parsed.data;
                    //test if casting works
                    resolve(typedData);
                    return;
                },
                error: function(parseError: Error) {
                    reject(parseError);
                    return;
                }
            });
        });
        
    // Re-throwing errors
    }).catch((err: unknown) => {
        //test for possible error catching
        throw err;
    });
};


//This one is for local reader but refactored to read a file

export function LocalCsvReader(file: File): Promise<TimeSeriesData[]>{
    return new Promise<TimeSeriesData[]>((resolve, reject) => {
        if(!file.name.endsWith('.csv') && !file.name.endsWith('.txt')){
            reject(new Error("file must be csv or txt"));
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target?.result as string;

            Papa.parse(fileContent, {
                header: true,
                dynamicTyping: true,
                complete: function (parsed:any){
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
            reject(new Error("Error"))
        }
        reader.readAsText(file);
        
    });
}
