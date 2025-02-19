// code taken directly from
// https://vitest.dev/guide/mocking.html#file-system and modified minimally for
// linting

import { beforeEach, expect, it, vi } from 'vitest'
import { vol as memVol } from 'memfs'
import * as fs from '../test/__mocks__/fs';
import { readHello } from './fsCall.ts'
import { describe } from 'node:test';

// tell vitest to use fs mock from __mocks__ folder
// this can be done in a setup file if fs should always be mocked
vi.mock('fs', () => import('../test/__mocks__/fs'));
vi.mock('fs/promises', () => import('../test/__mocks__/fs/promises'));


describe("testing fs mocking", () => {
  beforeEach(() => {
    // reset the state of in-memory fs
    memVol.reset();
  })
  it('should return correct text', () => {
    const path = '/hello-world.txt';
    fs.writeFileSync(path, 'hello world')
    const text = readHello(path)
    expect(text).toBe('hello world')
  })

  it('can return a value multiple times', () => {
    // you can use vol.fromJSON to define several files
    memVol.fromJSON(
        {
        './dir1/hw.txt': 'hello dir1',
        './dir2/hw.txt': 'hello dir2',
      },
      // default cwd
      '/tmp',
    )

    expect(readHello('/tmp/dir1/hw.txt')).toBe('hello dir1')
    expect(readHello('/tmp/dir2/hw.txt')).toBe('hello dir2')
  })
}).catch((err: unknown) => {
  console.error((err as Error));
  throw (err as Error);
});