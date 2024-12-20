const { readLines } = require('./input')

let text = [
    '###############',
    '#...#...#.....#',
    '#.#.#.#.#.###.#',
    '#S#...#.#.#...#',
    '#######.#.#.###',
    '#######.#.#...#',
    '#######.#.###.#',
    '###..E#...#...#',
    '###.#######.###',
    '#...###...#...#',
    '#.#####.#.###.#',
    '#.#...#.#.#...#',
    '#.#.#.#.#.#.###',
    '#...#...#...###',
    '###############'
]
text = readLines()
// 5835 TOO LOW
// 1027165 TOO HIGH
// 1027164
// 1027065 TOO LOW
const WIDTH = text[0].length
const HEIGHT = text.length

const SAVE = 100
const MAXCHEAT = 20
let seen = Array(HEIGHT)
for (let y = 0; y < seen.length; y++) {
    seen[y] = []
    for (let i = 0; i < WIDTH; i++) {
        seen[y].push(0)
    }
}

let walls = []
//text.map((el) => { return { x: Number.parseInt(el.split(',')[0]), y: Number.parseInt(el.split(',')[1]) } })
let cheats = []

let char = {
    x: 0,
    y: 0,
    travel: 0,
    cheated: 0,
    cheatedLen: 0,
    cheatStart: {
        x: 0,
        y: 0
    },
    seen: Array(HEIGHT),
}

for (let y = 0; y < seen.length; y++) {
    char.seen[y] = []
    for (let i = 0; i <= WIDTH; i++) {
        char.seen[y].push(0)
    }
}

let cache = []

let exit = {
    x: 0,
    y: 0
}

let count = 0

for (let y = 0; y < text.length; y++) {
    for (let x = 0; x < text[0].length; x++) {
        if (text[y][x] === "S") {
            char.x = x
            char.y = y
        } else if (text[y][x] === "E") {
            exit.x = x
            exit.y = y
        } else if (text[y][x] === "#") {
            walls.push({ x: x, y: y })
        }
    }
}
//let path = [{ x: char.x + 0, y: char.y + 0 }]
let path = []
let maxLength = calculateStartingLength()
path.sort((a, b) => a.travel - b.travel)
let p0 = {
    x: path[0].x + 0,
    y: path[0].y + 0,
    travel: path[0].travel + 0
}
let p1 = {
    x: path[1].x + 0,
    y: path[1].y + 0,
    travel: 0
}
path[0] = p1
path[1] = p0
console.log(path)
console.log("Starting length: ", maxLength, path.length)

for (let y = 0; y < seen.length; y++) {
    seen[y] = []
    for (let i = 0; i <= WIDTH; i++) {
        seen[y].push(0)
    }
}
let checked = []

for (let index = 0; index < path.length; index++) {
    let p = path[index]
    for (let i = index + 1; i < path.length; i++) {
        let dest = path[i]
        let md = calculateManhattanDistance(p, dest)
        if (md <= MAXCHEAT && i - index >= SAVE + md) {
            count++
        }
    }
}

console.log("Solucion: ", count)
return


function calculateManhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}




function calculateStartingLength() {
    let calculating = true
    let games = [char]
    let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    let min = Infinity
    while (calculating) {
        let newGames = []
        while (games.length > 0) {
            let curr = games.shift()
            dirs.forEach((dir) => {
                if (exit.x === curr.x + dir[0] && exit.y === curr.y + dir[1]) {
                    path.push({ x: curr.x + dir[0], y: curr.y + dir[1], travel: curr.travel + 1 })
                    min = Math.min(min, curr.travel + 1)
                } else if (!walls.some((w) => w.x === curr.x + dir[0] && w.y === curr.y + dir[1]) &&
                    curr.x + dir[0] >= 0 && curr.x + dir[0] <= WIDTH &&
                    curr.y + dir[1] >= 0 && curr.y + dir[1] <= HEIGHT &&
                    seen[curr.y + dir[1]][curr.x + dir[0]] === 0) {
                    newGames.push({
                        x: curr.x + dir[0],
                        y: curr.y + dir[1],
                        travel: curr.travel + 1,
                    })
                    path.push({ x: curr.x + dir[0], y: curr.y + dir[1], travel: curr.travel + 1 })
                    seen[curr.y + dir[1]][curr.x + dir[0]] = 1
                }
            })
        }
        games = newGames
        if (games.length === 0) { calculating = false }
        //console.log(games.length)
    }
    return min
}



function copyArray(arr) {
    let newArr = []
    for (let y = 0; y < arr.length; y++) {
        let newLine = []
        for (let x = 0; x < arr[0].length; x++) {
            newLine.push(arr[y][x] + 0)
        }
        newArr.push(newLine)
    }
    return newArr
}