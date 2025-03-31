import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { DataInterface, ModelInterface } from "./BaseInterfaces";

/**
 * Interface for CSVDataObject
 * @extends DataInterface
 * Planned new interfaces for csv files.
 * For now, specialized for 2D Time Series
 * */
export interface CSVDataInterface extends DataInterface {
  /** Headers for csv File */
  csvHeaders: string[];
  /** Data sets of csv files */
  data: { key: Record<string, string | number> }[];
  /** Checks if loaded file is selected on the Browser */
  browserSelected: boolean;
  /** Checks if loaded file is selected on the VR Scene */
  vrSelected: boolean;
  /** The YHeader for the column used in Y axis. Will use the TIME and yHeader to get data */
  yHeader: string;
  /** Get data attribute */
  getData(): { key: Record<string, string | number> }[];
  /** Set data attribute */
  setData(data: { key: Record<string, string | number> }[]): void;
  /** Get specific data by Time value */
  getDataByTime(time: string): Record<string, string | number> | null;
  /** Load a csv file */
  loadCSVData(index: number, file: File, isUrl: boolean): Promise<void>;
  /** Get csv headers attribute */
  getCSVHeaders(): string[];
  /** Get the Time header */
  getTimeHeader(): string;
  /** Get the selected Y Header */
  getYHeader(): string;
  /** Get browserSelected attribute */
  getBrowserSelected(): boolean;
  /** Set browserSelected attribute */
  setBrowserSelected(bool: boolean): void;
  /** Get vrSelected attribute */
  getVRSelected(): boolean;
  /** Set vrSelected attribute */
  setVRSelected(bool: boolean): void;
  /** Set the Y Header */
  setYHeader(header: string): void;
}
/**
 * Interface for CSVReaderModel
 * @extends ModelInterface
 */
export interface CSVModelInterface extends ModelInterface {
  /** Will read the csv through local file and load it */
  readLocalFile(file: File): Promise<void>;
  /** Will read the csv file through url link and load it */
  readURLFile(file: string): Promise<void>;
  /** Get specific csv data by Name value */
  getCSVFile(): CSVDataObject | undefined;
}
