import { LocalCSVReader, LocalCsvReader } from "../components/CSV_Readers/LocalCSVReader";
import { CSVData } from "../types/CSVInterfaces";
// import logger from "../logging/logs";
import { UrlCSVReader } from "../components/CSV_Readers/UrlCSVReader";

export class CSVDataObject implements CSVData{
    name: string;
    csvHeaders: string[];
    data: { key: Record<string,string | number> }[];
    yHeader: string;
    browserSelected: boolean;
    vrSelected: boolean;
    displayBoard: number;

    constructor(){
        this.name = "";
        this.csvHeaders = [];
        this.data = [];
        this.yHeader = ""; //Will attempt for the second header [1]
        this.browserSelected = false;
        this.displayBoard = 0;
        this.vrSelected = false;
    }
    setData(data: { key: Record<string,string | number> }[]){
        this.data = data;
    }
    //Initial creation, for loading a graph in the scene, set the yHeader
    async loadCSVData(index: number, file: (File | string), isUrl: boolean){
        try {
            
            const data = isUrl ? await UrlCSVReader(file as string) : await LocalCsvReader(file as File)
            this.setData(data);
            this.setName("Graph" + index.toString());

            if(data.length > 0){
                const headers = Object.keys(data[0]);
                this.csvHeaders = headers;
                this.setYHeader("X");
            }
        }
        catch {
            //logger.error("Failed Loading");
            return;
        }
    }
    async loadLocalCSVFile(index: number,file: File){
        await this.loadCSVData(index, file, false);
    }
    async loadUrlCSVFile(index: number,file: string){
        await this.loadCSVData(index, file, true);
    }

    //Keeping for now in testing
    async loadLocalByPath(index: number,file: string){
        try {
            const data = await LocalCSVReader(file);
            this.setData(data);
            this.name = ("Graph" + index.toString());
        }
        catch {
           // logger.error("Failed Loading");
            return;
        }
    }
    getDataByKey(key: string): Record<string, string | number> | null{
        let result: Record<string, string | number> | null = null;
        for(const value of this.data){
            //console.log(val);
            const val = value;
            for(const header of Object.keys(val)){
                if([header as keyof typeof val].toString() == key){
                    //console.log(val[header as keyof typeof val], "  ", val[this.yHeader as keyof typeof val]);
                    result = val[header as keyof typeof val];
                    return result;
                    
                }
            }
        }
        return result;
    }

    getDataByTime(time:string): Record<string, string | number> | null{
        let result: Record<string, string | number> | null = null;
        for(const value of this.data){
            //console.log(val);
            const val = value;
            for(const header of Object.keys(val)){
                if(val[header as keyof typeof val] as unknown as string == time){
                    //console.log(val[header as keyof typeof val], "  ", val[this.yHeader as keyof typeof val]);
                    result = val[this.yHeader as keyof typeof val];
                    return result;
                    
                }
            }
        }
        return result;
    }

    getData(){
        return this.data;
    };
    getName(){
        return this.name;
    }
    getCSVHeaders(){
        return this.csvHeaders;
    }
    getYHeader(){
        return this.yHeader;
    }
    getBrowserSelected(){
        return this.browserSelected;
    }
    getVRSelected(){
        return this.vrSelected;
    };
    getDisplayBoard(){
        return this.displayBoard;
    }
    getTimeHeader(){
        for(const head of this.getCSVHeaders()){
            if(head == "Time" || head =="time"){
                return head;
            }
        }
        //Error handling
        throw new Error("No allowed time header in csv file");
    }

    setName(name: string){
        this.name = name;
    }
    setBrowserSelected(bool: boolean){
        this.browserSelected = bool;
    }
    setVRSelected(bool:boolean){
        this.vrSelected = bool;
    }
    setYHeader(header:string){
        for(const head of this.getCSVHeaders()){
            if(head == header){
                this.yHeader = header;
                break;
            }
        }
    }

    //For now only one display board
    incrementDisplayBoard(){
        if(this.displayBoard == 0){
            this.displayBoard++;
        }
        else{
            this.displayBoard = 0;
        }
    }
    decrementDisplayBoard(){
        if(this.displayBoard == 0){
            this.displayBoard = 1;
        }
        else{
            this.displayBoard--;
        }
    }
}