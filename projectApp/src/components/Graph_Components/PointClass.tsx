import { PointRef } from "../../types/PointInterface";

export class PointClass implements PointRef{
    position: [number,number,number];
    selected: boolean;
    xData: string;
    yData: number;

    constructor(){
        this.position =[0,0,0];
        this.selected = false;
        this.xData = "";
        this.yData = 0;
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
    getXPosition(){
        return this.getPosition()[0];
    }
    getYPosition(){
        return this.getPosition()[1];
    }
    //End of Getters
    
    //Setters
    setPosition(position: [number,number,number]){
        this.position = position;
    }
    setSelected(select: boolean){
        this.selected = select;
    }
    setXData(x: string){
        this.xData = x;
        //Error no Time Header
    }

    setYData(y: number){
        this.yData = y;
    }
    setXPosition(x: number){
        this.position[0] = x;
    }
    setYPosition(y: number){
        this.position[1] = y;
    }
    //End of Setters
}