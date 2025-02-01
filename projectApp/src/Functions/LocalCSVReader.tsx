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
        return { headers: Object.keys(timeSeries[0]) };
    }).catch((err) => {
        console.error("UrlCSVHeaders Error:",err);
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
            console.log("file doesn't exist");
            resolve(null);
            return;
        }
        else{
        fsPromise.readFile(file, 'utf8').then((data) => {
            Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed: any){
                    const typedData: TimeSeriesData[] = parsed.data;
                    resolve(typedData);
                },
                error: function(parseError: Error) {
                    reject(parseError);
                }
            });
        }).catch((err) => {
            console.error("LocalCSVReader Error:",err);
            reject(err);
            return;
        })
    }
    });
    return timeSeries;
};