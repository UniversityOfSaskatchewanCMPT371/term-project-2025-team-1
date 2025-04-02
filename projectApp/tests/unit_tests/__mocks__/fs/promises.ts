// code taken directly from https://vitest.dev/guide/mocking.html#file-system

import { fs as mockFs } from "memfs";
import {
  IReadFileOptions,
  IWriteFileOptions,
} from "memfs/lib/node/types/options";
import { vi } from "vitest";
/** mocks fs.readFile to call memfs.readFile instead */
export const readFile = vi.fn(
  (path: string, options?: string | IReadFileOptions) => {
    return mockFs.promises.readFile(path, options).catch((err: unknown) => {
      throw err as Error;
    });
  },
);
/** mocks fs.writeFile to call memfs.writeFile instead */
export const writeFile = vi.fn(
  (path: string, data: string, options?: IWriteFileOptions) => {
    return mockFs.promises
      .writeFile(path, data, options)
      .catch((err: unknown) => {
        throw err as Error;
      });
  },
);

export default { readFile, writeFile };
