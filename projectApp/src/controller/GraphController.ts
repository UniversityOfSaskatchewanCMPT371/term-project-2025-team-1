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
   *
   * @preconditions
   * - The `csv` parameter must be a valid `CSVDataObject`.
   * - The `model` property must be initialized and contain valid graph data.
   * - The `mainController` must be initialized and valid.
   *
   * @postconditions
   * - returns the generated or retrieved time series graph.
   * - If a graph with the same name as `csv` exists, its range is updated
   * - otherwise, a new graph is created and returned
   * - The mainController's main scene is updated.
   */
  generateTimeSeriesGraph(): TimeSeriesGraphObject {
    const graph = this.getModel().getData();
    // assert that model.data is defined
    if (graph === undefined) {
      const error = new SyntaxError("Error on Time Series Graph");
      sendError(
        error,
        "Unable to generate Time Series Graph (GraphController.ts",
      );
      throw error;
    }

    graph.setRange();
    graph.setYRangeLength(graph.timeSeriesYRange().length + 1);
    sendLog(
      "info",
      `generateTimeSeriesGraph() was called; successfully generated Time Series Graph (GraphController.ts)`,
    );
    return graph;
  }

  /**
   * Generates an embedded graph for the given CSV data object.
   *
   * @param csv The CSV data object for which to generate or retrieve the graph.
   *
   * @preconditions
   * - The `csv` parameter must be a valid `CSVDataObject`.
   * - The `model` property must be initialized and contain valid graph data.
   * - The `mainController` must be initialized and valid.
   *
   * @postconditions
   * - returns the generated or retrieved embedded graph
   * - If a graph with the same name as `csv` exists, its range is updated
   * - otherwise, a new graph is created and returned
   * - The mainController's main scene is updated.
   */
  generateEmbeddedGraph(): EmbeddedGraphObject {
    const graph = this.getModel().getEmbeddedGraphData();
    // assert that model.embeddedGraphData is defined
    if (graph === undefined) {
      const error = new SyntaxError("Error Generating Embedded Graph");
      sendError(error, "Unable to generate Embedded Graph");
      throw error;
    }
    graph.setRange();
    sendLog(
      "info",
      `generateEmbeddedGraph() was called; successfully generated Embedded Graph (GraphController.ts)`,
    );
    return graph;
  }

  /**
   * Pushes a TimeSeriesGraphObject and EmbeddedGraphObject into the model's data collection.
   *
   * @param graph The TimeSeriesGraphObject to add to the model.
   * @param emGraph The EmbeddedGraphObject to add to the model.
   *
   * @preconditions The provided `graph` is a valid TimeSeriesGraphObject and `emGraph` is a valid EmbeddedGraphObject.
   *
   * @postconditions The `graph` and `emGraph` graphs are added to the model's data collection.
   */
  pushDataToModel(
    graph: TimeSeriesGraphObject,
    emGraph: EmbeddedGraphObject,
  ): void {
    this.getModel().setTimeSeriesGraph(graph);
    this.getModel().setEmbeddedGraph(emGraph);

    sendLog(
      "info",
      `pushDataToModel() was called; successfully added both 2D and 3D Graphs(GraphController.ts)`,
    );
  }

  /**
   * Retrieves the GraphModel instance.
   *
   * @preconditions none
   *
   * @postconditions returns the GraphModel instance.
   */
  getModel(): GraphModel {
    return this.model;
  }

  /**
   * Retrieves the array of TimeSeriesGraphObject instances stored in the model.
   *
   * @preconditions model.data is defined
   *
   * @postconditions returns the array of TimeSeriesGraphObject instances.
   */
  getModelData(): TimeSeriesGraphObject {
    const emData = this.getModel().getData();
    // assert that model.data is defined
    if (emData === undefined) {
      const error = new SyntaxError("Error getting Time Series Data");
      sendError(error, "Unable to get Time Series Data");
      throw error;
    }
    return emData;
  }

  /**
   * Retrieves the array of EmbeddedGraphObject instances stored in the model.
   *
   * @preconditions model.embeddedGraphData is defined
   *
   * @postconditions returns the array of EmbeddedGraphObject instances.
   */
  getModelEmData(): EmbeddedGraphObject {
    const emData = this.getModel().getEmbeddedGraphData();
    // assert that model.embeddedGraphData is defined
    if (emData === undefined) {
      const error = new SyntaxError("Error getting Embedded Data");
      sendError(error, "Unable to get Embedded Data");
      throw error;
    }
    return emData;
  }

  /**
   * Get the max range used by the 3D Embedded Graph
   * @preconditions for the Embedded Graph to exist and initialized
   * @postconditions returns The max range of the Embedded Graph
   */
  getEmbeddedRange(): number {
    const emData = this.getModel().getEmbeddedGraphData();
    // assert that model.embeddedGraphData is defined
    if (emData === undefined) {
      const error = new SyntaxError("Error getting Embedded Data");
      sendError(error, "Unable to get range of Embedded graph");
      throw error;
    }
    return emData.getRange();
  }

  /**
   * Gets the tau value and turns it to a string to be displayed on the drop down ui
   * @preconditions graph generated with a tau value implemented
   * @postconditions returns a string of the assigned tau value
   */
  getTauForDropDown(): string {
    const emData = this.getModel().getEmbeddedGraphData();
    // assert that model.embeddedGraphData is defined
    if (emData === undefined) {
      const error = new SyntaxError("Error getting Embedded Data");
      sendError(error, "Unable to get tau value");
      throw error;
    }
    return emData.getTau().toString();
  }
}
