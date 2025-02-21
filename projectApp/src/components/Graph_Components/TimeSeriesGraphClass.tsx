import mainController from "../../controller/MainController";
import { CSVDataObject } from "../../models/CSVDataObject";
import { DataInterface } from "../../types/BaseInterfaces";
import { PointClass } from "./PointClass";

// GraphClass2 is a class that represents a collection of multiple points
export class TimeSeriesGraphClass implements DataInterface{
    name:string;
    points: PointClass[];
    csvData: CSVDataObject;  //Probably wont need this
    yHeader: string;
    xHeader: string;
    range: number;

    constructor(csv: CSVDataObject) {
        // Initialize an empty array to store PointClass instances
        this.name = "";
        this.csvData = csv;
        this.points = [];
        this.yHeader = this.csvData.getYHeader();
        this.xHeader = this.csvData.getTimeHeader() as string;
        this.range = 0;
    }   

    /**
     * Adds a new point to the graph.
     * pre-codition: pointRef is a valid PointRef object
     * post-condition: a new PointClass instance is added to the graph
     * @param {PointRef} pointRef - Reference to the point data.
     */
    addPoints() {
        this.csvData.getData().forEach((data) => {
            const newPoint = new PointClass();
            newPoint.setPosition([0,0,0.01])
            
            newPoint.setXData(data[this.xHeader as keyof typeof data] as unknown as string);
            newPoint.setYData(data[this.yHeader as keyof typeof data] as unknown as number);
            
            //Get Header by key then assign
            this.points.push(newPoint);
        })
    }

    /**
     * Finds a point based on given x and y data.
     * pre-codition: xData is a string, yData is a number
     * post-condition: returns the corresponding PointClass instance if found, otherwise undefined
     * @param {string} xData - The x-coordinate (string representation).
     * @param {number} yData - The y-coordinate (numeric value).
     * @returns {PointClass | undefined} The corresponding PointClass instance if found, otherwise undefined.
     */
    findPoint(xData: string, yData: number): PointClass | undefined {
        return this.points.find(point => point.getXData() === xData && point.getYData() === yData);
    }

    /**
     * Updates all points' selection status.
     * If additional properties (like color) need updating, modify here.
     * pre-codition: none
     * post-condition: all points' selection status is updated
     */
    updatePoints() {
        this.points.forEach(point => {
            point.setSelected(false); // Update selection status
            // TODO: Add color update logic if necessary
        });
    }

    /**
     * Retrieves all points in the graph.
     * pre-codition: none
     * post-condition: returns an array of PointClass instances
     * @returns {PointClass[]} Array of PointClass instances.
     */
    getPoints() {
        return this.points;
    }

    /**
     * Updates point positions based on a zooming factor.
     * pre-codition: zoomFactor is a number
     * post-condition: all points' positions are scaled based on the zoom factor
     * @param {number} zoomFactor - The zoom level to scale points' positions.
     */
    //We are not zooming for 2D
    // updateOnZoom(zoomFactor: number) {
    //     this.points.forEach(point => {
    //         const {x, y, z] = point.getPosition(); // Retrieve current position
    //         point.setPosition([x * zoomFactor, y * zoomFactor, z * zoomFactor]); // Adjust based on zoom factor
    //     });
    // }

    getName(){
        return this.name;
    }
    getXHeader(){
        return this.xHeader;
    }
    getYHeader(){
        return this.yHeader;
    }
    getRange(){
        return this.range;
    }

    setName(name: string){
        this.name = name;
    } 
    resetPoints(){
        this.points = [];
    }
    setRange(){
        // this.yRange = this.csvData.getData().length;
        let max = 0;
        this.csvData.getData().forEach((data) => {
            if(data[this.yHeader as keyof typeof data] as unknown as number >= max){
                max = data[this.yHeader as keyof typeof data] as unknown as number;
            }
        })

        while((max % 5 != 0)){
            max++;
        }

        this.range = max;
    }
    
    timeSeriesYRange():number[]{
        let range:number[] = [];
        let cur = 0;

        while(cur < this.range){
            cur = cur + 5;
            range.push(cur);
        }

        return range;
    }

    timeSeriesXRange(): string[]{
        let range: string[] = [];

        this.csvData.getData().forEach((data) => {
            if(data[this.xHeader as keyof typeof data] != undefined){
                let temp = data[this.xHeader as keyof typeof data] as unknown as string;
                range.push(temp);
            }
        })

        return range;
    }

    incrementYHeader(){
        console.log("inc",this.yHeader);
        if(this.csvData.getCSVHeaders().length < 3){
            return;
        }

        let start = this.csvData.getCSVHeaders().indexOf(this.getYHeader());

        //Cycle to the beginning
        if(start == this.csvData.getCSVHeaders().length - 1){
            console.log("NO way")
            if(this.csvData.getCSVHeaders()[0] != this.getXHeader()){
                this.yHeader = this.csvData.getCSVHeaders()[0];
            }
            else{
                //Go to the next available header
                this.yHeader = this.csvData.getCSVHeaders()[1];
            }
            return;
        }

        if(start == this.csvData.getCSVHeaders().length - 2 && this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1] == this.getXHeader()){
            console.log("HRE");
            this.yHeader =  this.csvData.getCSVHeaders()[0];
            return;
            
        }
        
        for(start; start < this.csvData.getCSVHeaders().length; start++){
            console.log(" SO HERE")
            if(this.csvData.getCSVHeaders()[start] != this.getYHeader() && this.csvData.getCSVHeaders()[start] != this.getXHeader()){
                this.yHeader = this.csvData.getCSVHeaders()[start];
                break;
            }
        }

    }
    decrementYHeader(){
        console.log("dec", this.yHeader);
        if(this.csvData.getCSVHeaders().length < 3){
            return;
        }

        let start = this.csvData.getCSVHeaders().indexOf(this.getYHeader());

        //Cycle to the beginning
        if(start == 0){
            if(this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1] != this.getXHeader()){
                this.yHeader = this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1];
            }
            else{
                //Go to the next available header
                this.yHeader =this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 2];
            }
            return;
        }

        if(start == 1 && this.csvData.getCSVHeaders()[0] == this.getXHeader()){
            this.yHeader = this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1];
            return;
            
        }
        
        for(start; start > 0; start--){
            if(this.csvData.getCSVHeaders()[start] != this.getYHeader() && this.csvData.getCSVHeaders()[start] != this.getXHeader()){
                this.yHeader = this.csvData.getCSVHeaders()[start];
                break;
            }
        }
    }

    updatePointPosition(){
        let totalSpace = 5;
        let divider = (totalSpace/this.timeSeriesYRange().length);
        let current = (-1.8) + (divider/2);

        this.resetPoints();
        this.addPoints();

        

        this.getPoints().forEach((point) => {
            point.setXPosition(current);
            point.setYPosition(((point.getYData()/100) * (this.getRange()/(this.timeSeriesYRange().length))) - (1));

            current += divider;
        })
    }
}
