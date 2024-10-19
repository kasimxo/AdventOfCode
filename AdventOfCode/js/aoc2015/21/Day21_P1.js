/* 
Weapons:    Cost  Damage  Armor
Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0
*/
var gearDmg = {
    4: 8,
    5: 10,
    6: 25,
    7: 40,
    8: 74
}

/*
Rings:      Cost  Damage  Armor
Damage +1    25     1       0
Damage +2    50     2       0
Damage +3   100     3       0
*/
var ringDmg = {
    1: 25,
    2: 50,
    3: 100
}



/*
Armor:      Cost  Damage  Armor
Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5
*/
var gearDef = {
    1: 13,
    2: 31,
    3: 53,
    4: 75,
    5: 102
}

/*
Rings:      Cost  Damage  Armor
Defense +1   20     0       1
Defense +2   40     0       2
Defense +3   80     0       3
*/

var ringDef = {
    1: 20,
    2: 40,
    3: 80
}

var jefe = {
    health: 103,
    dmg: 9,
    armor: 2
}

var char = {
    health: 100,
    dmg: 10,
    armor: 2,
    gold: 0 //Oro gastado en el equipamiento del jugador
}


const resultados = {
    WIN: true,
    LOSS: false
}
var ultimaPartida = resultados.WIN
var contador = 0
while (ultimaPartida === resultados.WIN) {

    resetStats()

    contador++
    console.log('Partida: ', contador)
    char.dmg--


    while (char.health > 0 && jefe.health > 0) {
        //console.log('Jugador: ', char, '\nJefe: ', jefe)

        //Turno jugador
        calcularTurno(char, jefe)

        //Turno jefe
        calcularTurno(jefe, char)
    }
    ultimaPartida = jefe.health > 0 ? resultados.LOSS : resultados.WIN
    console.log('Resultado:', jefe.health > 0 ? 'LOSS' : 'WIN', '\nOro jugador: ', calcularOroJugador())
}
//console.log(jefe.health > 0 ? 'LOSS' : 'WIN')

//calcularOroJugador()

function calcularOroJugador() {
    var oroAtaque = 0
    var ataque = char.dmg
    if (ataque <= 7) {
        oroAtaque += gearDmg[ataque]
    } else if (ataque <= 11) {
        oroAtaque += gearDmg[7] + (ataque - 7) * 25
    } else if (ataque === 12) {
        oroAtaque += gearDmg[8] + (ataque - 8) * 25
    } else if (ataque <= 14) {
        oroAtaque += gearDmg[8] + Math.round((ataque - 8) * 33.33)
    } else {
        console.error('Daño de jugador no válido')
    }

    var oroDefensa = 0
    var defensa = char.armor
    if (defensa <= 2) {
        oroDefensa += gearDef[defensa]
    } else if (defensa <= 6) {
        oroDefensa += gearDef[2] + (defensa - 2) * 20
    } else if (defensa <= 9) {
        oroDefensa += 4 * 20 + gearDef[defensa - 4]
    } else if (defensa <= 11) {
        oroDefensa += 4 * 20 + gearDef[defensa - 4] + 80
    } else {
        console.error('Defensa del personaje no válida')
    }

    var oro = oroAtaque + oroDefensa
    return oro
    //console.log('Oro de personaje', oro)
}

function calcularTurno(ataca, defiende) {
    var ataque = Math.max(ataca.dmg - defiende.armor, 1)
    defiende.health = defiende.health - ataque
}

function resetStats() {
    jefe = {
        health: 103,
        dmg: 9,
        armor: 2
    }

    char.health = 100
}

