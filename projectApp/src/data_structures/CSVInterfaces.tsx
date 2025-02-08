/*
* Interfaces required for the CSV Readers
*/
export interface CSVHeaders {
    headers: string[];
}

//TODO
// Lint: error  A record is preferred over an index signature
export interface TimeSeriesData {
    [key: string]: string | number;
}