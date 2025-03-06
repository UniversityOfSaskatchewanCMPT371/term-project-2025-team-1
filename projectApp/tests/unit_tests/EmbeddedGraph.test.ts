import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { EmbeddedGraphObject } from "../../src/components/Graph_Components/EmbeddedGraphObject";
import mainController from "../../src/controller/MainController";

describe('Embedded Graph test', () => {
    let graph: EmbeddedGraphObject;
    const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID3-3DGraph-VectorCalculation/csvTestFiles/indexedData.csv";

    beforeAll( async() => {
         await mainController.getCSVController().loadURLFile(url);
    })

    beforeEach(() => {
        const csv = mainController.getCSVController().getModelData()[0];
        graph = new EmbeddedGraphObject(csv);
    });

    test('points get added', () => {
        graph.addPoints();
        expect(graph.getPoints().length).toBeGreaterThan(0);
    })
});