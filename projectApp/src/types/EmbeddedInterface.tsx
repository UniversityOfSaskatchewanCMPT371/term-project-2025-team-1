import { GraphInterface } from "./GraphInterface";

export interface EmbeddedInterface extends GraphInterface{
    // Dimension properties
    dimensions: {
        width: number;
        height: number;
        depth?: number;                  //for 3D graphs? Yes for 3D Graph
    };
    tao: number;

    addPoints(): void;

    calculateVectorPosition(time: number, csvData: {key: Record<string, string | number>}[]): [number, number, number];

    /**
     * Gets the graph's dimensions
     * pre-condition: none
     * post-condition: returns the current dimensions object
     */
    getDimensions(): { width: number; height: number; depth?: number };

    /**
     * Sets the graph's dimensions
     * pre-condition: width and height must be positive numbers
     * post-condition: graph's dimensions are updated to the new values
     */
    setDimensions(width: number, height: number, depth?: number): void;

    /**
     * Gets the value of tao
     * pre-conditions: none
     * post-conditions: returns the current value of tao
     */
    getTao(): number;

    /**
     * Sets the value of tao
     * @param newTao - a number greater than or eqaul to 1
     * post-conditions: the value of tao is updated to newTao
     */
    setTao(newTao: number): void;
}