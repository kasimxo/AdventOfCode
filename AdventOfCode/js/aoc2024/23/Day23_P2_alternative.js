const { readLines } = require('./../../input')

/**
 * This file solves Day 23 Part 2 with Bron Kerboschl algorithm, which
 * finds all maximal cliques in an undirected graph (check it out in wikipedia).
 * It is extremely faster than my original implementation, but I decided to keep it as
 * an alternative since I did not come up with this solution through my own means
 * (I did not know this algorithm beforehand / did not find it myself)
 */

let text = readLines()
let nodes = {}
let biggest = []
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
bronKerboschl(new Set(Object.keys(nodes)))

// You should find a unique biggest subgraph, which you can select with biggest[0]
console.log("Solution: ", [...biggest[0]].sort().join(','))

function bronKerboschl(P, R = new Set(), X = new Set()) {
    if (P.size === 0 && X.size === 0) {
        if (biggest[0] === undefined || R.size > biggest[0].size) {
            biggest = [R]
        } else if (biggest[0] !== undefined && R.size === biggest[0].size) {
            biggest.push(R)
        }
        return R
    } else {
        [...P].forEach((v) => {
            let V = new Set([v])
            let N = new Set(nodes[v])
            bronKerboschl(P.intersection(N), R.union(V), X.intersection(N))
            P = P.difference(V)
            X = X.union(V)
        })
    }
}

