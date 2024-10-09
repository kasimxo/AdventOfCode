const { readInput } = require('./input')

var texto = readInput()
texto = texto.split('\r\n')
/*
texto = [
    'Alice would gain 54 happiness units by sitting next to Bob.',
    'Alice would lose 79 happiness units by sitting next to Carol.',
    'Alice would lose 2 happiness units by sitting next to David.',
    'Bob would gain 83 happiness units by sitting next to Alice.',
    'Bob would lose 7 happiness units by sitting next to Carol.',
    'Bob would lose 63 happiness units by sitting next to David.',
    'Carol would lose 62 happiness units by sitting next to Alice.',
    'Carol would gain 60 happiness units by sitting next to Bob.',
    'Carol would gain 55 happiness units by sitting next to David.',
    'David would gain 46 happiness units by sitting next to Alice.',
    'David would lose 7 happiness units by sitting next to Bob.',
    'David would gain 41 happiness units by sitting next to Carol.'
]
*/


var invitados = []
var resultado = 0

texto.forEach(linea => {
    linea = linea.replace('.', '')
    var palabras = linea.split(' ')
    var origen = palabras[0]
    if (!invitados.includes(origen)) {
        invitados.push(origen)
    }
})

var graph = []
for (let i = 0; i < invitados.length; i++) {
    graph[i] = Array(invitados.length).fill(0)
}

texto.forEach(linea => {
    linea = linea.replace('.', '')

    var palabras = linea.split(' ')
    var bruto = Number.parseInt(palabras[3])
    if (palabras[2].localeCompare('lose') === 0) {
        bruto *= -1
    }
    var origen = palabras[0]
    var destino = palabras[palabras.length - 1]

    var origenIndex = invitados.findIndex((element) => element.localeCompare(origen) === 0)
    var destinoIndex = invitados.findIndex((element) => element.localeCompare(destino) === 0)

    graph[origenIndex][destinoIndex] += bruto
    graph[destinoIndex][origenIndex] += bruto

    console.log(origen, bruto, '->', destino)
});

mostargraph()

//------------------------------------------------------------
//Initialize the variables
let shortestDistance = 0;
let shortestPath = [];

var costes = []

var visitadas = Array(invitados.length).fill(false)
var currPos = 0
var n = invitados.length
var count = 0
var cost = 0
//Recursive function for the TSP
function TSP(graph, v, currPos, n, count, cost, visitadas, inicial) {
    //If the last node is reached and it has a link to the starting node
    if (count == n && graph[currPos][0]) {
        visitadas.forEach((visitada, index) => {
            visitadas.forEach((element, j) => {
                if (visitada.localeCompare(element) === 0 && index !== j) {
                    //console.log('Path no valido', visitadas)
                    cost = 0
                }
            })
        })
        //console.log(graph[currPos][0], invitados[currPos])
        shortestDistance = Math.max(shortestDistance, cost + graph[currPos][inicial]);
        return;
    }

    //BACKTRACKING
    for (let i = 0; i < n; i++) {
        if (!v[i] && graph[currPos][i]) { //Check if this vertex can be visited
            v[i] = true;

            var vCopy = Array(invitados.length).fill(false)

            v.forEach((ciudad, index) => {
                if (ciudad === true) {
                    vCopy[index] = true
                }
            })

            var newVisitadas = []
            visitadas.forEach((vis, index) => { newVisitadas[index] = vis + '' })
            newVisitadas.push(invitados[i])
            TSP(graph, vCopy, i, n, count + 1, cost + graph[currPos][i], newVisitadas, inicial);
            v[i] = false; //Mark as unvisited for other recursive calls
        }
    }
    return
}
var orden = []
for (let currPos = 0; currPos < n; currPos++) {
    orden[0] = invitados[currPos]
    visitadas[currPos] = false
    TSP(graph, visitadas, currPos, n, count + 1, cost, orden, currPos)
    costes.push(shortestDistance)
    shortestDistance = 0
}





//-------------------------------
console.log(costes.sort((a, b) => a - b)[costes.length - 1])
//Mayor que 461


function mostargraph() {
    var invitadosRaw = ''
    for (let i = 0; i < invitados.length; i++) {
        invitadosRaw += invitados[i] + ' '
    }
    console.log(invitadosRaw)
    for (let y = 0; y < graph.length; y++) {
        var linea = ''
        for (let x = 0; x < graph[y].length; x++) {
            linea += graph[y][x] + ' '
        }
        console.log(linea + invitados[y])
    }
}