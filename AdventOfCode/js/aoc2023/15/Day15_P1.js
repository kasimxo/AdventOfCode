const {readInput} = require('../../input')
let input = readInput()
//input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7"
input = input.split(',')

let sol = 0
for(let i = 0; i<input.length; i++){
    let value = 0
    let curr = input[i]
    curr.split('').forEach(c=>{
        let ascii = c.charCodeAt(0)
        value += ascii
        value *= 17
        value = value % 256
    })
    console.log(curr, value)
    sol += value
}
console.log("SOLUTION: ", sol)