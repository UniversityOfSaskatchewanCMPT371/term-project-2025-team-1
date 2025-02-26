import { LocalCSVReader, LocalCsvReader } from "../components/CSV_Readers/LocalCSVReader";
import { CSVData } from "../types/CSVInterfaces";
// import logger from "../logging/logs";
import { UrlCSVReader } from "../components/CSV_Readers/UrlCSVReader";
import { sendError, sendLog } from "../logger-frontend";

/**
 * Class representing a CSV data structure that implements the CSVData interface.
 * Handles loading, storing, and managing CSV data for VR visualization.
 */
export class CSVDataObject implements CSVData{
    name: string;
    csvHeaders: string[];
    data: { key: Record<string,string | number> }[];
    yHeader: string;
    browserSelected: boolean;
    vrSelected: boolean;
    displayBoard: number;

    /**
     * Initializes a new CSVDataObject with default values
     */
    constructor(){
        this.name = "";
        this.csvHeaders = [];
        this.data = [];
        this.yHeader = ""; //Will attempt for the second header [1]
        this.browserSelected = false;
        this.displayBoard = 0;
        this.vrSelected = false;
    }
    /**
     * Sets the data array for the CSV object
     * @param data Array of key-value pair records
     * @precondition data must be a non-null array
     * @postcondition this.data will contain the provided data array
     */
    setData(data: { key: Record<string,string | number> }[]){
        this.data = data;
    }
    /**
     * Loads CSV data from either a file or URL
     * @param index Index number used to generate the graph name
     * @param file File object or URL string containing CSV data
     * @param isUrl Boolean indicating if the source is a URL
     * @precondition if isUrl is true, file must be a string URL,if isUrl is false, file must be a File object
     * index must be a non-negative number
     * @postcondition On success: data, csvHeaders, and name will be populated, On failure: error will be logged and method returns
     * May throw errors during file reading or parsing
     */
    async loadCSVData(index: number, file: (File | string), isUrl: boolean){
        try {
            //tester comment: I think it would be better to just use instanceof operator
            //instead of adding a boolean for isUrl     --Steven
            
            const data = isUrl ? await UrlCSVReader(file as string) : await LocalCsvReader(file as File)
            this.setData(data);
            this.setName("Graph" + index.toString());

            if(data.length > 0){
                const headers = Object.keys(data[0]);
                this.csvHeaders = headers;
                this.setYHeader("X");
            }
            sendLog("info",`loadCSVData has loaded csv data\n${JSON.stringify(this.data)}`);
        }
        catch(error: unknown) {
            sendError(error, "loadCSVData error");
            return;
        }
    }
    /**
     * Loads CSV data from a local file
     * @param index Index number used to generate the graph name
     * @param file Local File object containing CSV data
     */
    async loadLocalCSVFile(index: number,file: File){
        await this.loadCSVData(index, file, false);
    }
    /**
     * Loads CSV data from a URL
     * @param index Index number used to generate the graph name
     * @param file URL string pointing to CSV data
     */
    async loadUrlCSVFile(index: number,file: string){
        await this.loadCSVData(index, file, true);
    }

    /**
     * Loads CSV data from a local file path (used for testing)
     * @param index Index number used to generate the graph name
     * @param file File path string
     */
    async loadLocalByPath(index: number,file: string){
        try {
            const data = await LocalCSVReader(file);
            this.setData(data);
            this.name = ("Graph" + index.toString());
            sendLog("info",`loadLocalByPath has loaded csv data\n${JSON.stringify(this.data)}}`);
        }
        catch(error: unknown) {
            sendError(error, "loadLocalByPath error");
            return;
        }
    }
    /**
     * Retrieves data by a specific key
     * @param key Key to search for in the data
     * @precondition key must be a non-empty string, this.data must be initialized
     * @postcondition Returns matching record or null without modifying data
     */
    getDataByKey(key: string): Record<string, string | number> | null{
        let result: Record<string, string | number> | null = null;
        for(const value of this.data){
            //console.log(val);
            const val = value;
            for(const header of Object.keys(val)){
                if([header as keyof typeof val].toString() == key){
                    result = val[header as keyof typeof val];
                    sendLog("info","getDataByKey has found data");
                    return result;
                    
                }
            }
        }
        sendLog("info","getDataByKey has returned null, is this expected?");
        return result;
    }

    /**
     * Retrieves data for a specific time value
     * @param time Time value to search for
     * @returns Record object if found, null otherwise
     * @precondition time must be a valid time string format,
     * this.data must be initialized, this.yHeader must be set
     * @postcondition Returns matching record if found or null otherwise without modifying data
     */
    getDataByTime(time:string): Record<string, string | number> | null{
        let result: Record<string, string | number> | null = null;
        for(const value of this.data){
            //console.log(val);
            const val = value;
            for(const header of Object.keys(val)){
                if(val[header as keyof typeof val] as unknown as string == time){
                    //console.log(val[header as keyof typeof val], "  ", val[this.yHeader as keyof typeof val]);
                    result = val[this.yHeader as keyof typeof val];
                    sendLog("info","getDataByKey has found data");
                    return result;
                    
                }
            }
        }
        sendLog("info","CSVDataObject.getDataByTime() has returned null, is this expected?");
        return result;
    }
 
    /**
     * @precondition none
     * @returns The complete data array
     */
    getData(){
        return this.data;
    };
    /**
     * @precondition none
     * @returns The name of the CSV data object
     */
    getName(){
        return this.name;
    }
    /**
     * @precondition none
     * @returns Array of CSV column headers
     */
    getCSVHeaders(){
        return this.csvHeaders;
    }
    /**
     * @precondition none
     * @returns Currently selected Y-axis header
     */
    getYHeader(){
        return this.yHeader;
    }
    /**
     * @precondition none
     * @returns Boolean indicating if browser visualization is selected
     */
    getBrowserSelected(){
        return this.browserSelected;
    }
    /**
     * @precondition none
     * @returns Boolean indicating if VR visualization is selected
     */
    getVRSelected(){
        return this.vrSelected;
    };
    /**
     * @precondition none
     * @returns Current display board index
     */
    getDisplayBoard(){
        return this.displayBoard;
    }
    /**
     * Finds and returns the time header from CSV headers
     * 
     * @precondition csvHeaders must be initialized
     * @postcondition Returns a valid time header, 
     * i.e The header string containing "Time" or "time" without modifying data 
     */
    getTimeHeader():string{
        for(const head of this.getCSVHeaders()){
            if(head == "Time" || head =="time"){
                return head;
            }
        }
        throw new Error("No allowed time header in csv file");
    }

    /**
     * Sets the name of the CSV data object
     * @param name New name to set
     * @precondition name must be a string
     * @postcondition Class name attribute is set to name
     */
    setName(name: string){
        sendLog("info",`setName, ${this.name} will now be called ${name}`);
        this.name = name;
    }
    /**
     * Sets the browser visualization selection state
     * @param bool Boolean value to set
     * @precondition bool must be a boolean value
     * @postcondition browserSelected will be set to the provided boolean value
     */
    setBrowserSelected(bool: boolean){
        sendLog("info",`setBrowserSelected, ${this.name} browser is set to ${bool.toString()}`);
        this.browserSelected = bool;
    }
   
    /**
     * Sets the VR visualization selection state
     * @param bool Boolean value to set
     * @precondition bool must be a boolean value
     * @postcondition vrSelected will be set to the provided boolean value
     */
    setVRSelected(bool:boolean){
        sendLog("info",`setVRSelected, ${this.name} vr is set to ${bool.toString()}`);
        this.vrSelected = bool;
    }
    /**
     * Sets the Y-axis header if it exists in CSV headers
     * @param header Header string to set as Y-axis
     * @precondition csvHeaders must be initialized, header must exist in csvHeaders
     * @postcondition yHeader will be set to header if it exists in csvHeaders,
     * yHeader remains unchanged if header not found
     */
    setYHeader(header:string){
        sendLog("info",`setYHeader, ${this.name} yHeader is set to ${header}`);
        for(const head of this.getCSVHeaders()){
            if(head == header){
                this.yHeader = header;
                break;
            }
        }
    }

    /**
     * Toggles display board index between 0 and 1
     * @precondition displayBoard must be 0 or 1
     * @postcondition displayBoard value will be toggled between 0 and 1
     */
    incrementDisplayBoard(){
        sendLog("info",`incrementDisplayBoard, ${this.name} increase displays by 1`);
        if(this.displayBoard == 0){
            this.displayBoard++;
        }
        else{
            this.displayBoard = 0;
        }
    }
    /**
     * @postcondition Toggles display board index between 0 and 1
     */
    decrementDisplayBoard(){
        sendLog("info",`decrementDisplayBoard, ${this.name} decrease displays by 1`);
        if(this.displayBoard == 0){
            this.displayBoard = 1;
        }
        else{
            this.displayBoard--;
        }
    }
}