import { describe, test, expect, beforeEach } from "vitest";
import { MainController } from "../../src/controller/MainController";
import { CSVController } from "../../src/controller/CSVController";
import { ControllerInterface } from "../../src/types/BaseInterfaces";
import { GraphController } from "../../src/controller/GraphController";

/*
 * Main Controller test, this test will only check if the Main Controller
 * Is able to get an Instance of program controllers
 */

//Interface for controller testing through MainController
interface MCTests {
  description: string; //String describing the test
  controllerType: new () => ControllerInterface; //The Instance of type of controller
  method: () => ControllerInterface; //MainController function that gets the controller
}

/*
 * Tests the sepcified MainController function
 */
function MainControllerTest(testMC: MCTests) {
  test(testMC.description, () => {
    const controller = testMC.method();
    expect(controller).toBeInstanceOf(testMC.controllerType);
  });
}

describe("MainController Tests", () => {
  let mainController: MainController;

  //Before each test, initialize a new MainController
  beforeEach(() => {
    mainController = new MainController();
  });

  //Testing to see if MainController can get an instance of CSV Controller
  const csvController: MCTests = {
    description: "Test if able to get instance of CSV Controller",
    controllerType: CSVController,
    method: () => mainController.getCSVController(),
  };
  MainControllerTest(csvController);

  //Testing to see if MainController can get an instance of CSV Controller
  const graphController: MCTests = {
    description: "Test if able to get instance of Graph Controller",
    controllerType: GraphController,
    method: () => mainController.getGraphController(),
  };
  MainControllerTest(graphController);
});
