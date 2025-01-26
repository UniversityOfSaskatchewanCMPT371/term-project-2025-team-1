[![BuildandTest](https://github.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/actions/workflows/BuildandTest.yml/badge.svg)](https://github.com/UniversityOfSaskatchewanCMPT371/term-project-2025-team-1/actions/workflows/BuildandTest.yml)

# Welcome to Team 1's CMPT 371 Project
We have chosen the 3D Oculus based Time Series Embedding Tool for 2025 Winter Term

## To Run The Program
### Installing Modules and Using TypeScript
* Go to directory: **projectApp** (Main App Directory)
* First Install Modules <br/>
  * On Terminal type and enter: **npm install**
* Using Typescript to make JS files <br/>
  * On Terminal type and enter: **tsc**
  * After that, the projectApp directory will have a new directory: "out"
    * The "out" directory will have the new JS files created from TS files
    * To delete tsc generated files type and enter: **tsc --build --clean**
* Thats all!

### Running The Program and Files
* To BUILD the program type and enter: **npm run build**
* To run the program on https://localhost:8800: **npm run dev**
* To run singular JS files after executing tsc: **./out/(pathToFile)/(fileName.js)**
