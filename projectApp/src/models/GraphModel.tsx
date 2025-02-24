import { TimeSeriesGraphClass } from "../components/Graph_Components/TimeSeriesGraphClass";
import { ModelInterface } from "../types/BaseInterfaces";
import { CSVData } from "../types/CSVInterfaces";

export class GraphModel implements ModelInterface{
    //Probably will swap this out with a list of Graphs
    data: TimeSeriesGraphClass[];
    constructor(){
        this.data = [];
    }   

    selectData(csv: CSVData): void{
        csv.setVRSelected(true);
    }

    addTimeSeriesGraph(graph: TimeSeriesGraphClass): void{
        this.data.push(graph);
    }

    getData(): TimeSeriesGraphClass[]{
        return this.data;
    }
}