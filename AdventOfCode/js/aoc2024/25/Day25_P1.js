const { readLines, readLinesExample } = require('./input')
let text = readLinesExample()
text = readLines()
let keys = []
let locks = []
let curr = []
text.forEach((line) => {
    if (line.length === 0) {
        //console.log(curr)
        processCurr(curr)
        curr = []
    } else {
        curr.push(line)
    }
})
processCurr(curr)
let count = 0
for (let i = 0; i < locks.length; i++) {
    for (let j = 0; j < keys.length; j++) {
        let posible = true
        for (let z = 0; z < text[0].length; z++) {
            if (locks[i][z] + keys[j][z] >= 6) {
                posible = false
            }
        }
        if (posible) {
            count++
        }
    }
}




console.log("Locks: ", locks, "\nKeys: ", keys)
console.log("Solucion: ", count)


function processCurr(curr) {
    if (curr[0].indexOf("#") >= 0) {
        let lock = []
        for (let x = 0; x < curr[0].length; x++) {
            let n = -1
            for (let y = 0; y < curr.length; y++) {
                //console.log(y, x, curr)
                if (curr[y][x] === "#") {
                    n++
                }
            }
            lock.push(n)
        }
        locks.push(lock)
    } else {
        let key = []
        for (let x = 0; x < curr[0].length; x++) {
            let n = -1
            for (let y = 0; y < curr.length; y++) {
                //console.log(y, x, curr)
                if (curr[y][x] === "#") {
                    n++
                }
            }
            key.push(n)
        }
        keys.push(key)
    }
}