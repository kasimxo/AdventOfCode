const {readLines} = require('./input')

const input = readLines()

let total = 0

input.forEach(line => {
    const words = line.split(' ')
    const diff = new Set()
    words.forEach(w => {
        const letters = w.split('').sort()
        diff.add(letters.join())
    })

    if(words.length === diff.size) total++
})

console.log("SOLUTION: ", total)