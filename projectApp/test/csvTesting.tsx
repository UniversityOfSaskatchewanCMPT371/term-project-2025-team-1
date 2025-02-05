import { LocalCSVReader as localReader, LocalCSVHeaders as localHeaders } from "../src/components/LocalCSVReader.tsx"
import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders } from "../src/components/UrlCSVReader.tsx"

/*
* This File is for testing the CSV readers
* First It will testing running the Local CSV Reader
* Then It will test the URL CSV Reader
* Both Functions should output the same since, it runs on the 
* same file but different file paths/types
*/

const totalTests = 30;
let numTests = 0;
let successFound = 0;
let errorsFound = 0;
let expectedErrors = 0;
let expectedSuccess = 0;

function incrementExpectedErrors() {
    expectedErrors++;
}

function incrementExpectedSuccess() {
    expectedSuccess++;
}

console.log("Test Script For CSV reader");

async function localCsvReaderTestFormat(file:string ,expected:(()=>void), logMessage:string){
    numTests++;
    expected();
    try{
        console.log(logMessage);
        const readLocal = await localReader(file);
        console.log("data:",readLocal);
        successFound++;
    }
    catch(error) {
        console.log(`Error Found: ${file}`);
        errorsFound++;
    }
}

async function localCsvHeadersTestFormat(file:string ,expected:(()=>void), logMessage:string){
    numTests++;
    expected();
    try{
        console.log(logMessage);
        const headers = await localHeaders(file);
        console.log("data:",headers);
        successFound++;
    }
    catch(error) {
        console.log(`Error Found: ${file}`);
        errorsFound++;
    }
}

async function localCsvTesting() {

    //Testing reading a csv file that exist
    await localCsvReaderTestFormat("../csvTestFiles/test.csv",incrementExpectedSuccess,"Local Reader with normal csv file");
    await localCsvHeadersTestFormat("../csvTestFiles/test.csv",incrementExpectedSuccess,"Local Headers with normal csv file");

    //Testing reading a csv file that doesn't exists Locally
    await localCsvReaderTestFormat("../csvTestFiles/FakeCSV.csv",incrementExpectedErrors,"Local Reader non-existing file");
    await localCsvHeadersTestFormat("../csvTestFiles/FakeCSV.csv",incrementExpectedErrors,"Local Headers non-existing file");

    //Testing reading a csv file that has one less header
    await localCsvReaderTestFormat("../csvTestFiles/oneLessHeader.csv",incrementExpectedSuccess,"Local Reader one less header file");
    await localCsvHeadersTestFormat("../csvTestFiles/oneLessHeader.csv",incrementExpectedSuccess,"Local Headers one less header file");
    
    //Testing reading a csv file that has one more header
    await localCsvReaderTestFormat("../csvTestFiles/oneMoreHeader.csv",incrementExpectedSuccess,"Local Reader one more header file");
    await localCsvHeadersTestFormat("../csvTestFiles/oneMoreHeader.csv",incrementExpectedSuccess,"Local Headers one more header file");
    
    //Testing reading a csv file that has unequal number of columns
    await localCsvReaderTestFormat("../csvTestFiles/unevenData.csv",incrementExpectedSuccess,"Local Reader uneven data file");
    await localCsvHeadersTestFormat("../csvTestFiles/unevenData.csv",incrementExpectedSuccess,"Local Headers uneven data file");

    //Testing reading a csv file that has different data types for each line
    await localCsvReaderTestFormat("../csvTestFiles/differentTypes.csv",incrementExpectedSuccess,"Local Reader different data types file");
    await localCsvHeadersTestFormat("../csvTestFiles/differentTypes.csv",incrementExpectedSuccess,"Local Headers different data types file");

    //Testing reading a html file to see if it errors
    await localCsvReaderTestFormat("../csvTestFiles/notCsv.html",incrementExpectedErrors,"Local Reader html file");
    await localCsvHeadersTestFormat("../csvTestFiles/notCsv.html",incrementExpectedErrors,"Local Headers html file");

};

console.log("Test Script For CSV reader");

async function urlCsvReaderTestFormat(url:string ,expected:(()=>void), logMessage:string){
    numTests++;
    expected();
    try{
        console.log(logMessage);
        const readLocal = await urlReader(url);
        console.log("data:",readLocal);
        successFound++;
    }
    catch(error) {
        console.log(`Error Found: ${url}`);
        errorsFound++;
    }
}

async function urlCsvHeadersTestFormat(url:string ,expected:(()=>void), logMessage:string){
    numTests++;
    expected();
    try{
        console.log(logMessage);
        const headers = await urlHeaders(url);
        console.log("data:",headers);
        successFound++;
    }
    catch(error) {
        console.log(`Error Found: ${url}`);
        errorsFound++;
    }
}

async function urlCsvTesting() {
    let url: string = "no url";
    //Testing reading a csv file that exist by URL
    url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/test.csv";
    await urlCsvReaderTestFormat(url,incrementExpectedSuccess,"URL Reader with normal csv file");
    await urlCsvHeadersTestFormat(url,incrementExpectedSuccess,"URL Headers with normal csv file");

    //Testing reading a csv file that doesn't exists URL
    url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/FakeCSV.csv";
    await urlCsvReaderTestFormat(url,incrementExpectedErrors,"URL Reader non-existing file");
    await urlCsvHeadersTestFormat(url,incrementExpectedErrors,"URL Headers non-existing file");

    //Testing reading a csv file that has one less header
    //Testing for URL Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Reader one less header file");
        url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/oneLessHeader.csv";
        console.log(`Entering URL: ${url}`);
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }
    //Testing for URL Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Headers one less header file");
        console.log(`Entering URL: ${url}`);
        const headers = await urlHeaders(url);
        console.log("headers:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }
    
    //Testing reading a csv file that has one more header
    //Testing for URL Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Reader one more header file");
        url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/oneMoreHeader.csv";
        console.log(`Entering URL: ${url}`);
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }
    //Testing for URL Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Headers one more header file");
        console.log(`Entering URL: ${url}`);
        const headers = await urlHeaders(url);
        console.log("headers:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }
    
    //Testing reading a csv file that has unequal number of columns
    //Testing for URL Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Reader uneven data file");
        url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/unevenData.csv";
        console.log(`Entering URL: ${url}`);
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }
    //Testing for URL Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Headers uneven data file");
        console.log(`Entering URL: ${url}`);
        const headers = await urlHeaders(url);
        console.log("headers:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing reading a csv file that has different data types for each line
    //Testing for URL Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Reader different data types file");
        url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/differentTypes.csv";
        console.log(`Entering URL: ${url}`);
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }
    //Testing for URL Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Headers different data types file");
        console.log(`Entering URL: ${url}`);
        const headers = await urlHeaders(url);
        console.log("headers:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing reading a html file to see if it errors
    //Testing for URL Reader
    numTests++;
    expectedErrors++;
    try{
        console.log("---------URL Reader html file");
        url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/notCsv.html";
        console.log(`Entering URL: ${url}`);
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }
    //Testing for URL Header
    numTests++;
    expectedErrors++;
    try{
        console.log("---------URL Headers html file");
        console.log(`Entering URL: ${url}`);
        const headers = await urlHeaders(url);
        console.log("headers:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing reading a csv file from somewhere else...
    //do we need permissions for this?
    //Testing for URL Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Reader pandas? file");
        url = "https://www.w3schools.com/python/pandas/data.csv";
        console.log(`Entering URL: ${url}`);
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }
    //Testing for URL Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Headers pandas? file");
        console.log(`Entering URL: ${url}`);
        const headers = await urlHeaders(url);
        console.log("headers:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
    }
}

function FinishTest(){
    console.log(`Number of Tests: ${totalTests}, Expected Errors: ${expectedErrors}, Expected Successes: ${expectedSuccess}`);
    console.log(`Tests completed: ${numTests}, Errors Found: ${errorsFound}, Successful Tests: ${successFound}`);
    if(numTests != totalTests){
        console.log(`All Tests Not Completed: Finished (${numTests}) -> Expected (${totalTests})`);
        process.exit(1);
    }
    else if(errorsFound != expectedErrors){
        console.log(`Errors Expected Does Not Match: Found (${errorsFound}) -> Expected (${expectedErrors})`);
        process.exit(1);
    }
    else if(successFound != expectedSuccess){
        console.log(`Success Expected Does Not Match: Found (${successFound}) -> Expected (${expectedSuccess})`);
        process.exit(1);
    }
    console.log("Test passed!");
    process.exit(0);
}

//do these in order, no syncronous
await localCsvTesting();
await urlCsvTesting();

setTimeout(FinishTest,5000);