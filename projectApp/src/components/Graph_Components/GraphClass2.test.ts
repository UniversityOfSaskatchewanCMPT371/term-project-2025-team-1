import { describe, it, expect, beforeEach } from 'vitest';
import { TimeSeriesGraphClass } from './TimeSeriesGraphClass';
import { PointRef } from '../../types/PointInterface';
import mainController from '../../controller/MainController';

describe('GraphClass2', () => {
    let graph: TimeSeriesGraphClass;
    let samplePoint: PointRef;

    /**
     * Sets up a new instance of GraphClass2 and a sample point before each test.
     */
    beforeEach(async () => {
        await mainController.getCSVController().getModel().readURLFile("https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv");

        const csv = mainController.getCSVController().getModel().getData()[0];
        graph = new TimeSeriesGraphClass(csv);
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
        graph.addPoints();
        expect(graph.getPoints()).toHaveLength(1);
    });

    /**
     * Ensures that a point can be found based on its xData and yData values.
     */
    it('should find a point by xData and yData', () => {
        graph.addPoints();
        const foundPoint = graph.findPoint('testX', 100);
        expect(foundPoint).not.toBeUndefined();
        expect(foundPoint?.getXData()).toBe('testX');
        expect(foundPoint?.getYData()).toBe(100);
    });

    /**
     * Verifies that all points update their positions correctly when a zoom factor is applied.
     */
    // it('should update positions based on zoom factor', () => {
    //     graph.addPoints();
    //     graph.updateOnZoom(2);
    //     const updatedPoint = graph.getPoints()[0];
    //     expect(updatedPoint.getPosition()).toEqual([2, 4, 6]);
    // });
});
