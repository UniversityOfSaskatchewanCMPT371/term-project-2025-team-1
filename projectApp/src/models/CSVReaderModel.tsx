import { CSVData, CSVReaderInterface } from "../types/CSVInterfaces";
import { CSVDataModels } from "./CSVDataModel";

export class CSVReaderModel implements CSVReaderInterface{
    num : number;
    csvFiles: CSVData[];

    constructor(){
        this.num = 0;
        this.csvFiles = [];
    }

    //This should get the csv file using name
    getCSVFile(name:string): CSVData{
        return new CSVDataModels();
    }

    //Use the number of graphs in model, for naming
    readFile(file: string){
        //This should read the string value and try to load a csv file
        //On success add to array
    }
    deleteFile(name:string){
        //Use name to find the array and delete it using index
        delete this.csvFiles[0];
    };
}