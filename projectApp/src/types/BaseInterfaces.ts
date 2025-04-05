/** Interface for Models */
export interface ModelInterface {
  /** data assigned to model */
  data?: DataInterface;
  /** Get the data, Uses name to find the CSVData */
  getData(): DataInterface | undefined;
}
/** Interface for Controllers */
export interface ControllerInterface {
  /** Model Associated with the controller */
  model: ModelInterface;
  /** Get the model associated with the controller */
  getModel(): ModelInterface;
  /** Get the data  of Model */
  getModelData(): DataInterface | undefined;
}
/** Interface for Data Objects */
export interface DataInterface {
  /** Data object name */
  name: string;
  /** Get name attribute */
  getName(): string;
  /** Set name attribute */
  setName(name: string): void;
}
