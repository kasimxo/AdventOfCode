const { readLines } = require('../../input')
let input = readLines().map(l => {
    let regex = /position=<([-, 0-9]*)> velocity=<([-, 0-9]*)>/g
    let groups = l.split(regex)
    return [groups[1].split(', ').map(n => Number.parseInt(n)), groups[2].split(', ').map(n => Number.parseInt(n))]
})
let calculating = true
let i = 0
let lastLen_X = Infinity
let lastLen_Y = Infinity

while (calculating) {
    input.forEach(g => {
        g[0][0] += g[1][0]
        g[0][1] += g[1][1]
    })
    i++
    
    let found = CalculateLength(input.map(i=>i[0]))
    if(found){
        input.forEach(g => {
            g[0][0] -= g[1][0]
            g[0][1] -= g[1][1]
        })
        PrintInput(input.map(i => i[0]))
        calculating = false
    }
}

function CalculateLength(points){
    let [MIN_X, MAX_X, MIN_Y, MAX_Y] = CalculateBounds(points)
    let len_X = MAX_X-MIN_X
    let len_Y = MAX_Y-MIN_Y
    if(lastLen_X<len_X||lastLen_Y<len_Y){
        return true
    }
    lastLen_X = len_X
    lastLen_Y = len_Y
}

function CalculateBounds(points){
    let MIN_Y = Infinity
    let MAX_Y = 0
    let MIN_X = Infinity
    let MAX_X = 0
    points.forEach(p => {
        MIN_X = Math.min(MIN_X, p[0])
        MAX_X = Math.max(MAX_X, p[0])
        MIN_Y = Math.min(MIN_Y, p[1])
        MAX_Y = Math.max(MAX_Y, p[1])
    })
    return [MIN_X, MAX_X, MIN_Y, MAX_Y]
}

function PrintInput(points) {
    let [MIN_X, MAX_X, MIN_Y, MAX_Y] = CalculateBounds(points)
    for (let y = MIN_Y; y <= MAX_Y; y++) {
        let line = ''
        for (let x = MIN_X; x <= MAX_X; x++) {
            if (points.some(p => p[0] === x && p[1] === y)) {
                line += '#'
            } else {
                line += '.'
            }
        }
        console.log(line)
    }
}