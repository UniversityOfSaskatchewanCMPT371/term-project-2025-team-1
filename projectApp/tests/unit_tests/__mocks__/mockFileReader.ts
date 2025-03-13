import { sendError } from "../../../src/logger-frontend";

export class MockFileReader {
  result: string | null = null;
  onload: ((event: ProgressEvent<FileReader>) => void) | null = null;
  onerror: ((event: ProgressEvent<FileReader>) => void) | null = null;

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

export default { MockFileReader };
