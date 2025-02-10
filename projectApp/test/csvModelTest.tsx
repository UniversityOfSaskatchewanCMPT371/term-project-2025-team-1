import {CSVReaderModel} from "../src/models/CSVReaderModel";
let test = new CSVReaderModel();

await test.readLocalFile("../csvTestFiles/test.csv");
let headers = test.getCSVFiles()[0].data[0];

//return { headers: Object.keys(timeSeries[0]) };
console.log(test.getCSVFiles());
console.log(headers);
console.log(headers["X"].toString());
console.log(Object.keys(headers)[0]);

test.getCSVFiles()[0].yHeader = "X";
console.log(test.getCSVFiles()[0].getDataByTime("2025-01-19")?.toString());