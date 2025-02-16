// import { LocalCSVReader as localReader, LocalCSVHeaders as localHeaders } from "../src/components/CSV_Readers/LocalCSVReader.tsx"
// import { UrlCSVReader as urlReader, UrlCSVHeaders as urlHeaders } from "../src/components/CSV_Readers/UrlCSVReader.tsx"

// /*
// * This File is for testing the CSV readers
// * First It will testing running the Local CSV Reader
// * Then It will test the URL CSV Reader
// * Both Functions should output the same since, it runs on the 
// * same file but different file paths/types
// */

// const totalTests = 2;
// let numTests = 0;
// let successFound = 0;
// let errorsFound = 0;
// let expectedErrors = 0;
// let expectedSuccess = 0;

// let urlTest = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/test.csv";
// let urlFake = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/FakeCSV.csv";
// let urlOneLess = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/oneLessHeader.csv";
// let urlOneMore = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/oneMoreHeader.csv";
// let urlUneven = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/unevenData.csv";
// let urlDifferent = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/main/csvTestFiles/differentTypes.csv";
// let urlNotCSV = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID2Dev/csvTestFiles/notCsv.html";
// let urlEmpty = "https://raw.githubusercontent.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/refs/heads/ID2Dev/csvTestFiles/empty.csv";
// let urlWebsite = "https://www.w3schools.com/python/pandas/data.csv";

// function incrementExpectedErrors() {
//     expectedErrors++;
// }

// function incrementExpectedSuccess() {
//     expectedSuccess++;
// }

// console.log("Test Script For CSV reader");

// async function localCsvReaderTestFormat(file:string ,expected:(()=>void), logMessage:string){
//     numTests++;
//     expected();
//     try{
//         console.log(logMessage);
//         const readLocal = await localReader(file);
//         console.log("data:",readLocal);
//         successFound++;
//     }
//     catch(error) {
//         console.log(`Error Found: ${file}`);
//         errorsFound++;
//     }
// }

// async function localCsvHeadersTestFormat(file:string ,expected:(()=>void), logMessage:string){
//     numTests++;
//     expected();
//     try{
//         console.log(logMessage);
//         const headers = await localHeaders(file);
//         console.log("data:",headers);
//         successFound++;
//         console.log(headers.headers[0])
//         console.log(headers.headers[1])
//         console.log(headers.headers[2])
//     }
//     catch(error) {
//         console.log(`Error Found: ${file}`);
//         errorsFound++;
//     }
// }

// async function localCsvTesting() {
//     //NOTE: these tests are for testing if it can read the file, not for if the csv is formatted correctly

//     //Testing reading a csv file that exist
//     //Expected: both pass, should act normally
//     await localCsvReaderTestFormat("../csvTestFiles/test.csv",incrementExpectedSuccess,"Local Reader with normal csv file");
//     await localCsvHeadersTestFormat("../csvTestFiles/test.csv",incrementExpectedSuccess,"Local Headers with normal csv file");

//     //Testing reading a csv file that doesn't exists Locally
//     //Expected: both fail, cannot read nonexistent
//     // await localCsvReaderTestFormat("../csvTestFiles/FakeCSV.csv",incrementExpectedErrors,"Local Reader non-existing file");
//     // await localCsvHeadersTestFormat("../csvTestFiles/FakeCSV.csv",incrementExpectedErrors,"Local Headers non-existing file");

//     // //Testing reading a csv file that has one less header
//     // //Expected: both pass, with a 'ghost' header
//     // await localCsvReaderTestFormat("../csvTestFiles/oneLessHeader.csv",incrementExpectedSuccess,"Local Reader one less header file");
//     // await localCsvHeadersTestFormat("../csvTestFiles/oneLessHeader.csv",incrementExpectedSuccess,"Local Headers one less header file");
    
//     // //Testing reading a csv file that has one more header
//     // //Expected: both pass, with 'z' header not included
//     // await localCsvReaderTestFormat("../csvTestFiles/oneMoreHeader.csv",incrementExpectedSuccess,"Local Reader one more header file");
//     // await localCsvHeadersTestFormat("../csvTestFiles/oneMoreHeader.csv",incrementExpectedSuccess,"Local Headers one more header file");
    
//     // //Testing reading a csv file that has unequal number of columns
//     // //Expected: both pass, with varying object sizes
//     // await localCsvReaderTestFormat("../csvTestFiles/unevenData.csv",incrementExpectedSuccess,"Local Reader uneven data file");
//     // await localCsvHeadersTestFormat("../csvTestFiles/unevenData.csv",incrementExpectedSuccess,"Local Headers uneven data file");

//     // //Testing reading a csv file that has different data types for each line
//     // //Expected: both pass, with varying data types
//     // await localCsvReaderTestFormat("../csvTestFiles/differentTypes.csv",incrementExpectedSuccess,"Local Reader different data types file");
//     // await localCsvHeadersTestFormat("../csvTestFiles/differentTypes.csv",incrementExpectedSuccess,"Local Headers different data types file");

//     // //Testing reading a html file to see if it errors
//     // //Expected: both fail, rejects non-csv and non-txt
//     // await localCsvReaderTestFormat("../csvTestFiles/notCsv.html",incrementExpectedErrors,"Local Reader html file");
//     // await localCsvHeadersTestFormat("../csvTestFiles/notCsv.html",incrementExpectedErrors,"Local Headers html file");

//     // //Testing reading an empty csv file
//     // //Expected: reader will pass, returns empty. headers should also pass, if no data, no headers
//     // await localCsvReaderTestFormat("../csvTestFiles/empty.csv",incrementExpectedSuccess,"Local Reader empty csv file");
//     // await localCsvHeadersTestFormat("../csvTestFiles/empty.csv",incrementExpectedSuccess,"Local Headers empty csv file");

// };

// console.log("Test Script For CSV reader");

// async function urlCsvReaderTestFormat(url:string ,expected:(()=>void), logMessage:string){
//     numTests++;
//     expected();
//     try{
//         console.log(logMessage);
//         const readLocal = await urlReader(url);
//         console.log("data:",readLocal);
//         successFound++;
//     }
//     catch(error) {
//         console.log(`Error Found: ${url}`);
//         errorsFound++;
//     }
// }

// async function urlCsvHeadersTestFormat(url:string ,expected:(()=>void), logMessage:string){
//     numTests++;
//     expected();
//     try{
//         console.log(logMessage);
//         const headers = await urlHeaders(url);
//         console.log("data:",headers);
//         successFound++;
//     }
//     catch(error) {
//         console.log(`Error Found: ${url}`);
//         errorsFound++;
//     }
// }

// async function urlCsvTesting() {
//     //NOTE: these tests are for testing if it can read the file, not for if the csv is formatted correctly
//     let url: string = "no url";

//     //Testing reading a csv file that exist by URL
//     //Expected: both pass, should act normally
//     url = urlTest;
//     await urlCsvReaderTestFormat(url,incrementExpectedSuccess,"URL Reader with normal csv file");
//     await urlCsvHeadersTestFormat(url,incrementExpectedSuccess,"URL Headers with normal csv file");

//     //Testing reading a csv file that doesn't exists URL
//     //Expected: both fail, cannot read nonexistent
//     url = urlFake;
//     await urlCsvReaderTestFormat(url,incrementExpectedErrors,"URL Reader non-existing file");
//     await urlCsvHeadersTestFormat(url,incrementExpectedErrors,"URL Headers non-existing file");

//     //Testing reading a csv file that has one less header
//     //Expected: both pass, with a 'ghost' header
//     url = urlOneLess;
//     await urlCsvReaderTestFormat(url,incrementExpectedSuccess,"URL Reader one less header file");
//     await urlCsvHeadersTestFormat(url,incrementExpectedSuccess,"URL Headers one less header file");

//     //Testing reading a csv file that has one more header
//     //Expected: both pass, with 'z' header not included
//     url = urlOneMore;
//     await urlCsvReaderTestFormat(url,incrementExpectedSuccess,"URL Reader one more header file");
//     await urlCsvHeadersTestFormat(url,incrementExpectedSuccess,"URL Headers one more header file");
    
//     //Testing reading a csv file that has unequal number of columns
//     //Expected: both pass, with varying object sizes
//     url = urlUneven;
//     await urlCsvReaderTestFormat(url,incrementExpectedSuccess,"URL Reader uneven data file");
//     await urlCsvHeadersTestFormat(url,incrementExpectedSuccess,"URL Headers uneven data file");

//     //Testing reading a csv file that has different data types for each line
//     //Expected: both pass, with varying data types
//     url = urlDifferent;
//     await urlCsvReaderTestFormat(url,incrementExpectedSuccess,"URL Reader different data types file");
//     await urlCsvHeadersTestFormat(url,incrementExpectedSuccess,"URL Headers different data types file");

//     //Testing reading a html file to see if it errors
//     //Expected: both fail, rejects non-csv and non-txt
//     url = urlNotCSV;
//     await urlCsvReaderTestFormat(url,incrementExpectedErrors,"URL Reader different data types file");
//     await urlCsvHeadersTestFormat(url,incrementExpectedErrors,"URL Headers different data types file");

//     //Testing reading a csv file from w3schools.com
//     //I think we are allowed to do this?
//     //Expected: both pass, this should be formatted similarly
//     url = urlWebsite;
//     await urlCsvReaderTestFormat(url,incrementExpectedSuccess,"URL Reader w3schools file");
//     await urlCsvHeadersTestFormat(url,incrementExpectedSuccess,"URL Headers w3schools file");

//     //Testing reading an empty csv file
//     //Expected: reader will pass, returns empty. headers should also pass, if no data, no headers
//     url = urlEmpty;
//     await urlCsvReaderTestFormat(url,incrementExpectedSuccess,"URL Reader w3schools file");
//     await urlCsvHeadersTestFormat(url,incrementExpectedSuccess,"URL Headers w3schools file");
// }

// function FinishTest(){
//     console.log(`Number of Tests: ${totalTests}, Expected Errors: ${expectedErrors}, Expected Successes: ${expectedSuccess}`);
//     console.log(`Tests completed: ${numTests}, Errors Found: ${errorsFound}, Successful Tests: ${successFound}`);
//     if(numTests != totalTests){
//         console.log(`All Tests Not Completed: Finished (${numTests}) -> Expected (${totalTests})`);
//         process.exit(1);
//     }
//     else if(errorsFound != expectedErrors){
//         console.log(`Errors Expected Does Not Match: Found (${errorsFound}) -> Expected (${expectedErrors})`);
//         process.exit(1);
//     }
//     else if(successFound != expectedSuccess){
//         console.log(`Success Expected Does Not Match: Found (${successFound}) -> Expected (${expectedSuccess})`);
//         process.exit(1);
//     }
//     console.log("Test passed!");
//     process.exit(0);
// }

// //do these in order, no syncronous
// await localCsvTesting();
// await urlCsvTesting();

// setTimeout(FinishTest,5000);