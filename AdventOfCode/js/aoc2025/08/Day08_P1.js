const { readLines } = require('../../input')

const PAIRS = 1000

let input = readLines().map(line => line.split(',').map(Number))

/**
 * Maybe I should use an object like this:
 *      nodeId:         circuitId
 *      'xxx,yyy,zzz':  'Number'
 * This way, I could simplify groupId modifications
 */
let circuits = {}

/**
 * Maybe I should just calculate distances between every node (?)
 * Sorted list by distance:
 *      nodeId1,            nodeId2            distance
 *      'xxx1,yyy1,zzz1'    'xxx2,yyy2,zzz2'    'Number'
 * 
 */
let distances = []

for (let i = 0; i < input.length; i++) {
    console.log(i)
    circuits[`${input[i].join(',')}`] = null
    for (let j = i + 1; j < input.length; j++) {
        let distance = calculateDistance(input[i], input[j])
        distances.push([input[i], input[j], distance])
    }
}
// Sort list
distances = distances.sort((a, b) => a[2] - b[2])

let globalCircuitId = 1 // Similar to an index generator in sql database

/**
 * Now we merge circuits
 */
for (let i = 0; i < PAIRS; i++) {
    let closestPair = distances[i]
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
        /**
         * If the node (key) is already associated to either circuitId 1 or 2
         * we will set it to currCircuitId
         */
        if (key == node1.join(',') || key == node2.join(',')) {
            circuits[key] = currCircuitId
        } else if (circuits[key] != null && (circuits[key] == currNode1Id || circuits[key] == currNode2Id)) {
            circuits[key] = currCircuitId
        }
    })
    globalCircuitId++
}

/**
 * At this point, we need to calculate cicuit size
 * and multiply the three biggest
 * 
 * We will use an object again
 * circuitId:   Size
 * 'Number':    'Number'
 */
let sizes = {}
// Calculate circuit size
Object.entries(circuits).forEach(([nodeId, circuitId])=>{
    if(circuitId == null) return
    if(sizes[circuitId] != undefined){
        sizes[circuitId]++
    } else {
        sizes[circuitId] = 1
    }
})

// Multiply the three biggest circuit sizes
let sortedSizes = Object.values(sizes).sort((a,b)=>b-a)
console.log(sortedSizes[0]*sortedSizes[1]*sortedSizes[2])

/**
 * Calculates the distance between two nodes with pythagorean theorem
 * Since we don't need the real distance, just a way of comparing, 
 * we can ignore square root and compare by squared distance
 * @param {array} origen 
 * @param {array} destiny 
 */
function calculateDistance(origen, destiny) {
    let distance = (origen[0] - destiny[0]) ** 2 + (origen[1] - destiny[1]) ** 2 + (origen[2] - destiny[2]) ** 2
    return distance
}
