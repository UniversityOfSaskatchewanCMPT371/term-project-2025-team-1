import { describe, test, expect } from "vitest";
import { fileContainsText } from "./fileParser";

/**
 * Testing the 3D Embedded Graph logging functionality
 * Run this test after following embedded_graph.feature
 */
describe('Embedded graph log tests', () => {
    const filePath = "./tests/logConfirmationTests/logConfirmationlogs.txt";

    // Check if the CreateEmbeddedGraph log calls are being reached
    test('file contains CreateEmbeddedGraph logging', async() => {
        const response = await fileContainsText(filePath, "an EmbeddedGraph has been created [not yet functional] (CreateEmbeddedGraph.tsx)");
        expect(response).toBe(true);
    })

    // Check if the addPoints() log calls are being reached
    test('file contains addPoints() logging', async() => {
        const response = await fileContainsText(filePath, "Points added to EmbeddedGraphObject (EmbeddedGraphObject.addPoints())");
        expect(response).toBe(true);
    })

    // // Check if the calculateVectorPosition() log calls are being reached
    // test('file contains calculateVectorPosition() logging', async() => {
    //     const response = await fileContainsText(filePath, `vector position calculated for data at index/time ${time} (EmbeddedGraphObject.calculateVectorPosition())`)
    //     expect(response).toBe(true);
    // })

    // // Check if the setTao() log calls are being reached
    // test('file contains setTao() logging', async() => {
    //     const response = await fileContainsText(filePath, `value of tao in EmbeddedGraphObject updated to the value ${newTao}`);
    //     expect(response).toBe(true);
    // })

    // Check if the generate() log calls are being reached
    test('file contains generate() logging', async() => {
        const response = await fileContainsText(filePath, "generate has pushed a new graph");
        expect(response).toBe(true);
    })

    // Check if the UpdateGraph() log calls are being reached
    test('file contains UpdateGraph() logging', async() => {
        const response = await fileContainsText(filePath, "an EmbeddedGraph object was updated (EmbeddedGraph.tsx)");
        expect(response).toBe(true);
    })

    // Check if the GenerateGraph() log calls are being reached
    test('file contains GenerateGraph() logging', async() => {
        const response = await fileContainsText(filePath, "an EmbeddedGraph visualization is being created [not yet functioning] (EmbeddedGraph.tsx)");
        expect(response).toBe(true);
    })
})