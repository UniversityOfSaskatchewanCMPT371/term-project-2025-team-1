import Papa from 'papaparse';

import { CSVHeaders, TimeSeriesData} from '../../types/CSVInterfaces';


/**
 * Reads the headers of a CSV file from a URL and returns them
 * @param URL address of the file
 * @returns Headers of the file as a CSVHeaders
 */
export async function UrlCSVHeaders(url:string): Promise<CSVHeaders> {
    return UrlCSVReader(url).then((timeSeries) => {
        return ({ headers: Object.keys(timeSeries[0]) } as CSVHeaders);
    //Rethrowing errors
    }).catch((err: unknown) => {
        throw (err as Error);
    });
}

/**
 * Return the time series data from a file at a URL
 * @param URL address of the file
 * @returns data of file formatted as TimeSeriesData[]
 *
 * Pre-conditions: URL address must be a valid file path to a .csv or .txt file.
 * Post-conditions:
 *    None (the function does not modify any external state).
 *    The returned promise resolves to an array of time series data.
 *    If the file is empty, cannot be parsed, or is not a CSV/TXT file, an error is thrown.
 *    If the URL is inaccessible or the request fails, an error is thrown.
 **/
export async function UrlCSVReader(url:string): Promise<TimeSeriesData[]>{
    if(!url.endsWith('.csv') && !url.endsWith('.txt')){
        throw new Error('url must be .csv or .txt');
    }
    else{
       // Requires permission from url.
        return fetch(url).then((response: Response) =>{
            if (!response.ok) {
                throw new Error(`Failed to fetch the file. Status: ${response.status.toString()}`);
            }
            return response.text();
        }).then((csvData: string) => {
            let timeSeries: TimeSeriesData[] = [];
            Papa.parse(csvData, {
               // Treat the first row as headers
                header: true,
                dynamicTyping: true,
                complete: function(parsed: Papa.ParseResult<TimeSeriesData>) {
                    timeSeries = parsed.data;
                    if(timeSeries.length === 0){
                        throw new Error("URLCSVReader is empty");
                    }
                },
                error: function(parseError: Error){
                    throw parseError;
                }
            });
            return timeSeries;
        }).catch((err: unknown) => {
            //test for possible error catching
            throw ((err as Error));
        });
    };
}
