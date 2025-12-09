const { readLines } = require('../../input')

let input = readLines().map(line => line.split(',').map(Number))

let maxArea = 0
for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
        let corner1 = input[i]
        let corner2 = input[j]
        let width = Math.abs(corner1[0] - corner2[0]) + 1
        let height = Math.abs(corner1[1] - corner2[1]) + 1
        currArea = Math.max(width * height, currArea)
    }
}
console.log(currArea)