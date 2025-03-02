import { EmbeddedInterface } from "../../types/EmbeddedInterface";
import { CSVDataObject } from "../Csv_Components/CSVDataObject";
import { GraphObject } from "./GraphObject";


export class EmbeddedGraphObject extends GraphObject implements EmbeddedInterface {

    // TODO - needs tao attribute

    constructor(csv: CSVDataObject) {
        super(csv);
    }

    // TODO - calculation methods (where the vectors are calculated)

    getDimensions(): { width: number; height: number; depth?: number; } {
        throw new Error("Method not implemented.");
    }


    setDimensions(width: number, height: number, depth?: number): void {
        throw new Error("Method not implemented.");
    }

    
}