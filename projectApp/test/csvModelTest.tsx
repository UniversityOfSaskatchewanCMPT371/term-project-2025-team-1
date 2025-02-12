import {CSVReaderModel} from "../src/models/CSVReaderModel";
import mainController from "../src/controller/MainController";
import * as fs from 'fs';

let test = mainController.getGraphController().getReaderModel();

await test.readLocalFile("../csvTestFiles/test.csv");
let headers = test.getCSVFiles()[0].data[0];

//return { headers: Object.keys(timeSeries[0]) };
console.log(test.getCSVFiles());
console.log(headers);
console.log(headers["X"].toString());
console.log(Object.keys(headers)[0]);

test.getCSVFiles()[0].yHeader = "X";
console.log(test.getCSVFiles()[0].getDataByTime("2025-01-19")?.toString());

console.log(test.getCSVFiles());
console.log(test.getNum());

//FileReader is a Web API couldn't test here
// let fp = fs.readFileSync("../csvTestFiles/test.csv", 'utf8');
// let file = new File([fp], "test.csv", {type: "text/csv"});
// let refact = LocalCsvReader(file);

// console.log(refact);