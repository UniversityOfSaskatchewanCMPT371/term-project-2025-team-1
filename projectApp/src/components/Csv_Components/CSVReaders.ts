import Papa from "papaparse";
import { sendError, sendLog } from "../../logger-frontend";
import { addTestSceneInfo } from "../../pages/Scene/TestScene";

/**
 * Reads a CSV file from a File Object (local reader) and returns an array of time series data.
 *
 * @param file File object that contains a csv file
 *
 * @preconditions `File` must have a name that ends with ".csv" extension
 * @postconditions
 * - returns a list of Record pairs of (attribute,value) as a Promise
 * - does not modify any external state
 * - If the file is empty or cannot be parsed, an error is thrown
 **/
export function LocalCsvReader(
  file: File,
): Promise<{ key: Record<string, string | number> }[]> {
  addTestSceneInfo("reading local csv reader");
  return new Promise<{ key: Record<string, string | number> }[]>(
    (resolve, reject) => {
      // assert that file ends in .csv extension
      if (!file.name.endsWith("csv")) {
        // log the error
        const notCsvErr = new Error("This file is not csv");
        sendError(notCsvErr, "LocalCsvReader(file) receives a non csv file");
        throw notCsvErr;
      }

      // invalid file is thrown by onerror

      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target?.result as string;

        if (!fileContent.trim()) {
          const emptyFileErr = new Error("Empty file set");
          // If fileContent is empty, log the error
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
            // if PapaParse errors out, log the error
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
        // if reader errors out, log the error
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
 *
 * @preconditions `url` must be a valid url to a csv file, either ends with ".csv" or contains a csv file
 * @postconditions
 * - returns a list of Record pairs of (attribute,value) as a Promise
 * - does not modify any external state
 * - If the file is empty or cannot be parsed, an error is thrown
 */
export async function UrlCSVReader(
  url: string,
): Promise<{ key: Record<string, string | number> }[]> {
  // any invalid url is caught by fetch bad response
  addTestSceneInfo("starting url reader");
  return fetch(url, { redirect: "follow" })
    .then((response: Response) => {
      // after following redirects, if response is not ok, log the error
      if (!response.ok) {
        const badResponseErr = Error(
          `Failed to fetch the file. Status: ${response.status.toString()}`,
        );
        sendError(badResponseErr, "UrlCSVReader response is not ok");
        throw badResponseErr;
      }
      // follow the url until it reaches result and get the content type
      const resultUrl = response.url;
      const contentType = response.headers.get("Content-Type");
      // assert that either resultingURL is csv or contentType is text/csv
      // if both fail, log the error
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
          // this will be caught by promise.catch
          throw parseError;
        },
      });
      return timeSeries;
    })
    .catch((err: unknown) => {
      // if fetch or PapaParse errors out, log the error
      sendError(err, "URLCSVReader error");
      throw err as Error;
    });
}
