import mainController from "../src/controller/MainController";

const test = mainController.getCSVController().getModel();

await mainController.getCSVController().getModel().readLocalByPath("../csvTestFiles/test.csv");
const headers = test.getData()[0].data[0];

//return { headers: Object.keys(timeSeries[0]) };
console.log(test.getData());
console.log(headers);

test.getData()[0].yHeader = "X";

console.log(test.getData());
console.log(test.getNum());