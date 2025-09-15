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
let curr = 'AAA'
let steps = 0
while (curr !== 'ZZZ') {
    let at = instructions[steps % instructions.length]
    curr = keys[curr][at]
    steps++
}
console.log(steps)
