import { PointRef } from "../../types/PointInterface";

export class PointClass implements PointRef{
    position: [number,number,number];
    selected: boolean;
    xData: string;
    yData: number;

    //TODO
    //Maybe Add A color aspect
    //Then add UpdatePoint(), this function is used to update the point
    //EX. if the selected = false, color is set to skyblue, else blue
    //This could also be probably used to update on zooming
    // color: string;

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