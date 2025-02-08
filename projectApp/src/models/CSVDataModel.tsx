import { LocalCSVReader } from "../components/CSV_Readers/LocalCSVReader";
import { CSVData } from "../types/CSVInterfaces";
import logger from "../logging/logs";
import { UrlCSVReader } from "../components/CSV_Readers/UrlCSVReader";

export class CSVDataModels implements CSVData{
    name: string;
    csvHeaders: string[];
    data: { key: Record<string,string | number> }[];
    yHeader: string;
    constructor(){
        this.name = "Will use number of models for naming";
        this.csvHeaders = [];
        this.data = [];
        this.yHeader = ""; //Will attempt for the second header [1]
        
    }

    async loadLocalCSVFile(index: number,file: string){
        try {
            this.data = await LocalCSVReader(file);
        }
        catch {
            logger.error("Failed Loading");
            return;
        }
        this.name = ("Graph" + index.toString());
    }

    async loadUrlCSVFile(index: number,file: string){
        try {
            this.data = await UrlCSVReader(file)
        }
        catch {
            logger.error("Failed Loading");
            return;
        }
        this.name = ("Graph" + index.toString());
    }
    //Get the value from yHeader
    getDataFromHeader():(string | number){
        return 1;
    }
}