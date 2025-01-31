import * as fs from 'fs';
import Papa from 'papaparse';

//Number of headers in a csv file
export interface CSVHeaders {
    headers: string[];
}

//Assigning a key(header) to values
export interface TimeSeriesData {
    [key: string]: string | number;
}

/* This function reads the headers of a csv file and stores it
*       (Might have to include a way to read url, Or jsut make a new function for url reading)
* @param: {String} File path for csv file 
* returns: {Promise<CSVHeaders>}
*/
export function getCSVHeaders(file:string): Promise<CSVHeaders | null> {
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
                complete: function(parsed: any) {
                    //If the csv file is empty, resolves null (just so program wont end)
                    //Might be uneeded since LocalCsvReader might also check for empty csv file
                    if(parsed.data.length == 0){
                        console.log("EMPTY CSV FILE");
                        resolve(null);
                        return;
                    }
                    const headers = Object.keys((parsed.data as string[])[0]);
                    headers.forEach((head: string) => {
                        //Checking if csv file has a "Time"/"time" header
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
            });
        });
        
    });
}

/* This function reads the values of a csv file, and stores it
* @param: {String} File path for csv file 
* returns: {Promise<TimeSeriesData[]>}
*/
export function LocalCSVReader(file:string): Promise<TimeSeriesData[] | null>{
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
                complete: function(parsed: any){
                    //Getting the headers of csv file
                    getCSVHeaders(file).then((csvHeaders: CSVHeaders | null) => {
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
                error: function(parseError: Error) {
                    reject(parseError);
                }
            });
        });
    });
};