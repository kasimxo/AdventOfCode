const { readLines } = require('../../input')

let input = readLines()
let sol = 0

let ranges = []
let inRanges = true

input.forEach(line => {
    if (line.length === 0) {
        ranges = processRanges(ranges)
        inRanges = false
    } else if (inRanges) {
        let range = line.split('-').map(Number)
        ranges.push([range[0], range[1]])
    }
    return
})

ranges.forEach(range => {
    sol  += range[1] - range[0] + 1
})
console.log("SOLUTION", sol)

function processRanges(initialRanges) {
    let changes = true
    while (changes) {
        changes = false
        let newRanges = []

        initialRanges.forEach(range => {
            let inRange = newRanges.findIndex(([min, max]) => {
               return !(min < range[0] && max <range[0])
               && !(min>range[1]&& max > range[1])
            })
            if (inRange === -1) {
                newRanges.push(range)
            } else {
                let curr = newRanges[inRange]
                newRanges[inRange] = [Math.min(range[0], curr[0]), Math.max(range[1], curr[1])]
                changes = true
            }
        })

        initialRanges = newRanges
    }

    return initialRanges
}
