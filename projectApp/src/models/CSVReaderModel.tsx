import { sendError, sendLog } from "../logger-frontend";
import { CSVData, CSVModelInterface } from "../types/CSVInterfaces";
import { CSVDataObject } from "./CSVDataObject";

export class CSVReaderModel implements CSVModelInterface{
    num : number;
    data: CSVDataObject[];

    constructor(){
        this.num = 0;
        this.data = [];
    }

    //This should get the csv file using name
    getCSVFileByName(name:string): CSVData | null{
        for(const data of this.data) {
            if(data.name == name){
                return data;
            }
        };
        sendLog("info",`getCSVRileByName could not find file ${name}, is this expected behavior?`);
        return null;
    }

    //Use the number of graphs in model, for naming
    //The read local | url files will attmept to create a new CSVDataModels object
    //These two will be called using the UI button
    async readLocalFile(file: File): Promise<void>{
        //This should read the string value and try to load a csv file
        //On success add to array
        const data:CSVDataObject = new CSVDataObject();
        try{
            await data.loadLocalCSVFile(this.num, file);
            sendLog("info",`readLocalFile read a file\n${JSON.stringify(data.getData())}`);
        }
        catch(error: unknown){
            sendError(error,"readLocalFile error");
            return;
        }
        this.data.push(data);
        this.num++;
    }

    async readURLFile(file: string) : Promise<void>{
        const data:CSVDataObject = new CSVDataObject;
        try{
            await data.loadUrlCSVFile(this.num, file);
            sendLog("info",`readURLFile read a file\n${JSON.stringify(data.getData())}`);
        }
        catch(error: unknown){
            sendError(error,"readURLFile error");
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
            sendLog("info",`readLocalByPath read a file\n${JSON.stringify(data.getData())}`);
        }
        catch(error: unknown){
            sendError(error,"readLocalByPath error");
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
                sendLog("info",`deleteFile() ${name} has been deleted from CSVReaderModel`);
                return;
            }
        }
        sendLog("info",`deleteFile(), ${name} was not found in CSVReaderModel`);
    };

    loadedCsvBrowser():[string, boolean][]{
        const csvBrowser:[string,boolean][] = [];
        if(!(this.getData().length > 0)){
            sendLog("info","loadedCsvBrowser() returns empty list, i think this is intentional");
            return csvBrowser;
        }

        this.getData().forEach((file) => {
            const arrVal = file.getName();
            csvBrowser.push([arrVal,file.getBrowserSelected()])
        })
        sendLog("info",`loadedCsvBrowser() returns list\n${JSON.stringify(csvBrowser)}`)
        return csvBrowser;
    }

    getNum(){
        return this.num;
    }

    getData() {
        return this.data;
    };
}