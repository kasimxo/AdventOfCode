const { readLines } = require('../../input')

let input = readLines()

let sum = 0

input.forEach(line => {

    let valueText = findNumber(line, 12)
    
    sum += Number.parseInt(valueText)
})

console.log(sum)

function findNumber(number, index){
/**
 * Va a recibir un número como texto, ejemplo: 987654321111111
 * Va a recibir la posición actual que estamos buscando (de 12 a 0), ejemplo: 1
 * 
 * Si la posición actual es 1, va a devolver el mayor digito
 * 
 * Si la posición actual es MAYOR que 1, va a devolver el valor de:
 * el MAYOR digito que tenga AL MENOS posición - 1 dígitos a la derecha
 * con la invocación de findNumber sobre la substring resultante
 */

    if(index == 1){
        let valText = number.split('').sort((a, b)=>Number.parseInt(b)-Number.parseInt(a))[0]
        return `${valText}`
    }

    let max = Number.parseInt(number[number.length-index])
    let maxIndex = number.length-index
    for(let i = number.length-index; i>=0; i--){
        let val = Number.parseInt(number[i])
        if(val>=max){
            maxIndex = i
            max = val
        }
    }

    let ending = findNumber(number.substring(maxIndex+1), index-1)
    let calculated =`${max}${ending}`
    
    return calculated
}