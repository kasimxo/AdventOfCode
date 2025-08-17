const input = 277678

let test = [
    {
        input: 1,
        sol: 0
    },
    {
        input: 2,
        sol: 1
    },
    {
        input: 3,
        sol: 2
    },
    {
        input: 12,
        sol: 3
    },
    {
        input: 23,
        sol: 2
    },
    {
        input: 1024,
        sol: 31
    }
]

/**
 * 
let accumulated = 1
for(let i = 0; i<10; i++){
    console.log("ANILLO: ", i)
    let elements = i * 2 * 4
    console.log("ELEMENTOS: ", elements)
    accumulated += elements
    console.log("ACUMULADO: ", accumulated)
}
return
*/

function CalculateRing(input){
    let result = 0
    /*
    En cada anillo n hay n * 2 * 4 elementos, quitando para el anillo uno
    */
    let level = 0
    let accumulated = 1
    let elements = 1
    while (accumulated < input){
        elements = level * 8
        accumulated += elements
        level++
    }

    return {level: Math.max(level - 1, 0), elements: elements, starting: accumulated - elements, end: accumulated}
}

function CalculateDistance(input, level){
    let segment = level.elements / 4
    //console.log(segment)
    let middle = level.starting + (segment/2)
    let middlePoints = []
    for(let i = 0; i<4; i++){
        middlePoints.push(middle)
        //console.log("MIDDLE POINT: ", middle)
        middle += segment
    }
    //console.log(middlePoints)

    let shortest = Infinity
    middlePoints.forEach(p => {
        let distance = Math.abs(p - input)
        shortest = Math.min(distance, shortest)
    })
    //console.log("SHORTEST: ", shortest)
    return shortest
}

test.forEach(o => {
    let ring = CalculateRing(o.input)
    let dist = CalculateDistance(o.input, ring)
    let solution = ring.level + dist
    if(solution !== o.sol) console.error("TEST FAILED: ", o.input, solution)
    else console.log("CORRECT: ", o.input, solution)
})



let ring = CalculateRing(input)
let dist = CalculateDistance(input, ring)
let solution = ring.level + dist
console.log("SOLUTION: ", solution)