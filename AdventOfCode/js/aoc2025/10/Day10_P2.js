const { readLines } = require('../../input')
const { init } = require('z3-solver')

let globalZ3

async function initZ3(){
    if(!globalZ3){
        const { Context, em } = await init();
        globalZ3 = new Context('main');
    }
    return globalZ3
}

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
})
calculate()
async function calculate() {
    let sol = 0
    for(let i = 0; i<machines.length; i++){
        let test = await processMachine(machines[i])
        sol+=Number.parseInt(test)
        console.log(sol, i)
    }
    console.log("SOLUCION:", sol)
}

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
        combinations.push(combinationArray)
    })
    return combinations
}


async function processMachine(machine) {
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

    let combinations = machine.combinations
    let target = machine.joltage

    let Z3 = await initZ3()
    const solver = new Z3.Optimize();

    let variables = [] // a, b, c, d, e, f

    combinations.forEach((combination, index) => {
        let variable = Z3.Int.const(`x_${index}`)
        variables.push(variable)
        solver.add(variable.ge(0))
    })

    for(let i = 0; i<target.length; i++){
        let expr = Z3.Int.val(0)
        let t = target[i]
        for(let j = 0; j<variables.length; j++){
            if(combinations[j][i] !== 0){
                expr = expr.add(variables[j].mul(combinations[j][i]))
            }
        }
        solver.add(expr.eq(t))
    }
    
    const presses = Z3.Sum(...variables);
    solver.minimize(presses);
    const result = await solver.check();

    if (result !== "sat") {
        console.log("No hay solución");
        return;
    }

    const model = solver.model();
    let minSum = model.eval(presses).toString()
    return minSum
}
