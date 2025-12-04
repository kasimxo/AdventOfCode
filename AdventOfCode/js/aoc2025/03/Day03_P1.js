const { readLines } = require('../../input')

let input = readLines()

let sum = 0

input.forEach(line => {

    let value = 0

    for(let i = 0; i<line.length-1; i++){
        let left = line[i]
        for(let j = i+1; j<line.length; j++){
            let right = line[j]
            let currVal = Number.parseInt(left+right)
            value = Math.max(currVal, value)
        }
    }

    sum += value
})

console.log(sum)