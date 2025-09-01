const {readLines} = require('./input')

let input = [
    "#1 @ 1,3: 4x4",
    "#2 @ 3,1: 4x4",
    "#3 @ 5,5: 2x2"
]
input = readLines()
const squares = {}
let idList = new Set()
input.forEach(l => {
    const words = l.split(' ')
    const id = words[0]
    idList.add(id)
    const coords = words[2].replaceAll(':', '')
    let [x, y] = coords.split(',').map(n=>Number.parseInt(n))
    const [dimX, dimY] = words[3].split('x').map(n=>Number.parseInt(n))
    const maxX = x+dimX
    const maxY = y+dimY
    for(let i = x; i<maxX; i++){
        for(let j = y; j<maxY; j++){
            const position = `${i},${j}`
            if(squares[position] == undefined){
                squares[position] = {
                    surfaces: 1,
                    ids: [id]
                }
            } else {
                squares[position]["surfaces"]++
                squares[position]["ids"].push(id)
            }
        }
    }
})
let invalidIds = new Set()
const filtered = Object.values(squares).filter(v=>v.surfaces>1)
filtered.forEach(f=>{
    f.ids.forEach(id=>invalidIds.add(id))
})
console.log(idList.difference(invalidIds))