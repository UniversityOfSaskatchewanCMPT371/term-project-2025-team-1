import { CSVData } from "./CSVInterfaces";

export interface ModelInterface{
    data: CSVData[];                                        //Array of data assigned to model

    getData: () => (CSVData[])                              //Get the array of data
    getCSVFileByName: (name: string) => (CSVData | null);   //Uses name to find the CSVData
}

export interface ControllerInterface{
    model: ModelInterface;                                  //Model Associated with the controller

    getModel: () => (ModelInterface);                       //Get the model associated with the controller
}