import { sendLog } from "../../logger-frontend";
import { EmbeddedInterface } from "../../types/EmbeddedInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";
import { PointObject } from "./PointObject";


export class EmbeddedGraphObject extends GraphObject implements EmbeddedInterface {

    tao: number;

    constructor(csv: CSVDataObject) {
        super(csv);
        this.tao = 1;
    }

    /**
     * Adds embedded point vectors to the graph.
     * pre-conditions: valid points exist in the csvDataObject of the graph
     * post-conditions: PointObject's containing the vectors are stored in the points array attribute
     */
    addPoints(): void {
        const data = this.csvData.getData();
        data.forEach((line) => {
            const newPoint = new PointObject();
            // gets the time of the current line in the data set
            const time = line[this.axes.xLabel as keyof typeof line] as unknown as number;

            // calculates the vector and stores it in the position attribute of a new PointObject
            const vectorPosition = this.calculateVectorPosition(time, data);
            newPoint.setPosition(vectorPosition);
            this.points.push(newPoint);
        });
        sendLog("info", "Points added to EmbeddedGraphObject (EmbeddedGraphObject.addPoints())");
    }

    /**
     * Calculated the embedded time vector dimensions for the given time.
     * Uses the data set selected in the csvDataObject of the graph
     * Vector return is of the form [y[time], y[time - tao], y[time - 2*tao]] where y is the data set column selected
     * pre-conditions: time >= 0, csvDataObject must contain valid data set and a valid data set much be selected
     * post-conditions: none
     * @param time - the index/time of the data set calculating the vector for
     * @param csvData - the data contained in the csvDataObject of the graph
     *                - this is passed in instead of calling the method to obtain it to avoid uneccessary calls to the methods for every point being calculated
     * @returns an array contaning the coordinates of the vector in the form [x, y, z]
     */
    calculateVectorPosition(time: number, csvData: {key: Record<string, string | number>}[]): [number, number, number] {
        const position: [number, number, number] = [0,0,0];
        
        // calculate the indexes for the 3 coordinates
        const xIndex = time;
        const yIndex = time - this.tao;
        const zIndex = time - 2*this.tao;

        // gets the value of the specified indices from the csvData set
        position[0] = this.retreiveCoordinateValue(xIndex, csvData);
        position[1] = this.retreiveCoordinateValue(yIndex, csvData);
        position[2] = this.retreiveCoordinateValue(zIndex, csvData);
        
        sendLog("info", "vector position calculated for data at index/time ????? (EmbeddedGraphObject.calculateVectorPosition())")
        return position;
    }

    /**
     * gets the value of the currently seelcted column at the line specified in index
     * pre-conditions: csvData contains valid data, and the graph has a column selected that exists in the csv file
     * post-conditions: none
     * @param index line in csv file that contains the coordniate value being retreived
     * @param csvData - the data contained in the csvDataObject of the graph
     *                - this is passed in instead of calling the method to obtain it to avoid uneccessary calls to the methods for every point being calculated
     * @returns if index is >=0, the value at the index (line) of the csv in the column currently selected
     *          otherwise, 0
     */
    retreiveCoordinateValue(index: number, csvData: {key: Record<string, string | number>}[]): number {
        if (index < 0) {
            return 0;
        } else {
            const line: {key: Record<string, string | number>} = csvData[index];
            const position = line[this.axes.yLabel as keyof typeof line] as unknown as number;
            return position;
        }
    }

    

    getDimensions(): { width: number; height: number; depth?: number; } {
        return this.dimensions;
    }


    setDimensions(width: number, height: number, depth?: number): void {
        const newDimensions = {width: width, height: height, depth: depth};
        this.dimensions = newDimensions;
    }

    /**
     * Gets the value of tao
     * pre-conditions: none
     * post-conditions: returns the current value of tao
     */
    getTao(): number {
        return this.tao;
    }

    /**
     * Sets the value of tao
     * @param newTao - a number greater than or eqaul to 1
     * post-conditions: the value of tao is updated to newTao
     */
    setTao(newTao: number): void {
        // TODO - add check for newTao here
        this.tao = newTao;
        sendLog("info", "value of tao in EmbeddedGraphObject updated to the value *****");
    }

    getCSVData(): CSVDataObject {
        return this.csvData;
    }
    
}