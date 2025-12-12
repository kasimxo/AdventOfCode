const {readLines} = require('../../input')

let input = readLines()
let sol = 0
input.forEach(line=>{
    let parts = line.split(':').map(el=>el.trim())
    let [width, height] = parts[0].split('x')
    let area = Math.floor(width/3)*Math.floor(height/3)
    let maxRequiredArea = parts[1].split(' ').reduce((acc, curr)=> acc+=Number.parseInt(curr), 0)
    if(area>=maxRequiredArea) sol++
})
console.log(sol)