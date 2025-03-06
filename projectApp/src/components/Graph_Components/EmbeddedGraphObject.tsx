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

            const time = line[this.axes.xLabel as keyof typeof line] as unknown as number;
            // const set = data[this.axes.yLabel as keyof typeof data] as unknown as number;

            const vectorPosition = this.calculateVectorPosition(time);
            newPoint.setPosition(vectorPosition);
            this.points.push(newPoint);
        });
        sendLog("info", "Points added to EmbeddedGraphObject (EmbeddedGraphObject.addPoints())");
    }

    /**
     * Calculated the embedded time vector dimensions for the given time
     * pre-conditions: time >= 0
     * post-conditions: none
     * @param time - the index/time of the data set calculating the vector for
     * @returns an array contaning the coordinates of the vector in the form [x, y, z]
     */
    calculateVectorPosition(time: number): [number, number, number] {
        const csvData = this.csvData.getData();
        const position: [number, number, number] = [0,0,0];
        
        const xIndex = time;
        const yIndex = time - this.tao;
        const zIndex = time - 2*this.tao;

        if (xIndex < 0) {
            position[0] = 0
        } else {
            const xLine: {key: Record<string, string | number>} = csvData[xIndex];
            const xPosition = xLine[this.axes.yLabel as keyof typeof xLine] as unknown as number;
            position[0] = xPosition;
        }
        
        if (yIndex < 0) {
            position[1] = 0;
        }
        else {
            const yLine = csvData[yIndex];
            const yPosition = yLine[this.axes.yLabel as keyof typeof yLine] as unknown as number;
            position[1] = yPosition;
        }
        
        if (zIndex < 0) {
            position[2] = 0;
        }
        else {
            const zLine = csvData[zIndex];
            const zPosition = zLine[this.axes.yLabel as keyof typeof zLine] as unknown as number;
            position[2] = zPosition;
        }
        
        sendLog("info", "vector position calculated for data at index/time ????? (EmbeddedGraphObject.calculateVectorPosition())")
        return position;
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