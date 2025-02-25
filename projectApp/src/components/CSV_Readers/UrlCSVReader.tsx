import Papa from 'papaparse';

import { CSVHeaders, TimeSeriesData} from '../../types/CSVInterfaces';
import { sendError, sendLog } from '../../logger-frontend';


/**
 * Get the headers of a file at a url
 * @param url address of the file
 * @returns Headers of the file as a CSVHeaders
 */
export async function UrlCSVHeaders(url:string): Promise<CSVHeaders> {
    //this might be deleted due to no use, will add loggers anyway
    return UrlCSVReader(url).then((timeSeries) => {
        sendLog("info",`UrlCSVHeaders has returned ${JSON.stringify({ headers: Object.keys(timeSeries[0]) })}`);
        return ({ headers: Object.keys(timeSeries[0]) } as CSVHeaders);
    }).catch((err: unknown) => {
        sendError(err,`UrlCSVHeaders error for url ${url}`);
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
        sendError(Error('url must be .csv or .txt'),`UrlCSVReader ${url} is not .csv or .txt`);
        throw new Error('url must be .csv or .txt');
    }
    else{
        return fetch(url).then((response: Response) =>{
            if (!response.ok) {
                sendError(Error(`Failed to fetch the file. Status: ${response.status.toString()}`),"UrlCSVReader response is not ok");
                throw new Error(`Failed to fetch the file. Status: ${response.status.toString()}`);
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
                        throw new Error("URLCSVReader is empty");
                    }
                    sendLog("info",`URLCSVReader has successfully parsed\n${JSON.stringify(timeSeries)}`);
                },
                error: function(parseError: Error){
                    //this will be caught by promise.catch
                    throw parseError;
                }
            });
            return timeSeries;
        }).catch((err: unknown) => {
            sendError(err,"URLCSVReader error");
            throw ((err as Error));
        });
    };
}