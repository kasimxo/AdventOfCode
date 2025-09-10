const { readInput } = require('./../../input')

let text = readInput()


let stones = []

text.split(" ").forEach((stone) => {
    stones.push(stone)
})

let count = 0

const MAX_DEPTH = 75

let seen = {}

stones.forEach((rock, index) => {
    count += calculateLength(rock, 0)
})

console.log("Solucion: ", count)

function checkSeen(rock, remaining) {
    if (seen[rock] !== undefined && seen[rock][remaining] !== undefined) {
        return seen[rock][remaining]
    } else {
        return -1
    }
}

function setSeen(rock, remaining, length) {
    if (seen[rock] === undefined) {
        seen[rock] = {
            remaining: length
        }
    } else {
        seen[rock][remaining] = length
    }
}

function calculateLength(rock, depth) {
    let preCalculated = checkSeen(rock, depth - MAX_DEPTH + 1)
    if (preCalculated >= 0) {
        return preCalculated
    } else {
        depth++
        if (depth <= MAX_DEPTH) {
            if (rock === "0") {
                let length = calculateLength("1", depth)
                setSeen(rock, depth - MAX_DEPTH, length)
                return length
            } else if (rock.length % 2 === 0) {
                let length = calculateLength(rock.substring(0, rock.length / 2), depth)
                let newText = rock.substring(rock.length / 2).replace(/^(0)+/gm, "")
                newText = newText.length > 0 ? newText : "0"
                length += calculateLength(newText, depth)
                setSeen(rock, depth - MAX_DEPTH, length)
                return length
            } else {
                let length = calculateLength(("" + (rock * 2024)), depth)
                setSeen(rock, depth - MAX_DEPTH, length)
                return length
            }
        } else {
            return 1
        }
    }
}