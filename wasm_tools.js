const fs = require('fs')
const wabt = require('wabt')

async function parseWat(fileName) {
  const toBinaryResult = (await wabt()).parseWat(fileName, fs.readFileSync(fileName, 'utf-8'))
    .toBinary({})
  return (await WebAssembly.instantiate(toBinaryResult.buffer)).instance.exports
}

module.exports = {
  parseWat
}