const { readInput } = require('./../../input')
var texto = readInput()

//Paramos de generar contraseñas cuando cumpla los criterios
var calculando = true

while (calculando) {
    texto = modificarLetra(texto, texto.length - 1)
    calculando = verificarCadena(texto)
}

console.log(texto)

function modificarLetra(cadena, index) {
    var abc = 'abcdefghijklmnopqrstuvwxyz'
    var oldChar = cadena[index]
    if (oldChar.localeCompare('z') === 0) {

        var newChar = 'a'
        if (index === cadena.length - 1) {
            //console.log('Caso ultimo')
            cadena = cadena.substring(0, index) + newChar
            index = index - 1
            cadena = modificarLetra(cadena, index)
        } else {
            //console.log('caso else')
            cadena = cadena.substring(0, index) + newChar + cadena.substring(index + 1, cadena.length)
            index = index - 1
            cadena = modificarLetra(cadena, index)
        }
    } else {

        if (index === cadena.length - 1) {
            cadena = cadena.substring(0, index) + abc[Number.parseInt(abc.indexOf(cadena[index])) + 1]
        } else {
            cadena = cadena.substring(0, index) + abc[Number.parseInt(abc.indexOf(cadena[index])) + 1] + cadena.substring(index + 1, cadena.length)
        }
    }
    return cadena
}



function verificarCadena(cadena) {
    var abc = 'abcdefghijklmnopqrstuvwxyz'

    var marcadorIOL = true
    var marcadorLetrasDoblesFirst = false
    var marcadorIncrease = false
    var marcadorLetrasDoblesSecond = false
    var primeraPareja = ''

    for (let i = 0; i < cadena.length; i++) {
        //Comprobacion i o l
        if (cadena[i].localeCompare('i') ||
            cadena[i].localeCompare('l') ||
            cadena[i].localeCompare('o')) {
            marcadorIOL = false //CUMPLE CON IOL
        }
        //Comprobacion letras dobles
        if (i > 0 && cadena[i].localeCompare(cadena[i - 1]) === 0) {
            if (primeraPareja.length === 0) {
                marcadorLetrasDoblesFirst = true //CUMPLE CON DOBLES
                primeraPareja = cadena[i]
            } else {
                if (cadena[i].localeCompare(primeraPareja) !== 0) {
                    marcadorLetrasDoblesSecond = true
                }
            }
        }

        if (i >= 2) {
            var firstIndex = abc.indexOf(cadena[i - 2])
            var secondIndex = abc.indexOf(cadena[i - 1])
            var thirdIndex = abc.indexOf(cadena[i])
            if (secondIndex - firstIndex === 1 && thirdIndex - secondIndex === 1) {
                marcadorIncrease = true
            }
        }
    }

    if (marcadorIOL === false && marcadorLetrasDoblesFirst === true && marcadorLetrasDoblesSecond === true && marcadorIncrease === true) {
        return false
    }

    return true
}
