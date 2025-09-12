const {readLines} = require('../../input')
let input = readLines().map(l=>l.split(', ').map(n=>Number.parseInt(n)))
let minX = Infinity
let maxX = 0
let minY = Infinity
let maxY = 0
input.forEach(coord=>{
    minX = Math.min(minX, coord[0])
    minY = Math.min(minY, coord[1])
    maxX = Math.max(maxX, coord[0])
    maxY = Math.max(maxY, coord[1])
})
let size = 0
for(let x = minX; x<maxX; x++){
    for(let y = minY; y<maxY; y++){
        let cumDist = 0
        input.forEach(p=> cumDist += Math.abs(p[0] - x) + Math.abs(p[1] - y))
        if(cumDist<10000) size++
    }
}
console.log(size)