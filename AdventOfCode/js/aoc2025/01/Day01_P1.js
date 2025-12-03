const { readLines } = require('../../input')

let input = readLines()


let pointer = 50
let password = 0

input.forEach(line => {
    pointer += line[0] === "R" ? Number.parseInt(line.substring(1)) : -Number.parseInt(line.substring(1))
    
    if(pointer < 0 || pointer >= 100){
        pointer = (((pointer)%100)+100) % 100
    }
    password += pointer === 0
})

console.log(password)