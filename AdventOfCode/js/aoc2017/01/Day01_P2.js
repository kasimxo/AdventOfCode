const { readInput } = require('./../../input')

let data = readInput()
const length = data.length
const interval = Math.round(length / 2)
data += data

let sum = 0;

for (let i = 0; i < length; i++) {
    let currVal = Number.parseInt(data[i])
    let nextVal = Number.parseInt(data[i + interval])
    if (currVal === nextVal) {
        sum += currVal
    }
}

console.log("Sol: ", sum)