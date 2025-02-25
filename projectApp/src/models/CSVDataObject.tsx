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
    displayBoard: number;

    constructor(){
        this.name = "";
        this.csvHeaders = [];
        this.data = [];
        this.yHeader = ""; // Will attempt for the second header [1]
        this.browserSelected = false;
        this.displayBoard = 0;
        this.vrSelected = false;
    }
    setData(data: { key: Record<string,string | number> }[]){
        this.data = data;
    }
    
    /**
     * Loads CSV data from either a local file or a URL.
     * 
     * @param {number} index - The index used to generate a name for the dataset.
     * @param {File | string} file - The CSV file (local file or URL as a string).
     * @param {boolean} isUrl - Whether the provided file is a URL (true) or a local file (false).
     * 
     * @returns {Promise<void>} A promise that resolves once the data is loaded.
     */
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
            return;
        }
    }
    
    // Loads a CSV file from a local file input and sets the graph data.
    async loadLocalCSVFile(index: number,file: File){
        await this.loadCSVData(index, file, false);
    }
    
    // Loads a CSV file from a URL and sets the graph data.
    async loadUrlCSVFile(index: number,file: string){
        await this.loadCSVData(index, file, true);
    }

    // Loads a CSV file from a local file path (for testing purposes)
    async loadLocalByPath(index: number,file: string){
        try {
            const data = await LocalCSVReader(file);
            this.setData(data);
            this.name = ("Graph" + index.toString());
        }
        catch {
            return;
        }
    }

    /**
     * Searches through each record and checks for the specified key in the headers.
     * If a matching key is found, it returns the associated value from that record.
     * 
     * @param key - The key to search for in the dataset.
     * @returns The corresponding value as a key-value pair (Record) from the dataset, or `null` if no match is found.
     */
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

    /**
    * Retrieves data corresponding to a specific time value.
    * @param time - The time value to search for in the dataset.
    * @returns The corresponding record as a key-value pair, or `null` if no match is found.
    */
    getDataByTime(time:string): Record<string, string | number> | null{
        let result: Record<string, string | number> | null = null;
        for(const value of this.data){
            const val = value;
            for(const header of Object.keys(val)){
                if(val[header as keyof typeof val] as unknown as string == time){
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
    };
    getDisplayBoard(){
        return this.displayBoard;
    }
    getTimeHeader():string{
        for(const head of this.getCSVHeaders()){
            if(head == "Time" || head =="time"){
                return head;
            }
        }
        //Error handling
        throw new Error("No allowed time header in csv file");
    }

    // Setter getters
    // Post-condition: The `name` property is updated to the provided name.
    setName(name: string){
        this.name = name;
    }
    // Post-condition: The `browserSelected` property is updated to the provided boolean value.
    setBrowserSelected(bool: boolean){
        this.browserSelected = bool;
    }
    // Post-condition: The `vrSelected` property is updated to the provided boolean value.
    setVRSelected(bool:boolean){
        this.vrSelected = bool;
    }
    // Post-condition: The `yHeader` property is updated to the provided value if it exists in the CSV headers.
    setYHeader(header:string){
        for(const head of this.getCSVHeaders()){
            if(head == header){
                this.yHeader = header;
                break;
            }
        }
    }
    // End of setters

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
