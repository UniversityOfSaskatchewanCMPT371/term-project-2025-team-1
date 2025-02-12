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
        console.log(name);
        return new CSVDataModels();
    }

    //Use the number of graphs in model, for naming
    //The read local | url files will attmept to create a new CSVDataModels object
    //These two will be called using the UI button
    async readLocalFile(file: string){
        //This should read the string value and try to load a csv file
        //On success add to array
        const data:CSVDataModels = new CSVDataModels;
        try{
            await data.loadLocalCSVFile(this.num, file);
        }
        catch{
            // logger.error("Failed to read Local to get CSV file");
        }

        this.csvFiles.push(data);
    }
    async readURLFile(file: string){
        const data:CSVDataModels = new CSVDataModels;
        try{
            await data.loadUrlCSVFile(this.num, file);
        }
        catch{
            // logger.error("Failed to read Local to get CSV file");
        }

        this.csvFiles.push(data);
    }

    deleteFile(name:string){
        //Use name to find the array and delete it using index
       // delete this.csvFiles[0]; NOPE: Unsafe use splice instead
       console.log(name);
       this.csvFiles.splice(1, 1); //( startAtIndex, deleteCount )
    };
}