// code taken and modified from
// https://vitest.dev/guide/mocking.html#file-system
// modified to agree with eslint

import { beforeEach, expect, test, vi } from "vitest";
import { describe } from "node:test";
import { vol as memVol } from "memfs";
import * as fs from "./__mocks__/fs";
import * as fsPromise from "./__mocks__/fs/promises";
import {
  LocalCSVReader as localReader
} from "../../src/components/Csv_Components/CSVReaders";

// tell vitest to use fs mock from __mocks__ folder
// this can be done in a setup file if fs should always be mocked
vi.mock("fs", () => import("./__mocks__/fs"));
vi.mock("fs/promises", () => import("./__mocks__/fs/promises"));

describe("testing fs mocking", () => {
  //using a mock fs, memfs, to virtually test localReader
  beforeEach(() => {
    // reset the state of in-memory fs
    memVol.reset();
    vi.resetAllMocks();
  });

  test("data written directly", async () => {
    //data is a multiline string, written directly to the path
    const path = "/valid.csv";
    const data = `Time,X,Y
"2025-01-18",10,15
"2025-01-19",20,25
"2025-01-20",30,35
"2025-01-21",40,45`;

    fs.writeFileSync(path, data);
    //assert that mock writeFile was called
    expect(fs.writeFileSync).toBeCalledTimes(1);
    const localReaderPromise: Promise<Record<string, string | number>[]> =
      localReader(path);
    //assert that mock promise.readFile was called
    expect(fsPromise.readFile).toBeCalledTimes(1);
    //assert that promised data is defined
    await expect(localReaderPromise).resolves.toBeDefined();
    const localReaderData: Record<string, string | number>[] =
      await localReaderPromise;
    //each line MUST have Time, X and Y in order
    localReaderData.forEach((line: Record<string, string | number>) => {
      expect(Object.keys(line)).toEqual(["Time", "X", "Y"]);
    });

    // const localHeadersPromise: string[] = Object.keys(localReaderData[0]);
    // //assert that mock promise.readFile was called a second time
    // expect(fsPromise.readFile).toBeCalledTimes(2);
    // //assert that promise is defined
    // await expect(localHeadersPromise).resolves.toBeDefined();
    const localHeadersData: string[] = Object.keys(localReaderData[0]);
    //assert that headers have Time,X,Y in order
    expect(localHeadersData).toEqual(["Time", "X", "Y"]);
  });

  test("translating Record<string,string | number>[] to and from", async () => {
    //defining original Record<string,string | number>[] first, to compare to the data received from localReader
    const path = "/fromTSD.csv";

    const tsd: Record<string, string | number>[] = [];
    const line1: Record<string, string | number> = {
      Time: "2025-01-01",
      X: 10,
      Y: 20,
    };
    const line2: Record<string, string | number> = {
      Time: "2025-01-03",
      X: 12,
      Y: 25,
    };
    const line3: Record<string, string | number> = {
      Time: "2025-01-05",
      X: 14,
      Y: 30,
    };
    const line4: Record<string, string | number> = {
      Time: "2025-01-07",
      X: 16,
      Y: 35,
    };
    tsd.push(line1, line2, line3, line4);

    let writeFileString = "";

    //defining CSVHeader
    const csvheaders: string[] = Object.keys(line1).map(String);
    const headersString: string = csvheaders.toString();
    writeFileString += headersString + "\n";

    tsd.forEach((line: Record<string, string | number>, index: number) => {
      const writeLine = Object.values(line).toString();
      writeFileString += writeLine;
      if (index != tsd.length - 1) {
        writeFileString += "\n";
      }
    });

    fs.writeFileSync(path, writeFileString);
    //assert that mock writeFile was called
    expect(fs.writeFileSync).toBeCalledTimes(1);

    const localReaderPromise = localReader(path);
    //assert that mock promise.readFile was called
    expect(fsPromise.readFile).toBeCalledTimes(1);
    //assert that promised data is defined
    await expect(localReaderPromise).resolves.toBeDefined();
    const localReaderData: Record<string, string | number>[] =
      await localReaderPromise;
    //map each line to line.key cause that is what holds {Time,X,Y}
    const records = Object.values(tsd);
    localReaderData.forEach((line: Record<string, string | number>) => {
      //assert that each line has correct keys
      expect(Object.keys(line).sort()).toEqual(["Time", "X", "Y"].sort());
      //assert that each line has correct data types
      expect(line).toEqual(
        expect.objectContaining({
          Time: expect.any(String) as string,
          X: expect.any(Number) as number,
          Y: expect.any(Number) as number,
        }),
      );
    });
    //assert that each line.key equals localReaderData
    expect(records).toEqual(localReaderData);

    // const localHeadersPromise: Promise<string[]> = localHeaders(path);
    // //assert that mock promise.readFile was called a second time
    // expect(fsPromise.readFile).toBeCalledTimes(2);
    //assert that promise is defined
    // await expect(localHeadersPromise).resolves.toBeDefined();
    const localHeadersData: string[] = Object.keys(localReaderData[0]);
    //assert that returned headers are the same as original
    expect(localHeadersData).toEqual(csvheaders);
  });
}).catch((err: unknown) => {
  console.error(err as Error);
  throw err as Error;
});
