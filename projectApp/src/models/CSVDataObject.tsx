import { LocalCSVReader, LocalCsvReader } from "../components/CSV_Readers/LocalCSVReader";
import { CSVData } from "../types/CSVInterfaces";
import { UrlCSVReader } from "../components/CSV_Readers/UrlCSVReader";

export class CSVDataObject implements CSVData{
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
    /**
    * Loads a CSV file from a local file input and sets the graph data.
    * @param index - The index used to generate a unique graph name.
    * @param file - The local CSV file to be loaded.
    * 
    * @returns void
    * @throws Will silently fail if an error occurs while loading the file.
    */
    async loadLocalCSVFile(index: number,file: File){
        try {
            const data = await LocalCsvReader(file);
            this.setData(data);
            this.setName("Graph" + index.toString());
        }
        catch {
            // Error: failed logging
            return;
        }
    }

    /**
     * Loads a CSV file from a URL and sets the graph data.
     * @param index - The index used to generate a unique graph name.
     * @param file - The URL of the CSV file.
     * 
     * @returns void
     * @throws Will silently fail if an error occurs while loading the file.
     */
    async loadUrlCSVFile(index: number,file: string){
        try {
            const data = await UrlCSVReader(file)
            this.setData(data);
            this.setName("Graph" + index.toString());

            if(data.length > 0){
                const headers = Object.keys(data[0]);
                this.csvHeaders = headers;
            }
        }
        catch {
            // Error: failed logging
            return;
        }
    }

    // Loads a CSV file from a local file path (for testing purposes)
    async loadLocalByPath(index: number,file: string){
        try {
            const data = await LocalCSVReader(file);
            this.setData(data);
            this.name = ("Graph" + index.toString());
        }
        catch {
           // Error: failed logging
            return;
        }
    }
    
    /**
    * Retrieves data corresponding to a specific time value.
    * @param time - The time value to search for in the dataset.
    * @returns The corresponding record as a key-value pair, or `null` if no match is found.
    */
    getDataByTime(time:string): Record<string, string | number> | null{
        let result: Record<string, string | number> | null = null;
        for(const value of this.data){
            // If a matching time value is found, return the corresponding yHeader value
            const val = value;
            for(const header of Object.keys(val)){
                if(val[header as keyof typeof val].toString() == time){
                    result = val[this.yHeader as keyof typeof val];
                    return result;
                }
            }
        }
        return result;
    }
    
    // Getter methods
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
    }

    // Setter methods
    setName(name: string){
        this.name = name;
    }
    setBrowserSelected(bool: boolean){
        this.browserSelected = bool;
    }
    setVRSelected(bool: boolean){
        this.vrSelected = bool;
    }
    // Sets the Y-axis header for graphing (must match one of the CSV headers)
    setYHeader(header:string){
        for(const head of this.csvHeaders){
            if(head == header){
                this.yHeader = header;
            }
        }
    }
}
