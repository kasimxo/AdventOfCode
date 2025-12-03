const { readLines } = require('../../input')

let input = readLines()

let pointer = 50
let password = 0

/**
    % operand works diffenrently in javascript than other languages.
    For example, look at this code:

    (((pointer+increment)%100)+100) % 100 // JAVACSRIPT
    (pointer+incrememt)%100 // PYTHON

    Both return the value of the MODULO operation, 
    but js needs a lot more boilerplate
 */

input.forEach(line => {
    let increment = Number.parseInt(line.substring(1))

    if(line[0] === "L"){
        if ((pointer - increment) < 0) {
            password += Math.abs(Math.floor((100 + pointer - increment)/100))
            if(pointer!=0){
                password += 1
            }
        }

        pointer = (((pointer-increment)%100)+100) % 100
        password += pointer == 0
    } else {
        password += Math.floor((pointer+increment)/100)
        pointer = (((pointer+increment)%100)+100) % 100
    }
})

console.log(password, pointer)