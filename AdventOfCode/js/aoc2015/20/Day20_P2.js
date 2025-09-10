const { readInput } = require('./../../input')

var texto = readInput()
//texto = 130
/* 
House 1 got 11 presents.    -> 1        -> 11
House 2 got 33 presents.    -> 1 2      -> 11 + 22
House 3 got 44 presents.    -> 1 3      -> 11 + 33
House 4 got 77 presents.    -> 1 2 4    -> 11 + 22 + 44
House 5 got 66 presents.    -> 1 5      -> 11 + 55
House 6 got 132 presents.   -> 1 2 3 6  -> 11 + 22 + 33 + 66
House 7 got 88 presents.    -> 1 7      -> 11 + 77
House 8 got 165 presents.   -> 1 2 2*2 2*2*2  -> 11 + 22 + 44 + 88
House 9 got 130 presents.   -> 1 3 9    -> 11 + 33 + 99
*/
var dividendo = Number.parseInt(texto)

//dividendo = 1


var house = {}
for (let i = 1; 1 < dividendo / 10; i++) {
    for (let j = i; j < dividendo; j += i) {
        if (house[j] === undefined) {
            house[j] = 0
        }
        house[j] += i * 10
    }
}

console.log(house)

/*
var calculando = true

while (calculando) {
    var divisores = [dividendo]

    for (let i = 1; i <= Math.floor(dividendo / 2); i++) {
        if (dividendo % i === 0 && dividendo / i <= 50) {
            divisores.push(i)
        }
    }
    var resultado = 0
    divisores.forEach((div) => { resultado += div * 11 })
    if (resultado < Number.parseInt(texto)) {
        dividendo++
    } else {
        calculando = false
        console.log(dividendo, resultado)
    }
}

*/



//console.log(resultado)


