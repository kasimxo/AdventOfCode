const {readLines} = require('../../input.js')
let planets = { 'COM': 0 }
let input = readLines().map(l=>l.split(')'))
let replace = ['COM']
while(true){
    let newReplace = []
    input.forEach(p=>{
        if(replace.includes(p[0])){
            newReplace.push(p[1])
            planets[p[1]] = planets[p[0]] + 1
        }
    })
    input = input.filter(p=>!replace.includes(p[0]))
    replace = newReplace
    if(input.length === 0) break
}
let solution = Object.values(planets).reduce((acc,curr)=>acc+=curr, 0)
console.log(solution)