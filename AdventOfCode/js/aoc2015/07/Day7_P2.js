const { readInput } = require('./input')
var texto = readInput()
/*
Nodos = {
    a: {
        'output': undefined,
        'operacion': undefined,
        'inputA': undefined,
        'inputB': undefined,
        'raw': undefined
    }
}
    */
Nodos = {}

texto.split('\r\n').forEach(linea => {
    var palabras = linea.split(' ')

    var output = palabras[palabras.length - 1]
    Nodos[output] = prepararNodo(linea)
})

var respuesta = calcularNodo(Nodos.a)
console.log('Solución 1:', respuesta)
Nodos.b.valor = respuesta
resetearNodos()
respuesta = calcularNodo(Nodos.a)
console.log('Solución 2:', respuesta)


function calcularNodo(Nodo) {
    //console.log(Nodo)
    if (Nodo.valor === -1) {
        switch (Nodo.operacion) {
            case 'NOT':
                Nodo.valor = NOT(Nodo.inputA)
                break
            case 'ASSIGN':
                Nodo.valor = ASSIGN(Nodo.inputA)
                break
            case 'OR':
                Nodo.valor = OR(Nodo.inputA, Nodo.inputB)
                break
            case 'AND':
                Nodo.valor = AND(Nodo.inputA, Nodo.inputB)
                break
            case 'LSHIFT':
                Nodo.valor = LSHIFT(Nodo.inputA, Nodo.inputB)
                break
            case 'RSHIFT':
                Nodo.valor = RSHIFT(Nodo.inputA, Nodo.inputB)
                break
            default:
                break
        }
    } else {
        return Nodo.valor
    }
    //console.log(Nodos)
    return Nodo.valor
}

function prepararNodo(linea) {
    var nodo = {}
    nodo.valor = -1
    nodo.operacion = examinarOperacion(linea)

    switch (nodo.operacion) {
        case 'NOT':
        case 'ASSIGN':
            nodo.inputA = examinarInputA(linea)
            break
        default:
            nodo.inputA = examinarInputA(linea)
            nodo.inputB = examinarInputB(linea)
            break
    }
    return nodo
}

/** Identifica el inputA del nodo */
function examinarInputA(linea) {
    var palabras = linea.split(' ')
    if (linea.includes('NOT')) {
        return palabras[1]
    } else if (palabras.length === 3) {
        return palabras[0]
    } else {
        return palabras[0]
    }
}
/** Identifica el inputB del nodo */
function examinarInputB(linea) {
    var palabras = linea.split(' ')
    return palabras[2]
}

/** Identifica la operación perteneciente al nodo */
function examinarOperacion(linea) {
    if (linea.includes('NOT')) {
        return 'NOT'
    } else if (linea.includes('AND')) {
        return 'AND'
    } else if (linea.includes('LSHIFT')) {
        return 'LSHIFT'
    } else if (linea.includes('RSHIFT')) {
        return 'RSHIFT'
    } else if (linea.includes('OR')) {
        return 'OR'
    } else if (linea.split(' ').length === 3) {
        return 'ASSIGN'
    } else {
        return undefined
    }
}

function NOT(inputA) {
    //console.log(inputA)
    var value = 65535 - parsearValor(inputA)
    if (value === -1) {
        console.log('ERROR NOT', inputA)
    }
    return value

}

function AND(inputA, inputB) {
    var value = parsearValor(inputA) & parsearValor(inputB)
    if (value === -1) {
        console.log('ERROR AND', inputA, inputB)
    }
    return value
}

function OR(inputA, inputB) {
    var value = parsearValor(inputA) | parsearValor(inputB)
    if (value === -1) {
        console.log('ERROR OR', inputA, inputB)
    }
    return value
}

function LSHIFT(inputA, inputB) {
    var value = parsearValor(inputA) << parsearValor(inputB)
    if (value === -1) {
        console.log('ERROR LSHIFT', inputA, inputB)
    }
    return value
}

function RSHIFT(inputA, inputB) {
    var value = parsearValor(inputA) >> parsearValor(inputB)
    if (value === -1) {
        console.log('ERROR RSHIFT', inputA, inputB)
    }
    return value
}

function ASSIGN(inputA) {
    var value = parsearValor(inputA)
    if (value === -1) {
        console.log('ERROR ASSIGN', inputA)
    }
    return value
}

function parsearValor(input) {
    var valor = Number.parseInt(input)
    if (Number.isNaN(valor)) {
        return calcularNodo(Nodos[input])
    } else {
        return valor
    }
}

function resetearNodos() {
    Object.keys(Nodos).forEach(key => {
        if (key.localeCompare('b') !== 0) {
            Nodos[key].valor = -1
        }
    })
}