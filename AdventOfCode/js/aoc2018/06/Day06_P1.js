const {readLines} = require('../../input')
const input = readLines().map(l=>l.split(', ').map(n=>Number.parseInt(n)))
let minX = Infinity
let maxX = 0
let minY = Infinity
let maxY = 0
let areas = {} // inputIndex: areaNumber
input.forEach(coord=>{
    let x = coord[0]
    let y = coord[1]
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
    areas[coord] = 0
})
let excluded = new Set()
for(let x = minX; x<maxX; x++){
    for(let y = minY; y<maxY; y++){
        let closest = null
        let minDist = Infinity
        input.forEach(p=>{
            let incX = Math.abs(p[0] - x)
            let incY = Math.abs(p[1] - y)
            let dist = incX + incY
            if(dist<minDist){
                minDist = dist
                closest = p
            } else if(dist === minDist){
                closest = null
            }
        })
        if(closest!==null){
            if(x===minX || x===maxX || y===minY || y===maxY){
                excluded.add(closest.join(','))
            }
            areas[closest.join(',')]++
        }
    }
}
let max = 0
let coord = null
Object.entries(areas).forEach(([k, v])=>{
    if(excluded.has(k)) return
    if(v>max){
        max = v
        coord = k
    }
})
console.log(max)