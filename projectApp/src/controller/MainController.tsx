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
    private updateScene: any;

    /**
     * Initializes the main controller with new instances of CSV and Graph controllers
     * 
     * @postcondition New controller instances are created and updateScene is set to null
     */
    constructor() {
        this.csvController = new CSVController();
        this.graphController = new GraphController();
        this.updateScene = null;
    }

    /**
     * Retrieves the CSV controller instance
     * @precondition none
     * @postcondition Returns existing CSV controller without modification
     */
    getCSVController() {
        return this.csvController;
    }

    /**
     * Retrieves the Graph controller instance
     * 
     * @postcondition Returns existing Graph controller without modification
     */
    getGraphController() {
        return this.graphController;
    }

    /**
     * Sets the reference to the scene update function
     * 
     * @param {any} ref - Reference to the scene component
     * @precondition ref must have a 'current' property
     * @postcondition updateScene is set to the provided reference's current value
     */
    setSceneRef(ref: any) {
        this.updateScene = ref.current;
    }

    /**
     * Triggers an update of the main scene if an update function is available
     * 
     * @precondition updateScene must be set and have an updateScene method
     * @postcondition Scene update is triggered if preconditions are met
     */
    updateMainScene() {
        if(this.updateScene?.updateScene) {
            this.updateScene.updateScene();
        }
    }
}

/**
 * Singleton instance of the MainController
 */
const mainController = new MainController();
export default mainController;