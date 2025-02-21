import { describe, test, expect, beforeEach } from 'vitest';

import mainController from '../src/controller/MainController';
import { TimeSeriesGraphClass } from '../src/components/Graph_Components/TimeSeriesGraphClass';

describe( 'Time Series Graph Class', async () => {
    let graph: TimeSeriesGraphClass;
    await mainController.getCSVController().getModel().readURLFile("https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv");
    
    /**
     * Sets up a new instance of GraphClass2 and a sample point before each test.
     */
    beforeEach(() => {

        const csv = mainController.getCSVController().getModel().getData()[0];
        graph = new TimeSeriesGraphClass(csv);
        
    });

    /**
     * Verifies that a new GraphClass2 instance initializes with an empty points array.
     */
    test('Should Initialize Points to the number of data set loaded', () => {
        // graph.clearPoints();
        expect(graph.getPoints().length).toEqual(4);

        //Testing resetting points
        graph.clearPoints();
        expect(graph.getPoints()).toEqual([]);

        //Repopulating the points
        graph.addPoint();
        expect(graph.getPoints().length).toEqual(4);
    });

    test('Testing headers and range', () => {
        expect(graph.getYHeader()).toBe("X");
        expect(graph.getXHeader()).toBe("Time");
        
        expect(graph.getYRange()).toBe(0);

        //Setting the range of the Graph
        graph.setRange();
        expect(graph.getYRange()).toBe(40);                 //Largest value divisible by 5 on the csv file
        expect(graph.timeSeriesYRange().length).toBe(8);
        
        //Testing if able to switch headers
        graph.incrementYHeader();

        expect(graph.getYHeader()).toBe("Y");
        expect(graph.getXHeader()).toBe("Time");
        
        graph.setRange();
        expect(graph.getYRange()).toBe(45);
        expect(graph.timeSeriesYRange().length).toBe(9);

        //Switching back
        graph.decrementYHeader();

        expect(graph.getYHeader()).toBe("X");
        expect(graph.getXHeader()).toBe("Time");
        
        graph.setRange();
        expect(graph.getYRange()).toBe(40);
        expect(graph.timeSeriesYRange().length).toBe(8);

        //Testing points now
        graph.clearPoints()
        graph.addPoint();

        const point = graph.getPoints()[0];
        expect(graph.getPoints()[0]).toBe(point);

        expect(point.getYData()).toBe(10);
        expect(point.getXData()).toBe("2025-01-18");

        point.setPosition([-1.8,1,0.01]);
        expect(point.getPosition()).toEqual([-1.8,1,0.01]);

        expect(point.getXPosition()).toEqual(-1.8);
        expect(point.getYPosition()).toEqual(1);

        expect(point.getSelected()).toEqual(false);
        point.setSelected(true);
        expect(point.getSelected()).toEqual(true);

        graph.updatePoints();
    })

    /**
     * Tests whether a point can be successfully added to the graph.
     */
    // it('should add a point to the graph', () => {
    //     graph.addPoints();
    //     expect(graph.getPoints()).toHaveLength(1);
    // });

    /**
     * Ensures that a point can be found based on its xData and yData values.
     */
    // it('should find a point by xData and yData', () => {
    //     graph.addPoints();
    //     const foundPoint = graph.findPoint('testX', 100);
    //     expect(foundPoint).not.toBeUndefined();
    //     expect(foundPoint?.getXData()).toBe('testX');
    //     expect(foundPoint?.getYData()).toBe(100);
    // });

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
