import { DataInterface } from "../../types/BaseInterfaces";
import { CSVData } from "../../types/CSVInterfaces";
import { PointClass } from "./PointClass";

// GraphClass2 is a class that represents a collection of multiple points
export class GraphClass2 implements DataInterface{
    name:string;
    points: PointClass[];
    csvData: CSVData;

    constructor(csv: CSVData) {
        // Initialize an empty array to store PointClass instances
        this.name = "";
        this.csvData = csv;
        this.points = [];
    }

    /**
     * Adds a new point to the graph.
     * pre-codition: pointRef is a valid PointRef object
     * post-condition: a new PointClass instance is added to the graph
     * @param {PointRef} pointRef - Reference to the point data.
     */
    addPoint() {
        const newPoint = new PointClass();
        newPoint.setPosition([0,0,0.01])
        this.points.push(newPoint);
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

    setName(name: string){
        this.name = name;
    } 

    setPoints(){
        this.csvData.getData().forEach(() => {
            this.addPoint();
        })
    }
}
