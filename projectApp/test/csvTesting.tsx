import { LocalCSVReader as reader } from "../src/Functions/LocalCSVReader.tsx"
import { UrlCSVReader as urlReader } from "../src/Functions/UrlCSVReader.tsx"

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
function urlCsvTesting() {
    try{
        console.log("---------UrlCSV---------");
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