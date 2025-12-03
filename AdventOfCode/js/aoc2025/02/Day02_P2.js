const { readInput } = require('../../input')

let input = readInput()
input = input.split(',').map(group=>group.split('-'))

let invalidIds = []

input.forEach(([lower, upper])=>{
    for(let i = Number.parseInt(lower); i<=Number.parseInt(upper); i++){
        let text = i.toString()

        // Aquí el primer punto sería encontrar los divisores del número, incluyendo 1
        // NO DEL NÜMERO SI NO DE LA LONGITUD DEL NUMERO, QUE DEBERIA SER MUCHO MAS RAPIDO
        
        // Si durante la ejecución vemos que tarda mucho, 
        // aquí podemos meter una cache según longitudes de palabras
        let divisors = findDivisors(text.length) 
        
        let isInvalid = false
        divisors.forEach(divisor=>{
            if(isInvalid) return
            
            let regex = new RegExp(`([0-9]{${divisor}})`, "g")
            
            let groups = text.match(regex)
            let first = groups[0]
            for(let j = 1; j<groups.length; j++){
                if(first !== groups[j]) break
                if(j == groups.length -1 && first === groups[j]) isInvalid = true
            }
        })
        if(isInvalid) invalidIds.push(i)
    }
})

console.log(invalidIds)
console.log("SOLUTION: ", invalidIds.reduce((acc, curr)=>acc+=curr))

function findDivisors(number){
    let divisors = [1]

    for(let i = 2; i<=Math.floor(number/2); i++){
        if(number%i == 0){
            divisors.push(i)
        }
    }
    
    return divisors
}
