// code taken directly from https://vitest.dev/guide/mocking.html#file-system

import { fs as mockFs } from "memfs";
import {
  IReadFileOptions,
  IWriteFileOptions,
} from "memfs/lib/node/types/options";
import { vi } from "vitest";
/** mocks fs.readFileSync to call memfs.readFileSync instead */
export const readFileSync = vi.fn(
  (path: string, options?: string | IReadFileOptions) => {
    return mockFs.readFileSync(path, options);
  },
);
/** mocks fs.writeFileSync to call memfs.writeFileSync instead */
export const writeFileSync = vi.fn(
  (path: string, data: string, options?: IWriteFileOptions) => {
    mockFs.writeFileSync(path, data, options);
  },
);

export default { readFileSync, writeFileSync };
