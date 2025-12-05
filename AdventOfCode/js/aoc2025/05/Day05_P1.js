const { readLines } = require('../../input')

let input = readLines()
let sol = 0

let ranges = []
let inRanges = true

input.forEach(line => {
    //console.log(line, inRanges)
    if (line.length === 0) {
        //ranges = processRanges(ranges)
        inRanges = false
    } else if (inRanges) {
        let range = line.split('-').map(Number)
        ranges.push([range[0], range[1]])
    } else {
        let test = ranges.some(pair => {
            let id = Number.parseInt(line)
            return pair[0] <= id && id <= pair[1]
        })
        if(test) {
            sol++
        }
    }
    return

})
console.log(ranges)

console.log("SOLUTION:", sol)