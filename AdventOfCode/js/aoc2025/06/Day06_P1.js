const {readLines} = require('../../input')

let input = readLines().map(line=>line.replaceAll(/( +)/g, ";").split(';'))
let sol = 0

for(let i = 0; i<input[0].length; i++){
    sol += eval(`${input[0][i]}${input[4][i]}${input[1][i]}${input[4][i]}${input[2][i]}${input[4][i]}${input[3][i]}`)
}
console.log(sol)