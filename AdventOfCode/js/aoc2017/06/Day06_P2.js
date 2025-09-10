const {readInput} = require('./../../input')
let input = readInput().split('\t').map(n => Number.parseInt(n))
const diff = new Set()
let cycles = {}
let calculating = true
let steps = 0
while (calculating){

    let max = 0
    let index = 0
    input.forEach((n, i) => {
        if(max<n){
            max = n
            index = i
        }
    })

    input[index] = 0
    while(max > 0){
        index++
        input[index%input.length]++
        max--
    }
    
    const config = input.join('.')

    if(diff.has(config)){
        console.log("SOLUTION: ", steps+1)
        console.log(steps - cycles[config])
        return
    } else {
        diff.add(config)
        cycles[config] = steps
    }
    steps++
}