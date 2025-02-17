import { DataInterface, ModelInterface } from "./BaseInterfaces";

/*
* Interfaces required for the CSV Readers
*/
export interface CSVHeaders {
    headers: string[];
}

export interface TimeSeriesData {
    key: Record<string,string | number>;
}


//Planned new interfaces for csv files
//For now, specialized for 2D Time Series
export interface CSVData extends DataInterface{                                   //Name of the graph (Graph has ID might switch to that)
    csvHeaders: string[];                           //Headers for csv File
    data: {key: Record<string,string | number>}[];  //Used for displaying csvfiles
    browserSelected: boolean; 
    vrSelected: boolean;                      //Checks if loaded file is selected on the Browser
    displayBoard: number;
                               //Checks if loaded file is selected on the VR drop down

    //Variables specialized for 2D Time series
    yHeader: string;
    //Will use the TIME and yHeader to get data

    getData:() => ({key: Record<string,string | number>}[]);
    getDataByTime: (time:string) => Record<string, string | number> | null;
    loadLocalCSVFile: (index:number,file: File) => (Promise<void>);
    loadUrlCSVFile: (index: number, file: string) => (Promise<void>);
    getCSVHeaders: () => string[];
    getYHeader: () => string;
    getBrowserSelected: () => (boolean);
    setBrowserSelected: (bool: boolean) => (void);
    getVRSelected: () => (boolean);
    setVRSelected: (bool:boolean) => (void);
    setYHeader: (header:string) => (void);
    getDisplayBoard: () => (number);
    incrementDisplayBoard: () => (void);
    decrementDisplayBoard: () => (void);
}

export interface CSVModelInterface extends ModelInterface{
    num: number;                                            //number of graphs in loaded in model

    readLocalFile: (file:File) => (Promise<void>);                   //Will read the csv through local file and load it
    readURLFile: (file: string) => (Promise<void>);                  //Will read the csv file through url link and load it
    deleteFile: (name:string) => (void);                    //Get the array and delete it
    getNum: () => (number);
    getCSVFileByName: (name: string) => (CSVData | null);
}