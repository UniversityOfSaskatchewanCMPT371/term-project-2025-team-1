// code taken directly from https://vitest.dev/guide/mocking.html#file-system

import {fs as mockFs} from "memfs";
import { IReadFileOptions, IWriteFileOptions } from "memfs/lib/node/types/options";
import { vi } from 'vitest';

export const readFile = vi.fn((path: string, options?: string | IReadFileOptions) => {
    return mockFs.promises.readFile(path,options);
});
export const writeFile = vi.fn((path: string, data: string, options?: IWriteFileOptions) => {
    mockFs.promises.writeFile(path,data,options);
});

export default { readFile, writeFile };