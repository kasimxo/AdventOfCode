const { readInput } = require('./input')

var texto = readInput().split('\r\n')

/*
Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
reno_nombre ={
    
    tiempo_descanso: 127
    velocidad_max: 14
    tiempo_volando: 10
    distancia_recorrida: 0 -> Se inicia en 0
    volando: true/false
    tiempo_estado: n
}
*/

renos = []

texto.forEach(linea => {
    var palabras = linea.split(' ')
    var nombreValue = palabras[0]
    var velocidad_maxValue = Number.parseInt(palabras[3])
    var tiempo_volandoValue = Number.parseInt(palabras[6])
    var tiempo_descansoValue = Number.parseInt(palabras[13])

    var reno = {
        nombre: nombreValue,
        tiempo_descanso: tiempo_descansoValue,
        velocidad_max: velocidad_maxValue,
        tiempo_volando: tiempo_volandoValue,
        distancia_recorrida: 0,
        volando: false,
        tiempo_estado: 1
    }

    renos.push(reno)
});


for (let i = 0; i < 2503; i++) {
    renos.forEach(reno => {
        actualizarReno(reno)
    })
}

renos = renos.sort((a, b) => a.distancia_recorrida - b.distancia_recorrida)

console.log(renos[renos.length - 1])

function actualizarReno(reno) {
    if (reno.volando) {
        //Está volando
        reno.distancia_recorrida += reno.velocidad_max
    }
    reno.tiempo_estado--
    if (reno.tiempo_estado === 0) {
        if (reno.volando) {
            reno.volando = false
            reno.tiempo_estado = reno.tiempo_descanso
        } else {
            reno.volando = true
            reno.tiempo_estado = reno.tiempo_volando
        }
    }
}

//console.log(texto)
