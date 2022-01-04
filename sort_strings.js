function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0
    c === 'y' && (r = r & 0x3 | 0x8)
    return r.toString(16)
  })
}

const table = []

for (let i = 0; i < 100; i++) {
  table.push(createUUID())
}
console.log(table)
console.log(table.length)
