const { readLines } = require('../../input')

const PAIRS = 1000

let input = readLines().map(line => line.split(',').map(Number))

let circuits = {}

let distances = []

for (let i = 0; i < input.length; i++) {
    circuits[`${input[i].join(',')}`] = null
    for (let j = i + 1; j < input.length; j++) {
        let distance = calculateDistance(input[i], input[j])
        distances.push([input[i], input[j], distance])
    }
}
distances = distances.sort((a, b) => a[2] - b[2])

let globalCircuitId = 1
let lastNodes = [] // We will store the last two nodes here
let index = 0
// We keep mergin circuits util there are no spare nodes
// Every iteration means we have merged one pair
// At the end of every iteration we check if there are missing nodes
let merging = true
while (merging) {
    merging = false

    let closestPair = distances[index]
    let currCircuitId = globalCircuitId
    let node1 = closestPair[0]
    let currNode1Id = circuits[node1.join(',')]
    let node2 = closestPair[1]
    let currNode2Id = circuits[node2.join(',')]

    if (currNode1Id != null) {
        currCircuitId = currNode1Id
    } else if (currNode2Id != null) {
        currCircuitId = currNode2Id
    }

    Object.keys(circuits).forEach(key => {
        if (key == node1.join(',') || key == node2.join(',')) {
            circuits[key] = currCircuitId
        } else if (circuits[key] != null && (circuits[key] == currNode1Id || circuits[key] == currNode2Id)) {
            circuits[key] = currCircuitId
        }
    })
    globalCircuitId++

    if (Object.values(circuits).some(value => value == null)) {
        merging = true
    }

    // If we have finished mergin, we save the last two nodes
    if(!merging){
        lastNodes.push(node1, node2)
    }
    index++
}

/**
 * We don't care about circuit size anymore,
 * we multiply the x coordinate of the last two nodes
 */
console.log(lastNodes[0][0]*lastNodes[1][0])

function calculateDistance(origen, destiny) {
    let distance = (origen[0] - destiny[0]) ** 2 + (origen[1] - destiny[1]) ** 2 + (origen[2] - destiny[2]) ** 2
    return distance
}