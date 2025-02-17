import { GraphModel } from "../models/GraphModel";
import { ControllerInterface } from "../types/BaseInterfaces";
import { CSVData } from "../types/CSVInterfaces";

export class GraphController implements ControllerInterface{
    model: GraphModel;
    constructor(){
        this.model = new GraphModel();
    }

    getModel(){
        return this.model;
    }

    generateTimeSeriesGraph(csv: CSVData){
        this.getModel().createGraph(csv);
    }
}