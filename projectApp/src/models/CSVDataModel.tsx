import { LocalCSVReader, LocalCsvReader } from "../components/CSV_Readers/LocalCSVReader";
import { CSVData } from "../types/CSVInterfaces";
// import logger from "../logging/logs";
import { UrlCSVReader } from "../components/CSV_Readers/UrlCSVReader";

export class CSVDataModels implements CSVData{
    name: string;
    csvHeaders: string[];
    data: { key: Record<string,string | number> }[];
    yHeader: string;
    browserSelected: boolean;
    vrSelected: boolean;
    constructor(){
        this.name = "";
        this.csvHeaders = [];
        this.data = [];
        this.yHeader = ""; //Will attempt for the second header [1]
        this.browserSelected = false;
        this.vrSelected = false;
    }
    setData(data: { key: Record<string,string | number> }[]){
        this.data = data;
    }
    //Initial creation, for loading a graph in the scene, set the yHeader
    async loadLocalCSVFile(index: number,file: File){
        try {
            const data = await LocalCsvReader(file);
            this.setData(data);
            this.setName("Graph" + index.toString());
        }
        catch {
           // logger.error("Failed Loading");
           
            return;
        }
    }

    async loadUrlCSVFile(index: number,file: string){
        try {
            const data = await UrlCSVReader(file)
            this.setData(data);
            this.setName("Graph" + index.toString());
        }
        catch {
            //logger.error("Failed Loading");
            return;
        }
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
    getDataByTime(time:string): Record<string, string | number> | null{
        let result: Record<string, string | number> | null = null;
        let val;
        for(let i = 0; i < this.data.length; i++){
            //console.log(val);
            val = this.data[i];
            for(let header of Object.keys(val) ){
                if(val[header as keyof typeof val].toString() == time){
                    console.log(val[header as keyof typeof val] + "  " + val[this.yHeader as keyof typeof val]);
                    result = val[this.yHeader as keyof typeof val];
                    return result;
                }
            }
        }
        return result;
    }

    getName(){
        return this.name;
    }
    getCSVHeaders(){
        return this.csvHeaders;
    }
    getBrowserSelected(){
        return this.browserSelected;
    }
    getVRSelected(){
        return this.vrSelected;
    }

    setName(name: string){
        this.name = name;
    }
    setBrowserSelected(bool: boolean){
        this.browserSelected = bool;
    }
    setVRSelected(bool: boolean){
        this.browserSelected = bool;
    }
}