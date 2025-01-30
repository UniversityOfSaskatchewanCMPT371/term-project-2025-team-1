import { LocalCSVReader as reader } from "../src/Functions/LocalCSVReader.tsx"
import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders } from "../src/Functions/UrlCSVReader.tsx"

console.log("connected");

async function csvTesting() {
    try{
        console.log("---------CSV1------------");
        const localReader = await reader("../csvTestFiles/test.csv");
        console.log("data:",localReader);
    }
    catch(error) {
        console.error("Error", error);
    }
};
async function urlCsvTesting() {
    try{
        console.log("---------UrlCSV---------");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/reactViteSpike-urlReader/csvTestFiles/test.csv";
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        const headers = await urlHeaders(url);
        console.log("headers:",headers);
    }
    catch(err){
        console.error("Error:",err);
    }
}

//do these in order, no syncronous
await csvTesting();
await urlCsvTesting();