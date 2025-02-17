// taken from the vitest site and modified to work with linter

import { readFileSync, PathOrFileDescriptor } from 'node:fs'

export function readHello(path: PathOrFileDescriptor) {
  return readFileSync(path, 'utf-8')
}
