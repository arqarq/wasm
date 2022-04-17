const fs = require('fs')
const wabt = require('wabt')
const {performance} = require('perf_hooks')

let start

async function parseWat(fileName, iO) {
  const toBinaryResult = (await wabt()).parseWat(fileName, fs.readFileSync(fileName, 'utf-8'))
    .toBinary({})
  return (await WebAssembly.instantiate(toBinaryResult.buffer, iO)).instance.exports
}

function perfStart() {
  start = performance.now()
}

function showOpTime() {
  return +(performance.now() - start).toFixed(3)
}

module.exports = {
  parseWat, showOpTime, perfStart
}
