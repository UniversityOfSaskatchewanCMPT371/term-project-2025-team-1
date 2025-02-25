import { LocalCSVReader, LocalCsvReader } from "../components/CSV_Readers/LocalCSVReader";
import { CSVDataInterface } from "../types/CSVInterfaces";
import { UrlCSVReader } from "../components/CSV_Readers/UrlCSVReader";

export class CSVDataObject implements CSVDataInterface{
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
        this.yHeader = "";
        this.browserSelected = false;
        this.displayBoard = 0;
        this.vrSelected = false;
    }

    //Initial creation, for loading a graph in the scene, set the yHeader
    async loadCSVData(index: number, file: (File | string), isUrl: boolean): Promise<void>{
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

    //Keeping for now in testing
    async loadLocalByPath(index: number,file: string): Promise<void>{
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

    //For now only one display board
    incrementDisplayBoard(): void{
        if(this.displayBoard == 0){
            this.displayBoard++;
        }
        else{
            this.displayBoard = 0;
        }
    }
    decrementDisplayBoard(): void{
        if(this.displayBoard == 0){
            this.displayBoard = 1;
        }
        else{
            this.displayBoard--;
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
    getData(): {key: Record<string, string | number>}[]{
        return this.data;
    };
    getName(): string{
        return this.name;
    }
    getCSVHeaders(): string[]{
        return this.csvHeaders;
    }
    getYHeader(): string{
        return this.yHeader;
    }
    getBrowserSelected(): boolean{
        return this.browserSelected;
    }
    getVRSelected(): boolean{
        return this.vrSelected;
    };
    getDisplayBoard(): number{
        return this.displayBoard;
    }
    getTimeHeader(): string{
        for(const head of this.getCSVHeaders()){
            if(head == "Time" || head =="time"){
                return head;
            }
        }
        //Error handling
        throw new Error("No allowed time header in csv file");
    }

    setData(data: { key: Record<string,string | number> }[]): void{
        this.data = data;
    }

    setName(name: string): void{
        this.name = name;
    }
    setBrowserSelected(bool: boolean): void{
        this.browserSelected = bool;
    }
    setVRSelected(bool:boolean): void{
        this.vrSelected = bool;
    }
    setYHeader(header:string): void{
        for(const head of this.getCSVHeaders()){
            if(head == header){
                this.yHeader = header;
                break;
            }
        }
    }
}