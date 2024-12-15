const { readLines } = require('./input')

let text = readLines()

let robot = {
    x: 0,
    y: 0
}
let boxes = []
let walls = []
let moves = ''

text.forEach((line, y) => {
    if (line.indexOf("<") >= 0 ||
        line.indexOf("^") >= 0 ||
        line.indexOf(">") >= 0 ||
        line.indexOf("v") >= 0) {
        moves += line
    } else if (line.length > 0) {
        for (let x = 0; x < line.length; x++) {
            if (line[x] === "@") {
                robot.x = x * 2
                robot.y = y
            } else if (line[x] === "O") {
                boxes.push({
                    x: x * 2,
                    y: y
                })
            } else if (line[x] === "#") {
                walls.push({
                    x: x * 2,
                    y: y
                })
            }
        }
    }
})

//Avanzar turnos

for (let i = 0; i < moves.length; i++) {
    if (moves[i] === "<") {
        if (boxes.some((box) => box.x === robot.x - 1 && box.y === robot.y)) {
            console.error("error", moves[i])
            //boxes.forEach((box) => { if (box.y === robot.y && box.x === robot.x - 1) { console.log(box) } })
            //printTable()
            throw new Error()
        }
        if (!boxes.some((box) => box.x === robot.x - 2 && box.y === robot.y) &&
            !walls.some((wall) => wall.x === robot.x - 2 && wall.y === robot.y)) {

            robot.x -= 1
        } else if (boxes.some((box) => box.x === robot.x - 2 && box.y === robot.y)) {
            let stuffToMove = []
            let checkX = robot.x - 2
            while (boxes.some((box) => box.x === checkX && box.y === robot.y)) {
                stuffToMove.push(boxes[boxes.findIndex((el) => el.x === checkX && el.y === robot.y)])
                checkX -= 2
            }

            if (!walls.some((wall) => wall.x === checkX && wall.y === robot.y)) {
                //console.log(boxes)
                stuffToMove.forEach((el) => el.x--)
                robot.x--
                //console.log(boxes)
            }
        }
        if (boxes.some((box) => box.x === robot.x - 1 && box.y === robot.y)) {
            console.error("error", moves[i])
            //boxes.forEach((box) => { if (box.y === robot.y && box.x === robot.x - 1) { console.log(box) } })
            printTable()
            throw new Error()
        }
    } else if (moves[i] === ">") {
        if (!boxes.some((box) => box.x === robot.x + 1 && box.y === robot.y) &&
            !walls.some((wall) => wall.x === robot.x + 1 && wall.y === robot.y)) {
            robot.x++
        } else if (boxes.some((box) => box.x === robot.x + 1 && box.y === robot.y)) {
            let stuffToMove = [robot]
            let checkX = robot.x + 1
            while (boxes.some((box) => box.x === checkX && box.y === robot.y)) {
                stuffToMove.push(boxes[boxes.findIndex((el) => el.x === checkX && el.y === robot.y)])
                checkX += 2
            }
            if (!walls.some((wall) => wall.x === checkX && wall.y === robot.y)) {
                //console.log(boxes)
                stuffToMove.forEach((el) => el.x++)
                //console.log(boxes)
            }
        }
    } else if (moves[i] === "^") {
        if (!boxes.some((box) => box.x === robot.x && box.y === robot.y - 1) &&
            !boxes.some((box) => box.x === robot.x - 1 && box.y === robot.y - 1) &&
            !walls.some((wall) => wall.x === robot.x && wall.y === robot.y - 1) &&
            !walls.some((wall) => wall.x === robot.x - 1 && wall.y === robot.y - 1)) {
            robot.y--
        } else if (boxes.some((box) => box.x === robot.x && box.y === robot.y - 1) ||
            boxes.some((box) => box.x === robot.x - 1 && box.y === robot.y - 1)) {
            let b = boxes[boxes.findIndex((el) => el.x === robot.x && el.y === robot.y - 1)]
            let stuffToMove = b !== undefined ? [b] : [boxes[boxes.findIndex((el) => el.x === robot.x - 1 && el.y === robot.y - 1)]]
            let calculating = true
            let possibleNext = true
            while (calculating) {
                let newMove = []
                let initialLength = stuffToMove.length
                while (stuffToMove.length > 0) {
                    let curr = stuffToMove.shift()
                    if (!newMove.some((el) => el.x === curr.x && el.y === curr.y)) {
                        newMove.push(curr)
                    }
                    let l = boxes[boxes.findIndex((el) => el.x === curr.x - 1 && el.y === curr.y - 1)]
                    let m = boxes[boxes.findIndex((el) => el.x === curr.x && el.y === curr.y - 1)]
                    let r = boxes[boxes.findIndex((el) => el.x === curr.x + 1 && el.y === curr.y - 1)]
                    if (l !== undefined && !newMove.some((el) => el.x === l.x && el.y === l.y)) {
                        newMove.push(l)
                    }
                    if (m !== undefined && !newMove.some((el) => el.x === m.x && el.y === m.y)) {
                        newMove.push(m)
                    }
                    if (r !== undefined && !newMove.some((el) => el.x === r.x && el.y === r.y)) {
                        newMove.push(r)
                    }
                    if (walls.some((wall) => wall.x === curr.x && wall.y === curr.y - 1) ||
                        walls.some((wall) => wall.x === curr.x - 1 && wall.y === curr.y - 1) ||
                        walls.some((wall) => wall.x === curr.x + 1 && wall.y === curr.y - 1)) {
                        possibleNext = false
                        calculating = false
                    }
                }
                //console.log(newMove)
                if (initialLength === newMove.length) {
                    calculating = false
                }
                stuffToMove = newMove
            }
            if (possibleNext) {
                stuffToMove.forEach((el) => el.y--)
                robot.y--
            }
        }
    } else if (moves[i] === "v") {
        if (!boxes.some((box) => box.x === robot.x && box.y === robot.y + 1) &&
            !boxes.some((box) => box.x === robot.x - 1 && box.y === robot.y + 1) &&
            !walls.some((wall) => wall.x === robot.x && wall.y === robot.y + 1) &&
            !walls.some((wall) => wall.x === robot.x - 1 && wall.y === robot.y + 1)) {
            robot.y += 1
        } else if (boxes.some((box) => box.x === robot.x && box.y === robot.y + 1) ||
            boxes.some((box) => box.x === robot.x - 1 && box.y === robot.y + 1)) {
            let b = boxes[boxes.findIndex((el) => el.x === robot.x && el.y === robot.y + 1)]
            let stuffToMove = b !== undefined ? [b] : [boxes[boxes.findIndex((el) => el.x === robot.x - 1 && el.y === robot.y + 1)]]
            let calculating = true
            let possibleNext = true
            while (calculating) {
                let newMove = []
                let initialLength = stuffToMove.length
                while (stuffToMove.length > 0) {
                    let curr = stuffToMove.shift()
                    if (!newMove.some((el) => el.x === curr.x && el.y === curr.y)) {
                        newMove.push(curr)
                    }
                    let l = boxes[boxes.findIndex((el) => el.x === curr.x - 1 && el.y === curr.y + 1)]
                    let m = boxes[boxes.findIndex((el) => el.x === curr.x && el.y === curr.y + 1)]
                    let r = boxes[boxes.findIndex((el) => el.x === curr.x + 1 && el.y === curr.y + 1)]
                    if (l !== undefined) {
                        newMove.push(l)
                    }
                    if (r !== undefined) {
                        newMove.push(r)
                    }
                    if (m !== undefined) {
                        newMove.push(m)
                    }
                    if (walls.some((wall) => wall.x === curr.x && wall.y === curr.y + 1) ||
                        walls.some((wall) => wall.x === curr.x - 1 && wall.y === curr.y + 1) ||
                        walls.some((wall) => wall.x === curr.x + 1 && wall.y === curr.y + 1)) {
                        possibleNext = false
                        calculating = false
                    }
                }
                //console.log(newMove)
                if (initialLength === newMove.length) {
                    calculating = false
                }
                stuffToMove = newMove
            }
            if (possibleNext) {
                stuffToMove.forEach((el) => el.y++)
                robot.y++
            }
        }
    }
}

//Calcular puntación
let sum = boxes.reduce((a, b) => a += b.y * 100 + b.x, 0)

printTable()

console.log("Solución: ", sum)
