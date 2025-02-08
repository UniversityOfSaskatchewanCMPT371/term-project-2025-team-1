import { CSVData } from "../types/CSVInterfaces";

export class CSVDataModels implements CSVData{
    name: string;
    csvHeaders: string[];
    data: { key: Record<string,string | number> }[];
    yHeader: string;
    constructor(){
        this.name = "Will use number of models for naming";
        this.csvHeaders = [];
        this.data = [];
        this.yHeader = ""; //Will attempt for the second header [1]
    }

    //Get the value from yHeader
    getDataFromHeader():(string | number){
        return 1;
    }
}