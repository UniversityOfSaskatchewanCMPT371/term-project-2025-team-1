import { EmbeddedGraphObject } from "../components/Graph_Components/EmbeddedGraphObject";
import { TimeSeriesGraphObject } from "../components/Graph_Components/TimeSeriesGraphObject";
import { ModelInterface } from "../types/BaseInterfaces";
import { CSVDataInterface } from "../types/CSVInterfaces";

/**
 * The GraphModel class is responsible for managing a TimeSeriesGraphObject and .
 *
 * @invariants
 * - If 'data' property is defined, the TimeSeriesGraphObject object in it must be a valid TSGO.
 * - If 'embeddedGraphData' property is defined, the EmbeddedGraphObject object in it must be a valid EGO.
 * - 'data' and 'embeddedGraphData' should reference the same csv data
 *
 * @history
 * - The 'data' property is uninitialized, and must be set by setTimeSeriesGraph().
 * - The 'embeddedGraphData' property is uninitialized, and must be set by setEmbeddedGraph().
 */
export class GraphModel implements ModelInterface {
  data?: TimeSeriesGraphObject;
  embeddedGraphData?: EmbeddedGraphObject;

  /**
   * Sets the VRSelected flag of the given CSV data object to true.
   *
   * @preconditions The CSVDataInterface instance is a valid instance of CSVDataObject.
   *
   * @postconditions The CSVDataInterface instance's VRSelected flag is updated to true if it is a valid instance of CSVDataObject.
   *
   * @param {CSVDataInterface} csv - The CSVDataInterface instance whose VRSelected property will be set.
   */
  selectData(csv: CSVDataInterface): void {
    csv.setVRSelected(true);
  }

  /**
   * Sets a new TimeSeriesGraphObject to the model.
   *
   * @preconditions The 'graph' parameter must be a valid TimeSeriesGraphObject instance.
   *
   * @postconditions The provided 'graph' is appended to the internal 'data' array.
   *
   * @param {TimeSeriesGraphObject} graph - The TimeSeriesGraphObject to add to the model.
   */
  setTimeSeriesGraph(graph: TimeSeriesGraphObject): void {
    this.data = graph;
  }

  /**
   * Returns the TimeSeriesGraphObject instances in the model.
   * @precondition none
   * @postconditions returns {TimeSeriesGraphObject} the TimeSeriesGraphObject this models.
   */
  getData(): TimeSeriesGraphObject | undefined {
    return this.data;
  }

  /**
   * Sets a EmbeddedGraphObject to the model.
   *
   * @preconditions The 'graph' parameter must be a valid EmbeddedGraphObject instance.
   *
   * @postconditions The provided 'graph' is appended to the internal 'embeddedGraphData' array.
   *
   * @param {EmbeddedGraphObject} graph - The EmbeddedGraphObject to add to the model.
   */
  setEmbeddedGraph(graph: EmbeddedGraphObject): void {
    this.embeddedGraphData = graph;
  }

  /**
   * Returns the EmbeddedGraphObject instances in the model.
   * @precondition none.
   * @postconditions returns {EmbeddedGraphObject} the EmbeddedGraphObject this models.
   */
  getEmbeddedGraphData(): EmbeddedGraphObject | undefined {
    return this.embeddedGraphData;
  }
}
