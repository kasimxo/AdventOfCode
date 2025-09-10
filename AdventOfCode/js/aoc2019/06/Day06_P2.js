const {readLines} = require('../../input.js')
let planets = { 'COM': { distance: 0, parents: []} }
let input = readLines().map(l=>l.split(')'))
let replace = ['COM']
while(true){
    let newReplace = []
    input.forEach(p=>{
        if(replace.includes(p[0])){
            newReplace.push(p[1])
            planets[p[1]] = {
                distance:  planets[p[0]].distance + 1,
                parents: [...planets[p[0]].parents, p[0]]
            }
        }
    })
    input = input.filter(p=>!replace.includes(p[0]))
    replace = newReplace
    if(input.length === 0) break
}
let you = new Set(planets['YOU'].parents)
let san = new Set(planets['SAN'].parents)
console.log(you.symmetricDifference(san).size)

