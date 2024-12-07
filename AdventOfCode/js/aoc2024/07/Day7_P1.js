const { readLines } = require('./input')
let text = [
    '190: 10 19',
    '3267: 81 40 27',
    '83: 17 5',
    '156: 15 6',
    '7290: 6 8 6 15',
    '161011: 16 10 13',
    '192: 17 8 14',
    '21037: 9 7 18 13',
    '292: 11 6 16 20',
]
text = readLines()
let count = 0

text.forEach((line) => {
    let testValue = Number.parseInt(line.split(':')[0])
    let operatorsRaw = line.split(':')[1].split(' ').filter((e) => e.length > 0).map((a) => Number.parseInt(a))
    console.log(line)
    if (viableLine(testValue, operatorsRaw)) {
        console.log(line)
        count += testValue
    }
})

console.log('Solución: ', count)

function viableLine(testValue, operatorsRaw) {
    let results = [operatorsRaw[0]]
    console.log(operatorsRaw)
    for (let i = 1; i < operatorsRaw.length; i++) {
        let newResults = []
        while (results.length > 0) {
            let curr = results.shift()
            newResults.push(curr + operatorsRaw[i])
            newResults.push(curr * operatorsRaw[i])
            newResults.push(Number.parseInt("" + curr + operatorsRaw[i]))
        }
        results = newResults
        // BFS
    }
    return results.some((num) => num === testValue)
}