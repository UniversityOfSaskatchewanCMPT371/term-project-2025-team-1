import { CSVData, CSVModelInterface } from "../types/CSVInterfaces";
import { CSVDataObject } from "./CSVDataObject";

export class CSVReaderModel implements CSVModelInterface{
    num : number;
    data: CSVData[];

    constructor(){
        this.num = 0;
        this.data = [];
    }

    //This should get the csv file using name
    getCSVFileByName(name:string): CSVData | null{
        this.data.forEach(data => {
            if(data.name == name){
                return data;
            }
        });
        return null;
    }

    //Use the number of graphs in model, for naming
    //The read local | url files will attmept to create a new CSVDataModels object
    //These two will be called using the UI button
    async readLocalFile(file: File): Promise<void>{
    //     //This should read the string value and try to load a csv file
    //     //On success add to array
         const data:CSVData = new CSVDataObject;
         try{
            await data.loadLocalCSVFile(this.num, file);
         }
         catch{
            // logger.error("Failed to read Local to get CSV file");
            return;
        }
        this.data.push(data);
        this.num++;
     }

    async readURLFile(file: string) : Promise<void>{
        const data:CSVData = new CSVDataObject;
        try{
            await data.loadUrlCSVFile(this.num, file);
        }
        catch{
            //logger.error("Failed to read Local to get CSV file");
            return;
        }
        this.data.push(data);
        this.num++;
     }

     //Keeping url reading by path for reading
     async readLocalByPath(file:string){
        const data:CSVDataObject = new CSVDataObject;
         try{
             await data.loadLocalByPath(this.num, file);
         }
         catch{
            // logger.error("Failed to read Local to get CSV file");
        }

         this.data.push(data);
         this.num++;
     }
     

    deleteFile(name:string){
        //Use name to find the array and delete it using index
       // delete this.csvFiles[0]; NOPE: Unsafe use splice instead
       for(let i = 0; i < this.data.length; i++){
        if(this.data[i].name == name){
            this.data.splice(i, 1);
            return;
        }
       }
    };

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
    getNum(){
        return this.num;
    }

    getData() {
        return this.data;
    };
}