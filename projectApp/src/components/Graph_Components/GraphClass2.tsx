import { CSVDataObject } from "../../models/CSVDataObject";
import { DataInterface } from "../../types/BaseInterfaces";
import { CSVData } from "../../types/CSVInterfaces";
import { PointClass } from "./PointClass";

// GraphClass2 is a class that represents a collection of multiple points
export class GraphClass2 implements DataInterface{
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
            point.setSelected(point.getSelected()); // Update selection status
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
    setRange(){
        // this.yRange = this.csvData.getData().length;
        let max = 0;
        this.csvData.getData().forEach((data) => {
            if(data[this.yHeader as keyof typeof data] as unknown as number > max){
                max = data[this.yHeader as keyof typeof data] as unknown as number;
            }
        })

        while((max % 5 != 0) || (max % 10 != 0)){
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
}
