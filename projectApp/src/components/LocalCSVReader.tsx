import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import Papa from 'papaparse';

import {CSVHeaders, TimeSeriesData} from '../data_structures/CSVInterfaces';

/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export function LocalCSVHeaders(file:string): Promise<CSVHeaders | null> {
    return LocalCSVReader(file).then((timeSeries) => {
        if(timeSeries === null){
            throw new Error("Time Series is null");
        }
        //if LocalCSVReader is tested, then above should be fine
        //test if output is expected
        return { headers: Object.keys(timeSeries[0]) };
    // Rethrowing errors
    }).catch((err) => {
        console.error("LocalCSVHeaders Error:",err);
        throw err;
    });
}

/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export function LocalCSVReader(file:string): Promise<TimeSeriesData[] | null>{
    return new Promise<TimeSeriesData[]>((resolve, reject) => {
        if(!fs.existsSync(file)){
            //test for nonexistant files
            return reject(new Error("file doesn't exist"));
        }
        else if(!file.endsWith('.csv') && !file.endsWith('.txt')){
            //test for files that are NOT .csv
            return reject(new Error('file must be .csv or .txt'));
        }
        
        fsPromise.readFile(file, 'utf8').then((data: string) => {
            Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed: any){
                    const typedData: TimeSeriesData[] = parsed.data;
                    //test if casting works
                    resolve(typedData);
                },
                error: function(parseError: Error) {
                    return reject(parseError);
                }
            });
        });
        
    // Re-throwing errors
    }).catch((err: Error) => {
            //test for possible error catching
            console.error("LocalCSVReader Error:",err);
            throw err;
    });
};