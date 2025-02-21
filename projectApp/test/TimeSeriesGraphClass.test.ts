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

        //First point in the graph
        const point = graph.getPoints()[0];
        expect(graph.getPoints()[0]).toBe(point);

        //The expected values of the first point in the graph
        expect(point.getYData()).toBe(10);
        expect(point.getXData()).toBe("2025-01-18");

        //Testing to see if a Point's position is modifiable
        point.setPosition([-1.8,1,0.01]);
        expect(point.getPosition()).toEqual([-1.8,1,0.01]);

        expect(point.getXPosition()).toEqual(-1.8);
        expect(point.getYPosition()).toEqual(1);

        //Selected Status of Point
        expect(point.getSelected()).toEqual(false);
        point.setSelected(true);
        expect(point.getSelected()).toEqual(true);

        graph.updatePoints();
        expect(graph.getPoints()[0].getSelected()).toEqual(false);
    })
});
