import { LocalCSVReader as reader } from "../src/Functions/LocalCSVReader.tsx"
import { UrlCSVReader as urlReader } from "../src/Functions/UrlCSVReader.tsx"

/*
* This File is for testing the CSV readers
* First It will testing running the Local CSV Reader
* Then It will test the URL CSV Reader
* Both Functions should output the same since, it runs on the 
* same file but different file paths/types
*/

console.log("Test Script For CSV reader");

function csvTesting() {
    try{
        console.log("---------CSV1------------");
        console.log("Entering the Local Path: ../csvTestFiles/test.csv");
        reader("../csvTestFiles/test.csv");
    }
    catch(error) {
        console.error("Error", error);
    }
};
function urlCsvTesting() {
    try{
        console.log("---------UrlCSV---------");
        console.log("Entering URL: https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/reactViteSpike-urlReader/csvTestFiles/test.csv")
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/reactViteSpike-urlReader/csvTestFiles/test.csv";
        const readUrl = urlReader(url);
        readUrl.then((data) => console.log("data:",data))
    }
    catch(err){
        console.error("Error:",err);
    }
}

csvTesting();
urlCsvTesting();