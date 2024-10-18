const { readInput } = require('./input')

var texto = readInput()
texto = 3600
/* 
House 1 got 10 presents.    -> 1        -> 10
House 2 got 30 presents.    -> 1 2      -> 10 + 20
House 3 got 40 presents.    -> 1 3      -> 10 + 30
House 4 got 70 presents.    -> 1 2 4    -> 10 + 20 + 40
House 5 got 60 presents.    -> 1 5      -> 10 + 50
House 6 got 120 presents.   -> 1 2 3 6  -> 10 + 20 + 30 + 60
House 7 got 80 presents.    -> 1 7      -> 10 + 70
House 8 got 150 presents.   -> 1 2 4 8  -> 10 + 20 + 40 + 80
House 9 got 130 presents.   -> 1 3 9    -> 10 + 30 + 90
*/
var dividendo = Number.parseInt(texto)

dividendo = 1



var calculando = true

while (calculando) {
    var divisores = [dividendo]

    for (let i = 1; i <= Math.floor(dividendo / 2); i++) {
        if (dividendo % i === 0) {
            divisores.push(i)
        }
    }
    var resultado = 0
    divisores.forEach((div) => { resultado += div * 10 })
    if (resultado < Number.parseInt(texto)) {
        dividendo++
    } else {
        calculando = false
        console.log(dividendo, resultado)
    }
}





console.log(resultado)


