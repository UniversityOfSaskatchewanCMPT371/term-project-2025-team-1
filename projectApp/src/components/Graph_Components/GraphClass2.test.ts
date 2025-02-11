import { describe, it, expect, beforeEach } from 'vitest';
import { GraphClass2 } from './GraphClass2';
import { PointRef } from '../../types/PointInterface';

describe('GraphClass2', () => {
    let graph: GraphClass2;
    let samplePoint: PointRef;

    /**
     * Sets up a new instance of GraphClass2 and a sample point before each test.
     */
    beforeEach(() => {
        graph = new GraphClass2();
        samplePoint = {
            position: [1, 2, 3],
            selected: false,
            xData: 'testX',
            yData: 100,
        };
    });

    /**
     * Verifies that a new GraphClass2 instance initializes with an empty points array.
     */
    it('should initialize with an empty points array', () => {
        expect(graph.getPoints()).toEqual([]);
    });

    /**
     * Tests whether a point can be successfully added to the graph.
     */
    it('should add a point to the graph', () => {
        graph.addPoint(samplePoint);
        expect(graph.getPoints()).toHaveLength(1);
    });

    /**
     * Ensures that a point can be found based on its xData and yData values.
     */
    it('should find a point by xData and yData', () => {
        graph.addPoint(samplePoint);
        const foundPoint = graph.findPoint('testX', 100);
        expect(foundPoint).not.toBeUndefined();
        expect(foundPoint?.getXData()).toBe('testX');
        expect(foundPoint?.getYData()).toBe(100);
    });

    /**
     * Verifies that all points update their positions correctly when a zoom factor is applied.
     */
    it('should update positions based on zoom factor', () => {
        graph.addPoint(samplePoint);
        graph.updateOnZoom(2);
        const updatedPoint = graph.getPoints()[0];
        expect(updatedPoint.getPosition()).toEqual([2, 4, 6]);
    });
});
