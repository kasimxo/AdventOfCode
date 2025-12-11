const {readLines} = require('../../input')

const START = "you"
let input = readLines()
let paths = {}
input.forEach(line=>{
    let splitted = line.split(':')
    paths[splitted[0]] = splitted[1].trim().split(' ')
})
let sol = 0
let queue = ["you"]
while (queue.length>0){
    let curr = queue.shift()
    let adding = paths[curr]
    let filtered = adding.filter(cable=>cable!="out")
    sol+=adding.length-filtered.length
    queue = queue.concat(filtered)
}
console.log(sol)