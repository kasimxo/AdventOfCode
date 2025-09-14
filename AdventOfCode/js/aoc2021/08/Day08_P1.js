const { readLines } = require('../../input')
let input = readLines().map(l => l.split(' | ')[1]).map(l => l.split(' '))
let sol = 0
input.forEach(l => {
    l.forEach(t => {
        if (t.length === 2 || t.length === 3 || t.length === 4 || t.length === 7)
            sol++
    })
})
console.log(sol)