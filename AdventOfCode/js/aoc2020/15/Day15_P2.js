const {readInput} = require('../../input')
const input = readInput().split(',').map(c=>Number.parseInt(c))
let LAST_NUM = input[input.length-1]
/*
    For part 2, using an object was no longer possible.
    In first part, we did Object.entries every iteration
    Since the size of the object keeps increasing, it's no longer practical
    With a map, we can go in constant time

    I decided to keep every single turn where that number appeared.
    Although not practical and not necessary, it didn't cause any
    memory or performance problem
*/
let spoken = new Map()
input.forEach((num, index) => {
    spoken.set(num,[index])
})

for(let i = input.length; i < 30000000; i++) {
    if(i%1000000===0) console.log(i) // This is only to track progress
    let find = spoken.get(LAST_NUM)
    if(find !== undefined){
        let turns = find
        let previous = turns[turns.length-2]
        if(previous === undefined){
            LAST_NUM = 0 
            let get0 = spoken.get(0)
            if(get0 !== undefined){
                get0.push(i)
            } else {
                spoken.set(0, [i])
            }
        } else {
            let age = turns[turns.length - 1] - previous
            LAST_NUM = age
            let getAge = spoken.get(age)
            if(getAge!==undefined){
                getAge.push(i)
            } else {
                spoken.set(age, [i])
            }
        }
    }
}
console.log(LAST_NUM)


















return 
for(let i = input.length; i < 30000000; i++) {
    if(i%5000===0) {
        console.log(i)
        console.log(spoken)
    }
    let entries = Object.entries(spoken)
    let find = entries.find(pair => Number.parseInt(pair[0]) === LAST_NUM)
    if(find !== undefined){
        let turns = find[1]
        let previous = turns[turns.length-2]
        if(previous === undefined){
            LAST_NUM = 0 
            if(spoken[0]!==undefined){
                //let currSa = spoken[0]
                //spoken[0] = [currSa[currSa.length-1], i]
                //if(spoken[0].length>1) spoken[0].shift()
                spoken[0].push(i)
            } else {
                spoken[0] = [i]
            }
        } else {
            let age = turns[turns.length - 1] - previous
            LAST_NUM = age
            if(spoken[age]!==undefined){
                //let currS = spoken[age]
                //spoken[age] = [currS[currS.length-1], i]
                //if(spoken[age].length>1) spoken[age].shift()
                spoken[age].push(i)
            } else {
                spoken[age] = [i]
            }
        }
    }
}

console.log(LAST_NUM)