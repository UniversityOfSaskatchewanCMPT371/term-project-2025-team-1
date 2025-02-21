/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */

import fs from "fs"
import readline from "readline";

export async function hasText(text: string): Promise<boolean> {
    const filePath = "./test/logs.txt";

    const fileStream = fs.createReadStream(filePath);
    const lineReader = readline.createInterface({
        input: fileStream
    })

    return new Promise((resolve, reject) => {
        lineReader.on('line', (line) => {
            if (line.includes(text)) {
                resolve(true)
            }
        });

        lineReader.on('close', () => {
            resolve(false)
        });
        lineReader.on('error', () => {
            reject()
        });
    });
}