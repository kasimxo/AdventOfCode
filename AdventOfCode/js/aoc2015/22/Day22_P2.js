let boss = {
    health: 13,
    //health: 13,
    //dmg: 8
    dmg: 8
}
/*
boss.health = 51
boss.dmg = 9
*/
let spells = {
    Missile: { //0
        nombre: 'Magic missile',
        cost: 53,
        dmg: 4, //instantaneo
        type: 'cast'
    },
    Drain: { //1
        nombre: 'Drain',
        cost: 73,
        dmg: 2, //instantaneo
        heal: 2, //instantaneo
        type: 'cast'
    },
    Shield: { //2
        nombre: 'Shield',
        cost: 113,
        duration: 6,
        armor: 7,
        type: 'effect'
    },
    Poison: { //3
        nombre: 'Poison',
        cost: 173,
        duration: 6,
        dmg: 3,
        type: 'effect'
    },
    Recharge: { //4
        nombre: 'Recharge',
        cost: 229,
        duration: 5,
        mana: 101, //Al comienzo de cada turno
        type: 'effect'
    },
}

let efects = {
    Poison: false,
    Recharge: false,
    Shield: false
}

let efectos = []

let partidas = []
let partidaOriginal = {
    prota: {
        health: 50,
        dmg: 0,
        def: 0,
        mana: 500,
        //mana: 250,
        manaGastado: 0
    },
    jefe: {
        health: 51,
        dmg: 9
    },
    activos: []
}

//char.health = 50
//char.mana = 500

let manaMin = Infinity

partidas.push(partidaOriginal)

while (partidas.length > 0) {
    //console.log(partidas.length)

    //Array aux para almacenar las partidas avanzadas
    let partidasTemp = []
    partidas.forEach((partida) => {
        //Nos va a devolver un array con todas las variantes de la partida (todos los casteos posibles)
        let partidaTemp = avanzarTurnoPartida(partida)
        //console.log(partidaTemp)
        if (partidaTemp !== undefined) {
            partidasTemp = partidasTemp.concat(partidaTemp)
        }
    })
    partidas = partidasTemp
    console.log(partidas.length, manaMin)
}

//continuarPartidaChar({ prota: { health: 10, dmg: 0, def: 0, mana: 250, manaGastado: 0 }, jefe: { health: 13, dmg: 8 }, activos: [] })

function avanzarTurnoPartida(partida) {
    //console.log('Avanzar turno:', partida.prota, partida.jefe, partida.activos)

    partida.prota.health--
    if (partida.prota.health <= 0) {
        return
    }



    //calcular los efectos
    partida = aplicarEfectos({ prota: partida.prota, jefe: partida.jefe, activos: partida.activos })
    //console.log(partida.prota.mana)
    if (partida.jefe.health <= 0) {
        manaMin = Math.min(manaMin, partida.prota.manaGastado)
        //console.log('PARTIDA GANADA', manaMin)
        return
    }

    //Array que almacena todas las variantes generadas desde esta partida
    let variantes = []

    let temp = copiarPartida(partida)
    temp = castMissile(temp)
    if (temp !== undefined) {
        checkWinOrLoseChar(temp)
        temp = continuarPartidaBoss(temp)
        if (temp !== undefined) {
            variantes.push(temp)
        }
    }
    let temp1 = copiarPartida(partida)
    temp1 = castDrain(temp1)
    if (temp1 !== undefined) {
        checkWinOrLoseChar(temp1)
        temp1 = continuarPartidaBoss(temp1)
        if (temp1 !== undefined) {
            variantes.push(temp1)
        }
    }

    let temp2 = copiarPartida(partida)
    temp2 = castShield(temp2)
    if (temp2 !== undefined) {
        checkWinOrLoseChar(temp2)
        temp2 = continuarPartidaBoss(temp2)
        if (temp2 !== undefined) {
            variantes.push(temp2)
        }
    }
    let temp3 = copiarPartida(partida)
    temp3 = castPoison(temp3)
    if (temp3 !== undefined) {
        checkWinOrLoseChar(temp3)
        temp3 = continuarPartidaBoss(temp3)
        if (temp3 !== undefined) {
            variantes.push(temp3)
        }
    }
    let temp4 = copiarPartida(partida)
    temp4 = castRecharge(temp4)
    if (temp4 !== undefined) {
        checkWinOrLoseChar(temp4)
        temp4 = continuarPartidaBoss(temp4)
        if (temp4 !== undefined) {
            variantes.push(temp4)
        }
    }

    //console.log("Dentro de avanzar turno", variantes)
    return variantes
}

function continuarPartidaBoss(partida) {

    let temp = copiarPartida(partida)
    temp = aplicarEfectos(temp)

    if (temp.jefe.health <= 0) {
        manaMin = Math.min(manaMin, temp.prota.manaGastado)
        //console.log('PARTIDA GANADA', manaMin)
        return
    }
    temp.prota.health = temp.prota.health - Math.max(temp.jefe.dmg - temp.prota.def, 1)
    if (temp.prota.health <= 0) {
        //console.log('PARTIDA PERDIDA', temp)
        return
    }
    return temp
    //continuarPartidaChar({ prota: temp.prota, jefe: temp.jefe, activos: temp.activos })
}

//Devuelve true si la partida continua
function checkWinOrLoseChar(partida) {
    //console.log(partida)
    //Check if win or loss
    if (partida.jefe.health <= 0) {
        manaMin = Math.min(manaMin, partida.prota.manaGastado)
        //console.log('PARTIDA GANADA', manaMin)
        return false
    } else if (partida.prota.manaGastado > manaMin) {
        //console.log('Partida abandonada, maná gastado > maná min')
        return false
    } else if (partida.prota.health <= 0) {
        //console.log('Partida perdida por vida <0', partida)
        return false
    } else {
        return true
    }
}


console.log('Resultado: ', manaMin)
console.assert(manaMin === 226, 'Error con el test, objetivo 226')



function aplicarEfectos(partida) {

    partida.prota.def = 0
    //Aplicamos los efectos
    partida.activos.forEach((efecto) => {
        switch (efecto.nombre) {
            case 'Shield':
                partida.prota.def = 7
                efecto.duration--
                break
            case 'Poison':
                partida.jefe.health -= 3
                efecto.duration--
                break
            case 'Recharge':
                partida.prota.mana += 101
                efecto.duration--
                break
            default:
                throw new Error
                break
        }
    })

    //Quitar los efectos que no tengan duracion
    //console.log('EFECTOS ACTIVOS PRE ', partida.activos.length)
    partida.activos = partida.activos.filter((efecto) => efecto.duration > 0)
    //console.log('EFECTOS ACTIVOS POST ', partida.activos.length)
    return partida
}


function castMissile(partida) {
    if (partida.prota.mana < spells.Missile.cost) {
        //console.log('Mana insuficiente para Missile')
        return undefined
    }
    partida.prota.mana -= spells.Missile.cost
    partida.jefe.health -= spells.Missile.dmg
    partida.prota.manaGastado += spells.Missile.cost
    //console.log('Cast Missile')
    return partida
}

function castDrain(partida) {
    if (partida.prota.mana < spells.Drain.cost) {
        //console.log('Mana insuficiente para Drain')
        return undefined
    }
    partida.prota.mana -= spells.Drain.cost
    partida.prota.health += spells.Drain.heal
    partida.jefe.health -= spells.Drain.dmg
    partida.prota.manaGastado += spells.Drain.cost
    //console.log('Cast Drain')
    return partida
}
function castShield(partida) {
    if (partida.prota.mana < spells.Shield.cost) {
        //console.log('Mana insuficiente para Shield')
        return undefined
    }
    if (partida.activos.filter((efecto) => {
        if (efecto.nombre.localeCompare('Shield') === 0) {
            return true
        } else {
            return false
        }
    }).length > 0) {
        //console.error('Partida no válida, dos efectos iguales')
        return undefined
    }
    partida.activos.push(copiarEfecto(spells.Shield))
    partida.prota.mana -= spells.Shield.cost
    partida.prota.manaGastado += spells.Shield.cost
    //console.log('Cast Shield')
    return partida
}

function castRecharge(partida) {
    if (partida.prota.mana < spells.Recharge.cost) {
        //console.log('Mana insuficiente para Recharge')
        return undefined
    }
    if (partida.activos.filter((efecto) => {
        if (efecto.nombre.localeCompare('Recharge') === 0) {
            return true
        } else {
            return false
        }
    }).length > 0) {
        //console.error('Partida no válida, dos efectos iguales')
        return undefined
    }
    partida.activos.push(copiarEfecto(spells.Recharge))
    partida.prota.mana -= spells.Recharge.cost
    partida.prota.manaGastado += spells.Recharge.cost
    //console.log('Cast Recharge')
    return partida
}
function castPoison(partida) {
    if (partida.prota.mana < spells.Poison.cost) {
        //console.log('Mana insuficiente para Poison')
        return undefined
    }
    if (partida.activos.filter((efecto) => {
        if (efecto.nombre.localeCompare('Poison') === 0) {
            return true
        } else {
            return false
        }
    }).length > 0) {
        //console.error('Partida no válida, dos efectos iguales')
        return undefined
    }
    partida.activos.push(copiarEfecto(spells.Poison))
    partida.prota.mana -= spells.Poison.cost
    partida.prota.manaGastado += spells.Poison.cost
    //console.log('Cast Poison')
    return partida
}

function copiarPartida(partida) {
    if (partida === undefined || partida === null) {
        throw new Error
    }
    let temp = {
        prota: {
            health: 0 + partida.prota.health,
            dmg: 0 + partida.prota.dmg,
            def: 0 + partida.prota.def,
            mana: 0 + partida.prota.mana,
            manaGastado: 0 + partida.prota.manaGastado
        },
        jefe: {
            health: 0 + partida.jefe.health,
            dmg: 0 + partida.jefe.dmg
        },
        activos: []
    }

    partida.activos.forEach((activo) => {
        temp.activos.push(copiarEfecto(activo))
    })
    return temp
}

function copiarEfecto(efecto) {
    if (efecto === undefined || efecto === null) { throw new Error }
    let temp = {
        nombre: '' + efecto.nombre,
        cost: 0 + efecto.cost,
        duration: 0 + efecto.duration,
        dmg: 0 + efecto.dmg,
        armor: 0 + efecto.armor,
        heal: 0 + efecto.heal,
        mana: 0 + efecto.mana //Al comienzo de cada turno
    }
    return temp
}