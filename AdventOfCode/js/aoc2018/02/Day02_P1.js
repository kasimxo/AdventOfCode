const {readLines} = require('./input')

let input = readLines()
let twoLetters = 0
let threeLetters = 0
input.forEach(w => {
    const characters = w.split('')
    const letterCount = {}
    characters.forEach(c => {
        if(letterCount[c] == null){
            letterCount[c] = 1
        } else {
            letterCount[c]++
        }
    })
    let twoSum = false
    let threeSum = false
    Object.entries(letterCount).forEach(([k, v]) => {
        if(v===2) twoSum = true
        if(v===3) threeSum = true
    })
    if(twoSum) twoLetters++
    if(threeSum) threeLetters++
})

console.log(twoLetters*threeLetters)
