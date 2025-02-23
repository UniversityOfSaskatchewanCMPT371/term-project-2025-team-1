import { sendError, sendLog } from "../logger-frontend";
import { CSVData, CSVModelInterface } from "../types/CSVInterfaces";
import { CSVDataObject } from "./CSVDataObject";

export class CSVReaderModel implements CSVModelInterface{
    //tester comment: num is very undescriptive, what does it do?
    //it LOOKS like num counts the number of data objects, so why not this.data.length
    //from looking at data.loadCsvFile(), i see that it is supposed to be used for indexing
    //but it is only used in name?
    //why does this model need to know the index?
    num : number;
    data: CSVDataObject[];

    constructor(){
        this.num = 0;
        this.data = [];
    }

    //This should get the csv file using name
    getCSVFileByName(name:string): CSVData | null{
        //tester comment: if i call this function, should i expect that data is returned
        //if i enter a name and it returns null, is that expected behavior?
        for(const data of this.data) {
            if(data.name == name){
                return data;
            }
        };
        sendLog("info",`CSVReaderModel.getCSVRileByName() could not find file ${name}`);
        return null;
    }

    //Use the number of graphs in model, for naming
    //The read local | url files will attmept to create a new CSVDataModels object
    //These two will be called using the UI button
    async readLocalFile(file: File): Promise<void>{
        //This should read the string value and try to load a csv file
        //On success add to array
        const data:CSVDataObject = new CSVDataObject(); //this looks like an error so i added ()
        try{
            await data.loadLocalCSVFile(this.num, file);
            sendLog("info",`CSVReaderModel.readLocalFile() read a file\n${JSON.stringify(data.getData())}`);
        }
        catch(error: unknown){
            // logger.error("Failed to read Local to get CSV file");
            sendError(error,"CSVReaderModel.readLocalFile() error");
            return;
        }
        this.data.push(data);
        this.num++;
    }

    async readURLFile(file: string) : Promise<void>{
        const data:CSVDataObject = new CSVDataObject;
        try{
            await data.loadUrlCSVFile(this.num, file);
            sendLog("info",`CSVReaderModel.readURLFile() read a file\n${JSON.stringify(data.getData())}`);
        }
        catch(error: unknown){
            //logger.error("Failed to read Local to get CSV file");
            sendError(error,"CSVReaderModel.readURLFile() error");
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
            sendLog("info",`CSVReaderModel.readLocalByPath() read a file\n${JSON.stringify(data.getData())}`);
        }
        catch(error: unknown){
            // logger.error("Failed to read Local to get CSV file");
            sendError(error,"CSVReaderModel.readLocalByPath() error");
            //tester comment: this one doesnt have a return, is this intentional?
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
                sendLog("info",`CSVReaderModel.deleteFile() ${name} has been deleted from CSVReaderModel`);
                return;
            }
        }
        sendLog("info",`CSVReaderModel.deleteFile(), ${name} was not found in CSVReaderModel`);
        //tester comment: what happends when a file does not exist?
        //what does the user expect it to do when this happens?
    };

    loadedCsvBrowser():[string, boolean][]{
        const csvBrowser:[string,boolean][] = [];
        if(!(this.getData().length > 0)){
            //aka this.getData().length === 0 (cannot be negative)
            sendLog("info","CSVReaderModel.loadedCsvBrowser() returns empty list");
            return csvBrowser;
        }

        this.getData().forEach((file) => {
            const arrVal = file.getName();
            csvBrowser.push([arrVal,file.getBrowserSelected()])
        })
        sendLog("info",`CSVReaderModel.loadedCsvBrowser() returns list\n${JSON.stringify(csvBrowser)}`)
        return csvBrowser;
    }
    //tester comment: for formatting and ease of use, i suggest all get and set functions should be grouped
    getNum(){
        return this.num;
    }

    getData() {
        return this.data;
    };
}