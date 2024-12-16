const { readLines } = require('./input')

let text = [
    '###############',
    '#.......#....E#',
    '#.#.###.#.###.#',
    '#.....#.#...#.#',
    '#.###.#####.#.#',
    '#.#.#.......#.#',
    '#.#.#####.###.#',
    '#...........#.#',
    '###.#.#####.#.#',
    '#...#.....#.#.#',
    '#.#.#.###.#.#.#',
    '#.....#...#.#.#',
    '#.###.#.#.#.#.#',
    '#S..#.....#...#',
    '###############'
]

/*
text = [
    '#################',
    '#...#...#...#..E#',
    '#.#.#.#.#.#.#.#.#',
    '#.#.#.#...#...#.#',
    '#.#.#.#.###.#.#.#',
    '#...#.#.#.....#.#',
    '#.#.#.#.#.#####.#',
    '#.#...#.#.#.....#',
    '#.#.#####.#.###.#',
    '#.#.#.......#...#',
    '#.#.###.#####.###',
    '#.#.#...#.....#.#',
    '#.#.#.#####.###.#',
    '#.#.#.........#.#',
    '#.#.#.#########.#',
    '#S#.............#',
    '#################'
]
text = [
    '###',
    '#E#',
    '#.#',
    '#S#',
    '###'
]*/

text = readLines()

let char = {
    x: 0,
    y: 0,
    turns: 0,
    steps: 0,
    path: [],
    dir: 0 // 0 East | 1 South | 2 West | 3 North
}
const speeds = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
let seen = []
for (let y = 0; y < text.length; y++) {
    for (let x = 0; x < text[0].length; x++) {
        if (text[y][x] === "S") {
            char.x = x
            char.y = y
            char.path.push({ x: x, y: y })
        }
    }
}

let min = Infinity
let games = [char]
let distinctTiles = []
let calculating = true

while (calculating) {
    calculating = false
    let newGames = []
    while (games.length > 0) {
        let curr = games.shift()
        let f = moveForward(curr)
        let l = turnLeft(curr)
        let r = turnRight(curr)
        if (f !== undefined && !alreadySeen(f)) {
            newGames.push(f)
            calculating = true
        }
        if (l !== undefined && !alreadySeen(l)) {
            newGames.push(l)
            calculating = true
        }
        if (r !== undefined && !alreadySeen(r)) {
            newGames.push(r)
            calculating = true
        }
    }
    games = newGames
}

console.log("Min: ", min)
console.log("Tiles: ", distinctTiles.length + 1)


// return true if we have already seen that position
function alreadySeen(pos) {
    if (seen.some((p) => pos.x === p.x &&
        pos.y === p.y &&
        pos.dir === p.dir &&
        pos.turns * 1000 + pos.steps > p.score
    )) {
        return true
    } else {
        seen.push({
            x: pos.x + 0,
            y: pos.y + 0,
            dir: pos.dir + 0,
            score: pos.turns * 1000 + pos.steps
        })
        return false
    }
}

function moveForward(pos) {
    if (text[pos.y + speeds[pos.dir].y][pos.x + speeds[pos.dir].x] === "E") {
        pos.y += speeds[pos.dir].y
        pos.x += speeds[pos.dir].x
        pos.steps++
        if (pos.turns * 1000 + pos.steps < min) {
            min = pos.turns * 1000 + pos.steps
            distinctTiles = pos.path
        } else if (pos.turns * 1000 + pos.steps === min) {
            pos.path.forEach((loc) => {
                if (!distinctTiles.some((p) => p.x === loc.x && p.y === loc.y)) {
                    distinctTiles.push({
                        x: loc.x + 0,
                        y: loc.y + 0
                    })
                }
            })
            console.log("dup")
        }
        console.log("Win:", pos.turns * 1000 + pos.steps, pos.path.length)
        //throw new Error()
    } else if (text[pos.y + speeds[pos.dir].y][pos.x + speeds[pos.dir].x] === "." && pos.turns * 1000 + pos.steps <= 66404) {
        let newChar = {
            x: pos.x + speeds[pos.dir].x,
            y: pos.y + speeds[pos.dir].y,
            turns: pos.turns + 0,
            steps: pos.steps + 1,
            path: newArr(pos.path, { x: pos.x + speeds[pos.dir].x, y: pos.y + speeds[pos.dir].y }),
            dir: pos.dir + 0 // 0 East | 1 South | 2 West | 3 North
        }
        return newChar
    } else {
        return undefined
    }
}

function turnLeft(pos) {
    let newChar = {
        x: pos.x + 0,
        y: pos.y + 0,
        turns: pos.turns + 1,
        steps: pos.steps + 0,
        path: newArr(pos.path),
        dir: (pos.dir + 3) % 4 // 0 East | 1 South | 2 West | 3 North
    }
    return newChar
}
function turnRight(pos) {
    let newChar = {
        x: pos.x + 0,
        y: pos.y + 0,
        turns: pos.turns + 1,
        steps: pos.steps + 0,
        path: newArr(pos.path),
        dir: (pos.dir + 1) % 4 // 0 East | 1 South | 2 West | 3 North
    }
    return newChar
}



function newArr(arr, pos) {
    let newArr = []
    arr.forEach((el) => newArr.push(el))
    if (pos !== undefined) {
        newArr.push(pos)
    }
    return newArr
}