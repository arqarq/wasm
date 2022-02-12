const fs = require('fs')
const wabt = require('wabt')

async function parseWat(fileName) {
  const toBinaryResult = (await wabt()).parseWat(fileName, fs.readFileSync(fileName, 'utf-8'))
    .toBinary({})
  const {add, square, squareSquarePlus} = (await WebAssembly.instantiate(toBinaryResult.buffer)).instance.exports
  return {add, square, squareSquarePlus}
}

module.exports = {
  parseWat
}
