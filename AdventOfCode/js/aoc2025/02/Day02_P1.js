const { readInput } = require('../../input')

let input = readInput()
input = input.split(',').map(group=>group.split('-'))

let invalidIds = []

input.forEach(([lower, upper])=>{
    // brute force or... is there any other way??

    for(let i = Number.parseInt(lower); i<=Number.parseInt(upper); i++){
        let text = i.toString()
        let halfpoint = Math.floor(text.length / 2)
        if(text.substring(0, halfpoint) === text.substring(halfpoint)) {
            invalidIds.push(i)
        }    
    }
})

console.log("SOLUTION: ", invalidIds.reduce((acc, curr)=>acc+=curr))
