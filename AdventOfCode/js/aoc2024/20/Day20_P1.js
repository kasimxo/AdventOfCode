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
//text = readLines()
const WIDTH = text[0].length
const HEIGHT = text.length

const SAVE = 20

let seen = Array(HEIGHT + 1)
for (let y = 0; y < seen.length; y++) {
    seen[y] = []
    for (let i = 0; i <= WIDTH; i++) {
        seen[y].push(0)
    }
}

let walls = []
//text.map((el) => { return { x: Number.parseInt(el.split(',')[0]), y: Number.parseInt(el.split(',')[1]) } })


let char = {
    x: 0,
    y: 0,
    travel: 0,
    cheated: 0,
    cheatedLen: 0,
    seen: Array(HEIGHT + 1),
}

let path = []
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

let maxLength = calculateStartingLength()
path.forEach((p, index) => cache.push({ x: p.x, y: p.y, len: maxLength - index }))
console.log("Starting length: ", maxLength, path.length)
let minLength = calculateWithShortCut()
console.log("Solucion: ", count)




function calculateWithShortCut() {
    for (let y = 0; y < seen.length; y++) {
        seen[y] = []
        for (let i = 0; i <= WIDTH; i++) {
            seen[y].push(0)
        }
    }
    let calculating = true
    let games = [char]
    let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    let min = Infinity
    while (calculating) {
        let newGames = []
        while (games.length > 0) {
            let curr = games.shift()
            dirs.forEach((dir) => {
                if (curr.travel + 1 + SAVE < maxLength) {
                    if (exit.x === curr.x + dir[0] && exit.y === curr.y + dir[1]) {
                        let travelLength = curr.travel + 1
                        if (travelLength <= maxLength - SAVE) {
                            //console.log("SIMULACION VALIDA: ", maxLength - travelLength)
                            count++
                        }
                        min = Math.min(min, curr.travel + 1)
                    } else if (!walls.some((w) => w.x === curr.x + dir[0] && w.y === curr.y + dir[1]) &&
                        curr.x + dir[0] >= 0 && curr.x + dir[0] < WIDTH &&
                        curr.y + dir[1] >= 0 && curr.y + dir[1] < HEIGHT &&
                        seen[curr.y + dir[1]][curr.x + dir[0]] === 0 &&
                        curr.cheated === 0) {
                        newGames.push({
                            x: curr.x + dir[0],
                            y: curr.y + dir[1],
                            travel: curr.travel + 1,
                            cheated: curr.cheated + 0,
                            cheatedLen: curr.cheatedLen + 0,
                            seen: copyArray(curr.seen)
                        })
                        seen[curr.y + dir[1]][curr.x + dir[0]] = 1
                    } else if (!walls.some((w) => w.x === curr.x + dir[0] && w.y === curr.y + dir[1]) &&
                        curr.x + dir[0] >= 0 && curr.x + dir[0] < WIDTH &&
                        curr.y + dir[1] >= 0 && curr.y + dir[1] < HEIGHT &&
                        curr.cheated === 1) {
                        //console.log(curr.x + dir[0], curr.y + dir[1])
                        let travelLength = curr.travel + 1 + cache.find((el) => el.x === curr.x + dir[0] && el.y === curr.y + dir[1]).len
                        if (travelLength <= maxLength - SAVE) {
                            //console.log("SIMULACION VALIDA: ", maxLength - travelLength)
                            count++
                        }
                    } else if (walls.some((w) => w.x === curr.x + dir[0] && w.y === curr.y + dir[1]) &&
                        curr.x + dir[0] >= 0 && curr.x + dir[0] < WIDTH &&
                        curr.y + dir[1] >= 0 && curr.y + dir[1] < HEIGHT &&
                        seen[curr.y + dir[1]][curr.x + dir[0]] === 0 &&
                        curr.cheated === 0) {
                        //console.log("CHEATED", curr.x + dir[0], curr.y + dir[1])
                        newGames.push({
                            x: curr.x + dir[0],
                            y: curr.y + dir[1],
                            travel: curr.travel + 1,
                            cheated: 1,
                            cheatedLen: curr.cheatedLen + 1,
                            seen: copyArray(curr.seen)
                        })
                        seen[curr.y + dir[1]][curr.x + dir[0]] = 1
                    }
                }
            })
        }
        games = newGames
        if (games.length === 0) { calculating = false }
        //console.log(games.length)
    }
    return min
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
                    path.push({ x: curr.x + dir[0], y: curr.y + dir[1] })
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