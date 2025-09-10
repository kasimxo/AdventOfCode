const { readLines } = require('./../../input')
var text = readLines()
/*
text = [
    'aba[bab]xyz',
    'xyx[xyx]xyx',
    'aaa[kek]eke',
    'zazbz[bzb]cdb'
]
*/
let count = 0
text.forEach((ip) => {
    let valid = false
    let outside = ''
    let inside = ''
    let sections = ip.split(/[\[\]]+/)
    sections.forEach((part, i) => {
        if (i % 2 === 0) {
            outside += part + '----'
        } else {
            inside += part + '----'
        }
    })
    let matches = returnMatch(outside)
    matches.forEach((match) => {
        if (inside.indexOf(match) >= 0 && valid === false) {
            valid = true
            count++
        }
    })

    console.log(ip, valid)
})
console.log('Solución: ', count)

function returnMatch(string) {
    let matches = []
    for (let i = 0; i < string.length; i++) {
        if (string[i] === string[i + 2] && string[i] !== string[i + 1]) {
            matches.push(string[i + 1] + string[i] + string[i + 1])
        }
    }
    return matches
}