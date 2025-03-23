const { readLines } = require('./input')

let text = [
    'x00: 1',
    'x01: 0',
    'x02: 1',
    'x03: 1',
    'x04: 0',
    'y00: 1',
    'y01: 1',
    'y02: 1',
    'y03: 1',
    'y04: 1',
    '',
    'ntg XOR fgs -> mjb',
    'y02 OR x01 -> tnw',
    'kwq OR kpj -> z05',
    'x00 OR x03 -> fst',
    'tgd XOR rvg -> z01',
    'vdt OR tnw -> bfw',
    'bfw AND frj -> z10',
    'ffh OR nrd -> bqk',
    'y00 AND y03 -> djm',
    'y03 OR y00 -> psh',
    'bqk OR frj -> z08',
    'tnw OR fst -> frj',
    'gnj AND tgd -> z11',
    'bfw XOR mjb -> z00',
    'x03 OR x00 -> vdt',
    'gnj AND wpb -> z02',
    'x04 AND y00 -> kjc',
    'djm OR pbm -> qhw',
    'nrd AND vdt -> hwm',
    'kjc AND fst -> rvg',
    'y04 OR y02 -> fgs',
    'y01 AND x02 -> pbm',
    'ntg OR kjc -> kwq',
    'psh XOR fgs -> tgd',
    'qhw XOR tgd -> z09',
    'pbm OR djm -> kpj',
    'x03 XOR y03 -> ffh',
    'x00 XOR y04 -> ntg',
    'bfw OR bqk -> z06',
    'nrd XOR fgs -> wpb',
    'frj XOR qhw -> z04',
    'bqk OR frj -> z07',
    'y03 OR x01 -> nrd',
    'hwm AND bqk -> z03',
    'tgd XOR rvg -> z12',
    'tnw OR pbm -> gnj'
]

text = [
    'x00: 0',
    'x01: 1',
    'x02: 0',
    'x03: 1',
    'x04: 0',
    'x05: 1',
    'y00: 0',
    'y01: 0',
    'y02: 1',
    'y03: 1',
    'y04: 0',
    'y05: 1',
    '',
    'x00 AND y00 -> z05',
    'x01 AND y01 -> z02',
    'x02 AND y02 -> z01',
    'x03 AND y03 -> z03',
    'x04 AND y04 -> z04',
    'x05 AND y05 -> z00'
]

text = readLines()

let setting = true
let values = {}

let operations = {}
let maximumBits = 0
text.forEach((line) => {
    if (line.length === 0) {
        setting = false
    } else {
        if (setting) {
            let split = line.split(':')
            values[split[0].trim()] = Number.parseInt(split[1])
        } else {
            let split = line.split('->')
            let to = split[0].split(' ')
            to.pop()
            if (split[1].trim()[0] === "z") {
                maximumBits++
            }
            operations[split[1].trim()] = to
        }
    }
})

//console.log(operations)

//resolveIteration()
let pairs = []
let forValidation = Object.entries(operations).filter((e) => e[0][0] === "z")
console.log(forValidation)
let expected = []
forValidation.forEach((el) => {
    if (el[1][1] !== "XOR") {
        //es inválido
        pairs.push(el[0])
        console.log("MAL", el)
    } else {
        expected.push(["XOR2", el[1][0], el[1][2]])
    }
})

/**
 * XOR1             XOR2
 *          AND2
 * AND1             OR
 * 
 */


while (true) {
    let newExpected = []
    expected.forEach((arr) => {
        if (arr[0] === "XOR2") {
            console.log(arr)
            console.log("check ", arr[1], operations[arr[1]])
            if (operations[arr[1]][1] === "XOR" && operations[arr[2]][1] === "OR") {
                newExpected.push(["XOR1", operations[arr[1]][0], operations[arr[1]][2]])
                newExpected.push(["OR", operations[arr[2]][0], operations[arr[2]][2]])
            } else if (operations[arr[2]][1] === "XOR" && operations[arr[1]][1] === "OR") {
                newExpected.push(["XOR1", operations[arr[2]][0], operations[arr[2]][2]])
                newExpected.push(["OR", operations[arr[1]][0], operations[arr[1]][2]])
            } else {
                if (operations[arr[1]][1] === "XOR" || operations[arr[1]][1] === "OR") {
                    pairs.push(arr[2])
                } else {
                    pairs.push(arr[1])
                }
            }
        }
    })
    expected = newExpected
    console.log("NEW: ", pairs)
}

console.log(expected)



function calculate(value, arr) {
    let result = 0
    switch (arr[1]) {
        case "AND":
            result = and(arr[0], arr[2])
            break
        case "XOR":
            result = xor(arr[0], arr[2])
            break
        case "OR":
            result = or(arr[0], arr[2])
            break
    }
    console.log("CALCULATED: ", value, " AS ", result)
    return result
}

function xor(wire1, wire2) {
    let num1 = values[wire1]
    let num2 = values[wire2]
    //console.log("WIRES ", wire1)
    if (num1 === undefined) {
        num1 = calculate(wire1, operations[wire1])
    }
    if (num2 === undefined) {
        num2 = calculate(wire2, operations[wire2])
    }

    return num1 ^ num2
}

function or(wire1, wire2) {
    let num1 = values[wire1]
    let num2 = values[wire2]
    //console.log("WIRES ", wire1)
    if (num1 === undefined) {
        num1 = calculate(wire1, operations[wire1])
    }
    if (num2 === undefined) {
        num2 = calculate(wire2, operations[wire2])
    }

    return num1 || num2
}

function and(wire1, wire2) {
    let num1 = values[wire1]
    let num2 = values[wire2]
    //console.log("WIRES ", wire1)
    if (num1 === undefined) {
        num1 = calculate(wire1, operations[wire1])
    }
    if (num2 === undefined) {
        num2 = calculate(wire2, operations[wire2])
    }

    return num1 && num2
}



function resolveIteration() {
    Object.entries(operations).forEach(([k, v]) => {
        if (k[0] === "z") {

            if (values[k] !== undefined) {
            } else {
                values[k] = calculate(k, v)
            }
        }
    })
    let valuesZ = []
    Object.entries(values).forEach(([k, v]) => {
        if (k[0] === "z") {
            valuesZ.push([Number.parseInt(k.substring(1)), v])
        }
    })

    valuesZ.sort((a, b) => b[0] - a[0])
    let solution = ""
    valuesZ.forEach((el) => {
        solution = solution + el[1]
    })
    console.log(Number.parseInt(solution, 2))
    return Number.parseInt(solution, 2)
}