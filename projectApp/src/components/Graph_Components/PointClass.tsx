import { PointRef } from "../../types/PointInterface";

export class PointClass implements PointRef{
    position: [number,number,number];
    selected: boolean;
    xData: string;
    yData: number;

    constructor(ref: PointRef){
        this.position = ref.position;
        this.selected = ref.selected;
        this.xData = ref.xData;
        this.yData = ref.yData;
    }

    //The setters and getters for the Point Class
    //Getters
    getPosition() {
        return this.position;
    }
    getSelected(){
        return this.selected;
    }
    getXData(){
        return this.xData;
    }
    getYData(){
        return this.yData;
    }
    //End of Getters
    
    //Setters
    setPosition([x,y,z]: number[]){
        this.position = [x,y,z];
    }
    setSelected(select: boolean){
        this.selected = select;
    }
    setXData(newXData: string){
        this.xData = newXData;
    }
    setYData(newYData: number){
        this.yData = newYData;
    }
    //End of Setters
}