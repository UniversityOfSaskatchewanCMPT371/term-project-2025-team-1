import { PointInterface } from "../../types/PointInterface";

export class PointObject implements PointInterface{
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
    getPosition(): [number,number,number] {
        return this.position;
    }
    getSelected(): boolean{
        return this.selected;
    }
    getXData(): string{
        return this.xData;
    }
    getYData(): number{
        return this.yData;
    }
    getXPosition(): number{
        return this.getPosition()[0];
    }
    getYPosition(): number{
        return this.getPosition()[1];
    }
    //End of Getters
    
    //Setters
    setPosition(position: [number,number,number]): void{
        this.position = position;
    }
    setSelected(select: boolean): void{
        this.selected = select;
    }
    setXData(x: string): void{
        this.xData = x;
        //Error no Time Header
    }

    setYData(y: number): void{
        this.yData = y;
    }
    setXPosition(x: number): void{
        this.position[0] = x;
    }
    setYPosition(y: number): void{
        this.position[1] = y;
    }
    //End of Setters
}