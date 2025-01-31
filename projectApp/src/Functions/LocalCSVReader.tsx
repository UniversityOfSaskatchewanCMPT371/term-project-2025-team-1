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

/**  
* This function reads the headers of a csv file and stores it
* @param file File path for csv file 
* @returns: {Promise<CSVHeaders>}
**/
export function getCSVHeaders(file:string): Promise<CSVHeaders | null> {
    return LocalCSVReader(file).then((data) => {
        if(data === null){
            throw new Error("Empty data set");
        }

        //Finding if the csv file has a Time column
        let timeCol = false;
        Object.keys(data[0]).forEach((header) => {
            if(header === "Time" || header === "time"){
                timeCol = true;
            };
        });

        //If no time column throw error
        if(!timeCol){
            throw new Error("Can't Find Time Column");
        }

        console.log(`LocalCSV File Headers: ${Object.keys(data[0])}`);
        return { headers: Object.keys(data[0])};
    }).catch((err) => {
        console.error("LocalCSVHeaders Error: ", err);
        //Rethrow error
        throw err;
    })
}

/**  
* This function reads the values of a csv file, and stores it
* Uses the local file path to read csv file
* @param file File path for csv file 
* @returns: {Promise<TimeSeriesData[]>}
**/
export function LocalCSVReader(file:string): Promise<TimeSeriesData[] | null>{
    return new Promise<TimeSeriesData[]>((resolve, reject) => {
        if(!file.endsWith('.csv')){
            return reject(new Error("Not a csv file"));
        }

        fs.readFile(file, 'utf8', (err, data) => {
            if(err) {
                return reject(new Error("Failed reading the file"));
            }
            
            Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                complete: function(parsed: any){
                    const typedData: TimeSeriesData[] = parsed.data;
                    resolve(typedData);
                },
                error: function(parseError: Error){
                        reject(parseError);
                }
            })
        });
        
    }).catch((err) => {
        //Rethrow the error
        console.error("Error in LocalCSV Reader: ", err);
        throw err;
    });
};