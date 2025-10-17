const { readLines } = require('../../input')
// You will have to add '0' to your input
// I could do it in program, but I don't want to
let input = readLines().sort((a, b) => a - b).map(n => Number.parseInt(n))
let target = input[input.length - 1] + 3 // Working backwards
let sol = 0
let cache = {}
sol += SimulatePath(target, input)
console.log(sol)


function SimulatePath(target, nodes) {
    if (target === 0) {
        return 1
    } else if (target < 0) {
        return 0
    }
    let pathValue = 0
    let newNodes = [...nodes]
    let last = newNodes.pop()
    if (last !== undefined && target - last <= 3) {
        pathValue += CheckCache(last, newNodes)
        let secondToLast = newNodes.pop()
        if (secondToLast !== undefined && target - secondToLast <= 3) {
            pathValue += CheckCache(secondToLast, newNodes)
            let thirdToLast = newNodes.pop()
            if (thirdToLast !== undefined && target - thirdToLast <= 3) {
                pathValue += CheckCache(thirdToLast, newNodes)
            }
        }
    } else {
        return 0
    }
    return pathValue
}

function CheckCache(last, newNodes) {
    let key = `${last}` + newNodes.join('')
    if (cache[key] !== undefined) {
        return cache[key]
    }
    let value = SimulatePath(last, newNodes)
    cache[key] = value
    return value
}