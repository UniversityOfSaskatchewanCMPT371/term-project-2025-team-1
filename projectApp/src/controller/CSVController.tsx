import { CSVReaderModel } from "../models/CSVReaderModel";
import { ControllerInterface } from "../types/CSVInterfaces";

export class CSVController implements ControllerInterface{
    model: CSVReaderModel;

    constructor(){
        this.model = new CSVReaderModel();
    }

    getModel(){
        return this.model;
    }
    async readLocalFile(file: File){
        await this.model.readLocalFile(file);
    }
    async readURLFile(file: string){
        await this.model.readURLFile(file);
    }
    async readLocalFileByPath(file: string){
        await this.model.readLocalByPath(file);
    }
}