import { GraphInterface } from "./GraphInterface";

export interface EmbeddedInterface extends GraphInterface{
    // Dimension properties
    dimensions: {
        width: number;
        height: number;
        depth?: number;                  //for 3D graphs? Yes for 3D Graph
    };
    tao: number;

    /**
     * Adds embedded point vectors to the graph.
     * pre-conditions: valid points exist in the csvDataObject of the graph
     * post-conditions: PointObject's containing the vectors are stored in the points array attribute
     */
    addPoints(): void;

    /**
     * Calculated the embedded time vector dimensions for the given time
     * pre-conditions: time >= 0
     * post-conditions: none
     * @param time - the index/time of the data set calculating the vector for
     * @returns an array contaning the coordinates of the vector in the form [x, y, z]
     */
    calculateVectorPosition(time: number): [number, number, number];

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