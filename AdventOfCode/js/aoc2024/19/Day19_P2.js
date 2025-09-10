const { readLines } = require('./../../input')

let text = [
    'r, wr, b, g, bwu, rb, gb, br',
    '',
    'brwrr',
    'bggr',
    'gbbr',
    'rrbgbr',
    'ubwu',
    'bwurrg',
    'brgr',
    'bbrgwb',
]
text = readLines()
let combos = []
let count = 0
let cache = {}
text.forEach((line, index) => {
    if (index === 0) {
        combos = line.split(',').map((el) => el.trim())
    } else if (index > 1) {
        cache = {}
        count += validateLine(line)
    }
})
console.log(count)

function validateLine(line) {
    let valid = 0
    if (line.length === 0) {
        valid = 1
    } else {
        combos.forEach((cb) => {
            if (line.indexOf(cb) === 0) {
                let remaining = line.substring(cb.length)
                let knownVal = getCache(remaining)
                if (knownVal === undefined) {
                    knownVal = setCache(remaining)
                }
                valid += knownVal
            }
        })
    }
    return valid
}

function setCache(line) {
    let val = validateLine(line)
    cache[line] = val
    return val
}

function getCache(line) {
    return cache[line]
}
