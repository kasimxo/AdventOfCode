const { readLines } = require('./../../input')
let text = readLines()

text = [
    'eedadn',
    'drvtee',
    'eandsr',
    'raavrd',
    'atevrs',
    'tsrnev',
    'sdttsa',
    'rasrtv',
    'nssdts',
    'ntnada',
    'svetve',
    'tesnvt',
    'vntsnd',
    'vrdear',
    'dvrsen',
    'enarar'
]

let ans = ''
// Array(input.length)
//Para cada posición dentro del array, un mapa:
// 'letra': núm de apariciones
// al terminar de iterar el input, sacar del array, e, el elemento del mapa con mas apariciones

let chars = Array(text[0].length).fill(undefined)

text.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
        if (chars[i] !== undefined && chars[i].hasOwnProperty(line[i])) {
            chars[i][line[i]]++
        } else if (chars[i] === undefined) {
            chars[i] = { [line[i]]: 1 }
        } else {
            chars[i][line[i]] = 1
        }
    }
})

chars.forEach((obj) => {
    let [k, v] = ['qq', 0]
    Object.keys(obj).forEach((key) => {
        if (obj[key] > v) {
            k = key
            v = obj[key]
        }
    })
    ans += k
})

console.log(ans)