import { CSVDataObject } from "../../models/CSVDataObject";
import { TimeSeriesGraphInterface } from "../../types/TimeSeriesGraphInterface";
import { GraphClass } from "./GraphClass";
import { PointClass } from "./PointClass";

// GraphClass2 is a class that represents a collection of multiple points
export class TimeSeriesGraphClass extends GraphClass implements TimeSeriesGraphInterface{
    csvData: CSVDataObject;  //Probably wont need this
    
    constructor(csv: CSVDataObject) {
        super(csv);
        // Initialize an empty array to store PointClass instances
        this.csvData = csv;
    }   

    /**
     * Adds a new point to the graph.
     * pre-codition: pointRef is a valid PointRef object
     * post-condition: a new PointClass instance is added to the graph
     * @param {PointRef} pointRef - Reference to the point data.
     */
    addPoint() {
        this.csvData.getData().forEach((data) => {
            const newPoint = new PointClass();
            newPoint.setPosition([0,0,0.01])
            
            newPoint.setXData(data[this.axes.xLabel as keyof typeof data] as unknown as string);
            newPoint.setYData(data[this.axes.yLabel as keyof typeof data] as unknown as number);
            
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

    getXHeader(){
        return this.axes.xLabel;
    }
    getYHeader(){
        return this.axes.yLabel;
    }
    getYRange(){
        return this.axes.yRange[1];
    }
    setRange(){
        // this.yRange = this.csvData.getData().length;
        let max = 0;
        this.csvData.getData().forEach((data) => {
            if(data[this.axes.yLabel as keyof typeof data] as unknown as number >= max){
                max = data[this.axes.yLabel as keyof typeof data] as unknown as number;
            }
        })

        while((max % 5 != 0)){
            max++;
        }

        this.axes.yRange[1] = max;
    }
    
    timeSeriesYRange():number[]{
        const range:number[] = [];
        let cur = 0;

        while(cur < this.axes.yRange[1]){
            cur = cur + 5;
            range.push(cur);
        }

        return range;
    }

    timeSeriesXRange(): string[]{
        const range: string[] = [];

        this.csvData.getData().forEach((data) => {
            
            const temp = data[this.axes.xLabel as keyof typeof data] as unknown as string;
            range.push(temp);
            
        })

        return range;
    }

    incrementYHeader(){
        if(this.csvData.getCSVHeaders().length < 3){
            return;
        }

        let start = this.csvData.getCSVHeaders().indexOf(this.getYHeader());

        //Cycle to the beginning
        if(start == this.csvData.getCSVHeaders().length - 1){
            if(this.csvData.getCSVHeaders()[0] != this.getXHeader()){
                this.axes.yLabel = this.csvData.getCSVHeaders()[0];
            }
            else{
                //Go to the next available header
                this.axes.yLabel = this.csvData.getCSVHeaders()[1];
            }
            return;
        }

        if(start == this.csvData.getCSVHeaders().length - 2 && this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1] == this.getXHeader()){
            this.axes.yLabel =  this.csvData.getCSVHeaders()[0];
            return;
            
        }
        
        for(start; start < this.csvData.getCSVHeaders().length; start++){
            if(this.csvData.getCSVHeaders()[start] != this.getYHeader() && this.csvData.getCSVHeaders()[start] != this.getXHeader()){
                this.axes.yLabel = this.csvData.getCSVHeaders()[start];
                break;
            }
        }

    }
    decrementYHeader(){
        if(this.csvData.getCSVHeaders().length < 3){
            return;
        }

        let start = this.csvData.getCSVHeaders().indexOf(this.getYHeader());

        //Cycle to the beginning
        if(start == 0){
            if(this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1] != this.getXHeader()){
                this.axes.yLabel = this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1];
            }
            else{
                //Go to the next available header
                this.axes.yLabel =this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 2];
            }
            return;
        }

        if(start == 1 && this.csvData.getCSVHeaders()[0] == this.getXHeader()){
            this.axes.yLabel = this.csvData.getCSVHeaders()[this.csvData.getCSVHeaders().length - 1];
            return;
            
        }
        
        for(start; start > 0; start--){
            if(this.csvData.getCSVHeaders()[start] != this.getYHeader() && this.csvData.getCSVHeaders()[start] != this.getXHeader()){
                this.axes.yLabel= this.csvData.getCSVHeaders()[start];
                break;
            }
        }
    }

    updatePointPosition(){
        const totalSpace = 5;
        const divider = (totalSpace/this.timeSeriesYRange().length);
        let current = (-1.8) + (divider/2);

        this.clearPoints();
        this.addPoint();

        

        this.getPoints().forEach((point) => {
            point.setXPosition(current);
            point.setYPosition(((point.getYData()/100) * (this.getYRange()/(this.timeSeriesYRange().length))) - (1));

            current += divider;
        })
    }
}
