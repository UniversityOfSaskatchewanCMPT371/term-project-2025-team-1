import Papa from "papaparse";
import * as fsPromise from "fs/promises";
import { sendError, sendLog } from "../../logger-frontend";

/**
 * This function reads the headers of a csv file and stores it
 *
 * @param file File path for csv file
 * @returns List of header strings as Promise<string[]>
 *
 * @preconditions file path must be a valid file path to a .csv file
 * @postconditions
 *    - None (the function does not modify any external state)
 *    - The returned promise resolves to an object containing the headers of the CSV file
 *    - If the file is empty or cannot be parsed, an error is thrown
 **/
export async function LocalCSVHeaders(file: string): Promise<string[]> {
  return LocalCSVReader(file)
    .then((timeSeries) => {
      const headers: string[] = Object.keys(timeSeries[0]);
      sendLog("info", `LocalCSVHeaders returns\n${JSON.stringify(headers)}`);
      return headers;
      // Rethrowing errors
    })
    .catch((err: unknown) => {
      sendError(err, `LocalCSVHeaders error`);
      throw err as Error;
    });
}

/**
 * Get the headers of a file at a url
 *
 * @param url address of the file
 * @returns List of header strings as Promise<string[]>
 *
 * @precondition url path must be a valid file path to a .csv file
 * @postcondition
 *    - None (the function does not modify any external state)
 *    - The returned promise resolves to an object containing the headers of the CSV file
 *    - If the file is empty or cannot be parsed, an error is thrown
 */
export async function UrlCSVHeaders(url: string): Promise<string[]> {
  return UrlCSVReader(url)
    .then((timeSeries) => {
      const headers: string[] = Object.keys(timeSeries[0]);
      sendLog("info", `UrlCSVHeaders returns\n${JSON.stringify(headers)}`);
      return headers;
      // Rethrowing errors
    })
    .catch((err: unknown) => {
      sendError(err, `LocalCSVHeaders error`);
      throw err as Error;
    });
}

/**
 * This function reads the headers of a csv file and stores it
 *
 * @param file File path for csv file
 * @returns list of Record pairs of (attribute,value) as Promise<Record<string,string | number>[]>
 *
 * @preconditions file path must be a valid file path to a .csv file
 * @postconditions
 *    - None (the function does not modify any external state)
 *    - The returned promise resolves to an object containing a list of record of (attribute,value) pairs
 *    - If the file is empty or cannot be parsed, an error is thrown
 **/
export async function LocalCSVReader(
  file: string,
): Promise<Record<string, string | number>[]> {
  //Update: now any noncsv file is caught here
  //and invalid csv files are thrown by fsPromise
  if (!file.endsWith(".csv")) {
    const notCsvErr = new Error("This file is not csv");
    sendError(notCsvErr, "LocalCSVReader(path) receives a non csv file");
    throw notCsvErr;
  }
  return fsPromise
    .readFile(file, "utf8")
    .then((data: string) => {
      let timeSeries: Record<string, string | number>[] = [];
      Papa.parse(data, {
        header: true,
        dynamicTyping: true,
        complete: function (
          parsed: Papa.ParseResult<Record<string, string | number>>,
        ) {
          timeSeries = parsed.data;
          if (timeSeries.length === 0) {
            throw new Error("LocalCSVReader is empty");
          }
          sendLog(
            "info",
            `LocalCSVReader has successfully parsed\n${JSON.stringify(timeSeries)}`,
          );
        },
        error: function (parseError: Error) {
          // this will be caught by promise.catch
          throw parseError;
        },
      });
      return timeSeries;
    })
    .catch((err: unknown) => {
      sendError(err, "LocalCSVReader error");
      throw err as Error;
    });
}

/**
 * Reads a CSV file from a File Object (local reader) and returns an array of time series data.
 *
 * @param file File object that contains a csv file
 * @returns list of Record pairs of (attribute,value) as Promise<Record<string,string | number>[]>
 *
 * @preconditions File must have a name that ends with ".csv" extension
 * @postconditions
 *    - None (the function does not modify any external state)
 *    - The returned promise resolves to an object containing a list of record of (attribute,value) pairs
 *    - If the file is empty or cannot be parsed, an error is thrown
 **/
// TODO - unit tests for this version of the local reader, it accepts a File instead of a string
export function LocalCsvReader(
  file: File,
): Promise<{ key: Record<string, string | number> }[]> {
  return new Promise<{ key: Record<string, string | number> }[]>(
    (resolve, reject) => {
      if (!file.name.endsWith("csv")) {
        //This is relying on the fact that we name the file with extension
        //BrowserUI LoadComponent e.target.file gives the file name and extension
        //any testing MUST have files that end with .csv for success
        const notCsvErr = new Error("This file is not csv");
        sendError(notCsvErr, "LocalCsvReader(file) receives a non csv file");
        throw notCsvErr;
      }

      //invalid file is thrown by onerror

      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target?.result as string;

        if (!fileContent.trim()) {
          const emptyFileErr = new Error("Empty file set");
          sendError(emptyFileErr, `LocalCsvReader(file) ${file.name} is empty`);
          reject(emptyFileErr);
          return;
        }

        Papa.parse(fileContent, {
          header: true,
          dynamicTyping: true,
          complete: function (parsed: {
            data: { key: Record<string, string | number> }[];
          }) {
            sendLog(
              "info",
              `LocalCsvReader(file) has read data\n${JSON.stringify(parsed.data)}`,
            );
            const typedData: { key: Record<string, string | number> }[] =
              parsed.data;
            resolve(typedData); // Resolve the promise with parsed data
          },
          error: function (parseError: Error) {
            sendError(
              parseError,
              `LocalCsvReader(file) has errored for ${file.name}`,
            );
            reject(parseError); // Reject the promise on parsing error
          },
        });
      };

      reader.onerror = () => {
        const readerErr = new Error("reader error");
        sendError(
          readerErr,
          `LocalCsvReader(file) has errored for ${file.name}`,
        );
        reject(readerErr);
      };
      reader.readAsText(file);
    },
  );
}

/**
 * Get the time series data from a file at a url
 *
 * @param url address of the file
 * @returns list of Record pairs of (attribute,value) as Promise<Record<string,string | number>[]>
 *
 * @precondition url must be a valid url to a csv file, either ends with ".csv" or contains a csv file
 * @postcondition
 *    - None (the function does not modify any external state)
 *    - The returned promise resolves to an object containing a list of record of (attribute,value) pairs
 *    - If the file is empty or cannot be parsed, an error is thrown
 */
export async function UrlCSVReader(
  url: string,
): Promise<{ key: Record<string, string | number> }[]> {
  //Update: now any invalid url is by fetch bad response
  return fetch(url, { redirect: "follow" })
    .then((response: Response) => {
      if (!response.ok) {
        const badResponseErr = Error(
          `Failed to fetch the file. Status: ${response.status.toString()}`,
        );
        sendError(badResponseErr, "UrlCSVReader response is not ok");
        throw badResponseErr;
      }
      //follow the url until it reaches result and get the content type
      const resultUrl = response.url;
      const contentType = response.headers.get("Content-Type");
      //assert that either resultingURL is csv or contentType is text/csv
      //if both fail, throw error
      if (!(resultUrl.endsWith(".csv") || contentType?.includes("text/csv"))) {
        const badResultErr = Error(
          `Failed to fetch csv format. ${response.url}, ${JSON.stringify(response.headers)}`,
        );
        sendError(badResultErr, "Final URL destination is not csv readable");
        throw badResultErr;
      }
      return response.text();
    })
    .then((csvData: string) => {
      let timeSeries: { key: Record<string, string | number> }[] = [];
      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        complete: function (
          parsed: Papa.ParseResult<{ key: Record<string, string | number> }>,
        ) {
          timeSeries = parsed.data;
          if (timeSeries.length === 0) {
            throw new Error("URLCSVReader is empty");
          }
          sendLog(
            "info",
            `URLCSVReader has successfully parsed\n${JSON.stringify(timeSeries)}`,
          );
        },
        error: function (parseError: Error) {
          //this will be caught by promise.catch
          throw parseError;
        },
      });
      return timeSeries;
    })
    .catch((err: unknown) => {
      sendError(err, "URLCSVReader error");
      throw err as Error;
    });
}
