import { describe, expect, test } from "vitest";
import { fileContainsText } from "./fileParser";

// Testing the 2D Graph logging functionality
// Run this test after following 2DGraph.feature Gherkin steps (some features yet to be implemented)

describe('2D graph log tests', () => {
    // The log in question is located here
    // This log is used to avoid build issues
    const filePath = "./tests/logConfirmationTests/logConfirmationlogs.txt"

    // Check if the addPoint() log calls are being reached
    test('file contains addPoint() logging', async() => {
        const response = await fileContainsText(filePath, "addPoint() has added new points to the graph");
        expect(response).toBe(true);
    });

    // Check if the setRange() log calls are being reached
    test('file contains setRange() logging', async() => {
        const response = await fileContainsText(filePath, "setRange() was called;");
        expect(response).toBe(true);
    });

    // Check if the logger is notifying the user when a TimeSeriesGraph is created
    test('file contains TimeSeriesGraph creation logging', async() => {
        const response = await fileContainsText(filePath, "a TimeSeriesGraph has been created (CreateTimeSeries.tsx)");
        expect(response).toBe(true);
    });

    // Check if the timeSeriesYRange() log calls are being reached
    test('file contains timeSeriesYRange() logging', async() => {
        const response = await fileContainsText(filePath, "timeSeriesYRange() returned");
        expect(response).toBe(true);
    });

    // Check if the timeSeriesXRange() log calls are being reached
    test('file contains timeSeriesXRange() logging', async() => {
        const response = await fileContainsText(filePath, "timeSeriesXRange() was called");
        expect(response).toBe(true);
    });

    // Check if the logger is notifying the user when a TimeSeriesGraph sidebar is created
    test('file contains TimeSeriesGraph sidebar creation logging', async() => {
        const response = await fileContainsText(filePath, "a TimeSeriesGraph object sidebar was created (TimeSeriesGraph.tsx)");
        expect(response).toBe(true);
    });

    // Check if the getYHeader() log calls are being reached
    test('file contains getYHeader() logging', async() => {
        const response = await fileContainsText(filePath, "getYHeader returned X (TimeSeriesGraphClass.tsx)");
        expect(response).toBe(true);
    });

    // Check if the logger is notifying the user when a TimeSeriesGraph header is selected
    test('file contains TimeSeriesGraph header selection logging', async() => {
        const response = await fileContainsText(filePath, "a TimeSeriesGraph object header was selected and visually updated to reflect selection (TimeSeriesGraph.tsx)");
        expect(response).toBe(true);
    });

    // Check if the logger is notifying the user when a TimeSeriesGraph visualization is created
    test('file contains TimeSeriesGraph visualization logging', async() => {
        const response = await fileContainsText(filePath, "a TimeSeriesGraph visualization is being created (TimeSeriesGraph.tsx)");
        expect(response).toBe(true);
    });

    // Check if the logger is notifying the user when a Y Range visualization is created
    test('file contains Y Range visualization logging', async() => {
        const response = await fileContainsText(filePath, "a visual representation of the Y range was created");
        expect(response).toBe(true);
    });

    // Check if the getYRange() log calls are being reached
    test('file contains getYRange() logging', async() => {
        const response = await fileContainsText(filePath, "getYRange returned");
        expect(response).toBe(true);
    });

    // Check if the logger is notifying the user when a points visualization is created
    test('file contains TimeSeriesGraph point visualization logging', async() => {
        const response = await fileContainsText(filePath, "a visual representation of points was created for a TimeSeriesGraph object");
        expect(response).toBe(true);
    });

    // Check if the logger is notifying the user when TimeSeriesGraph lines are created
    test('file contains TimeSeriesGraph line creation logging', async() => {
        const response = await fileContainsText(filePath, "the lines on a TimeSeriesGraph object were created");
        expect(response).toBe(true);
    });


});