// code taken directly from
// https://vitest.dev/guide/mocking.html#file-system and modified minimally for
// linting

import { beforeEach, expect, test, vi } from 'vitest'
import { vol as memVol } from 'memfs'
import * as fs from '../test/__mocks__/fs';
import { LocalCSVReader } from '../src/components/CSV_Readers/LocalCSVReader'
import { describe } from 'node:test';

// tell vitest to use fs mock from __mocks__ folder
// this can be done in a setup file if fs should always be mocked
vi.mock('fs', () => import('./__mocks__/fs'));
vi.mock('fs/promises', () => import('./__mocks__/fs/promises'));


describe("testing fs mocking", () => {
  beforeEach(() => {
    // reset the state of in-memory fs
    memVol.reset();
  })

  test('should return correct values', async () => {
    const path = '/hello-world.csv';
    const data =
`Time,X,Y
"2025-01-18",10,15
"2025-01-19",20,25
"2025-01-20",30,35
"2025-01-21",40,45`;
    fs.writeFileSync(path,data);
    const jsonResponse = LocalCSVReader(path)
    await expect(jsonResponse).resolves.toBeDefined();
    const jsonData = await jsonResponse;
    //each line MUST have Time, X and Y
    jsonData.forEach((line) => {
        expect(Object.keys(line).sort()).toEqual(['Time', 'X', 'Y'].sort());
    });
  })
}).catch((err: unknown) => {
  console.error((err as Error));
  throw (err as Error);
});