const { readLines } = require('./../../input')

let text = [
    '123'
]
text = [
    '1',
    '10',
    '100',
    '2024'
]
text = readLines()
let totSum = 0
text.forEach((line) => {
    let num = Number.parseInt(line)

    for (let i = 0; i < 2000; i++) {
        //console.log(num)
        num = nextStep(num)
    }

    console.log(line, num)
    totSum += num
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