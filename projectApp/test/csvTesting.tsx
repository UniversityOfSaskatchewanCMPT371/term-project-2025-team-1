import { LocalCSVReader as localReader, LocalCSVHeaders as localHeaders } from "../src/components/LocalCSVReader.tsx"
import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders } from "../src/components/UrlCSVReader.tsx"

/*
* This File is for testing the CSV readers
* First It will testing running the Local CSV Reader
* Then It will test the URL CSV Reader
* Both Functions should output the same since, it runs on the 
* same file but different file paths/types
*/

console.log("Test Script For CSV reader");

async function csvTesting() {
    //Testing reading a csv file that exists
    try{
        console.log("---------CSV1------------");
        const readLocal = await localReader("../csvTestFiles/test.csv");
        console.log("data:",readLocal);
        const headers = await localHeaders("../csvTestFiles/test.csv");
        console.log("headers:",headers);
    }
    catch(error) {
        console.error("Error", error);
    }

    //Testing reading a csv file that doesn't exists
    try{
        console.log("---------Local Reader non-existing file");
        const treadLocal = await localReader("../csvTestFiles/FakeCSV.csv");
        console.log("data:", treadLocal);
        const theaders = await localHeaders("../csvTestFiles/FakeCSV.csv");
        console.log("headers:",theaders);
    }
    catch(error) {
        console.error("Error", error);
    }
};
async function urlCsvTesting() {
    try{
        console.log("---------UrlCSV---------");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/reactViteSpike-urlReader/csvTestFiles/test.csv";
        console.log(`Entering URL: ${url}`)
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        const headers = await urlHeaders(url);
        console.log("headers:",headers);
    }
    catch(err){
        console.error("Error:",err);
    }

    try{
        console.log("---------URL Reader non-existing file");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/reactViteSpike-urlReader/csvTestFiles/FakeCSV.csv";
        console.log(`Entering URL: ${url}`)
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
    }
    catch(err){
        console.error("Error:",err);
    }
}

//do these in order, no syncronous
await csvTesting();
await urlCsvTesting();