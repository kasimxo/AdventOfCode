const { readLines } = require('../../input')
let input = readLines().map(l => l.split(' | ').map(t => t.split(' ')))
let sol = 0
input.forEach((l, i) => {
    sol += calculateOutput(l)
})
console.log(sol)

function calculateOutput(l) {
    let code = l[0]
    let output = l[1]
    let possibles = {
        1: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
        2: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
        3: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
        4: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
        5: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
        6: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
        7: new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    }
    let decoding = true
    while (decoding) {
        code.forEach(d => {
            let segments = new Set(d)
            switch (segments.size) {
                case 2:
                    possibles[1] = possibles[1].difference(segments)
                    possibles[2] = possibles[2].difference(segments)
                    possibles[3] = possibles[3].intersection(segments)
                    possibles[4] = possibles[4].difference(segments)
                    possibles[5] = possibles[5].difference(segments)
                    possibles[6] = possibles[6].intersection(segments)
                    possibles[7] = possibles[7].difference(segments)
                    break;
                case 3:
                    possibles[1] = possibles[1].intersection(segments)
                    possibles[2] = possibles[2].difference(segments)
                    possibles[3] = possibles[3].intersection(segments)
                    possibles[4] = possibles[4].difference(segments)
                    possibles[5] = possibles[5].difference(segments)
                    possibles[6] = possibles[6].intersection(segments)
                    possibles[7] = possibles[7].difference(segments)
                    break;
                case 4:
                    possibles[1] = possibles[1].difference(segments)
                    possibles[2] = possibles[2].intersection(segments)
                    possibles[3] = possibles[3].intersection(segments)
                    possibles[4] = possibles[4].intersection(segments)
                    possibles[5] = possibles[5].difference(segments)
                    possibles[6] = possibles[6].intersection(segments)
                    possibles[7] = possibles[7].difference(segments)
                    break;
                case 5:
                    possibles[1] = possibles[1].intersection(segments)
                    possibles[4] = possibles[4].intersection(segments)
                    possibles[7] = possibles[7].intersection(segments)
                    break;
                case 6:
                    possibles[1] = possibles[1].intersection(segments)
                    possibles[2] = possibles[2].intersection(segments)
                    possibles[6] = possibles[6].intersection(segments)
                    break;
                case 7:
                    possibles[1] = possibles[1].intersection(segments)
                    possibles[2] = possibles[2].intersection(segments)
                    possibles[3] = possibles[3].intersection(segments)
                    possibles[4] = possibles[4].intersection(segments)
                    possibles[5] = possibles[5].intersection(segments)
                    possibles[6] = possibles[6].intersection(segments)
                    possibles[7] = possibles[7].intersection(segments)
                    break;
                default:
                    break;
            }
        })
        let done = true
        for (let i = 1; i <= 7; i++) {
            let set = possibles[i]
            if (set.size === 1) {
                for (let j = 1; j <= 7; j++) {
                    if (i !== j) {
                        possibles[j] = possibles[j].difference(set)
                    }
                }
            } else {
                done = false
            }
        }
        decoding = done
    }

    let correspondance = {
        0: new Set([...possibles[1], ...possibles[2], ...possibles[3], ...possibles[5], ...possibles[6], ...possibles[7]]),
        1: new Set([...possibles[3], ...possibles[6],]),
        2: new Set([...possibles[1], ...possibles[3], ...possibles[4], ...possibles[5], ...possibles[7]]),
        3: new Set([...possibles[1], ...possibles[3], ...possibles[4], ...possibles[6], ...possibles[7]]),
        4: new Set([...possibles[2], ...possibles[3], ...possibles[4], ...possibles[6],]),
        5: new Set([...possibles[1], ...possibles[2], ...possibles[4], ...possibles[6], ...possibles[7]]),
        6: new Set([...possibles[1], ...possibles[2], ...possibles[4], ...possibles[5], ...possibles[6], ...possibles[7]]),
        7: new Set([...possibles[1], ...possibles[3], ...possibles[6],]),
        8: new Set([...possibles[1], ...possibles[2], ...possibles[3], ...possibles[4], ...possibles[5], ...possibles[6], ...possibles[7]]),
        9: new Set([...possibles[1], ...possibles[2], ...possibles[3], ...possibles[4], ...possibles[6], ...possibles[7]])
    }

    let value = ''
    output.forEach(p => {
        let digit = new Set(p.split(''))
        Object.entries(correspondance).forEach(([k, v]) => {
            let dif = digit.symmetricDifference(v)
            if (dif.size === 0) value = value + k
        })
    })
    return Number.parseInt(value)
}