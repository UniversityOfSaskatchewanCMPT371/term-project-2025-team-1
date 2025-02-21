import { GraphInterface } from "./GraphInterface";

export interface EmbeddedInterface extends GraphInterface{
    // Dimension properties
    dimensions: {
        width: number;
        height: number;
        depth?: number;                  //for 3D graphs? Yes for 3D Graph
    };

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
}