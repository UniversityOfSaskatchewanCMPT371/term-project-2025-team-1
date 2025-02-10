import { expect, test } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 1 + 2 is less than 4', () => {
    expect(sum(1, 2)).toBeLessThan(4);
});