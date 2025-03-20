import React from "react";
import { CSVController } from "./CSVController";
import { GraphController } from "./GraphController";

/**
 * Main controller class that coordinates between CSV and Graph controllers
 * and manages scene updates in the application.
 *
 */
export class MainController {
  private csvController: CSVController;
  private graphController: GraphController;
  private updateScene: React.RefObject<{
    updateScene: () => void;
  }>;

  /**
   * Initializes the main controller with new instances of CSV and Graph controllers
   *
   * @postcondition New controller instances are created and updateScene is set to null
   */
  constructor() {
    this.csvController = new CSVController();
    this.graphController = new GraphController();
    this.updateScene = React.createRef<{ updateScene: () => void }>();
  }

  /**
   * Retrieves the CSV controller instance
   * @precondition none
   * @postcondition Returns existing CSV controller without modification
   */
  getCSVController(): CSVController {
    return this.csvController;
  }

  /**
   * Retrieves the Graph controller instance
   *
   * @postcondition Returns existing Graph controller without modification
   */
  getGraphController(): GraphController {
    return this.graphController;
  }

  /**
   * Sets the reference to the scene update function
   *
   * @param {any} ref - Reference to the scene component
   * @precondition ref must have a 'current' property
   * @postcondition updateScene is set to the provided reference's current value
   */
  setSceneRef(
    ref: React.MutableRefObject<{
      updateScene: () => void;
    }>,
  ): void {
    this.updateScene = ref;
  }

  /**
   * Triggers an update of the main scene if an update function is available
   *
   * @precondition updateScene must be set and have an updateScene method
   * @postcondition Scene update is triggered if preconditions are met
   */
  updateMainScene(): void {
    if (this.updateScene.current?.updateScene) {
      this.updateScene.current.updateScene();
    }
  }
}

/**
 * Singleton instance of the MainController
 */
const mainController = new MainController();
export default mainController;
