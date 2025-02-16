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
export interface CSVData {
    name: string;               //Name of the graph
    csvHeaders: string[];
    data: {key: Record<string,string | number>}[];
    browserSelected: boolean;
    vrSelected: boolean;

    //Variables specialized for 2D Time series
    yHeader: string;
    //Will use the TIME and yHeader to get data

    getDataByTime: (time:string) => Record<string, string | number> | null;
    loadLocalCSVFile: (index:number,file: File) => (void);
    loadUrlCSVFile: (index: number, file: string) => (void);
    getName: () => string;
    getCSVHeaders: () => string[];
    getBrowserSelected: () => (boolean);
    getVRSelected: () => (boolean);
    setBrowserSelected: (bool: boolean) => (void);
    setVRSelected: (bool: boolean) => (void);

}

export interface CSVReaderInterface extends ModelInterface{
    num: number;                                //number of graphs in loaded in model
                             //Array of loaded CSV files

          //Uses name to find the CSVData
    readLocalFile: (file:File) => (void);          //Will read the csv and add it
    readURLFile: (file: string) => (void);
    deleteFile: (name:string) => (void);        //Get the array and delete it
    getNum: () => (number);
}

export interface ModelInterface{
    data: CSVData[];

    getData: () => (CSVData[])
    getCSVFileByName: (name: string) => (CSVData | null);
}

export interface ControllerInterface{
    model: ModelInterface;

    getModel: () => (ModelInterface);
}