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

/* This function reads the values of a csv file, and stores it
* @param: {String} File path for csv file 
* returns: {Promise<TimeSeriesData[]>}
*/
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
                    //Getting the headers of csv file
                    // getCSVHeaders(file).then((csvHeaders: CSVHeaders | null) => {
                    //     if(csvHeaders === null){
                    //         resolve(null);
                    //         return;
                    //     }
                    //     console.log("Headers: ", csvHeaders.headers);
                        
                    //     //Using headers as keys to assign values
                    //     const typedData: TimeSeriesData[] = parsed.data.map((row:any) => (
                    //         Object.fromEntries(
                    //             csvHeaders.headers.map((header: string) => [header,row[header]])
                    //         )
                            
                    //     ))
                    const typedData: TimeSeriesData[] = parsed.data;
                        //Just for seeing if the proper values are stored
                        // console.log("---------------")
                        // console.log(typedData);
                        // console.log("---------------")
                        // console.log("Length Of", typedData.length);
                        
                        resolve(typedData);
                    },error: function(parseError: Error){
                        reject(parseError);
                    }
                })
            //     error: function(parseError: Error) {
            //         reject(parseError);
            //     }
            // });
        });
        
    }).catch((err) => {
        console.error("Error in LocalCSV Reader: ", err);
        throw err;
    });
};