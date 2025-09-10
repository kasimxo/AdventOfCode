const {readLines} = require('./../../input')
let input = readLines()
input = input.map(l=>l.split(','))
let races = []
for(let i = 1; i<input[0].length; i++){
    races.push([input[0][i], input[1][i]])
}
let options = []
races.forEach(race=>{
    let solutions = 0
    let time = Number.parseInt(race[0])
    let distance = Number.parseInt(race[1])
    for(let i = 0; i<time; i++){
        let remaining = time - i
        if(i*remaining>distance) solutions++
    }
    options.push(solutions)
})
console.log(options.reduce((acc, curr)=>acc*=curr))