const {readLines} = require('./../../input')

const lines = readLines()
let total = 0
lines.forEach(l => {
    const words = l.split(' ')
    const diff = new Set()

    words.forEach(w => {
        diff.add(w)
    })
    if(diff.size === words.length){
        total++
    }
})
console.log(total)