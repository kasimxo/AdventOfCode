const { readLines } = require('./../../input')

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
listA = listA.sort((a, b) => a - b)
listB = listB.sort((a, b) => a - b)

for (let i = 0; i < listA.length; i++) {
    distance += Math.abs(listA[i] - listB[i])
}

console.log(listA, listB)





console.log('Resultado: ', distance)

