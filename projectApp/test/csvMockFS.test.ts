// code taken directly from
// https://vitest.dev/guide/mocking.html#file-system and modified minimally for
// linting

import { beforeEach, expect, test, vi } from 'vitest'
import { describe } from 'node:test';
import { vol as memVol } from 'memfs'
import * as fs from '../test/__mocks__/fs';
import { LocalCSVHeaders, LocalCSVReader } from '../src/components/CSV_Readers/LocalCSVReader'
import { TimeSeriesData, CSVHeaders } from '../src/types/CSVInterfaces';

// tell vitest to use fs mock from __mocks__ folder
// this can be done in a setup file if fs should always be mocked
vi.mock('fs', () => import('./__mocks__/fs'));
vi.mock('fs/promises', () => import('./__mocks__/fs/promises'));


describe("testing fs mocking", () => {
  beforeEach(() => {
    // reset the state of in-memory fs
    memVol.reset();
  })

  test('data written directly', async () => {
    const path = '/hello-world.csv';

    const data =
`Time,X,Y
"2025-01-18",10,15
"2025-01-19",20,25
"2025-01-20",30,35
"2025-01-21",40,45`;

    fs.writeFileSync(path,data);

    const localReaderPromise: Promise<TimeSeriesData[]> = LocalCSVReader(path);
    await expect(localReaderPromise).resolves.toBeDefined();
    const localReaderData: TimeSeriesData[] = await localReaderPromise;
    //each line MUST have Time, X and Y
    localReaderData.forEach((line: TimeSeriesData) => {
      expect(Object.keys(line).sort()).toEqual(['Time', 'X', 'Y'].sort());
    });

    const localHeadersPromise: Promise<CSVHeaders> = LocalCSVHeaders(path);
    await expect(localHeadersPromise).resolves.toBeDefined();
    const localHeadersData: CSVHeaders = await localHeadersPromise;
    expect(localHeadersData.headers.sort()).toEqual(['Time', 'X', 'Y'].sort());
  })

  test('translating timeSeriesData to and from', async () => {
    const path = '/fromTSD.csv';

    const tsd: TimeSeriesData[] = []
    const line1: TimeSeriesData = {key: {Time: '2025-01-01', X: 10, Y: 20}};
    const line2: TimeSeriesData = {key: {Time: '2025-01-03', X: 12, Y: 25}};
    const line3: TimeSeriesData = {key: {Time: '2025-01-05', X: 14, Y: 30}};
    const line4: TimeSeriesData = {key: {Time: '2025-01-07', X: 16, Y: 35}};
    tsd.push(line1,line2,line3,line4);

    let writeFileString = '';

    const csvheaders: CSVHeaders = {headers: Object.keys(line1.key).map(String)};
    const headersString: string = csvheaders.headers.toString();
    writeFileString += headersString+'\n';

    tsd.forEach((line: TimeSeriesData, index: number) => {
      const writeLine = Object.values(line.key).toString();
      writeFileString += writeLine;
      if(index < tsd.length - 1){
        writeFileString += '\n';
      }
    });

    fs.writeFileSync(path, writeFileString);

    const localReaderPromise = LocalCSVReader(path);
    await expect(localReaderPromise).resolves.toBeDefined();
    const localReaderData: TimeSeriesData[] = await localReaderPromise;
    const records = Object.values(tsd).map((line) => line.key);
    localReaderData.forEach((line: TimeSeriesData) => {
      //check if it has these keys
      expect(Object.keys(line).sort()).toEqual(['Time', 'X', 'Y'].sort());
      //check if values are correct
      expect(line).toEqual(expect.objectContaining({
        Time: expect.any(String) as string,
        X: expect.any(Number) as number,
        Y: expect.any(Number) as number
      }));
      //check if this record is part of tsd
      expect(records).toContainEqual(line);
    });

    const localHeadersPromise: Promise<CSVHeaders> = LocalCSVHeaders(path);
    await expect(localHeadersPromise).resolves.toBeDefined();
    const localHeadersData: CSVHeaders = await localHeadersPromise;
    expect(localHeadersData).toEqual(csvheaders);
  })
  
}).catch((err: unknown) => {
  console.error((err as Error));
  throw (err as Error);
});