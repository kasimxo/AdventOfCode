const { readLines } = require('../../input')
let input = readLines()
let freeSides = 0
input.forEach(c => {
    let split = c.split(',').map(n => Number.parseInt(n))
    let c1 = `${split[0] + 1},${split[1]},${split[2]}`
    let c2 = `${split[0] - 1},${split[1]},${split[2]}`
    let c3 = `${split[0]},${split[1] + 1},${split[2]}`
    let c4 = `${split[0]},${split[1] - 1},${split[2]}`
    let c5 = `${split[0]},${split[1]},${split[2] + 1}`
    let c6 = `${split[0]},${split[1]},${split[2] - 1}`
    let cubes = [c1, c2, c3, c4, c5, c6]
    let possible = 6
    cubes.forEach(cube => {
        if(input.some(s=> s.localeCompare(cube)===0)){
            possible -= 1 
        } 
    })
    freeSides += possible
})
console.log(freeSides)
// 12426 too high