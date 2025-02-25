import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { ModelInterface } from "../types/BaseInterfaces";
import { CSVDataInterface } from "../types/CSVInterfaces";

export class GraphModel implements ModelInterface{
    //Probably will swap this out with a list of Graphs
    data: TimeSeriesGraphObject[];
    constructor(){
        this.data = [];
    }   

    selectData(csv: CSVDataInterface): void{
        csv.setVRSelected(true);
    }

    addTimeSeriesGraph(graph: TimeSeriesGraphObject): void{
        this.data.push(graph);
    }

    getData(): TimeSeriesGraphObject[]{
        return this.data;
    }
}