import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { CSVDataInterface, CSVModelInterface } from "../types/CSVInterfaces";

export class CSVReaderModel implements CSVModelInterface{
    data: CSVDataObject[];

    constructor(){
        this.data = [];
    }

    //This should get the csv file using name
    getCSVFileByName(name:string): CSVDataInterface | null{
        for(const data of this.data) {
            if(data.name == name){
                return data;
            }
        };
        return null;
    }

    //Use the number of graphs in model, for naming
    //The read local | url files will attmept to create a new CSVDataModels object
    //These two will be called using the UI button
    async readLocalFile(file: File): Promise<void>{
    //     //This should read the string value and try to load a csv file
    //     //On success add to array
         const data:CSVDataObject = new CSVDataObject;
         try{
            await data.loadCSVData(this.data.length, file, false);
         }
         catch{
            // logger.error("Failed to read Local to get CSV file");
            return;
        }
        this.data.push(data);
     }

    async readURLFile(file: string) : Promise<void>{
        const data:CSVDataObject = new CSVDataObject;
        try{
            await data.loadCSVData(this.data.length, file, true);
        }
        catch{
            //logger.error("Failed to read Local to get CSV file");
            return;
        }
        this.data.push(data);
     }

     //Keeping url reading by path for reading
     async readLocalByPath(file:string): Promise<void>{
        const data:CSVDataObject = new CSVDataObject;
         try{
             await data.loadLocalByPath(this.data.length, file);
         }
         catch{
            // logger.error("Failed to read Local to get CSV file");
        }

         this.data.push(data);
     }
     

    deleteFile(name:string): void{
        //Use name to find the array and delete it using index
       // delete this.csvFiles[0]; NOPE: Unsafe use splice instead
       for(let i = 0; i < this.data.length; i++){
        if(this.data[i].name == name){
            this.data.splice(i, 1);
            return;
        }
       }
    };

    loadedCsvBrowser(): [string, boolean][]{
        const csvBrowser:[string,boolean][] = [];

        if(this.getData().length > 0){
            this.getData().forEach((file) => {
                const arrVal = file.getName();
                csvBrowser.push([arrVal,file.getBrowserSelected()])
            })
        }
        return csvBrowser;
    }

    getData(): CSVDataObject[]{
        return this.data;
    };
}