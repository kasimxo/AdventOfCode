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
]*/
text = readLines()

//1463160
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
                robot.x = x
                robot.y = y
            } else if (line[x] === "O") {
                boxes.push({
                    x: x,
                    y: y
                })
            } else if (line[x] === "#") {
                walls.push({
                    x: x,
                    y: y
                })
            }
        }
    }
})

//Avanzar turnos
for (let i = 0; i < moves.length; i++) {
    if (moves[i] === "<") {
        if (!boxes.some((box) => box.x === robot.x - 1 && box.y === robot.y) &&
            !walls.some((wall) => wall.x === robot.x - 1 && wall.y === robot.y)) {
            robot.x -= 1
        } else if (boxes.some((box) => box.x === robot.x - 1 && box.y === robot.y)) {
            let stuffToMove = [robot]
            let checkX = robot.x - 1
            while (boxes.some((box) => box.x === checkX && box.y === robot.y)) {
                stuffToMove.push(boxes[boxes.findIndex((el) => el.x === checkX && el.y === robot.y)])
                checkX--
            }

            if (!walls.some((wall) => wall.x === checkX && wall.y === robot.y)) {
                //console.log(boxes)
                stuffToMove.forEach((el) => el.x--)
                //console.log(boxes)
            }
        }
    } else if (moves[i] === ">") {
        if (!boxes.some((box) => box.x === robot.x + 1 && box.y === robot.y) &&
            !walls.some((wall) => wall.x === robot.x + 1 && wall.y === robot.y)) {
            robot.x += 1
        } else if (boxes.some((box) => box.x === robot.x + 1 && box.y === robot.y)) {
            let stuffToMove = [robot]
            let checkX = robot.x + 1
            while (boxes.some((box) => box.x === checkX && box.y === robot.y)) {
                stuffToMove.push(boxes[boxes.findIndex((el) => el.x === checkX && el.y === robot.y)])
                checkX++
            }

            if (!walls.some((wall) => wall.x === checkX && wall.y === robot.y)) {
                //console.log(boxes)
                stuffToMove.forEach((el) => el.x++)
                //console.log(boxes)
            }
        }
    } else if (moves[i] === "^") {
        if (!boxes.some((box) => box.x === robot.x && box.y === robot.y - 1) &&
            !walls.some((wall) => wall.x === robot.x && wall.y === robot.y - 1)) {
            robot.y -= 1
        } else if (boxes.some((box) => box.x === robot.x && box.y === robot.y - 1)) {
            let stuffToMove = [robot]
            let checkY = robot.y - 1
            while (boxes.some((box) => box.x === robot.x && box.y === checkY)) {
                stuffToMove.push(boxes[boxes.findIndex((el) => el.x === robot.x && el.y === checkY)])
                checkY--
            }

            if (!walls.some((wall) => wall.x === robot.x && wall.y === checkY)) {
                //console.log(boxes)
                stuffToMove.forEach((el) => el.y--)
                //console.log(boxes)
            }
        }
    } else if (moves[i] === "v") {
        if (!boxes.some((box) => box.x === robot.x && box.y === robot.y + 1) &&
            !walls.some((wall) => wall.x === robot.x && wall.y === robot.y + 1)) {
            robot.y += 1
        } else if (boxes.some((box) => box.x === robot.x && box.y === robot.y + 1)) {
            let stuffToMove = [robot]
            let checkY = robot.y + 1
            while (boxes.some((box) => box.x === robot.x && box.y === checkY)) {
                stuffToMove.push(boxes[boxes.findIndex((el) => el.x === robot.x && el.y === checkY)])
                checkY++
            }

            if (!walls.some((wall) => wall.x === robot.x && wall.y === checkY)) {
                //console.log(boxes)
                stuffToMove.forEach((el) => el.y++)
                //console.log(boxes)
            }
        }
    }
    //console.log(robot)
}

//Calcular puntación
let sum = boxes.reduce((a, b) => a += b.y * 100 + b.x, 0)

console.log("Solución: ", sum)
