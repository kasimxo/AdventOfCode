const { readLines } = require('./../../input')

let text = [
    'kh-tc',
    'qp-kh',
    'de-cg',
    'ka-co',
    'yn-aq',
    'qp-ub',
    'cg-tb',
    'vc-aq',
    'tb-ka',
    'wh-tc',
    'yn-cg',
    'kh-ub',
    'ta-co',
    'de-co',
    'tc-td',
    'tb-wq',
    'wh-td',
    'ta-ka',
    'td-qp',
    'aq-cg',
    'wq-ub',
    'ub-vc',
    'de-ta',
    'wq-aq',
    'wq-vc',
    'wh-yn',
    'ka-de',
    'kh-ta',
    'co-tc',
    'wh-qp',
    'tb-vc',
    'td-yn'
]
text = readLines()
let nodes = {}
let countedFor = []
let count = 0
text.forEach((line) => {
    let split = line.split('-')
    let from = split[0]
    let to = split[1]
    if (nodes[from] !== undefined) {
        nodes[from].push(to)
    } else {
        nodes[from] = [to]
    }

    if (nodes[to] !== undefined) {
        nodes[to].push(from)
    } else {
        nodes[to] = [from]
    }
})

Object.entries(nodes).forEach(([k, v]) => {
    if (k.indexOf("t") === 0) {
        let variations = []
        for (let i = 0; i < v.length; i++) {
            for (let j = i + 1; j < v.length; j++) {
                variations.push([v[i], v[j]])
            }
        }
        variations.forEach((par) => {
            if (nodes[par[0]].some((el) => el === par[1])) {
                let variation = [k, par[0], par[1]]
                variation.sort()
                if (!countedFor.some((el) => el[0] === variation[0] && el[1] === variation[1] && el[2] === variation[2])) {
                    console.log("MATCH: ", variation)
                    countedFor.push(variation)
                    count++
                }
            }
        })
    }
})


console.log("Solution: ", count)