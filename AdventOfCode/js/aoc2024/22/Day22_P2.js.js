const { readLines } = require('./../../input')

let text = [
    '1',
    '2',
    '3',
    '2024'
]
text = readLines()
let totSum = 0
let posible = {}
//let difKeys = []
text.forEach((line, j) => {
    console.log(j, text.length)
    let prices = []
    let changes = []
    let num = Number.parseInt(line)
    for (let i = 0; i < 2000; i++) {
        prices.push(num % 10)
        if (i > 0) {
            changes.push(prices[i] - prices[i - 1])
        }
        num = nextStep(num)
    }
    prices.push(num % 10)
    changes.push(prices[prices.length - 1] - prices[prices.length - 2])
    let seen = []
    for (let i = 4; i < prices.length; i++) {
        let comb = [changes[i - 4], changes[i - 3], changes[i - 2], changes[i - 1]]
        let combJoined = comb.join(',')
        if (!seen.some((el) => el[0] === comb[0] && el[1] === comb[1] && el[2] === comb[2] && el[3] === comb[3])) {
            if (posible[combJoined] !== undefined) {
                posible[combJoined] += prices[i]
            } else {
                posible[combJoined] = prices[i]
            }
            seen.push(comb)
        }
    }
})

Object.entries(posible).forEach(([k, v]) => {
    totSum = Math.max(totSum, v)
})


console.log("Solucion: ", totSum)


function nextStep(num) {
    let mul = num * 64
    let xorMul = mul ^ num
    let prunMul = xorMul % 16777216
    let div = Math.floor(prunMul / 32)
    let xorDiv = div ^ xorMul
    let prunDiv = xorDiv % 16777216
    let lastMul = prunDiv * 2048
    let lastXor = (lastMul ^ prunDiv) >>> 0
    let lastPrun = lastXor % 16777216
    if (lastPrun < 0) {
        console.log(prunDiv, lastMul, lastXor, lastPrun)
        throw new Error
    }
    return lastPrun
}