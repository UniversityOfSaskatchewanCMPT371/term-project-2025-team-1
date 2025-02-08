import { CSVReaderModel } from "../models/CSVReaderModel";

export class GraphController {
    private graphModel: CSVReaderModel;

    constructor(){
        this.graphModel = new CSVReaderModel();
    }

    async readLocalFile(file: string){
        await this.graphModel.readLocalFile(file);
    }
    async readCSVFile(file: string){
        await this.graphModel.readURLFile(file);
    }
}