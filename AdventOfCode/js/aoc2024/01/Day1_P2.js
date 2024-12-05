const { readLines } = require('./input')

let text = readLines()
/*
text = [
    '3   4',
    '4   3',
    '2   5',
    '1   3',
    '3   9',
    '3   3'
]*/

let distance = 0
let listA = []
let listB = []
text.forEach((line) => {
    let split = line.replaceAll('   ', ';').split(';')
    listA.push(Number.parseInt(split[0]))
    listB.push(Number.parseInt(split[1]))
})

for (let i = 0; i < listA.length; i++) {
    distance += listA[i] * countN(listA[i], listB)
}

console.log('Resultado: ', distance)


function countN(num, list) {
    let count = 0
    for (let i = 0; i < list.length; i++) {
        if (list[i] === num) { count++ }
    }
    return count
}

