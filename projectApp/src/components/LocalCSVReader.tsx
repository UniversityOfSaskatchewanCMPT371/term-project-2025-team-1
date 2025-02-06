import * as fsPromise from 'fs/promises';
import * as fs from 'fs';
import Papa from 'papaparse';
import logger from '../logging/logs';

import {CSVHeaders, TimeSeriesData} from '../data_structures/CSVInterfaces';


/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export async function LocalCSVHeaders(file:string): Promise<CSVHeaders> {
    logger.info("Calling LocalCSVHeader ", file);
    return LocalCSVReader(file).then((timeSeries) => {
        if(timeSeries === null){
            logger.error("LocalCSVHeader Time Series is null", file);
            throw new Error("Time Series is null");
        }
        //if LocalCSVReader is tested, then above should be fine
        //test if output is expected
        //if no data, no headers
        if(timeSeries.length === 0){
            logger.info("LocalCSVHeader received empty timeSeries");
            return { headers: [] };
        }
        else{
            logger.info("Successful LocalCSVHeader", Object.keys(timeSeries[0]));
            return { headers: Object.keys(timeSeries[0]) };
        }
    // Rethrowing errors
    }).catch((err) => {
        logger.error("LocalCSVHeaders Error");
        throw err;
    });
}

/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export async function LocalCSVReader(file:string): Promise<TimeSeriesData[]>{
    logger.info("Calling LocalCSVHeader", file);
    return new Promise<TimeSeriesData[]>((resolve, reject) => {
        if(!fs.existsSync(file)){
            //test for nonexistant files
            logger.error("LocalCSVReader File doesn't exist", file);
            reject(("File doesn't exist"));
            return;
        }
        else if(!file.endsWith('.csv') && !file.endsWith('.txt')){
            //test for files that are NOT .csv
            logger.error("LocalCSVReader File isn't .csv or .txt file", file);
            reject(('File must be .csv or .txt'));
            return;
        }
        logger.info("LocalCSVReader Reading file", file);
        fsPromise.readFile(file, 'utf8').then((data: string) => {
            Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed: any){
                    logger.info("LocalCSVReader Successfully parsed", file);
                    logger.info("LocalCSVReader Parsed value", parsed.data);
                    const typedData: TimeSeriesData[] = parsed.data;
                    //test if casting works
                    resolve(typedData);
                    return;
                },
                error: function(parseError: Error) {
                    logger.error("LocalCSVReader Failed Parse", file);
                    reject(parseError);
                    return;
                }
            });
        });
        
    // Re-throwing errors
    }).catch((err: Error) => {
        //test for possible error catching
        logger.error("LocalCSVReader Error", err);
        throw err;
    });
};