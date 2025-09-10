const { readInput } = require('./../../input')

var texto = readInput()

//El listado de ciudades
var ciudades = []


//Primero hacemos un pase para identificar todas las ciudades distintas
//Con esto podemos después crear el graph
texto.split('\r\n').forEach((linea) => {
    var dividido = linea.split(' ')

    var origen = dividido[0]
    var destino = dividido[2]

    if (ciudades.find((element) => element.localeCompare(origen) === 0) === undefined) {
        ciudades.push(origen)
    } else if (ciudades.find((element) => element.localeCompare(destino) === 0) === undefined) {
        ciudades.push(destino)
    }
})
//console.log(ciudades)


//Como ya tenemos las ciudades calculadas, podemos generar el graph correcto
//Así funciona independientemente de la cantidad de ciudades en el input
var graph = []

for (let i = 0; i < ciudades.length; i++) {
    graph[i] = Array(ciudades.length).fill(0)
}

//Aquí populamos el gráfico con las distancias
texto.split('\r\n').forEach((linea) => {
    var dividido = linea.split(' ')

    var distancia = Number.parseInt(dividido[dividido.length - 1])
    var origen = dividido[0]
    var destino = dividido[2]

    var origenIndex = ciudades.findIndex((element) => element.localeCompare(origen) === 0)
    var destinoIndex = ciudades.findIndex((element) => element.localeCompare(destino) === 0)

    graph[origenIndex][destinoIndex] = distancia
    graph[destinoIndex][origenIndex] = distancia
})


//Initialize the variables
let shortestDistance = Infinity;
let shortestPath = [];

var v = Array(ciudades.length).fill(false)
var currPos = 0
var n = ciudades.length
var count = 0
var cost = 0
//Recursive function for the TSP
function TSP(graph, v, currPos, n, count, cost) {
    //If the last node is reached and it has a link to the starting node
    if (count == n && graph[currPos][0]) {
        //shortestDistance = Math.min(shortestDistance, cost + graph[currPos][0]);
        shortestDistance = Math.min(shortestDistance, cost);
        //console.log(shortestDistance)
        return;
    }
    //BACKTRACKING
    for (let i = 0; i < n; i++) {
        if (!v[i] && graph[currPos][i]) { //Check if this vertex can be visited
            v[i] = true;
            TSP(graph, v, i, n, count + 1, cost + graph[currPos][i]);
            v[i] = false; //Mark as unvisited for other recursive calls
        }
    }
}

TSP(graph, v, currPos, n, count + 1, cost)
console.log(shortestDistance)