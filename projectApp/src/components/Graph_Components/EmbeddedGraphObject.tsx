import { EmbeddedInterface } from "../../types/EmbeddedInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";


export class EmbeddedGraphObject extends GraphObject implements EmbeddedInterface {
    constructor(csv: CSVDataObject) {
        super(csv);
    }

    getDimensions(): { width: number; height: number; depth?: number; } {
        throw new Error("Method not implemented.");
    }


    setDimensions(width: number, height: number, depth?: number): void {
        throw new Error("Method not implemented.");
    }

    
}