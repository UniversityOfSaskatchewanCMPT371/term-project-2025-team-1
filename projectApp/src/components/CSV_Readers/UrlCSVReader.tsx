import Papa from 'papaparse';
import logger from '../../logging/logs';

import { CSVHeaders, TimeSeriesData} from '../../types/CSVInterfaces';


/**
 * Get the headers of a file at a url
 * @param url address of the file
 * @returns Headers of the file as a CSVHeaders
 */
export async function UrlCSVHeaders(url:string): Promise<CSVHeaders> {
    logger.info("Calling URLCSVHeader ", url);
    return UrlCSVReader(url).then((timeSeries) => {
        logger.info("Successful URLCSVHeader", Object.keys(timeSeries[0]))
        return ({ headers: Object.keys(timeSeries[0]) } as CSVHeaders);
    //Rethrowing errors
    }).catch((err: unknown) => {
        logger.error("UrlCSVHeaders Error");
        throw (err as Error);
    });
}

/**
 * Get the time series data from a file at a url
 * @param url address of the file
 * @returns data of file formatted as TimeSeriesData[]
 */
export async function UrlCSVReader(url:string): Promise<TimeSeriesData[]>{
    logger.info("Calling URLCSVReader ", url);
    if(!url.endsWith('.csv') && !url.endsWith('.txt')){
        logger.error("URLCSVReader File isn't .csv or .txt file", url);
        throw new Error('url must be .csv or .txt');
    }
    else{
        //will only work if url gives permissions
        //test with other urls?
        logger.info("URLCSVReader Reading file", url);
        return fetch(url).then((response: Response) =>{
            if (!response.ok) {
                logger.error("URLCSVReader Failed Parse", url);
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
                    logger.info("URLCSVReader Successfully parsed", url);
                    //test if casting works
                    timeSeries = parsed.data;
                    if(timeSeries.length === 0){
                        throw new Error("URLCSVReader is empty");
                    }
                    logger.info("URLCSVReader Parsed value", parsed);
                },
                error: function(parseError: Error){
                    logger.error("URLCSVReader Failed Parse", url);
                    throw parseError;
                }
            });
            return timeSeries;
        }).catch((err: unknown) => {
            //test for possible error catching
            logger.error("UrlCSVReader Error", err);
            throw ((err as Error));
        });
    };
}