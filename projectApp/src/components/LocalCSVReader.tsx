import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import Papa from 'papaparse';

import CSVHeaders from '../data_structures/CSVHeaders';
import TimeSeriesData from '../data_structures/TimeSeriesData';

/* This function reads the headers of a csv file and stores it
*       (Might have to include a way to read url, Or jsut make a new function for url reading)
* @param: {String} File path for csv file 
* returns: {Promise<CSVHeaders>}
*/
export function LocalCSVHeaders(file:string): Promise<CSVHeaders | null> {
    return LocalCSVReader(file).then((timeSeries) => {
        if(timeSeries === null){
            throw new Error("Time Serues is null");
        }
        //if LocalCSVReader is tested, then above should be fine
        //test if output is expected
        return { headers: Object.keys(timeSeries[0]) };
    }).catch((err) => {
        console.error("LocalCSVHeaders Error:",err);
        return null;
    });
}

/* This function reads the values of a csv file, and stores it
* @param: {String} File path for csv file 
* returns: {Promise<TimeSeriesData[]>}
*/
export function LocalCSVReader(file:string): Promise<TimeSeriesData[] | null>{
    const timeSeries: Promise<TimeSeriesData[] | null> = new Promise((resolve, reject) => {
        if(!fs.existsSync(file)){
            //test for nonexistant files
            reject("file doesn't exist");
        }
        else if(!file.endsWith('.csv') && !file.endsWith('.txt')){
            //test for files that are NOT .csv
            reject('file must be .csv or .txt');
        }
        else{
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
                        reject(parseError);
                    }
                });
            }).catch((err) => {
                //test for possible error catching
                console.error("LocalCSVReader Error:",err);
                reject(err);
            });
        }
    });
    return timeSeries;
};