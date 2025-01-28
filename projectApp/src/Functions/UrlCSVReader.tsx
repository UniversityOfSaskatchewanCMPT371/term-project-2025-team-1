import { TimeSeriesData, CSVHeaders, getCSVHeaders } from './LocalCSVReader';

import Papa from 'papaparse';

export function UrlCSVHeaders(url:string): Promise<CSVHeaders | null> {
    if(!url.endsWith('.csv') && !url.endsWith('.txt')){
        throw new Error('url must be .csv or .txt');
    }
    //will only work if url gives permissions
    return fetch(url).then((response) =>{
        if (!response.ok) {
            throw new Error(`Failed to fetch the file. Status: ${response.status}`);
        }
        return response.text();
    }).then((csvData: string) => {
        const csvHeaders: Promise<CSVHeaders | null> = new Promise((resolve, reject) => {
            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed: any) {
                    if(parsed.data.length == 0){
                        console.log("EMPTY CSV FILE");
                        resolve(null);
                        return;
                    }
                    const headers = Object.keys((parsed.data as string[])[0]);
                    headers.forEach((head: string) => {
                        if(head === "Time" || head === "time"){
                            resolve({headers});
                        }
                    });
                    console.log("CSV file does not contain Time");
                    resolve(null);
                },
                error: function(parseError: Error){
                    reject(parseError);
                }
            })
        })
        return csvHeaders;
    }).catch((err) => {
        console.log("Error:",err);
        return null;
    })
}

export function UrlCSVReader(url:string): Promise<TimeSeriesData[] | null>{
    if(!url.endsWith('.csv') && !url.endsWith('.txt')){
        throw new Error('url must be .csv or .txt');
    }
    //will only work if url gives permissions
    return fetch(url).then((response) =>{
        if (!response.ok) {
            throw new Error(`Failed to fetch the file. Status: ${response.status}`);
        }
        return response.text();
    }).then((csvData: string) => {
        const timeSeries: Promise<TimeSeriesData[] | null> = new Promise((resolve, reject) => {
            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed: any) {
                    UrlCSVHeaders(url).then((csvHeaders: CSVHeaders | null) => {
                        if(csvHeaders === null){
                            resolve(null);
                            return;
                        }
                        console.log("Headers: ", csvHeaders.headers);
                        
                        //Using headers as keys to assign values
                        const typedData: TimeSeriesData[] = parsed.data.map((row:any) => (
                            Object.fromEntries(
                                csvHeaders.headers.map((header: string) => [header,row[header]])
                            )
                            
                        ))
                        //Just for seeing if the proper values are stored
                        console.log("---------------")
                        console.log(typedData);
                        console.log("---------------")
                        console.log("Length Of", typedData.length);
                        for(var i = 0; i < typedData.length; i++){
                            csvHeaders.headers.forEach((head:string) => {
                                console.log(typedData[i]?.[head]);
                            })
                        }
                        resolve(typedData);
                    })
                },
                error: function(parseError: Error){
                    reject(parseError);
                }
            })
        })
        return timeSeries;
    }).catch((err) => {
        console.log("Error:",err);
        return null;
    })
}