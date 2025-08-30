const {readInput} = require('./input')

const groups = readInput().split('\r\n\r\n').map(w => w.replaceAll('\r\n', ' '))

let solution = 0
groups.forEach(g => solution += countAnswers(g))
console.log(solution)

function countAnswers(group){
    let sets = []
    let sheets = group.split(' ')
    sheets.forEach(s => sets.push(new Set(s.split(''))))
    let finalSet = sets[0]
    if(sets.length === 1) return finalSet.size
    for(let i = 1; i<sets.length; i++){
        finalSet = finalSet.intersection(sets[i])
    }
    return finalSet.size
}