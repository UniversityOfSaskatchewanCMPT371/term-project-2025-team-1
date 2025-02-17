// taken from the vitest site and modified to work with linter

import { readFileSync } from 'node:fs'

export function readHello(path) {
  return readFileSync(path, 'utf-8')
}
