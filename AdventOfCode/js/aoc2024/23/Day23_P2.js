const { readLines } = require('./input')

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
// bq,fz,gk,hu,im,ip,kv,mn,nd,ro,tt,ve
// bq,fz,gk,hu,im,ip,kv,mn,nd,ro,tt,ve
// bq,fz,gk,hu,im,ip,kv,mn,nd,ro,tt,ve
let nodes = {}
let countedFor = []
let biggest = []
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
let len = Object.keys(nodes).length
let valid = 0
let seen = []
Object.entries(nodes).forEach(([k, v], index) => {
    console.log("NEW", index, " / " + len)
    let checkArr = v.filter((e) => !seen.some((el) => el === e))
    console.log("Discarded: ", v.length - checkArr.length)
    checkArr.forEach((el, i) => {
        console.log(i, checkArr.length, biggest.length)
        let newArr = [k, el]
        let newRemaining = checkArr.filter((e) => e !== el)
        growGraph(newArr, newRemaining)
    })
    seen.push(k)
})
console.log(valid)
console.log("Solution: ", biggest.sort().join(','))

/**
 * Recibe dos arrays, uno el del grafo completo y el otro el de nodos que quedan por comprobar
 * va creciendo el grafo completo con todas las versiones
 * @param {*} arr 
 * @param {*} remaining 
 */
function growGraph(arr, remaining) {
    if (arr.length + remaining.length <= biggest.length) {
        console.log("descartado")
        return
    }
    if (remaining.length === 0 && biggest.length < arr.length) {
        biggest = arr
        console.log("FIN", arr)
    } else {
        let none = true
        remaining.forEach((el) => {
            if (isPosible(arr, el)) {
                let newArr = []
                let newRemaining = remaining.filter((e) => e !== el)
                arr.forEach((e) => newArr.push(e))
                newArr.push(el)
                //console.log("na", arr, newArr, newRemaining)
                growGraph(newArr, newRemaining)
                none = false
            }
        })
        if (none) {
            if (biggest.length < arr.length) {
                biggest = arr
                console.log(biggest.sort().join(','))
            }
        }
    }
}

/** Me dice si puedo agregar un nodo a un arr:
 * es decir, si está conectado a todo el resto de nodos en el arr
 */
function isPosible(arr, node) {
    let posible = true
    arr.forEach((el) => {
        if (posible && nodes[node].find((e) => e === el) === undefined) {
            posible = false
        }
    })
    return posible
}