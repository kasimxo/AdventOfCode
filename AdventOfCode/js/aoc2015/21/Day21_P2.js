
var weapons = [
    { nombre: 'Dagger', cost: 8, dmg: 4 },
    { nombre: 'Shortsword', cost: 10, dmg: 5 },
    { nombre: 'Warhammer', cost: 25, dmg: 6 },
    { nombre: 'Longsword', cost: 40, dmg: 7 },
    { nombre: 'Greataxe', cost: 74, dmg: 8 },
]

var armors = [
    { nombre: 'Leather', cost: 13, def: 1 },
    { nombre: 'Chainmail', cost: 31, def: 2 },
    { nombre: 'Splintmail', cost: 53, def: 3 },
    { nombre: 'Bandedmail', cost: 75, def: 4 },
    { nombre: 'Platemail', cost: 102, def: 5 }
]

var rings = [
    { nombre: 'damage1', cost: 25, dmg: 1 },
    { nombre: 'damage2', cost: 50, dmg: 2 },
    { nombre: 'damage3', cost: 100, dmg: 3 },
    { nombre: 'def1', cost: 20, def: 1 },
    { nombre: 'def2', cost: 40, def: 2 },
    { nombre: 'def3', cost: 80, def: 3 }
]

var boss = {
    health: 103,
    dmg: 9,
    def: 2
}

var char = {
    health: 100,
    dmg: 0,
    def: 0,
    gold: 0,
    weapon: undefined,
    armor: undefined,
    ring1: undefined,
    ring2: undefined
}

const resultados = {
    WIN: true,
    LOSS: false
}

var oroMaximo = 0

//Nos aseguramos de cubrir el caso en el que no tienes arma o armadura o anillos
for (let i = 0; i < weapons.length; i++) {

    char.weapon = weapons[i]

    for (let j = 0; j <= armors.length; j++) {
        if (j > 0) {
            char.armor = armors[j - 1]
        } else if (j === 0) {
            char.armor = undefined
        }

        //Anillo 1
        for (let x = 0; x <= rings.length; x++) {
            if (x > 0) {
                char.ring1 = rings[x - 1]
            } else if (x === 0) {
                char.ring1 = undefined
            }
            //Anillo 2
            for (let z = 0; z <= rings.length; z++) {
                if (z === 0 || z === x) {
                    char.ring2 = undefined
                } else if (z > 0) {
                    char.ring2 = rings[z - 1]
                }

                resetStats()

                if (char.weapon !== undefined) {
                    char.dmg += char.weapon.dmg
                    char.gold += char.weapon.cost
                }

                if (char.armor !== undefined) {
                    char.def += char.armor.def
                    char.gold += char.armor.cost
                }

                if (char.ring1 !== undefined) {
                    char.gold += char.ring1.cost
                    if (char.ring1.dmg !== undefined) {
                        char.dmg += char.ring1.dmg
                    } else {
                        char.def += char.ring1.def
                    }
                }

                if (char.ring2 !== undefined) {
                    char.gold += char.ring2.cost
                    if (char.ring2.dmg !== undefined) {
                        char.dmg += char.ring2.dmg
                    } else {
                        char.def += char.ring2.def
                    }
                }

                while (char.health > 0 && boss.health > 0) {

                    //Turno jugador
                    calcularTurno(char, boss)

                    //Turno jefe
                    calcularTurno(boss, char)
                }
                var resultado = boss.health > 0 ? resultados.LOSS : resultados.WIN

                if (resultado === resultados.LOSS) {
                    //Aqui es donde tenemos que calcular el oro
                    oroMaximo = Math.max(char.gold, oroMaximo)
                }
            }
        }
    }
}

console.log(oroMaximo)

function resetStats() {
    boss.health = 103
    char.health = 100
    char.dmg = 0
    char.gold = 0
    char.def = 0
}

function calcularTurno(ataca, defiende) {
    var ataque = Math.max(ataca.dmg - defiende.def, 1)
    defiende.health = defiende.health - ataque
}