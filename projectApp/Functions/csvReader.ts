import Papa from 'papaparse';
import * as fs from 'fs';

export interface CSVHeaders {
    headers: string[];
}
export interface TimeSeriesData {
    [key: string]: string | number;
}

export function getCSVHeaders(file:string): Promise<CSVHeaders> {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => { 
            if(err) {
                console.log("failed to read file");
                reject(err);
                return;
            }
            
            Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed) {
                    if(parsed.data.length == 0){
                        console.log("EMPTY CSV FILE");
                        resolve(null);
                        return;
                    }
                    const headers = Object.keys(parsed.data[0]);
                    headers.forEach((head: string) => {
                        if(head === "Time" || head === "time"){
                            resolve({headers});
                        }
                    });
                    console.log("CSV file does not contain Time");
                    resolve(null);
                },
                error: function(parseError){
                    reject(parseError);
                }
            });
        });
        
    });
}

export function LocalCSVReader(file:string): Promise<TimeSeriesData[]>{
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if(!fs.existsSync(file)){
                console.log("file doesn't exist");
                resolve(null);
                return;
            }
            else if(err) {
                console.log("failed to read file");
                reject(err);
                return;
            }
            Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed){
                    getCSVHeaders(file).then((csvHeaders: CSVHeaders) => {
                        if(csvHeaders === null){
                            resolve(null);
                            return;
                        }
                        console.log("Headers: ", csvHeaders.headers);
                        
                        const typedData: TimeSeriesData[] = parsed.data.map((row:any) => (
                            Object.fromEntries(
                                csvHeaders.headers.map((header: string) => [header,row[header]])
                            )
                            
                        ))
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
                error: function(parseError) {
                    reject(parseError);
                }
            });
        });
    });
};