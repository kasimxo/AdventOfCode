const {readInput} = require('../../input')
let population = readInput().split(',').map(n=>Number.parseInt(n))
for(let day = 0; day<80; day++){
    let newPopulation = []
    population.forEach(p=>{
        p--
        if(p<0){
            newPopulation.push(6,8)
        } else{
            newPopulation.push(p)
        }
    })
    population = newPopulation
}
console.log(population.length)