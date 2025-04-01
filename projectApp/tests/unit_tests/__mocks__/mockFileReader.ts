import { sendError } from "../../../src/logger-frontend";
import { readFile } from "fs/promises";
/**
 * Mock FileReader class,
 * since original cant be called in non-browser environment
 * */
export default class MockFileReader {
  result: string | null = null;
  onload: ((event: ProgressEvent<FileReader>) => void) | null = null;
  onerror: ((event: ProgressEvent<FileReader>) => void) | null = null;
  /** Mocks original readAsText to unpace MockFile for fileBits BlobPart[] */
  readAsText(file: File) {
    try {
      const readerContent = (
        file as unknown as {
          fileBits: BlobPart[];
          name: string;
          options?: FilePropertyBag;
        }
      ).fileBits;
      this.result = readerContent[0] as string;
    } catch (err: unknown) {
      sendError(err, "mockFileReader was not able to read the file");
      this.result = "mockFileReader err";
    }
    if (this.onload) {
      this.onload({ target: this } as unknown as ProgressEvent<FileReader>);
    }
  }
}
/**
 * Returns a file that has the contents of the file at the filePath
 * @param filePath path string to the file
 * @preconditions `filePath` must be a valid file path
 * @postconditions returns `File` {fileBits: contents at filePath, name: filePath, options: in text/csv}
 */
export async function pathStrToFile(filePath: string): Promise<File> {
  const reader = readFile(filePath, "utf-8");
  let data: string;
  try {
    data = await reader;
  } catch {
    data = "";
    // for some reason, if await reader throws the error, vitest still receives ENOENT error
    // vitest cant handle errors outside of expect
    // so instead data will be returned as empty (aka couldnt read)
  }
  return new File([data], filePath, { type: "text/csv" });
}
