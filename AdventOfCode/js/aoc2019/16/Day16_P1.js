const { readInput } = require('../../input')
let input = readInput()
let patterns = [] // This will have 650 patterns
let orgPattern = "1210" // Same as 0, 1, 0, -1, we just increased 1 every member, simplifies operations
for (let i = 1; i <= input.length; i++) {
    let firstPattern = ""
    while (firstPattern.length <= input.length) {
        firstPattern += orgPattern.split('').map(c => c.repeat(i)).join('') + ""
    }
    patterns.push(firstPattern.substring(1, input.length + 1)) // same as pop
}
for (let j = 0; j < 100; j++) {
    let newNum = ""
    // One iteration
    patterns.forEach(p => {
        let val = 0
        for (let i = 0; i < input.length; i++) {
            val += (Number.parseInt(input[i]) * (Number.parseInt(p[i]) - 1))
        }
        newNum += Math.abs(val % 10)
    })
    input = `${newNum}`
}
console.log("FINAL: ", input.substring(0, 8))