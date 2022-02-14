const {performance} = require('perf_hooks')
const wasmTools = require('./wasm_tools')

const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', tmplL = template.length, table = [], table2 = []
let i, j, k, t1, t2, c1, c2, start, noFlip, c = 0, cMax, tabL = 200

function createUUID() {
  return template.replace(/[xy]/g, replacer)
}

function replacer(c) {
  let r = Math.random() * 16 | 0
  c === 'y' && (r = r & 0x3 | 0x8)
  return r.toString(16)
}

function showOpTime() {
  return +(performance.now() - start).toFixed(3)
}

for (i = 0; i < tabL; i++) {
  table.push(createUUID())
}
tabL--
cMax = tabL * tabL
// table[tabL] = '00000000-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
// table[0] = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
table2.push(...table)
start = performance.now()
table2.sort()
console.log(1, 'time:', showOpTime(), '[ms]')
start = performance.now()
for (j = 0; j < tabL; j++) {
  noFlip = true
  for (i = 0; i < tabL; i++) {
    t1 = table[i]
    t2 = table[i + 1]
    for (k = 0; k < tmplL; k++) {
      c1 = t1.charCodeAt(k)
      c2 = t2.charCodeAt(k)
      if (c1 === c2) {
        continue
      }
      if (c1 - c2 > 0) {
        table[i + 1] = t1
        table[i] = t2
        noFlip = false
      }
      break
    }
    c++
  }
  if (noFlip) {
    break
  }
}
console.log(2, 'time:', showOpTime(), '[ms] iterations:', c, `iterations less than max (${cMax}):`, cMax - c)

const global = new WebAssembly.Global({value: 'i32', mutable: true}, 4)
const mem = new WebAssembly.Memory({initial: 2})

const promise = wasmTools.parseWat('add.wat', {
  console: {
    log: function (a) {
      console.log(a)
    }, consoleLogString: function (offset, length) {
      const bytes = new Uint8Array(mem.buffer, offset, length)
      console.log(new TextDecoder('utf-8').decode(bytes))
    }
  }, js: {global, mem}
})
start = performance.now()
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

  console.log(3, 'time:', showOpTime(), '[ms] result:', square(add(1, 2)), squareSquarePlus(10, 1))
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
