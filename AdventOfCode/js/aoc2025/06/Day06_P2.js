const { readLines } = require('../../input')

let input = readLines()
let sol = 0
let operations = []
let lastOperationIndex = 0
for (let i = 0; i < input[input.length - 1].length; i++) {
    let line5 = input[input.length - 1][i]
    if (line5 != ' ' && i != 0) {
        operations.push([
            input[0].substring(lastOperationIndex, i - 1),
            input[1].substring(lastOperationIndex, i - 1),
            input[2].substring(lastOperationIndex, i - 1),
            input[3].substring(lastOperationIndex, i - 1),
            input[4].substring(lastOperationIndex, i - 1).replaceAll(' ', ''),
        ])
        lastOperationIndex = i
    }
}
operations.push([
    input[0].substring(lastOperationIndex),
    input[1].substring(lastOperationIndex),
    input[2].substring(lastOperationIndex),
    input[3].substring(lastOperationIndex),
    input[4].substring(lastOperationIndex).replaceAll(' ', ''),
])

operations.forEach(operation => {
    let expression = ""
    let sign = operation[operation.length - 1]
    for (let i = 0; i < operation[0].length; i++) {
        expression = expression + `${sign}${operation[0][i]}${operation[1][i]}${operation[2][i]}${operation[3][i]}`
    }
    sol += eval(expression.substring(1))
})

console.log(sol)