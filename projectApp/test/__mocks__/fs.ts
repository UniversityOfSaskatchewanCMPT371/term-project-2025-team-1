// code taken directly from https://vitest.dev/guide/mocking.html#file-system

import {fs} from "memfs";
import { vi } from 'vitest';
import * as memfs from 'memfs';

const mockFs = memfs.fs;

export const readFileSync = vi.fn(mockFs.readFileSync);
export const writeFileSync = vi.fn(mockFs.writeFileSync);

export default { readFileSync, writeFileSync };



module.exports = fs