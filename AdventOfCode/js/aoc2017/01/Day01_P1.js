const { readInput } = require('./../../input')

let data = readInput()

data += data[0]

let sum = 0;

let currVal = Number.parseInt(data[0])

for (let i = 0; i < data.length - 1; i++) {
    let nextVal = Number.parseInt(data[i + 1])
    if (currVal === nextVal) {
        sum += currVal
    }
    currVal = nextVal
}

console.log("Sol: ", sum)