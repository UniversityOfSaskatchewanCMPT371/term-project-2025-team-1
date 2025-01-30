import { TimeSeriesData, CSVHeaders } from './LocalCSVReader';

import Papa from 'papaparse';

/**
 * Get the headers of a file at a url
 * @param url address of the file
 * @returns Headers of the file
 */
export function UrlCSVHeaders(url:string): Promise<CSVHeaders | null> {
    return UrlCSVReader(url).then((timeSeries) => {
        if(timeSeries === null){
            throw new Error("Time Series is null");
        }
        return Object.keys(timeSeries[0]);
    }).then((heads) => {
        const newCSVHeaders: CSVHeaders = { headers: heads };
        return newCSVHeaders; 
    }).catch((err) => {
        console.error("UrlCSVHeaders Error:",err);
        return null;
    })
}

/**
 * Get the time series data from a file at a url
 * @param url address of the file
 * @returns 
 */
export function UrlCSVReader(url:string): Promise<TimeSeriesData[] | null>{
    if(!url.endsWith('.csv') && !url.endsWith('.txt')){
        throw new Error('url must be .csv or .txt');
    }
    //will only work if url gives permissions
    return fetch(url).then((response) =>{
        if (!response.ok) {
            throw new Error(`Failed to fetch the file. Status: ${response.status}`);
        }
        console.log('UrlCSVReader read successfully:',url);
        return response.text();
    }).then((csvData: string) => {
        console.log(csvData);
        const timeSeries: Promise<TimeSeriesData[] | null> = new Promise((resolve, reject) => {
            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed: any) {
                    const typedData: TimeSeriesData[] = parsed.data;
                    //Just for seeing if the proper values are stored
                    console.log("-----DATA-----")
                    console.log(typedData);
                    console.log("--------------")
                    console.log("Length: ", typedData.length);
                    const csvHeaders: CSVHeaders = { headers: Object.keys(typedData[0]) };
                    for(let i = 0; i < typedData.length; i++){
                        csvHeaders.headers.forEach((head:string) => {
                            console.log(typedData[i]?.[head]);
                        })
                    }
                    console.log("--------------")
                    resolve(typedData);
                },
                error: function(parseError: Error){
                    reject(parseError);
                }
            });
        });
        return timeSeries;
    }).catch((err) => {
        console.error("UrlCSVReader Error:",err);
        return null;
    })
}