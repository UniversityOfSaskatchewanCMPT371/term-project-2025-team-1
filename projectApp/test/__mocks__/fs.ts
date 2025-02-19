// code taken directly from https://vitest.dev/guide/mocking.html#file-system

import {fs as mockFs} from "memfs";
import { IReadFileOptions, IWriteFileOptions } from "memfs/lib/node/types/options";
import { vi } from 'vitest';

export const readFileSync = vi.fn((path: string, options?: string | IReadFileOptions) => {
    return mockFs.readFileSync(path,options);
});
export const writeFileSync = vi.fn((path: string, data: string, options?: IWriteFileOptions) => {
    mockFs.writeFileSync(path,data,options);
});

export default { readFileSync, writeFileSync };