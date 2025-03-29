import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as LoggerFrontend from "../../src/logger-frontend.ts";
import { Point2DObject } from "../../src/components/Graph_Components/Points/Point2DObject.ts";
import { Point3DObject } from "../../src/components/Graph_Components/Points/Point3DObject.ts";
import { PointObject } from "../../src/components/Graph_Components/Points/PointObject.ts";

/*
 * Testing Requirements:
 *   - Validate that Point2DObject and Point3DObject initialize with default coordinate values (0 for each axis).
 *   - Ensure that getter methods return the current state of the object.
 *   - Verify that setter methods update the appropriate coordinates and call LoggerFrontend.sendLog
 *     with the expected message.
 *   - Mocks are used to intercept calls to LoggerFrontend.sendLog for verifying logging behavior.
 */
describe("Point2DObject", () => {
  let dummyPoint: PointObject;
  let point2D: Point2DObject;

  beforeEach(() => {
    // Spy on the sendLog function and replace its implementation with a no-op.
    vi.spyOn(LoggerFrontend, "sendLog").mockImplementation(() => {
        // intentionally empty
    });
    // Create a dummy point instance.
    dummyPoint = {} as PointObject;
    point2D = new Point2DObject(dummyPoint);
  });

  afterEach(() => {
    // Reset mocks after each test.
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    expect(point2D.getXPosition()).toBe(0);
    expect(point2D.getYPosition()).toBe(0);
    expect(point2D.getObject()).toBe(dummyPoint);
  });

  it("should set x axis position and log the action", () => {
    const x = 5;
    point2D.setXAxisPos(x);
    expect(point2D.getXPosition()).toBe(x);
    expect(LoggerFrontend.sendLog).toHaveBeenCalledWith(
      "info",
      `setXAxisPos() was called; xPosition of 2D Point was set to ${x} (Point2DObject.ts)`,
    );
  });

  it("should set y axis position and log the action", () => {
    const y = 10;
    point2D.setYAxisPos(y);
    expect(point2D.getYPosition()).toBe(y);
    expect(LoggerFrontend.sendLog).toHaveBeenCalledWith(
      "info",
      `setYAxisPos() was called; yPosition of 2D Point was set to ${y} (Point2DObject.ts)`,
    );
  });

  it("should set both x and y positions with setPoint2DPosition and log the action", () => {
    const position: [number, number] = [15, 20];
    point2D.setPoint2DPosition(position);
    expect(point2D.getXPosition()).toBe(position[0]);
    expect(point2D.getYPosition()).toBe(position[1]);
    expect(LoggerFrontend.sendLog).toHaveBeenCalledWith(
      "info",
      `setPoint2DPosition() was called; Position of 2D Point was set to ${position} (Point2DObject.ts)`,
    );
  });
});

describe("Point3DObject", () => {
  let dummyPoint: PointObject;
  let point3D: Point3DObject;

  beforeEach(() => {
    vi.spyOn(LoggerFrontend, "sendLog").mockImplementation(() => {
        // intentionally empty
    });
    dummyPoint = {} as PointObject;
    point3D = new Point3DObject(dummyPoint);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    expect(point3D.getXPosition()).toBe(0);
    expect(point3D.getYPosition()).toBe(0);
    expect(point3D.getZPosition()).toBe(0);
    expect(point3D.getPosition()).toEqual([0, 0, 0]);
    expect(point3D.getObject()).toBe(dummyPoint);
  });

  it("should set x axis position and log the action", () => {
    const x = 7;
    point3D.setXAxisPos(x);
    expect(point3D.getXPosition()).toBe(x);
    expect(LoggerFrontend.sendLog).toHaveBeenCalledWith(
      "info",
      `setXAxisPos() was called; xPosition of 3D Point was set to ${x} (Point3DObject.ts)`,
    );
  });

  it("should set y axis position and log the action", () => {
    const y = 8;
    point3D.setYAxisPos(y);
    expect(point3D.getYPosition()).toBe(y);
    expect(LoggerFrontend.sendLog).toHaveBeenCalledWith(
      "info",
      `setYAxisPos() was called; yPosition of 3D Point was set to ${y} (Point3DObject.ts)`,
    );
  });

  it("should set z axis position and log the action", () => {
    const z = 9;
    point3D.setZAxisPos(z);
    expect(point3D.getZPosition()).toBe(z);
    expect(LoggerFrontend.sendLog).toHaveBeenCalledWith(
      "info",
      `setZAxisPos() was called; zPosition of 3D Point was set to ${z} (Point3DObject.ts)`,
    );
  });

  it("should set the entire 3D position and log the action", () => {
    const position: [number, number, number] = [10, 11, 12];
    point3D.setPoint3DPosition(position);
    expect(point3D.getPosition()).toEqual(position);
    expect(LoggerFrontend.sendLog).toHaveBeenCalledWith(
      "info",
      `setPoint3DPosition() was called; Position of 3D Point was set to ${position} (Point3DObject.ts)`,
    );
  });
});
