const {readInput} = require('./../../input')

const groups = readInput().split('\r\n\r\n').map(w => w.replaceAll('\r\n', ' '))

let solution = 0
groups.forEach(g => solution += countAnswers(g))
console.log(solution)

function countAnswers(group){
    let letters = new Set()
    let sheets = group.split(' ')
    sheets.forEach(s => s.split('').forEach(l => letters.add(l)))
    return letters.size
}