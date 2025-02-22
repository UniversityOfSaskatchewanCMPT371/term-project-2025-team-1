import { CSVData, CSVModelInterface } from "../types/CSVInterfaces";
import { CSVDataObject } from "./CSVDataObject";

export class CSVReaderModel implements CSVModelInterface{
    num : number;
    data: CSVData[];

    constructor(){
        this.num = 0;
        this.data = [];
    }

    /**
    * Returns a CSVData object if a file named 'name' exists
    * @param name - The name of the CSV file.
    * @returns The CSVData object if found, otherwise null.
    */
    getCSVFileByName(name:string): CSVData | null{
        for(const data of this.data) {
            if(data.name == name){
                return data;
            }
        };
        return null;
    }

    /**
    * Reads a local CSV file and adds it to the data array.
    * @param file - The File object representing the local CSV file.
    */
    async readLocalFile(file: File): Promise<void>{
         const data:CSVData = new CSVDataObject;
         try{
            await data.loadLocalCSVFile(this.num, file);
         }
         catch{
            // If there is a failure in reading local to get CSV file
            return;
        }
        this.data.push(data);
        this.num++;
     }

    /**
    * Reads a CSV file from a URL and adds it to the data array.
    * @param file - The URL string of the CSV file.
    */
    async readURLFile(file: string) : Promise<void>{
        const data:CSVData = new CSVDataObject;
        try{
            await data.loadUrlCSVFile(this.num, file);
        }
        catch{
            // If there is a failure in reading local to get CSV file
            return;
        }
        this.data.push(data);
        this.num++;
     }

     /**
    * Reads a local CSV file by its path and adds it to the data array.
    * @param file - The file path of the local CSV file.
    */
     async readLocalByPath(file:string){
        const data:CSVDataObject = new CSVDataObject;
         try{
             await data.loadLocalByPath(this.num, file);
         }
         catch{
            // If there is a failure in reading local to get CSV file
        }

         this.data.push(data);
         this.num++;
     }

    /**
    * Deletes a CSV file, if it has the name 'name', from the data array
    * @param name - The name of the CSV file to delete.
    */
    deleteFile(name:string){
       for(let i = 0; i < this.data.length; i++){
        if(this.data[i].name == name){
            this.data.splice(i, 1);
            return;
        }
       }
    };

    /**
     * @returns An array of tuples where each tuple contains the CSV file name and its browser selection status.
     */
    loadedCsvBrowser():[string, boolean][]{
        const csvBrowser:[string,boolean][] = []
        if(!(this.getData().length > 0)){
            return csvBrowser;
        }

        this.getData().forEach((file) => {
            const arrVal = file.getName();
            csvBrowser.push([arrVal,file.getBrowserSelected()])
        })
        return csvBrowser;
    }
    
    // Getter methods
    getNum(){
        return this.num;
    }

    getData() {
        return this.data;
    };
}
