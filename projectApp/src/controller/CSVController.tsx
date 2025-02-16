import { CSVReaderModel } from "../models/CSVReaderModel";
import { ControllerInterface } from "../types/BaseInterfaces";

export class CSVController implements ControllerInterface{
    model: CSVReaderModel;

    constructor(){
        this.model = new CSVReaderModel();
    }

    getModel(){
        return this.model;
    }
    // readLocalFile(file: File){
    //     this.model.readLocalFile(file);
    // }
    // readURLFile(file: string){
    //     this.model.readURLFile(file);
    // }
    // readLocalFileByPath(file: string){
    //     this.model.readLocalByPath(file);
    // }
}