import { LocalCSVReader as reader } from "./Functions/csvReader.js"

console.log("connected");

async function app() {
    try{
        console.log("---------CSV1------------");
        await reader("../../csvTestFiles/test.csv");
    }
    catch(error) {
        console.error("Error", error);
    }
}


app();