const { readLines } = require('./../../input')

let text = [
    'p=0,4 v=3,-3',
    'p=6,3 v=-1,-3',
    'p=10,3 v=-1,2',
    'p=2,0 v=2,-1',
    'p=0,0 v=1,3',
    'p=3,0 v=-2,-2',
    'p=7,6 v=-1,-3',
    'p=3,0 v=-1,-2',
    'p=9,3 v=2,3',
    'p=7,3 v=-1,2',
    'p=2,4 v=2,-3',
    'p=9,5 v=-3,-3'
]
text = readLines()
const MAX_WIDTH = 101
const MAX_HEIGTH = 103

// Robots position array
let robots = []

text.forEach((line) => {
    let split = line.split(' ')
    let posX = Number.parseInt(split[0].split('=')[1].split(',')[0])
    let posY = Number.parseInt(split[0].split('=')[1].split(',')[1])
    let vX = Number.parseInt(split[1].split('=')[1].split(',')[0])
    let vY = Number.parseInt(split[1].split('=')[1].split(',')[1])

    robots.push({
        x: posX,
        y: posY,
        vX: vX,
        vY: vY
    })
})
/*
console.log(robots)
*/

printTable(robots)
for (let i = 0; i < 100; i++) {
    robots = nextPosition(robots)
}
printTable(robots)

let result = calculateQuadrants(robots)
console.log("Solución: ", result)


function calculateQuadrants(robotsPosition) {
    let Q1 = 0
    let Q2 = 0
    let Q3 = 0
    let Q4 = 0
    robotsPosition.forEach((rob) => {
        if (rob.x < (Math.floor(MAX_WIDTH / 2)) && rob.y < (Math.floor(MAX_HEIGTH / 2))) {
            Q1++
        } else if (rob.x > (Math.floor(MAX_WIDTH / 2)) && rob.y < (Math.floor(MAX_HEIGTH / 2))) {
            Q2++
        } else if (rob.x < (Math.floor(MAX_WIDTH / 2)) && rob.y > (Math.floor(MAX_HEIGTH / 2))) {
            Q3++
        } else if (rob.x > (Math.floor(MAX_WIDTH / 2)) && rob.y > (Math.floor(MAX_HEIGTH / 2))) {
            Q4++
        }
    })
    //console.log(Q1, Q2, Q3, Q4)
    return Q1 * Q2 * Q3 * Q4
}


function nextPosition(robotsPosition) {
    for (let i = 0; i < robotsPosition.length; i++) {
        let rob = robotsPosition[i]
        rob.x += rob.vX
        rob.y += rob.vY
        if (rob.x < 0) {
            rob.x += MAX_WIDTH
        } else if (rob.x >= MAX_WIDTH) {
            rob.x -= MAX_WIDTH
        }

        if (rob.y < 0) {
            rob.y += MAX_HEIGTH
        } else if (rob.y >= MAX_HEIGTH) {
            rob.y -= MAX_HEIGTH
        }
    }
    return robotsPosition
}

function printTable(robotsPosition) {
    console.log("GAME STATE")
    for (let y = 0; y < MAX_HEIGTH; y++) {
        let line = ''
        for (let x = 0; x < MAX_WIDTH; x++) {
            let numRobots = 0
            robotsPosition.forEach((rob) => {
                if (rob.x === x && rob.y === y) {
                    numRobots++
                }
            })
            if (numRobots === 0) {
                line += '.'
            } else {
                line += numRobots
            }
        }
        console.log(line)
    }

}