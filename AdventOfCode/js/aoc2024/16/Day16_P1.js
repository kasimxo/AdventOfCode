const { readLines } = require('./../../input')

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
text = readLines()

// 82375 too high

let char = {
    x: 0,
    y: 0,
    score: 0,
    steps: 0,
    turns: 0,
    dir: 0 // 0 -> East     1 -> South      2 -> West       3 -> North
}
let min = Infinity

//let walls = []

for (let y = 0; y < text.length; y++) {
    for (let x = 0; x < text[0].length; x++) {
        if (text[y][x] === "S") {
            char.x = x
            char.y = y
        }
    }
}

let games = [char]
let visited = []
let calculating = true

while (calculating) {
    let newGames = []
    calculating = false
    while (games.length > 0) {
        let curr = games.shift()
        switch (curr.dir) {
            case 0:
                if (text[curr.y][curr.x + 1] === "E") {
                    curr.score++
                    curr.steps++
                    endGame(curr)
                } else if (text[curr.y][curr.x + 1] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x + 1 &&
                        loc.y === curr.y &&
                        loc.dir === 0 &&
                        loc.score < curr.score)) {
                        calculating = true
                        newGames.push({
                            x: curr.x + 1,
                            y: curr.y + 0,
                            turns: curr.turns + 0,
                            score: curr.score + 1,
                            steps: curr.steps + 1,
                            dir: 0
                        })
                        visited.push({
                            x: curr.x + 1,
                            score: curr.score + 1,
                            y: curr.y + 0,
                            dir: 0
                        })
                    }
                }
                if (text[curr.y - 1][curr.x] === "E") {
                    curr.score += 1001
                    curr.steps + 1
                    curr.turns + 1
                    endGame(curr)
                } else if (text[curr.y - 1][curr.x] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x &&
                        loc.y === curr.y - 1 &&
                        loc.dir === 3 &&
                        loc.score < curr.score)) {

                        visited.push({
                            x: curr.x + 0,
                            y: curr.y - 1,
                            score: curr.score + 1001,
                            dir: 3
                        })
                        calculating = true
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y - 1,
                            turns: curr.turns + 1,
                            steps: curr.steps + 1,
                            score: curr.score + 1001,
                            dir: 3
                        })
                    }
                }
                if (text[curr.y + 1][curr.x] === "E") {
                    curr.score += 1001
                    curr.turns += 1
                    curr.steps += 1
                    endGame(curr)
                } else if (text[curr.y + 1][curr.x] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x &&
                        loc.y === curr.y + 1 &&
                        loc.dir === 1 &&
                        loc.score < curr.score)) {
                        visited.push({
                            x: curr.x + 0,
                            y: curr.y + 1,
                            score: curr.score + 1001,
                            dir: 1
                        })
                        calculating = true
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y + 1,
                            turns: curr.turns + 1,
                            steps: curr.steps + 1,
                            score: curr.score + 1001,
                            dir: 1
                        })
                    }
                }
                break
            case 1:
                if (text[curr.y + 1][curr.x] === "E") {
                    curr.score += 1
                    curr.steps++
                    endGame(curr)
                } else if (text[curr.y + 1][curr.x] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x &&
                        loc.y === curr.y + 1 &&
                        loc.dir === 0 &&
                        loc.score < curr.score)) {
                        visited.push({
                            x: curr.x + 0,
                            y: curr.y + 1,
                            score: curr.score + 1,
                            dir: 1
                        })
                        calculating = true
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y + 1,

                            turns: curr.turns + 0,
                            steps: curr.steps + 1,
                            score: curr.score + 1,
                            dir: 1
                        })
                    }
                }
                if (text[curr.y][curr.x + 1] === "E") {
                    curr.score += 1001
                    curr.turns += 1
                    curr.steps += 1
                    endGame(curr)
                } else if (text[curr.y][curr.x + 1] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x + 1 &&
                        loc.y === curr.y &&
                        loc.dir === 0 &&
                        loc.score < curr.score)) {
                        visited.push({
                            x: curr.x + 1,
                            y: curr.y + 0,
                            score: curr.score + 1001,
                            dir: 0
                        })
                        calculating = true
                        newGames.push({
                            x: curr.x + 1,
                            y: curr.y + 0,

                            turns: curr.turns + 1,
                            steps: curr.steps + 1,
                            score: curr.score + 1001,
                            dir: 0
                        })
                    }
                }
                if (text[curr.y][curr.x - 1] === "E") {
                    curr.score += 1001
                    curr.turns += 1
                    curr.steps += 1
                    endGame(curr)
                } else if (text[curr.y][curr.x - 1] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x - 1 &&
                        loc.y === curr.y &&
                        loc.dir === 2 &&
                        loc.score < curr.score)) {
                        visited.push({
                            x: curr.x - 1,
                            y: curr.y + 0,
                            score: curr.score + 1001,
                            dir: 2
                        })
                        calculating = true
                        newGames.push({
                            x: curr.x - 1,
                            y: curr.y + 0,

                            turns: curr.turns + 1,
                            steps: curr.steps + 1,
                            score: curr.score + 1001,
                            dir: 2
                        })
                    }
                }
                break
            case 2:
                if (text[curr.y][curr.x - 1] === "E") {
                    curr.score += 1
                    curr.steps++
                    endGame(curr)
                } else if (text[curr.y][curr.x - 1] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x - 1 &&
                        loc.y === curr.y &&
                        loc.dir === 0 &&
                        loc.score < curr.score)) {
                        visited.push({
                            x: curr.x - 1,
                            y: curr.y + 0,
                            score: curr.score + 1,
                            dir: 2
                        })
                        calculating = true
                        newGames.push({
                            x: curr.x - 1,
                            y: curr.y + 0,

                            turns: curr.turns + 0,
                            steps: curr.steps + 1,
                            score: curr.score + 1,
                            dir: 2
                        })
                    }
                }
                if (text[curr.y - 1][curr.x] === "E") {
                    curr.score += 1001
                    curr.turns += 1
                    curr.steps += 1
                    endGame(curr)
                } else if (text[curr.y - 1][curr.x] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x &&
                        loc.y === curr.y - 1 &&
                        loc.dir === 3 &&
                        loc.score < curr.score)) {
                        visited.push({
                            x: curr.x + 0,
                            y: curr.y - 1,
                            score: curr.score + 1001,
                            dir: 3
                        })
                        calculating = true
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y - 1,

                            turns: curr.turns + 1,
                            steps: curr.steps + 1,
                            score: curr.score + 1001,
                            dir: 3
                        })
                    }
                }
                if (text[curr.y + 1][curr.x] === "E") {
                    curr.score += 1001
                    curr.turns += 1
                    curr.steps += 1
                    endGame(curr)
                } else if (text[curr.y + 1][curr.x] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x &&
                        loc.y === curr.y + 1 &&
                        loc.dir === 1 &&
                        loc.score < curr.score)) {
                        visited.push({
                            x: curr.x + 0,
                            y: curr.y + 1,
                            score: curr.score + 1001,
                            dir: 1
                        })
                        calculating = true
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y + 1,

                            turns: curr.turns + 1,
                            steps: curr.steps + 1,
                            score: curr.score + 1001,
                            dir: 1
                        })
                    }
                }
                break
            case 3:
                if (text[curr.y - 1][curr.x] === "E") {
                    curr.score += 1
                    curr.steps++
                    endGame(curr)
                } else if (text[curr.y - 1][curr.x] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x &&
                        loc.y === curr.y - 1 &&
                        loc.dir === 0 &&
                        loc.score < curr.score)) {
                        visited.push({
                            x: curr.x + 0,
                            y: curr.y - 1,
                            score: curr.score + 1,
                            dir: 3
                        })
                        calculating = true
                        newGames.push({
                            x: curr.x + 0,
                            y: curr.y - 1,

                            turns: curr.turns + 0,
                            steps: curr.steps + 1,
                            score: curr.score + 1,
                            dir: 3
                        })
                    }
                }
                if (text[curr.y][curr.x + 1] === "E") {
                    curr.score += 1001
                    curr.turns += 1
                    curr.steps += 1
                    endGame(curr)
                } else if (text[curr.y][curr.x + 1] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x + 1 &&
                        loc.y === curr.y &&
                        loc.dir === 0 &&
                        loc.score < curr.score)) {
                        visited.push({
                            x: curr.x + 1,
                            y: curr.y + 0,
                            score: curr.score + 1001,
                            dir: 0
                        })
                        calculating = true
                        newGames.push({
                            x: curr.x + 1,
                            y: curr.y + 0,

                            turns: curr.turns + 1,
                            steps: curr.steps + 1,
                            score: curr.score + 1001,
                            dir: 0
                        })
                    }
                }
                if (text[curr.y][curr.x - 1] === "E") {
                    curr.score += 1001
                    curr.turns += 1
                    curr.steps += 1
                    endGame(curr)
                } else if (text[curr.y][curr.x - 1] === ".") {
                    if (!visited.some((loc) => loc.x === curr.x - 1 &&
                        loc.y === curr.y &&
                        loc.dir === 2 &&
                        loc.score < curr.score)) {
                        visited.push({
                            x: curr.x - 1,
                            y: curr.y + 0,
                            score: curr.score + 1001,
                            dir: 2
                        })
                        calculating = true
                        newGames.push({
                            x: curr.x - 1,
                            y: curr.y + 0,

                            turns: curr.turns + 1,
                            steps: curr.steps + 1,
                            score: curr.score + 1001,
                            dir: 2
                        })
                    }
                }
                break
        }
    }
    games = newGames
}

console.log("Fin simulacion")

function endGame(winning) {
    if (min > winning.score) {

        console.error("Solucion: ", winning.score, winning.steps, winning.turns)
        min = winning.score
        //throw new Error(`${winning.score}`)
    }
}


