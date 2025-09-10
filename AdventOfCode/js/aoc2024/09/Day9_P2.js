const { readInput } = require('./../../input')

let text = readInput()
let count = 0
let fileId = 0
let mixed = []
for (let i = 0; i < text.length; i++) {
    if (i % 2 === 0) {
        // FILE
        mixed.push({
            type: "disk",
            index: i,
            id: Math.floor(i / 2),
            length: Number.parseInt(text[i]),
            seen: false
        })
        fileId++
    } else {
        // FREE MEMORY
        mixed.push({
            type: "memory",
            index: i,
            length: Number.parseInt(text[i]),
        })
    }
}
let index = 0
for (let i = 0; i < mixed.length; i++) {
    if (mixed[i].type === "disk" && mixed[i].seen === false) {

        for (let j = 0; j < mixed[i].length; j++) {
            count += mixed[i].id * index
            index++
        }
        mixed[i].seen = true
    } else if (mixed[i].type === "disk" && mixed[i].seen === true) {
        // disk seen
        index += mixed[i].length
    } else {
        let remainderLength = mixed[i].length
        let r = mixed.length - 1
        while (remainderLength > 0 && r > 0) {
            while (mixed[r] !== undefined && (mixed[r].type === "memory" || mixed[r].length > remainderLength || mixed[r].seen === true)) {
                r--
            }
            if (mixed[r] !== undefined) {
                remainderLength -= mixed[r].length
                for (let j = 0; j < mixed[r].length; j++) {
                    count += mixed[r].id * index
                    index++
                }
                mixed[r].seen = true
            } else {
                index += remainderLength
            }
        }
    }
}
console.log('Solucion: ', count)
