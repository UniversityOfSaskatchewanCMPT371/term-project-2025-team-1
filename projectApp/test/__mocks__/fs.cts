// code taken directly from https://vitest.dev/guide/mocking.html#file-system

const { fs } = require('memfs')
module.exports = fs
