const { readInput } = require('./../../input')
//let texto = readInput()

let tot = 0
let columnasPorFila = 0
let indexColumna = 0
let num = 20151125
let calculando = true
let i = 1

// i = número de fila
while (calculando) {
    indexColumna = tot + 1
    tot += i
    let linea = ''
    for (let j = 0; j < i; j++) {
        // La columna de un punto es: columna=j+1
        // La row de un punto es: row=nºfila-j
        //row 2981, column 3075.
        if (j + 1 === 3075 && i - j === 2981) {
            console.log('Solucion:', num)
            calculando = false
        }
        linea += num + ' '
        num = (num * 252533) % 33554393

    }
    //console.log(linea)
    i++
}