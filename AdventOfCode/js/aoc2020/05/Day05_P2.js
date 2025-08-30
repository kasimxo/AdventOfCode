const {readLines} = require('./input')

input = readLines()
let lines = input.map(w=>w.replaceAll('L', 'Z'))
lines.sort((a, b) => b.localeCompare(a))

let ids = []
lines.forEach(p => ids.push(calculateID(p.replaceAll('Z', 'L'))))
function calculateID(pass){

    let row = pass.slice(0, 7).replaceAll('B', '1').replaceAll('F', '0')
    let aisle = pass.slice(7, pass.length).replaceAll('R', '1').replaceAll('L', '0')
    let rowNum = Number.parseInt(row, 2)
    let aisleNum = Number.parseInt(aisle, 2)
    let id = rowNum*8+aisleNum
    if(Number.isNaN(id)){
        console.log(pass, row, aisle, rowNum, aisleNum, id)
        throw new Error()
    }
    return id
}

let missing = []
for(let i = ids[0]; i<=ids[ids.length-1]; i++){
    if(!ids.includes(i)) missing.push(i)
}

console.log(missing)
