const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', tmplL = template.length, table = [], table2 = []
let i, j, k, t1, t2, c1, c2, start, noFlip, c = 0, cMax, tabL = 20000

function createUUID() {
  return template.replace(/[xy]/g, replacer)
}

function replacer(c) {
  let r = Math.random() * 16 | 0
  c === 'y' && (r = r & 0x3 | 0x8)
  return r.toString(16)
}

for (i = 0; i < tabL; i++) {
  table.push(createUUID())
}
tabL--
cMax = tabL * tabL
// table[tabL] = '00000000-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
// table[0] = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
table2.push(...table)
start = new Date()
table2.sort()
console.log(1, 'time [ms]:', new Date() - start)
start = new Date()
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
console.log(2, 'time [ms]:', new Date() - start, 'iterations:', c, `iterations less than max (${cMax}):`, cMax - c)
