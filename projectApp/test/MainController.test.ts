import { describe, test, expect, beforeEach } from "vitest";
import {MainController} from '../src/controller/MainController';
import { CSVController } from "../src/controller/CSVController";
import { ControllerInterface } from "../src/types/CSVInterfaces";

/* 
* Main Controller test, this test will only check if the Main Controller
* Is able to get an INstance of program controllers
*/
interface MCTests {
    description: string;
    controllerType: new () => ControllerInterface;
    method: () => (ControllerInterface)
}

function MainControllerTest(testMC: MCTests) {
    test(testMC.description, () => {
        const controller = testMC.method();
        expect(controller).toBeInstanceOf(testMC.controllerType);
    })
}

describe("MainController Tests", () => {
    let mainController: MainController;

    //Before each test, initialize a new MainController
    beforeEach(() => {
        mainController = new MainController();
    });

    const csvController: MCTests = {
        description: ("Test if able to get instance of Graph Controller"),
        controllerType: CSVController,
        method: () => mainController.getController(),
    };
    MainControllerTest(csvController);

})