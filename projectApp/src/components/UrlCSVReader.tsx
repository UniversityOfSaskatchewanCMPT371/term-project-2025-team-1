import Papa from 'papaparse';

import CSVHeaders from '../data_structures/CSVHeaders';
import TimeSeriesData from '../data_structures/TimeSeriesData';

/**
 * Get the headers of a file at a url
 * @param url address of the file
 * @returns Headers of the file as a CSVHeaders
 */
export function UrlCSVHeaders(url:string): Promise<CSVHeaders | null> {
    return UrlCSVReader(url).then((timeSeries) => {
        if(timeSeries === null){
            throw new Error("Time Series is null");
        }
        //if UrlCSVReader is tested, then above should be fine
        //test if output is expected
        return { headers: Object.keys(timeSeries[0]) };
    }).catch((err) => {
        console.error("UrlCSVHeaders Error:",err);
        return null;
    });
}

/**
 * Get the time series data from a file at a url
 * @param url address of the file
 * @returns data of file formatted as TimeSeriesData[]
 */
export function UrlCSVReader(url:string): Promise<TimeSeriesData[] | null>{
    const timeSeries: Promise<TimeSeriesData[] | null> = new Promise((resolve,reject) => {
        if(!url.endsWith('.csv') && !url.endsWith('.txt')){
            reject('url must be .csv or .txt');
            return;
        }
        else{
            //will only work if url gives permissions
            //test with other urls?
            fetch(url).then((response) =>{
                if (!response.ok) {
                    throw new Error(`Failed to fetch the file. Status: ${response.status}`);
                }
                //test for responses that are not ok?
                return response.text();
            }).then((csvData: string) => {
                Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true,
                    complete: function(parsed: any) {
                        const typedData: TimeSeriesData[] = parsed.data;
                        //test if casting works
                        resolve(typedData);
                    },
                    error: function(parseError: Error){
                        reject(parseError);
                    }
                });
            }).catch((err) => {
                //test for possible error catching
                console.error("UrlCSVReader Error:",err);
                return null;
            });
        };
    });
    return timeSeries;
}