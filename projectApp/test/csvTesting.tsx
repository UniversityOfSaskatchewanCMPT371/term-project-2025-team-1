import { LocalCSVReader as reader, getCSVHeaders as localHeader } from "../src/Functions/LocalCSVReader.tsx"
import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders } from "../src/Functions/UrlCSVReader.tsx"

/*
* This File is for testing the CSV readers
* First It will testing running the Local CSV Reader
* Then It will test the URL CSV Reader
* Both Functions should output the same since, it runs on the 
* same file but different file paths/types
*/

console.log("Test Script For CSV reader");

async function csvTesting() {
    try{
        console.log("---------CSV1------------");
        const localReader = await reader("../csvTestFiles/test.csv");
        console.log("data:",localReader);
        const localheader = await localHeader("../csvTestFiles/test.csv");
        console.log("data:",localheader);
    }
    catch(error) {
        console.error("Error", error);
    }
};
async function urlCsvTesting() {
    try{
        console.log("---------UrlCSV---------");
        console.log("Entering URL: https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/reactViteSpike-urlReader/csvTestFiles/test.csv")
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