const { readLines } = require('./input')

let text = [
    'RRRRIICCFF',
    'RRRRIICCCF',
    'VVRRRCCFFF',
    'VVRCCCJFFF',
    'VVVVCJJCFE',
    'VVIVCCJJEE',
    'VVIIICJJEE',
    'MIIIIIJJEE',
    'MIIISIJEEE',
    'MMMISSJEEE'
]
/*
text = [
    'AAAAA',
    'AABAA',
    'AABBA',
    'AABAA'
]
*/
text = readLines()
// 1162084 too low

let polygons = []
/* 
polygon: {
    letter:x,
    area:x,
    price:x
}
*/

let seen = Array(text.length)
let seenPrice = Array(text.length)

for (let i = 0; i < seen.length; i++) {
    seen[i] = Array(text[0].length).fill(0)
    seenPrice[i] = Array(text[0].length).fill(0)
}

for (let y = 0; y < seen.length; y++) {
    for (let x = 0; x < seen[0].length; x++) {
        if (seen[y][x] === 0) {
            polygons.push(floodFill(y, x))
        }
    }
}
let priceTotal = 0

polygons.forEach((p) => priceTotal += p.area * p.price)


console.log("Solucion: ", priceTotal)

function floodFill(y, x) {
    let letter = text[y][x]
    seen[y][x] = 1
    let polygon = {
        letter: letter,
        area: expandArea(y + 0, x + 0, letter),
        price: expandPrice(y + 0, x + 0, letter)
    }
    return polygon
}

function expandPrice(y, x, letter) {
    let price = 0
    seenPrice[y][x] = 1

    if (text[y][x + 1] !== letter) {
        price += 1
    } else if (text[y][x + 1] === letter && seenPrice[y][x + 1] === 0) {
        price += expandPrice(y, x + 1, letter)
    }

    if (text[y][x - 1] !== letter) {
        price += 1
    } else if (text[y][x - 1] === letter && seenPrice[y][x - 1] === 0) {
        price += expandPrice(y, x - 1, letter)
    }

    if (text[y + 1] === undefined || text[y + 1] !== undefined && text[y + 1][x] !== letter) {
        price += 1
    } else if (text[y + 1] !== undefined && text[y + 1][x] === letter && seenPrice[y + 1][x] === 0) {
        price += expandPrice(y + 1, x, letter)
    }

    if (text[y - 1] === undefined || text[y - 1] !== undefined && text[y - 1][x] !== letter) {
        price += 1
    } else if (text[y - 1] !== undefined && text[y - 1][x] === letter && seenPrice[y - 1][x] === 0) {
        price += expandPrice(y - 1, x, letter)
    }
    return price
}

function expandArea(y, x, letter) {
    let area = 1
    seen[y][x] = 1
    if (text[y][x + 1] === letter && seen[y][x + 1] === 0) {
        area += expandArea(y, x + 1, letter)
    }
    if (text[y][x - 1] === letter && seen[y][x - 1] === 0) {
        area += expandArea(y, x - 1, letter)
    }
    if (text[y + 1] !== undefined && text[y + 1][x] === letter && seen[y + 1][x] === 0) {
        area += expandArea(y + 1, x, letter)
    }
    if (text[y - 1] !== undefined && text[y - 1][x] === letter && seen[y - 1][x] === 0) {
        area += expandArea(y - 1, x, letter)
    }
    return area
}