// code taken and modified from
// https://vitest.dev/guide/mocking.html#file-system
// modified to agree with eslint

import { beforeEach, describe, expect, test, vi } from "vitest";
import { vol as memVol } from "memfs";
import * as fs from "./__mocks__/fs";
import * as fsPromise from "./__mocks__/fs/promises";

// tell vitest to use fs mock from __mocks__ folder
// this can be done in a setup file if fs should always be mocked
vi.mock("fs", () => import("./__mocks__/fs"));
vi.mock("fs/promises", () => import("./__mocks__/fs/promises"));

describe("testing fs mocking", () => {
  const path = "/valid.csv";
  const data = `Time,X,Y
                "2025-01-18",10,15
                "2025-01-19",20,25
                "2025-01-20",30,35
                "2025-01-21",40,45`;

  //using a mock fs, memfs, to virtually test localReader
  beforeEach(() => {
    // reset the state of in-memory fs
    memVol.reset();
    vi.resetAllMocks();
  });

  test("writeFileSync writes data correctly", () => {
    fs.writeFileSync(path, data);
    //assert that mock writeFile was called
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledWith(path, data);

    const writtenData = memVol.readFileSync(path, "utf8");
    expect(writtenData).toBe(data);
  });

  test("readFileSync reads data correctly", () => {
    memVol.writeFileSync(path, data);

    const writtenData = fs.readFileSync(path, "utf8");
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(path, "utf8");

    expect(writtenData).toBe(data);
  });

  test("writeFile writes data correctly", async () => {
    await fsPromise.writeFile(path, data);

    expect(fsPromise.writeFile).toHaveBeenCalledTimes(1);
    expect(fsPromise.writeFile).toHaveBeenCalledWith(path, data);

    const writtenData = await memVol.promises.readFile(path, "utf8");
    expect(writtenData).toBe(data);
  });

  test("readFile reads data correctly", async () => {
    await memVol.promises.writeFile(path, data);

    const writtenData = await fsPromise.readFile(path, "utf8");
    expect(fsPromise.readFile).toHaveBeenCalledTimes(1);
    expect(fsPromise.readFile).toHaveBeenCalledWith(path, "utf8");

    expect(writtenData).toBe(data);
  });
});
