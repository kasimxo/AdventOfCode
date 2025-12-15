const { readLines } = require('../../input')
const { init } = require('z3-solver')


let input = readLines()



let machines = []
input.forEach(line => {
    let lights = getLights(line)
    let joltage = getJoltage(line)
    let combinations = getCombinations(line)
    machines.push({
        lights: lights,
        joltage: joltage,
        combinations: combinations
    })
    // este input necesita un mayor procesamiento
})
let sol = 0
machines.forEach(async (machine, index) => {
    console.log("MACHINE N:", index)
    sol += await processMachine(machine)
})

console.log("SOLUTION: ", sol)

function getLights(line) {
    let splitted = line.split(' ')
    return Number.parseInt(splitted[0].substring(1, splitted[0].length - 1).replaceAll(".", '0').replaceAll("#", "1"), 2)
}

function getJoltage(line) {
    let splitted = line.split(' ')
    return splitted[splitted.length - 1].substring(1, splitted[splitted.length - 1].length - 1).split(',').map(Number)
}

function getCombinations(line) {
    let splitted = line.split(' ')
    let length = splitted[0].length - 2
    let combinationsRaw = splitted.slice(1, splitted.length - 1).map(combination => combination.substring(1, combination.length - 1).split(',').map(Number))
    let combinations = []
    combinationsRaw.forEach(combination => {
        let combinationArray = []
        for (let i = 0; i < length; i++) {
            if (combination.some(index => index == i)) {
                combinationArray.push(1)
            } else {
                combinationArray.push(0)
            }
        }
        //console.log(splitted[0], combination, combinationArray)
        combinations.push(combinationArray)
    })
    combinations.sort((a, b) => b.reduce((acc, curr) => acc += curr) - a.reduce((acc, curr) => acc += curr))
    return combinations
}



async function processMachine(machine) {
    let combinations = machine.combinations
    let target = machine.joltage
    console.log(combinations)
    console.log(target)

    const { Context, em } = await init();
    const Z3 = new Context('main');

/**
(3) (1,3)   (2)     (2,3)   (0,2)   (0,1)   {3,5,4,7}
a   b       c       d       e       f
e + f = 3
b + f = 5
c + d + e = 4
a + b + d = 7
Queremos minimizar la suma de a + b + c + d + e + f
Todos ellos tienen que ser positivos
*/

/**
Teniendo en cuenta:
----        COMBINATIONS             ----    -TARGET-
(3) (1,3)   (2)     (2,3)   (0,2)   (0,1)   {3,5,4,7}
a   b       c       d       e       f       t
Cada letra identifica al grupo

Por ejemplo, la letra 'a' identifica (3)
Dado que (3) quiere decir que suma uno a t[3],
podemos generalizarlo como:
(3) => (0, 0, 0, 1) 
para que todos los miembros tengan todos los sumandos

Podemos transformarlo en el siguiente sistema de ecuaciones

    0   1   2   3 <- Posición
a   0   0   0   1
b   0   1   0   1
c   0   0   1   0
d   0   0   1   1
e   1   0   1   0
f   1   1   0   0

Target: 
    0   1   2   3
t   3   5   4   7

Por tanto, podemos generalizar:
a0 + b0 + c0 + d0 + e0 + f0 = t0
Es decir, a * a0 + ... + f * f0 = t0

0a + 0b + 0c + 0d + 1e + 1f = 3 <- t0
0a + 1b + 0c + 0d + 0e + 1f = 5 <- t1
0a + 0b + 1c + 1d + 1e + 0f = 4 <- t2
1a + 1b + 0c + 1d + 0e + 0f = 7 <- t3
Queremos minimizar la suma de a + b + c + d + e + f
Y todos ellos tienen que ser positivos
*/
    const solver = new Z3.Optimize();

    // Variables (a..f)
    const a = Z3.Int.const("a");
    const b = Z3.Int.const("b");
    const c = Z3.Int.const("c");
    const d = Z3.Int.const("d");
    const e = Z3.Int.const("e");
    const f = Z3.Int.const("f");

    const vars = [a, b, c, d, e, f];

    // Restricción: todas no negativas
    vars.forEach(v => solver.add(v.ge(0)));

    // Sistema de ecuaciones (tu matriz)
    solver.add(e.add(f).eq(3));           // t0
    solver.add(b.add(f).eq(5));           // t1
    solver.add(c.add(d).add(e).eq(4));    // t2
    solver.add(a.add(b).add(d).eq(7));    // t3

    // Función objetivo: minimizar suma
    const presses = Z3.Sum(a, b, c, d, e, f);
    solver.minimize(presses);

    // Resolver
    const result = await solver.check();

    if (result !== "sat") {
        console.log("No hay solución");
        return;
    }

    // Leer el modelo
    const model = solver.model();

    console.log("Solución óptima:");
    console.log("a =", model.eval(a).toString());
    console.log("b =", model.eval(b).toString());
    console.log("c =", model.eval(c).toString());
    console.log("d =", model.eval(d).toString());
    console.log("e =", model.eval(e).toString());
    console.log("f =", model.eval(f).toString());
    console.log("Suma mínima =", model.eval(presses).toString());
    
    return 0
}
