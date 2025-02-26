import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { sendError, sendLog } from "../logger-frontend";
import { CSVDataInterface, CSVModelInterface } from "../types/CSVInterfaces";

export class CSVReaderModel implements CSVModelInterface{
    data: CSVDataObject[];

    constructor(){
        this.data = [];
    }

    /**
    * Returns a CSVData object if a file named 'name' exists
    * @param name - The name of the CSV file.
    * @returns The CSVData object if found, otherwise null.
    */
    getCSVFileByName(name:string): CSVDataInterface | null{
        for(const data of this.data) {
            if(data.name == name){
                return data;
            }
        };
        sendLog("info",`getCSVRileByName could not find file ${name}, is this expected behavior?`);
        return null;
    }

    /**
    * Reads a local CSV file and adds it to the data array.
    * @param file - The File object representing the local CSV file.
    */
    async readLocalFile(file: File): Promise<void>{
        const data:CSVDataObject = new CSVDataObject;
        try{
            await data.loadCSVData(this.data.length, file, false);
            sendLog("info",`readLocalFile read a file\n${JSON.stringify(data.getData())}`);
        }
        catch(error: unknown){
            // Log the Error
            sendError(error,"readLocalFile error");
            throw error;
        }
        this.data.push(data);
    }

    /**
    * Reads a CSV file from a URL and adds it to the data array.
    * @param file - The URL string of the CSV file.
    */
    async readURLFile(file: string) : Promise<void>{
        const data:CSVDataObject = new CSVDataObject;
        try{
            await data.loadCSVData(this.data.length, file, true);
            sendLog("info",`readURLFile read a file\n${JSON.stringify(data.getData())}`);
        }
        catch(error: unknown){
            // Log the error
            sendError(error,"readURLFile error");
            throw error;
        }
        this.data.push(data);
    }

    async readLocalByPath(file:string): Promise<void>{
        const data:CSVDataObject = new CSVDataObject;
        try{
            await data.loadLocalByPath(this.data.length, file);
            sendLog("info",`readLocalByPath read a file\n${JSON.stringify(data.getData())}`);
        }
        catch(error: unknown){
            // Log the error
            sendError(error,"readLocalByPath error");
            throw error;
        }

        this.data.push(data);
    }
     
    /**
    * Deletes a CSV file, if it has the name 'name', from the data array
    * @param name - The name of the CSV file to delete.
    */
    deleteFile(name:string): void{
       for(let i = 0; i < this.data.length; i++){
        if(this.data[i].name == name){
            this.data.splice(i, 1);
            sendLog("info",`deleteFile() ${name} has been deleted from CSVReaderModel`);
            return;
        }
        sendLog("info",`deleteFile(), ${name} was not found in CSVReaderModel`);
        //tester comment: what happends when a file does not exist?
        //what does the user expect it to do when this happens?
        };
    }   

    /**
     * @returns An array of tuples where each tuple contains the CSV file name and its browser selection status.
     */
    loadedCsvBrowser():[string, boolean][]{
        const csvBrowser:[string,boolean][] = []

        if(this.getData().length > 0){
            this.getData().forEach((file) => {
                const arrVal = file.getName();
                csvBrowser.push([arrVal,file.getBrowserSelected()])
            })
            sendLog("info",`loadedCsvBrowser() returns list\n${JSON.stringify(csvBrowser)}`)
        }
        return csvBrowser;
    }
    getData(): CSVDataObject[]{
        return this.data;
    };
    // End of Getters
}
