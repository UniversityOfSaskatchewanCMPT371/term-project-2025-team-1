import { GraphClass2 } from "../components/Graph_Components/GraphClass2";
import { ModelInterface } from "../types/BaseInterfaces";
import { CSVData } from "../types/CSVInterfaces";

export class GraphModel implements ModelInterface{
    //Probably will swap this out with a list of Graphs
    data: GraphClass2[];
    constructor(){
        this.data = [];
    }   

    createGraph(csv: CSVData){
        const graph = new GraphClass2(csv);
        graph.setPoints();
        this.data.push(graph);
    }

    getData(){
        return this.data;
    }
}