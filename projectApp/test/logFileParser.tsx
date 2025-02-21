/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */

import fs from "fs"
import readline from "readline";

export async function hasText(filePath: string, text: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // checks if file exists at given path
        if (fs.existsSync(filePath)) {
            const fileStream = fs.createReadStream(filePath);
            const lineReader = readline.createInterface({
                input: fileStream
            })

            lineReader.on('line', (line) => {
                if (line.toLowerCase().includes(text.toLowerCase())) {
                    resolve(true);
                }
            });

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