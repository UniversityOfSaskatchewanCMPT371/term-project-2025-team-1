import { LocalCSVReader as localReader, LocalCSVHeaders as localHeaders } from "../src/components/LocalCSVReader.tsx"
import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders } from "../src/components/UrlCSVReader.tsx"

/*
* This File is for testing the CSV readers
* First It will testing running the Local CSV Reader
* Then It will test the URL CSV Reader
* Both Functions should output the same since, it runs on the 
* same file but different file paths/types
*/

let numTests = 0;
let totalTests = 22;
let successFound = 0;
let errorsFound = 0;
let expectedErrors = 0;
let expectedSuccess = 0;
console.log("Test Script For CSV reader");

async function csvTesting() {
    //Testing reading a csv file that exist
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------CSV1------------");
        const readLocal = await localReader("../csvTestFiles/test.csv");
        console.log("data:",readLocal);
        const headers = await localHeaders("../csvTestFiles/test.csv");
        console.log("headers:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing reading a csv file that doesn't exists Locally
    //Testing for Local Reader
    numTests++;
    expectedErrors++;
    try{
        console.log("---------Local Reader non-existing file");
        const readLocal = await localReader("../csvTestFiles/FakeCSV.csv");
        console.log("data:",readLocal);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing for Local Header
    numTests++;
    expectedErrors++;
    try{
        console.log("---------Local Headers non-existing file");
        const headers = await localHeaders("../csvTestFiles/FakeCSV.csv");
        console.log("data:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing reading a csv file that has one less header
    //Testing for Local Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------Local Reader one less header file");
        const readLocal = await localReader("../csvTestFiles/oneLessHeader.csv");
        console.log("data:",readLocal);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing for Local Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------Local Headers one less header file");
        const headers = await localHeaders("../csvTestFiles/oneLessHeader.csv");
        console.log("data:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }
    
    //Testing reading a csv file that has one more header
    //Testing for Local Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------Local Reader one more header file");
        const readLocal = await localReader("../csvTestFiles/oneMoreHeader.csv");
        console.log("data:",readLocal);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing for Local Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------Local Headers one more header file");
        const headers = await localHeaders("../csvTestFiles/oneMoreHeader.csv");
        console.log("data:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }
    
    //Testing reading a csv file that has unequal number of columns
    //Testing for Local Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------Local Reader uneven data file");
        const readLocal = await localReader("../csvTestFiles/unevenData.csv");
        console.log("data:",readLocal);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing for Local Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------Local Headers uneven data file");
        const headers = await localHeaders("../csvTestFiles/unevenData.csv");
        console.log("data:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing reading a csv file that has different data types for each line
    //Testing for Local Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------Local Reader different data types file");
        const readLocal = await localReader("../csvTestFiles/differentTypes.csv");
        console.log("data:",readLocal);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing for Local Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------Local Headers different data types file");
        const headers = await localHeaders("../csvTestFiles/differentTypes.csv");
        console.log("data:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }
};

async function urlCsvTesting() {
    //Testing reading a csv file that exist by URL
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------UrlCSV---------");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/test.csv";
        console.log(`Entering URL: ${url}`)
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        const headers = await urlHeaders(url);
        console.log("headers:",headers);
        successFound++;
    }
    catch(err){
        console.log("Error Found");
        errorsFound++;
    }

    //Testing reading a csv file that doesn't exists URL
    //Testing for URL Reader
    numTests++;
    expectedErrors++;
    try{
        console.log("---------URL Reader non-existing file");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/FakeCSV.csv";
        console.log(`Entering URL: ${url}`);
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        successFound++;
    }
    catch(err){
        console.log("Error Found");
        errorsFound++;
    }

    //Testing reading a csv file that doesn't exists by URL
    //Testing for URL Header
    numTests++;
    expectedErrors++;
    try{
        console.log("---------URL Headers non-existing file");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/FakeCSV.csv";
        console.log(`Entering URL: ${url}`);
        const headers = await urlHeaders(url);
        console.log("headers:",headers);
        successFound++;
    }
    catch(err){
        console.log("Error Found");
        errorsFound++;
    }

    //Testing reading a csv file that has one less header
    //Testing for Local Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Reader one less header file");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/oneLessHeader.csv";
        console.log(`Entering URL: ${url}`);
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing for Local Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Headers one less header file");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/oneLessHeader.csv";
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
    //Testing for Local Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Reader one more header file");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/oneMoreHeader.csv";
        console.log(`Entering URL: ${url}`);
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing for Local Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Headers one more header file");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/oneMoreHeader.csv";
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
    //Testing for Local Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Reader uneven data file");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/unevenData.csv";
        console.log(`Entering URL: ${url}`);
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing for Local Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Headers uneven data file");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/unevenData.csv";
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
    //Testing for Local Reader
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Reader different data types file");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/differentTypes.csv";
        console.log(`Entering URL: ${url}`);
        const readUrl = await urlReader(url);
        console.log("data:",readUrl);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
    }

    //Testing for Local Header
    numTests++;
    expectedSuccess++;
    try{
        console.log("---------URL Headers different data types file");
        const url = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID1CodeFreezeSpike-urlReader/csvTestFiles/differentTypes.csv";
        console.log(`Entering URL: ${url}`);
        const headers = await urlHeaders(url);
        console.log("headers:",headers);
        successFound++;
    }
    catch(error) {
        console.log("Error Found");
        errorsFound++;
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
await csvTesting();
await urlCsvTesting();

setTimeout(FinishTest,5000);