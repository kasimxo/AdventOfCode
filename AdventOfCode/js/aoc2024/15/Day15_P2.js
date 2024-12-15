const { readLines } = require('./input')

let text = [
    '##########',
    '#..O..O.O#',
    '#......O.#',
    '#.OO..O.O#',
    '#..O@..O.#',
    '#O#..O...#',
    '#O..O..O.#',
    '#.OO.O.OO#',
    '#....O...#',
    '##########',
    '',
    '<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^',
    'vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v',
    '><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<',
    '<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^',
    '^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><',
    '^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^',
    '>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^',
    '<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>',
    '^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>',
    'v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^'
]
/*
text = [
    '########',
    '#..O.O.#',
    '##@.O..#',
    '#...O..#',
    '#.#.O..#',
    '#...O..#',
    '#......#',
    '########',
    '',
    '<^^>>>vv<v>>v<<'
]

text = [
    '#######',
    '#...#.#',
    '#.....#',
    '#..OO@#',
    '#..O..#',
    '#.....#',
    '#######',
    '',
    '<vv<<^^<<^^'
]

text = [
    '#######',
    '#...O..',
]
*/

text = readLines()

// 1463160
// 1451040 too low
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
    /*
    console.log(moves[i])
    printTable()
    */

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
    //console.log(robot, moves[i])
    //printTableReduced()
    printTableReduced()
    console.log("-")
    boxes.forEach((box) => {
        if (boxes.some((b) => Math.abs(b.x - box.x) === 1 && b.y === box.y)) {
            console.log(moves[i - 2], moves[i - 1], moves[i])

            throw new Error
        }
    })
}
/*
text = [
    '####################',
    '##[].......[].[][]##',
    '##[]...........[].##',
    '##[]........[][][]##',
    '##[]......[]....[]##',
    '##..##......[]....##',
    '##..[]............##',
    '##..@......[].[][]##',
    '##......[][]..[]..##',
    '####################'
]
boxes = []
for (let y = 0; y < text.length; y++) {
    for (let x = 0; x < text[0].length; x++) {
        if (text[y][x] === "[") {
            boxes.push({
                x: x,
                y: y
            })
        }
    }
}
*/

//Calcular puntación
let sum = boxes.reduce((a, b) => a += b.y * 100 + b.x, 0)

//console.log(boxes)

printTable()

console.log("Solución: ", sum)

function printTableReduced() {
    const ZOOMX = 10
    const ZOOMY = 5
    for (let y = robot.y - ZOOMY; y <= robot.y + ZOOMY; y++) {
        let line = ''
        for (let x = robot.x - ZOOMX; x <= robot.x + ZOOMX; x++) {
            if (walls.some((wall) => wall.x === x && wall.y === y)) {
                line += "#"
            } else if (walls.some((wall) => wall.x === x - 1 && wall.y === y)) {
                line += "#"
            } else if (boxes.some((box) => box.x === x && box.y === y)) {
                line += "["
            } else if (boxes.some((box) => box.x === x - 1 && box.y === y)) {
                line += "]"
            } else if (robot.x === x && robot.y === y) {
                line += "@"
            } else {
                line += "."
            }
        }
        console.log(line)

    }
}

function printTable() {
    for (let y = 0; y < text.length; y++) {
        let line = ''
        for (let x = 0; x < text[0].length * 2; x += 0) {
            if (walls.some((wall) => wall.x === x && wall.y === y)) {
                line += "##"
                x += 2
            } else if (boxes.some((box) => box.x === x && box.y === y)) {
                line += "[]"
                x += 2
            } else if (robot.x === x && robot.y === y) {
                line += "@"
                x++
            } else {
                line += "."
                x++
            }
        }
        console.log(line)
    }
}