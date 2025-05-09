import { describe, test, expect, beforeEach } from "vitest";

import mainController from "../../src/controller/MainController";
import { TimeSeriesGraphObject } from "../../src/components/Graph_Components/TimeSeriesGraphObject";

describe("Time Series Graph Class", async () => {
  let graph: TimeSeriesGraphObject;
  const url =
    "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv";
  await mainController.getCSVController().loadURLFile(url);

  /**
   * Sets up a new instance of TimeSeriesGraph and a sample point before each test.
   */
  beforeEach(() => {
    const csv = mainController.getCSVController().getModelData()!;
    graph = new TimeSeriesGraphObject(csv);
  });

  /**
   * Verifies that a new GraphObject instance initializes with an empty points array.
   */
  test("Should Initialize Points to the number of data set loaded", () => {
    graph.getCSVData().populatePoints();
    expect(graph.getCSVData().getPoints().length).toEqual(4);

    //Testing resetting points
    graph.getCSVData().clearPoints();
    expect(graph.getCSVData().getPoints()).toEqual([]);

    //Repopulating the points
    graph.getCSVData().populatePoints();
    expect(graph.getCSVData().getPoints().length).toEqual(4);
  });

  test("Testing headers and range", () => {
    expect(graph.getCSVData().getYHeader()).toBe("X");
    expect(graph.getCSVData().getTimeHeader()).toBe("Time");

    expect(graph.getMinYRange()).toBe(0);

    //Setting the range of the Graph
    graph.setRange();
    expect(graph.getMaxYRange()).toBe(40); //Largest value divisible by 10 on the csv file
    expect(graph.timeSeriesYRange().length).toBe(10);

    graph.getCSVData().setYHeader("Y");
    expect(graph.getCSVData().getYHeader()).toBe("Y");
    expect(graph.getCSVData().getTimeHeader()).toBe("Time");

    graph.setRange();
    expect(graph.getMaxYRange()).toBe(50);
    expect(graph.timeSeriesYRange().length).toBe(10);

    graph.getCSVData().setYHeader("X");
    expect(graph.getCSVData().getYHeader()).toBe("X");
    expect(graph.getCSVData().getTimeHeader()).toBe("Time");

    graph.setRange();
    expect(graph.getMaxYRange()).toBe(40);
    expect(graph.timeSeriesYRange().length).toBe(10);

    //Testing points now
    graph.getCSVData().clearPoints();
    graph.getCSVData().populatePoints();
    graph.addPoints();

    //First point in the graph
    const point = graph.getCSVData().getPoints()[0];
    expect(graph.getCSVData().getPoints()[0]).toBe(point);

    //The expected values of the first point in the graph
    expect(point.getYData()).toBe(10);
    expect(point.getTimeData()).toBe("2025-01-18");

    //Selected Status of Point
    expect(point.getSelected()).toEqual(false);
    point.setSelected(true);
    expect(point.getSelected()).toEqual(true);

    graph.updatePoints();
    expect(graph.get2DPoints()[0].getObject().getSelected()).toEqual(false);
  });

  test("Testing setYRangeLength", () => {
    // Set range length and check it
    graph.setYRangeLength(10);
    expect(graph.getYRangeLength()).toBe(10);
  });

  test("Testing timeSeriesXRange", () => {
    // Check each value in the x range
    expect(graph.timeSeriesXRange()[0]).toBe("2025-01-18");
    expect(graph.timeSeriesXRange()[1]).toBe("2025-01-19");
    expect(graph.timeSeriesXRange()[2]).toBe("2025-01-20");
    expect(graph.timeSeriesXRange()[3]).toBe("2025-01-21");
  });

  test("Testing updatePointPosition", () => {
    // Calling updatePointPosition should reset the graph to the actual value
    graph.getCSVData().clearPoints();
    graph.getCSVData().populatePoints();
    graph.addPoints();
    graph.get2DPoints()[0].setPoint2DPosition([10, 10]);
    expect(graph.get2DPoints()[0].getXPosition()).toBe(10);
    // Calling updatePointPosition() should translate the point data values to their proper graph position
    graph.updatePointPosition();
    expect(graph.get2DPoints()[0].getYPosition()).toBe(-1.05);
  });

  test("Testing getNumPoints", () => {
    // Check that each value is properly represented as a point
    graph.getCSVData().clearPoints();
    graph.getCSVData().populatePoints();
    graph.addPoints();
    expect(graph.getNumPoints()).toBe(4);
  });
});
