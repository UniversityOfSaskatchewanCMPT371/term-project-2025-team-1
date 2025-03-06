import { EmbeddedInterface } from "../../types/EmbeddedInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";
import { PointObject } from "./PointObject";


export class EmbeddedGraphObject extends GraphObject implements EmbeddedInterface {

    // TODO - needs tao attribute
    tao: number;

    constructor(csv: CSVDataObject) {
        super(csv);
        this.tao = 1;
    }

    // TODO - calculation methods (where the vectors are calculated)
    addPoints(): void {
        const data = this.csvData.getData();
        data.forEach((line) => {
            // console.log(line)
            const newPoint = new PointObject();

            const time = line[this.axes.xLabel as keyof typeof line] as unknown as number;
            // const set = data[this.axes.yLabel as keyof typeof data] as unknown as number;

            const vectorPosition = this.calculateVectorPosition(time, data);
            newPoint.setPosition(vectorPosition);
            this.points.push(newPoint);
        });
        console.log("point created");
    }

    calculateVectorPosition(time: number, csvData: {key: Record<string, string | number>}[]): [number, number, number] {
        const position: [number, number, number] = [0,0,0];
        
        const xIndex = time;
        const yIndex = time - this.tao;
        const zIndex = time - 2*this.tao;

        if (xIndex < 0) {
            position[0] = 0
        } else {
            const xLine: {key: Record<string, string | number>} = csvData[xIndex];
            console.log(xLine)
            console.log(this.axes.yLabel)
            const xPosition = xLine[this.axes.yLabel as keyof typeof xLine] as unknown as number;
            console.log(xPosition);
            position[0] = xPosition;
        }
        
        if (yIndex < 0) {
            position[1] = 0;
        }
        else {
            const yLine = csvData[yIndex];
            const yPosition = yLine[this.axes.yLabel as keyof typeof yLine] as unknown as number;
            console.log(yPosition);
            position[1] = yPosition;
        }
        
        if (zIndex < 0) {
            position[2] = 0;
        }
        else {
            const zLine = csvData[zIndex];
            const zPosition = zLine[this.axes.yLabel as keyof typeof zLine] as unknown as number;
            console.log(zPosition);
            position[2] = zPosition;
        }
        
        console.log(position)
        return position;
    }

    

    getDimensions(): { width: number; height: number; depth?: number; } {
        throw new Error("Method not implemented.");
    }


    setDimensions(width: number, height: number, depth?: number): void {
        throw new Error("Method not implemented.");
    }


    // TODO - getter and setter for tao
    
}