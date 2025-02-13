import * as fsPromise from 'fs/promises';
import Papa from 'papaparse';
import logger from '../../logging/logs';

import {CSVHeaders, TimeSeriesData} from '../../types/CSVInterfaces';


/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export async function LocalCSVHeaders(file:string): Promise<CSVHeaders> {
    logger.info("Calling LocalCSVHeader ", file);
    return LocalCSVReader(file).then((timeSeries) => {
        logger.info("Successful LocalCSVHeader", Object.keys(timeSeries[0]));
        return ({ headers: Object.keys(timeSeries[0]) } as CSVHeaders);
    // Rethrowing errors
    }).catch((err:unknown) => {
        logger.error("LocalCSVHeaders Error", err);
        throw (err as Error);
    });
}

/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export async function LocalCSVReader(file:string): Promise<TimeSeriesData[]>{
    logger.info("Calling LocalCSVReader", file);
    if(!file.endsWith('.csv') && !file.endsWith('.txt')){
        //test for files that are NOT .csv
        logger.error("LocalCSVReader File isn't .csv or .txt file", file);
        throw new Error('File must be .csv or .txt');
    }
    logger.info("LocalCSVReader Reading file", file);
    return fsPromise.readFile(file, 'utf8').then((data: string) => {
        let timeSeries: TimeSeriesData[] = []
        Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            complete: function(parsed: Papa.ParseResult<TimeSeriesData>){
                logger.info("LocalCSVReader Successfully parsed", file);
                //test if casting works
                timeSeries = parsed.data;
                if(timeSeries.length === 0){
                    throw new Error("LocalCSVReader is empty");
                }
                logger.info("LocalCSVReader Parsed value", timeSeries);
            },
            error: function(parseError: Error) {
                logger.error("LocalCSVReader Failed Parse", file);
                throw parseError;
            }
        });
        return timeSeries;
    }).catch((err: unknown) => {
        //test for possible error catching
        logger.error("LocalCSVReader Error", err);
        throw (err as Error);
    });
};