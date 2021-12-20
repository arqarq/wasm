function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16
        console.log(r)
        r = r | 0
        console.log(r)
        var v = c === 'x' ? r : r & 0x3 | 0x8
        return v.toString(16)
    })
}

const table = []

for (let i = 0; i < 10; i++) {
    table.push(createUUID())
}
console.log(table)
console.log(table.length)
