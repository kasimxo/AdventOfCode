const { readLines } = require('../../input')
let instructions = readLines().map(n=>Number.parseInt(n))
let input = []
instructions.forEach(e => input.push([e, false]))
let calculating = true
while(calculating){
    let index = input.findIndex(e=>e[1]===false)
    if(index>=0){
        let el = input[index]
        el[1] = true
        input.splice(index, 1)
        let newIndex = (index + el[0]) % input.length 
        if(el[0]<0&&newIndex===0) newIndex = input.length
        input.splice(newIndex, 0, el)
    } else {
        calculating = false
    }
}
let zeroIndex = input.findIndex(e=>e[0]===0)
let firstIndex = (1000+zeroIndex)%input.length
let secondIndex = (2000+zeroIndex)%input.length
let thirdIndex = (3000+zeroIndex)%input.length

console.log("SOLUTION:",input[firstIndex][0]+input[secondIndex][0]+input[thirdIndex][0])
