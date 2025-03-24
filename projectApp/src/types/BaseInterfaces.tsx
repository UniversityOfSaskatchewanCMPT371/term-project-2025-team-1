export interface ModelInterface {
  data: DataInterface; //data assigned to model

  getData(): DataInterface | undefined; //Get the data   //Uses name to find the CSVData
}

export interface ControllerInterface {
  model: ModelInterface; //Model Associated with the controller

  getModel(): ModelInterface; //Get the model associated with the controller
  getModelData(): DataInterface | undefined; //Get the data  of Model
}

export interface DataInterface {
  name: string; //Data object name
  getName(): string; //Get name attribute
  setName(name: string): void; //Set name attribute
}
