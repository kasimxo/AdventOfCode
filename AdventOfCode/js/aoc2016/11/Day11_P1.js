const { readLines } = require('./../../input')
var text = readLines()

text = [
    'F1 HM LM',
    'F2 HG',
    'F3 LG',
    'F4'
]

let floors = Array(4)
for (let i = 0; i < 4; i++) {
    floors[i] = []
}

// Only true if at least one game has ended
let end = false
let steps = 0

text.forEach((line, level) => {
    let words = line.split(' ')
    for (let i = 1; i < words.length; i++) {
        floors[level].push(words[i])
    }
})

let partidas = [{
    pisos: floors,
    currLevel: 0
}]

/*
Para el piso actual en el que estamos, tenemos que probar a mandar cada objeto de forma individual arriba o abajo
o cada par de objetos cualesquiera.

Entonces tendremos que tener un objeto PARTIDA:
    - pisos: [(cada piso a su vez es un array con los chips y generadores)]
    - currlevel: (para saber de que forma mover las cosas)

Cada modificación que hagamos la tenemos que validar para tratar de minimizar lo máximo posible
Si consideramos que la modificación es viable, la volvemos a introducir para seguir iterando.

Por tanto, hay una variable PARTIDAS = [] que almacena todas

La variable STEPS puede ser globarl, ya que cada vez que finalicemos una vuelta completa a los objetos partida, sube uno
La condición de final de partida es que exista al menos una partida en la que todos los objetos estén en el piso 4
*/

while (end === false) {
    let tempPartidas = []
    partidas.forEach((partida) => {
        let rawGames = iterateGame(partida)
        rawGames.forEach((rawGame) => tempPartidas.push(rawGame))
    })




    partidas = tempPartidas
    steps++
}





console.log('SOLUCION: ', steps)


/*
Iterar una partida:
A partir del piso en el que estamos, enviamos los objetos por individual o en una combinación cualquiera arriba o abajo
Devolveremos un array de nuevas versiones de partidas
Será importante validarlas antes de enviarlas
Hay que tener cuidado con pasar valor o referencia
*/
function iterateGame(game) {
    //Variable que va a almacenar todas las nuevas versiones de partidas
    let games = []
    //Creamos una copia de todo por valor
    let currFloorIndex = game.currLevel + 0
    let orgFloors = []
    for (let i = 0; i < 4; i++) {
        orgFloors.push(copyStringArray(game.pisos[i]))
    }
    //El piso en el que estamos y que vamos a iterar todas las posibilidades
    let orgFloor = orgFloors[currFloorIndex]



    //Iteramos para enviar todos los objetos del piso de forma individual o por pares arriba o abajo
    for (let i = 0; i < orgFloor.length; i++) {

        for (let j = i + 1; j < orgFloor.length; j++) {

        }
    }

    //Devolvemos todas las nuevas versiones de partidas
    return games
}


//Havemos una copia por valor de un array de strings sin modificar el original
function copyStringArray(arr) {
    let newArr = []
    arr.forEach((el) => newArr.push(el + ''))
    return newArr
}
