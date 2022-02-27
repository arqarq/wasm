const wT = require('./wasm_tools')

let start
const global = new WebAssembly.Global({value: 'i32', mutable: true}, 4)
const mem = new WebAssembly.Memory({initial: 2})
const table = new WebAssembly.Table({initial: 1, element: 'anyfunc'})

const promise = wT.parseWat('wasm.wat', {
  console: {
    log: function (a) {
      console.log(a)
    }, consoleLogString: function (offset, length) {
      const bytes = new Uint8Array(mem.buffer, offset, length)
      console.log(new TextDecoder('utf-8').decode(bytes))
    }
  }, js: {global, mem, table}
})
wT.perfStart()
promise.then(e => {
  const {
    add,
    square,
    squareSquarePlus,
    logIt,
    setGlobal1,
    getGlobal1,
    incGlobal1,
    setGlobal,
    getGlobal,
    writeSth,
    memory,
    callByIndex
  } = e

  console.log('_time:', wT.showOpTime(start), '[ms] result:', square(add(1, 2)), squareSquarePlus(10, 1))
  logIt()
  console.log(getGlobal1(), setGlobal1(), getGlobal1(), incGlobal1(), getGlobal1())
  console.log(global.value, setGlobal(), global.valueOf())
  global.value = 6
  console.log(getGlobal())
  writeSth()
  const dataView = new DataView(memory.buffer, 0, 10)
  console.log(dataView.getInt8(0), dataView.getInt8(1), memory.buffer.byteLength)
  console.log(callByIndex(1, 55, 66))
  console.log(callByIndex(0, 55))
})
