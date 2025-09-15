const { readLines } = require('../../input')
let instructions = "LLRLLRRLRLRRRLRRLLRRRLRLRLRRLRRRLRRLRLRLLRLLLRRRLRRLRRRLRRRLRRRLRLRRLLRRLRRLRRLRRRLRLRRRLLRLRRLRRRLRLRRRLRRRLRLRRRLLRRRLRRRLRLRRLRLRRRLLRRLRRLRRLRRLRLRLRRRLLRRRLRRLRRRLRLRLRRRLLRLRRLLRLRRLRLRRRLRLRRLLRRRLLRRLRLRLLRLLRRLRRLLRRLRLRRLRLRLRRRLRRLRLLLLRRLRLRLRRRLLLRRRLRRLRRLRLLRLRRRLLLRRRLRRRLRRRR"
let input = readLines().map(l => l.split(' = '))
let keys = {}
input.forEach(p => {
    let directions = p[1].split(', ')
    keys[p[0]] = {
        L: directions[0].replaceAll('(', ''),
        R: directions[1].replaceAll(')', '')
    }
})
let starters = Object.keys(keys).filter(k => k[2] === 'A')
let mins = []
let steps = 0
while (starters.find(k => k[2] !== 'Z') !== undefined) {
    let at = instructions[steps % instructions.length]
    let newArr = []
    starters.forEach(k => {
        let newElement = keys[k][at]
        if (newElement[2] === 'Z') {
            mins.push(steps + 1)
        } else {
            newArr.push(newElement)
        }
    })
    starters = newArr
    steps++
}
let sol = mins.reduce((acc, curr) => acc = mCM(acc, curr))
console.log(sol)

function mCD(a, b) {
    let tmp;
    while (b !== 0) {
        tmp = b;
        b = a % b;
        a = tmp;
    }
    return a;
};

function mCM(a, b) {
    return (a * b) / mCD(a, b);
};

