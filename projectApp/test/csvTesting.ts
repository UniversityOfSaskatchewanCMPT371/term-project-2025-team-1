import { LocalCSVReader as reader } from "../src/Functions/csvReader.js"

console.log("connected");

function csvTesting() {
    try{
        console.log("---------CSV1------------");
        reader("../csvTestFiles/test.csv");
    }
    catch(error) {
        console.error("Error", error);
    }
};

csvTesting();