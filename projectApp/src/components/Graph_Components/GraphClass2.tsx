import { PointRef } from "../../types/PointInterface";
import { PointClass } from "./PointClass";

// GraphClass2 is a class that represents a collection of multiple points
export class GraphClass2 {
    points: PointClass[];

    constructor() {
        // Initialize an empty array to store PointClass instances
        this.points = [];
    }

    /**
     * Adds a new point to the graph.
     * @param pointRef - Reference to the point data.
     */
    addPoint(pointRef: PointRef) {
        const newPoint = new PointClass(pointRef);
        this.points.push(newPoint);
    }

    /**
     * Finds a point based on given x and y data.
     * @param xData - The x-coordinate (string representation).
     * @param yData - The y-coordinate (numeric value).
     * @returns The corresponding PointClass instance if found, otherwise undefined.
     */
    findPoint(xData: string, yData: number): PointClass | undefined {
        return this.points.find(point => point.getXData() === xData && point.getYData() === yData);
    }

    /**
     * Updates all points' selection status.
     * If additional properties (like color) need updating, modify here.
     */
    updatePoints() {
        this.points.forEach(point => {
            point.setSelected(point.getSelected()); // Update selection status
            // TODO: Add color update logic if necessary
        });
    }

    /**
     * Retrieves all points in the graph.
     * @returns Array of PointClass instances.
     */
    getPoints() {
        return this.points;
    }

    /**
     * Updates point positions based on a zooming factor.
     * @param zoomFactor - The zoom level to scale points' positions.
     */
    updateOnZoom(zoomFactor: number) {
        this.points.forEach(point => {
            const [x, y, z] = point.getPosition(); // Retrieve current position
            point.setPosition([x * zoomFactor, y * zoomFactor, z * zoomFactor]); // Adjust based on zoom factor
        });
    }
}
