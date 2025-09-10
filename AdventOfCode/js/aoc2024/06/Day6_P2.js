const { readLines } = require('./../../input')

let text = [
    '....#.....',
    '.........#',
    '..........',
    '..#.......',
    '.......#..',
    '..........',
    '.#..^.....',
    '........#.',
    '#.........',
    '......#...'
]
text = readLines()
//4373 too low
//1881 too high
//1724
// 1705 <- goal
let guard = {
    x: -1,
    y: -1,
    speedX: 0,
    speedY: -1
}
let initial = {
    x: -1,
    y: -1
}
let obstacles = []
let visited = []

//Encontrar al guardia -> starting position
//Guardar todos los obstaculos
for (let y = 0; y < text.length; y++) {
    for (let x = 0; x < text[y].length; x++) {
        if (text[y][x] === '.') {

        } else if (text[y][x] === '#') {
            obstacles.push({
                x: x,
                y: y
            })
        } else if (text[y][x] === '^') {
            guard.x = x
            guard.y = y
            initial.x = x
            initial.y = y
        }
    }
}


let possibleLoops = 0


//Comenzar a iterar hasta que salga
//bucle
/*
while (guard.x >= 0 && guard.y >= 0 && guard.x < text[0].length && guard.y < text.length) {


    //Ponemos un obstaculo justo delante del guardia y comprobamos si hace loop
    let newObstacles = [...obstacles,
    {
        x: guard.x + guard.speedX + 0,
        y: guard.y + guard.speedY + 0
    }]

    if (newObstacles[newObstacles.length - 1].x < 0 ||
        newObstacles[newObstacles.length - 1].y < 0 ||
        newObstacles[newObstacles.length - 1].x >= text[0].length ||
        newObstacles[newObstacles.length - 1].y >= text.length
    ) {
        //throw new Error
    } else if (newObstacles[newObstacles.length - 1].x === initial.x &&
        newObstacles[newObstacles.length - 1].y === initial.y
    ) {
        //throw new Error
    } else if (obstacles.some((obs) => obs.x === newObstacles[newObstacles.length - 1].x && obs.y === newObstacles[newObstacles.length - 1].y)) {
        //throw new Error
    } else {
        if (checkIfLoops(newObstacles, {
            x: guard.x + 0,
            y: guard.y + 0,
            speedX: guard.speedX + 0,
            speedY: guard.speedY + 0
        })) {
            possibleLoops++
        }
    }

    //Checker si ha chocado -> modificamos la velocidad
    if (obstacles.some((obs) => obs.x === guard.x + guard.speedX && obs.y === guard.y + guard.speedY)) {
        //girar al guardia
        if (guard.speedX === 0 && guard.speedY === -1) {
            //giro de arriba a derecha
            guard.speedX = 1
            guard.speedY = 0
        } else if (guard.speedX === 1 && guard.speedY === 0) {
            //giro de derecha a abajo
            guard.speedX = 0
            guard.speedY = 1
        } else if (guard.speedX === 0 && guard.speedY === 1) {
            //Giro de abajo a izq
            guard.speedX = -1
            guard.speedY = 0
        } else if (guard.speedX === -1 && guard.speedY === 0) {
            guard.speedX = 0
            guard.speedY = -1
        }
    }


    //avanzar guardia
    guard.x += guard.speedX
    guard.y += guard.speedY

    //Checkear si ya hemos visitado esa posición -> guardarla
    if (!visited.some((v) => v.x === guard.x && v.y === guard.y)) {
        visited.push({
            x: guard.x + 0,
            y: guard.y + 0
        })
    }

}
    */

for (let y = 0; y < text.length; y++) {
    for (let x = 0; x < text[0].length; x++) {
        if (text[y][x] !== '#' && text[y][x] !== '^') {
            let newObstacles = [...obstacles,
            {
                x: x,
                y: y
            }]
            if (checkIfLoops(newObstacles, {
                x: guard.x + 0,
                y: guard.y + 0,
                speedX: guard.speedX + 0,
                speedY: guard.speedY + 0
            })) {
                possibleLoops++
            }
        }
    }
    console.log(y, text.length)
}

console.log(possibleLoops)

function checkIfLoops(obsCopy, guardCopy) {
    let loop = false
    let calculating = true
    let visitedCopy = []
    while (calculating) {
        if (visitedCopy.some((pos) => pos.x === guardCopy.x && pos.y === guardCopy.y && pos.speedX === guardCopy.speedX && pos.speedY === guardCopy.speedY)) {
            loop = true
            calculating = false
        } else {
            visitedCopy.push({
                x: guardCopy.x + 0,
                y: guardCopy.y + 0,
                speedX: guardCopy.speedX + 0,
                speedY: guardCopy.speedY + 0
            })
        }
        if (obsCopy.some((obs) => obs.x === guardCopy.x + guardCopy.speedX && obs.y === guardCopy.y + guardCopy.speedY)) {
            //girar al guardia
            if (guardCopy.speedX === 0 && guardCopy.speedY === -1) {
                //giro de arriba a derecha
                guardCopy.speedX = 1
                guardCopy.speedY = 0
            } else if (guardCopy.speedX === 1 && guardCopy.speedY === 0) {
                //giro de derecha a abajo
                guardCopy.speedX = 0
                guardCopy.speedY = 1
            } else if (guardCopy.speedX === 0 && guardCopy.speedY === 1) {
                //Giro de abajo a izq
                guardCopy.speedX = -1
                guardCopy.speedY = 0
            } else if (guardCopy.speedX === -1 && guardCopy.speedY === 0) {
                guardCopy.speedX = 0
                guardCopy.speedY = -1
            }
        }


        //avanzar guardia
        guardCopy.x += guardCopy.speedX
        guardCopy.y += guardCopy.speedY

        if (guardCopy.x < 0
            || guardCopy.y < 0
            || guardCopy.x >= text[0].length
            || guardCopy.y >= text.length) {
            calculating = false
        }
    }
    return loop
}
