import Papa from 'papaparse';
//import logger from '../../logging/logs';

import { CSVHeaders, TimeSeriesData} from '../../types/CSVInterfaces';
import { sendError, sendLog } from '../../logger-frontend';


/**
 * Get the headers of a file at a url
 * @param url address of the file
 * @returns Headers of the file as a CSVHeaders
 */
export async function UrlCSVHeaders(url:string): Promise<CSVHeaders> {
    return UrlCSVReader(url).then((timeSeries) => {
        const csvheaders: CSVHeaders = { headers: Object.keys(timeSeries[0]) }
        sendLog("info",`UrlCSVReader.UrlCSVHeaders() has returned ${JSON.stringify(csvheaders)}`);
        return csvheaders;
    }).catch((err: unknown) => {
        sendError(err,`UrlCSVReader.UrlCSVHeaders() error for url ${url}`);
        throw (err as Error);
    });
}

/**
 * Get the time series data from a file at a url
 * @param url address of the file
 * @returns data of file formatted as TimeSeriesData[]
 */
export async function UrlCSVReader(url:string): Promise<TimeSeriesData[]>{
    if(!url.endsWith('.csv') && !url.endsWith('.txt')){
        const typeError = new TypeError('url must be .csv or .txt');
        sendError(typeError,`UrlCSVReader.LocalCSVHeader() ${url} is not .csv or .txt`);
        throw typeError;
    }
    return fetch(url).then((response: Response) =>{
        if (!response.ok) {
            const responseError = new Error(`Failed to fetch the file. Status: ${response.status.toString()}`);
            sendError(responseError,"LocalCSVReader.LocalCSVReader() response is not ok");
            throw responseError;
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
                    throw new RangeError("URLCSVReader is empty");
                }
                sendLog("info",`URLCSVReader.URLCSVReader() has successfully parsed\n${JSON.stringify(timeSeries)}`);
            },
            error: function(parseError: Error){
                //this will be caught by promise.catch
                throw parseError;
            }
        });
        return timeSeries;
    }).catch((err: unknown) => {
        sendError(err,"URLCSVReader.URLCSVReader() error");
        throw ((err as Error));
    });
}