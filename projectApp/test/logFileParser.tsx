/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */

import fs from "fs"
import readline from "readline";

/*
 * checks if the given string exists in the file at the given path
 * pre-condition - filePath is a path to a file that exists
 * post-conditions - none
 * @param {string} filePath - the path to the file that is being checked
 * @param {string} text - the string that is being looked for in the given file 
 * @returns {Promise<boolean>} a promise that will contains true if the given text appears in the file at the given location
 *                             otherwise, false (returns false if file does not exist)
 * NOTE: function is to be used for testing only
*/
export async function hasText(filePath: string, text: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // checks if file exists at given path
        if (fs.existsSync(filePath)) {
            const fileStream = fs.createReadStream(filePath);
            const lineReader = readline.createInterface({
                input: fileStream
            })

            // checks if each line contains text
            lineReader.on('line', (line) => {
                if (line.toLowerCase().includes(text.toLowerCase())) {
                    resolve(true);
                }
            });

            // executes if all lines in file are checked
            lineReader.on('close', () => {
                resolve(false);
            });
            lineReader.on('error', () => {
                reject();
            });
        } else {
            resolve(false);
        }
    });
}