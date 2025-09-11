const {readInput} = require('../../input')
let population = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}
let input = readInput().split(',').map(n=>Number.parseInt(n)).map(p=>population[p]++)

for(let day = 0; day<256; day++){
    let newPopulation = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}
    Object.entries(population).forEach(([k, v])=>{
        if(k==='0'){
            newPopulation[8] += v
            newPopulation[6] += v
        } else {
            newPopulation[k-1] += v
        }
    })
    population = newPopulation
}
let sum = Object.values(population).reduce((acc,curr)=>acc+=curr)
console.log(sum)