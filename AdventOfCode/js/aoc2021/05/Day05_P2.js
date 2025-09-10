const {readLines} = require('../../input')

let input = readLines()

input = input.filter(l=>{
    let splitted = l.split(' -> ')
    let [x1, y1] = splitted[0].split(',').map(n=>Number.parseInt(n))    
    let [x2, y2] = splitted[1].split(',').map(n=>Number.parseInt(n))
    return x1 === x2 || y1 === y2 || Math.abs(x1-x2) === Math.abs(y1-y2)
})
let positions = {}
input.forEach(l=>{
    let splitted = l.split(' -> ')
    let [x1, y1] = splitted[0].split(',').map(n=>Number.parseInt(n))    
    let [x2, y2] = splitted[1].split(',').map(n=>Number.parseInt(n))
    if(x1===x2){
        let start = Math.min(y1, y2)
        let end = Math.max(y1, y2)
        for(let i = start; i<=end; i++){
            if(positions[`${x1},${i}`]===undefined||positions[`${x1},${i}`]===null){
                positions[`${x1},${i}`] = 1
            } else {
                positions[`${x1},${i}`]++
            }
        }
    } else if(y1===y2){
        let start = Math.min(x1, x2)
        let end = Math.max(x1, x2)
        for(let i = start; i<=end; i++){
            if(positions[`${i},${y1}`]===undefined||positions[`${i},${y1}`]===null){
                positions[`${i},${y1}`] = 1
            } else {
                positions[`${i},${y1}`]++
            }
        }
    } else if (Math.abs(x1-x2) === Math.abs(y1-y2)){
        let length = Math.abs(x1-x2)
        let incX = x1-x2<0?1:-1
        let incY = y1-y2<0?1:-1
        let newX = x1
        let newY = y1
        for(let i = 0; i<=length; i++){
            if(positions[`${newX},${newY}`]===undefined||positions[`${newX},${newY}`]===null){
                positions[`${newX},${newY}`] = 1
            } else {
                positions[`${newX},${newY}`]++
            }
            newX += incX
            newY += incY
        } 
    }
})
let solution = Object.values(positions).filter(v=>v>1).length
console.log(solution)