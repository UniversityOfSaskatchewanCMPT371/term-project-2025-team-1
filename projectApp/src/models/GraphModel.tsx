import { GraphClass2 } from "../components/Graph_Components/GraphClass2";
import { ModelInterface } from "../types/BaseInterfaces";

export class GraphModel implements ModelInterface{
    //Probably will swap this out with a list of Graphs
    data: GraphClass2[];
    constructor(){
        this.data = [];
    }   

    createGraph(){

    }

    getData(){
        return this.data;
    }
}