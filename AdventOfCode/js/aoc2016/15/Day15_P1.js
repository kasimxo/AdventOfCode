const {readLines} = require('../../input')
let input = readLines()
let discs = []
input.forEach(d=>{
    let split = d.split(' ')
    let discNum = split[1].slice(1)
    let starting = split[split.length-1].slice(0, split[split.length-1].length-1)
    let positions = split[3]
    discs.push({
        index: Number.parseInt(discNum),
        positions: Number.parseInt(positions),
        startingPos: Number.parseInt(starting)
    })
})
let time = 0
while(true){
    let valid = true
    discs.forEach(d=>{
        calculatedPosition = (d.startingPos+time+d.index) % d.positions
        if(calculatedPosition !== 0){
            valid = false
        }
    })
    if(valid){
        console.log("Solution ", time)
        break
    }
    time++
}