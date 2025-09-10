const { readInput } = require('./../../input')

var texto = readInput().split('\r\n')
var objetivo = 150

// Valores de test
/*
texto = [
    20, 15, 10, 5, 5
]
objetivo = 25
*/
var resultado = 0

// Para n elementos (n = texto.length)
// 0000000 -> n = cantidad de 0
// 0100101 -> Ponemos 1 en los elementos combinados
// Validar esta máscara

var mask = ''
texto.forEach((el) => { mask += '0' })

var calculando = true

while (calculando) {
    //console.log('NEW LOOP WHILE --- ', mask)

    validarMascara(mask)

    mask = avanzarMascara(mask)

    calculando = comprobarCalculando(mask)
}




console.log(mask)

console.assert(resultado === 4)
console.log('Resultado ', resultado)


//Le pasamo la máscara como texto y vemos si hemos hecho todas las combinaciones
function comprobarCalculando(mascara) {
    return mascara.includes('0')
}

//Compreba si la combinación suma al objetivo
function validarMascara(mascara) {
    var total = 0
    for (let i = 0; i < mascara.length; i++) {
        if (mascara[i].localeCompare('1') === 0) {
            total += Number.parseInt(texto[i])
        }
    }
    if (total === objetivo) {
        resultado++
    }
}

//Vamos a la siguiente combinacion
function avanzarMascara(mascara) {
    var llevada = '0'
    var done = false
    //console.log('Avanzar Mascara', mascara)
    for (let i = mascara.length - 1; i >= 0; i--) {
        if (done === false) {
            if (i === mascara.length - 1 && mascara[i].localeCompare('0') === 0 && llevada.localeCompare('0') === 0) {
                // 0 sin llevada
                mascara = mascara.substring(0, i) + '1' + mascara.substring(i + 1, mascara.length)
                llevada = '0'
                done = true
                //console.log('0 sin llevada ', mascara)
            } else if (mascara[i].localeCompare('0') === 0 && llevada.localeCompare('1') === 0) {
                // 0 CON llevada
                mascara = mascara.substring(0, i) + '1' + mascara.substring(i + 1, mascara.length)
                llevada = '0'
                done = true
                //console.log('0 CON llevada ', mascara)
            } else if (i === mascara.length - 1 && mascara[i].localeCompare('1') === 0 && llevada.localeCompare('0') === 0) {
                // 1 sin llevada PRIMERA POS
                mascara = mascara.substring(0, i) + '0' + mascara.substring(i + 1, mascara.length)
                llevada = '1'
                //console.log('1 sin llevada PRIMERA POS ', mascara)
                //done = true
            } else if (mascara[i].localeCompare('1') === 0 && llevada.localeCompare('1') === 0) {
                // 1 CON llevada
                mascara = mascara.substring(0, i) + '0' + mascara.substring(i + 1, mascara.length)
                llevada = '1'
                //console.log('1 CON llevada', mascara)
            } else if (mascara[i].localeCompare('1') === 0 && llevada.localeCompare('0') === 0) {
                // 1 sin llevada
                done = true
                //console.log('1 CON llevada', mascara)
            }
        }
    }
    //console.log('Hemos avanzado máscara ', mascara)
    return mascara
}