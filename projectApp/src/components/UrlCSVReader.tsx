import Papa from 'papaparse';
import logger from '../logging/logs';

import CSVHeaders from '../data_structures/CSVHeaders';
import TimeSeriesData from '../data_structures/TimeSeriesData';

/**
 * Get the headers of a file at a url
 * @param url address of the file
 * @returns Headers of the file as a CSVHeaders
 */
export async function UrlCSVHeaders(url:string): Promise<CSVHeaders | null> {
    logger.info("Calling URLCSVHeader ", url);
    return UrlCSVReader(url).then((timeSeries) => {
        if(timeSeries === null){
            logger.error("URLCSVHeader Time Series is null", url);
            throw new Error("Time Series is null");
        }
        //if UrlCSVReader is tested, then above should be fine
        //test if output is expected
        logger.info("Successful URLCSVHeader", Object.keys(timeSeries[0]))
        return { headers: Object.keys(timeSeries[0]) };
    //Rethrowing errors
    }).catch((err) => {
        logger.error("UrlCSVHeaders Error");
        throw err;
    });
}

/**
 * Get the time series data from a file at a url
 * @param url address of the file
 * @returns data of file formatted as TimeSeriesData[]
 */
export async function UrlCSVReader(url:string): Promise<TimeSeriesData[] | null>{
    logger.info("Calling URLCSVReader ", url);
    return new Promise<TimeSeriesData[]>((resolve,reject) => {
        if(!url.endsWith('.csv') && !url.endsWith('.txt')){
            logger.error("URLCSVReader File isn't .csv or .txt file", url);
            return reject(('url must be .csv or .txt'));
        }
        else{
            //will only work if url gives permissions
            //test with other urls?
            logger.info("URLCSVReader Reading file", url);
            fetch(url).then((response) =>{
                if (!response.ok) {
                    reject((`Failed to fetch the file. Status: ${response.status}`));
                }
                //test for responses that are not ok?
                return response.text();
            }).then((csvData: string) => {
                Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true,
                    complete: function(parsed: any) {
                        logger.info("URLCSVReader Successfully parsed", url);
                        logger.info("URLCSVReader Parsed value", parsed);
                        const typedData: TimeSeriesData[] = parsed.data;
                        //test if casting works
                        resolve(typedData);
                    },
                    error: function(parseError: Error){
                        //logger.error("URLCSVReader Failed Parse", url);
                        return reject(parseError);
                    }
                });
            })
        };
    //Rethrowing errors
    }).catch((err: Error) => {
        //test for possible error catching
        logger.error("UrlCSVReader Error", err);
        throw err;
    });
}