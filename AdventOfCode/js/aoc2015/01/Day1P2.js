const { readInput } = require('./input')



// ( arriba
// ) abajo
var piso = 0
var texto = readInput()
for (let i = 0; i < texto.length; i++) {
    texto[i].includes('(') ? piso++ : piso--
    if (piso < 0) {
        console.log(i + 1)
        return

    }
}
