const {readInput} = require('../../input')
const input = readInput().split(',').map(c=>Number.parseInt(c))
let LAST_NUM = input[input.length-1]
let spoken = {}
input.forEach((num, index) => {
    spoken[num] = [index]
})

for(let i = input.length; i < 2020; i++) {
    let entries = Object.entries(spoken)
    let find = entries.find(pair => Number.parseInt(pair[0]) === LAST_NUM)
    if(find !== undefined){
        let turns = find[1]
        let previous = turns[turns.length-2]
        if(previous === undefined){
            LAST_NUM = 0 
            if(spoken[0]!==undefined){
                spoken[0].push(i)
            } else {
                spoken[0] = [i]
            }
        } else {
            let age = turns[turns.length - 1] - previous
            LAST_NUM = age
            if(spoken[age]!==undefined){
                spoken[age].push(i)
            } else {
                spoken[age] = [i]
            }
        }
    }
}

console.log(LAST_NUM)