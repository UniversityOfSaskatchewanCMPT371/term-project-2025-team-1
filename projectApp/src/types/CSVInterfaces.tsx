/*
* Interfaces required for the CSV Readers
*/
export interface CSVHeaders {
    headers: string[];
}

export interface TimeSeriesData {
    [key: string]: string | number;
}


//Planned new interfaces for csv files
//For now, specialized for 2D Time Series
export interface CSVData {
    name: string;               //Name of the graph
    csvHeaders: string[];
    data: {[key:string]: string | number}[];

    //Variables specialized for 2D Time series
    yHeader: string;
    //Will use the TIME and yHeader to get data

    getDataFromHeader: () => (string | number);
}

export interface CSVReaderInterface{
    num: number;                                //number of graphs in loaded in model
    csvFiles: CSVData[];                        //Array of loaded CSV files

    getCSVFile: (name: string) => (CSVData);      //Uses name to find the CSVData
    readFile: (file:string) => (void);          //Will read the csv and add it
    deleteFile: (name:string) => (void);        //Get the array and delete it
}