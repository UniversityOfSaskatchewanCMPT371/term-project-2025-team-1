import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { DataInterface, ModelInterface } from "./BaseInterfaces";

//Planned new interfaces for csv files
//For now, specialized for 2D Time Series
export interface CSVDataInterface extends DataInterface {
  csvHeaders: string[]; //Headers for csv File
  data: { key: Record<string, string | number> }[]; //Data sets of csv files
  browserSelected: boolean; //Checks if loaded file is selected on the Browser
  vrSelected: boolean; //Checks if loaded file is selected on the VR Scene
  displayBoard: number; //Board graph is displayed in

  yHeader: string;
  //Will use the TIME and yHeader to get data

  getData(): { key: Record<string, string | number> }[]; //Get data attribute
  setData(data: { key: Record<string, string | number> }[]): void; //Set data attribute
  getDataByTime(time: string): Record<string, string | number> | null; //Get specific data by Time value
  loadCSVData(index: number, file: File, isUrl: boolean): Promise<void>; //Load a csv file
  getCSVHeaders(): string[]; //Get csv headers attribute
  getTimeHeader(): string; //Get the Time header
  getYHeader(): string; //Get the selected Y Header
  getBrowserSelected(): boolean; //Get browserSelected attribute
  setBrowserSelected(bool: boolean): void; //Set browserSelected attribute
  getVRSelected(): boolean; //Get vrSelected attribute
  setVRSelected(bool: boolean): void; //Set vrSelected attribute
  setYHeader(header: string): void; //Set the Y Header
  getDisplayBoard(): number; //Get displayBoard attribute
  incrementDisplayBoard(): void; //Increment Y header by one column
  decrementDisplayBoard(): void; //Decrement Y header by one column
}

export interface CSVModelInterface extends ModelInterface {
  readLocalFile(file: File): Promise<void>; //Will read the csv through local file and load it
  readURLFile(file: string): Promise<void>; //Will read the csv file through url link and load it
  getCSVFileByName(name: string): CSVDataObject | undefined; //Get specific csv data by Name value
}
