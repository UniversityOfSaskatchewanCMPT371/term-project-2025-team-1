import { TimeSeriesGraphClass } from "../components/Graph_Components/TimeSeriesGraphClass";
import { CSVDataObject } from "../models/CSVDataObject";
import { CSVReaderModel } from "../models/CSVReaderModel";
import { ControllerInterface } from "../types/BaseInterfaces";
import { CSVData } from "../types/CSVInterfaces";
import mainController from "./MainController";
/*
* The controller for CSV related actions
*/
export class CSVController implements ControllerInterface{
    model: CSVReaderModel;  //The model used by this controller

    constructor(){
        this.model = new CSVReaderModel();
    }

    generate(){
        for(const csv of this.model.getData()){
            if(csv.getDisplayBoard() == 1){
                csv.setVRSelected(true);
                const graph = new TimeSeriesGraphClass(csv);
                graph.setName(csv.getName());
                graph.addPoint();
                mainController.getGraphController().pushDataToModel(graph)
                console.log("Success on generate?")
                
            }
        }   
    }

    //This method returns the Model, and allows the controller to use its methods
    getModel(){
        return this.model;
    }

    getModelData(){
        return this.model.getData();
    }

    getVRSelected(): CSVDataObject{
        let file:CSVDataObject = new CSVDataObject();
        for(const csv of this.model.getData()){
            if(csv.getVRSelected()){
                file = csv;
                return csv;
            }
        }
        return file;
    }

    async loadLocalFile(file: File){
        await this.getModel().readLocalFile(file);
    }

    async loadURLFile(csv: string){
        await this.getModel().readURLFile(csv);
    }

    browserCSVFiles():[string, boolean][]{
        return this.getModel().loadedCsvBrowser();
    }

    getDataByName(name:string): CSVData | null{
        return this.model.getCSVFileByName(name);
    }
    
}