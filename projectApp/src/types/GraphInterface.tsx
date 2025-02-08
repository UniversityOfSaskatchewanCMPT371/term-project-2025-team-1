/**
 * Interface for graph objects that can be used in both 2D and 3D contexts.
 * Provides a standardized structure for graph representation and manipulation.
 */
import { PointRef } from "./PointInterface";
export interface GraphInterface {
    // Basic graph properties
    id: string;                          // identifier for the graph
    type: '2D' | '3D';                   // Graph type for flexibility
    title?: string;                      // Optional graph title
    
    // Dimension properties
    dimensions: {
        width: number;
        height: number;
        depth?: number;                  //for 3D graphs?
    };
    
    // Data points and configuration
    points: PointRef[];                  // Array of points using PointRef interface
    
    position: {
        x: number;
        y: number;
        z?: number;                  // Optional for possible 3D implementation
    };

    // Axes configuration
    axes: {
        xLabel: string;
        yLabel: string;
        zLabel?: string;                 //for 3D graphs?
        xRange: [number, number];        // Min and max values for x-axis
        yRange: [number, number];        // Min and max values for y-axis
        zRange?: [number, number];       // for 3D graphs?
    };
    
    // Possible Visual customization
    style?: {
        backgroundColor?: string;
        gridColor?: string;
        pointColor?: string;
        lineColor?: string;
        fontFamily?: string;
    };
    
    // Interaction settings
    interactivity?: {
        isSelectable: boolean;
        isDraggable: boolean;
        isZoomable: boolean;
        isRotatable?: boolean;           //for 3D?
    };
    
    // Other Added/Optional metadata
    metadata?: {
        dataSource?: string;             // CSV file name or URl Source
        lastUpdated?: Date;              // Last data update timestamp?
        description?: string;            // Graph description/title?
    };

    onPointSelect?: (point: PointRef) => void;

// getters 
    getId(): string;
    setId(id: string): void;
    getType(): '2D' | '3D';
    setType(type: '2D' | '3D'): void;
    getTitle(): string | undefined;
    setTitle(title: string): void;

    // Dimension getters and setters
    getDimensions(): { width: number; height: number; depth?: number };
    setDimensions(width: number, height: number, depth?: number): void;

    // Position getters and setters
    getPosition(): { x: number; y: number; z?: number };
    setPosition(x: number, y: number, z?: number): void;

    // Points management
    getPoints(): PointRef[];
    setPoints(points: PointRef[]): void;
    addPoint(point: PointRef): void;
    removePoint(point: PointRef): void;
    clearPoints(): void;

    // Axes management
    getAxes(): { xLabel: string; yLabel: string; zLabel?: string; xRange: [number, number]; yRange: [number, number]; zRange?: [number, number] };
    setAxes(axes: { xLabel: string; yLabel: string; zLabel?: string; xRange: [number, number]; yRange: [number, number]; zRange?: [number, number] }): void;
    setAxisLabel(axis: 'x' | 'y' | 'z', label: string): void;
    setAxisRange(axis: 'x' | 'y' | 'z', range: [number, number]): void;

    // Style management
    getStyle(): { backgroundColor?: string; gridColor?: string; pointColor?: string; lineColor?: string; fontFamily?: string } | undefined;
    setStyle(style: { backgroundColor?: string; gridColor?: string; pointColor?: string; lineColor?: string; fontFamily?: string }): void;

    // Interactivity management
    getInteractivity(): { isSelectable: boolean; isDraggable: boolean; isZoomable: boolean; isRotatable?: boolean } | undefined;
    setInteractivity(settings: { isSelectable: boolean; isDraggable: boolean; isZoomable: boolean; isRotatable?: boolean }): void;
    
    // Metadata management
    getMetadata(): { dataSource?: string; lastUpdated?: Date; description?: string } | undefined;
    setMetadata(metadata: { dataSource?: string; lastUpdated?: Date; description?: string }): void;
    updateMetadata(updates: Partial<{ dataSource: string; lastUpdated: Date; description: string }>): void;

    // Event handlers
    setOnPointSelect(handler: (point: PointRef) => void): void;
}
