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

//FileReader is a Web API couldn't test here
// let fp = fs.readFileSync("../csvTestFiles/test.csv", 'utf8');
// let file = new File([fp], "test.csv", {type: "text/csv"});
// let refact = LocalCsvReader(file);

// console.log(refact);