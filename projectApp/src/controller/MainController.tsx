import { CSVController } from "./CSVController";
import { GraphController } from "./GraphController";

//Commenting out graph works its in graph
export class MainController {
    private csvController: CSVController;
    private graphController: GraphController;
    private updateScene: any;

    constructor(){
        this.csvController = new CSVController();
        this.graphController = new GraphController();
        this.updateScene = null;
    }

    getCSVController(): CSVController{
        return this.csvController;
    }
    getGraphController(): GraphController{
        return this.graphController;
    }
    setSceneRef(ref: any): void{
        this.updateScene = ref.current;
    }
    updateMainScene(): void{
        if(this.updateScene?.updateScene){
            this.updateScene.updateScene();
        }
    }
}

const mainController = new MainController();
export default mainController;