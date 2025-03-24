import { CSVDataObject } from "../components/Csv_Components/CSVDataObject";
import { EmbeddedGraphObject } from "../components/Graph_Components/EmbeddedGraphObject";
import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { sendError, sendLog } from "../logger-frontend";
import { GraphModel } from "../models/GraphModel";
import { ControllerInterface } from "../types/BaseInterfaces";

/**
 *
 * The GraphController is responsible for managing the creation and storage of time series graphs
 *
 * @invariants
 *   - The 'model' property is always a valid instance of GraphModel.
 *   - The GraphModel contains only valid TimeSeriesGraphObject instances.
 *
 * @history
 *   - Graph objects are stored in the model's data array. Once a graph is added, it persists until it is removed.
 *
 */
export class GraphController implements ControllerInterface {
  model: GraphModel;
  constructor() {
    this.model = new GraphModel();
  }

  /**
   * Generates a time series graph for the given CSV data object.
   *
   * @param csv The CSV data object for which to generate or retrieve the graph.
   * @returns {TimeSeriesGraphClass} The generated or retrieved time series graph.
   *
   * @preconditions:
   *    The `csv` parameter must be a valid `CSVDataObject`.
   *    The `model` property must be initialized and contain valid graph data.
   *    The `mainController` must be initialized and valid.
   *
   * @postconditions:
   *    If a graph with the same name as `csv` exists, its range is updated, a new graph is created and returned otherwise
   *    The mainController's main scene is updated.
   */
  generateTimeSeriesGraph(csv: CSVDataObject): TimeSeriesGraphObject {
    for (const graph of this.getModel().getData()) {
      if (graph.getName() == csv.getName()) {
        graph.setRange();
        graph.setYRangeLength(graph.timeSeriesYRange().length + 1);
        sendLog(
          "info",
          `generateTimeSeriesGraph() was called; successfully generated Time Series Graph (GraphController.ts)`,
        );
        return graph;
      }
    }

    const error = new SyntaxError("Error on Time Series Graph");
    sendError(
      error,
      "Unable to generate Time Series Graph (GraphController.ts",
    );
    throw error;
  }

  /**
   * Generates an embedded graph for the given CSV data object.
   *
   * @param csv The CSV data object for which to generate or retrieve the graph.
   * @returns {EmbeddedGraphClass} The generated or retrieved time series graph.
   *
   * @precondition:
   *    The `csv` parameter must be a valid `CSVDataObject`.
   *    The `model` property must be initialized and contain valid graph data.
   *    The `mainController` must be initialized and valid.
   *
   * @postconditions:
   *    If a graph with the same name as `csv` exists, its range is updated, a new graph is created and returned otherwise
   *    The mainController's main scene is updated.
   */
  generateEmbeddedGraph(csv: CSVDataObject): EmbeddedGraphObject {
    for (const graph of this.getModel().getEmbeddedGraphData()) {
      if (graph.getName() == csv.getName()) {
        graph.setRange();
        sendLog(
          "info",
          `generateEmbeddedGraph() was called; successfully generated Embedded Graph (GraphController.ts)`,
        );
        return graph;
      }
    }

    const error = new SyntaxError("Error Generating Embedded Graph");
    sendError(error, "Unable to generate Embedded Graph");
    throw error;
  }

  /**
   * Pushes a TimeSeriesGraphObject and EmbeddedGraphObject into the model's data collection.
   *
   * @precondition The provided 'graph' is a valid TimeSeriesGraphObject and 'emGraph' is a valid EmbeddedGraphObject.
   *
   * @postcondition The 'graph' and 'emGraph' graphs are added to the model's data collection.
   *
   * @param graph The TimeSeriesGraphObject to add to the model.
   * @param emGraph The EmbeddedGraphObject to add to the model.
   */
  pushDataToModel(
    graph: TimeSeriesGraphObject,
    emGraph: EmbeddedGraphObject,
  ): void {
    this.getModel().addTimeSeriesGraph(graph);
    this.getModel().addEmbeddedGraph(emGraph);

    sendLog(
      "info",
      `pushDataToModel() was called; successfully added both 2D and 3D Graphs(GraphController.ts)`,
    );
  }

  /**
   * Retrieves the GraphModel instance.
   *
   * @precondition none
   *
   * @postcondition a valid GraphModel instance is returned.
   *
   * @returns The GraphModel instance.
   */
  getModel(): GraphModel {
    return this.model;
  }

  /**
   * Retrieves the array of TimeSeriesGraphObject instances stored in the model.
   *
   * @precondition none
   *
   * @postcondition The array of TimeSeriesGraphObject instances is returned.
   *
   * @returns The array of TimeSeriesGraphObject instances.
   */
  getModelData(): TimeSeriesGraphObject[] {
    return this.model.getData();
  }

  /**
   * Returns the number of TimeSeriesGraphObject instances stored in the model.
   *
   * @precondition none
   *
   * @postcondition The number of TimeSeriesGraphObject instances is returned.
   *
   * @returns The number of TimeSeriesGraphObject instances in the model
   */
  getDataLength(): number {
    return this.getModel().getData().length;
  }

  /**
   * Retrieves the array of EmbeddedGraphObject instances stored in the model.
   *
   * @precondition none
   *
   * @postcondition The array of EmbeddedGraphObject instances is returned.
   *
   * @returns The array of EmbeddedGraphObject instances.
   */
  getModelEmData(): EmbeddedGraphObject[] {
    return this.model.getEmbeddedGraphData();
  }

  /**
   * Returns the number of EmbeddedGraphObject instances stored in the model.
   *
   * @precondition none
   *
   * @postcondition The number of EmbeddedGraphObject instances is returned.
   *
   * @returns The number of EmbeddedGraphObject instances in the model
   */
  getEmDataLength(): number {
    return this.getModel().getEmbeddedGraphData().length;
  }

  /**
   * This method returns the max range used by the 3D Embedded Graph
   * @precondition for the Embedded Graph to exist and initialized
   * @postcondition on success, returns the max range of the Embedded Graph
   */
  getEmbeddedRange(): number {
    return this.getModel().getEmbeddedGraphData()[0].getRange();
  }

  /**
   * Gets the tau value and turns it to a string to be displayed on the drop down ui
   * @precondition graph generated with a tau value implemented
   * @postcondition returns a string of the assigned tau value
   */
  getTauForDropDown(): string {
    return this.getModel().getEmbeddedGraphData()[0].getTau().toString();
  }
}
