const { readLines } = require('./../../input')
var text = readLines()
/*
text = [
    'abba[mnop]qrst',
    'abcd[bddb]xyyx',
    'aaaa[qwer]tyui',
    'ioxxoj[asdfgh]zxcvbn'
]
*/
let count = 0
text.forEach((ip) => {
    //Validar que las letras FUERA de corchetes cumplen con ABBA
    //Validar que las letras DENTRO de conchetes NO cumplen con ABBA
    //let valid = validateString(ip)
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
    if (validateString(outside) && !validateString(inside)) {
        count++
        valid = true
    }
})
console.log('Solución: ', count)

function validateString(string) {
    for (let i = 0; i < string.length; i++) {
        if (string[i] === string[i + 3] && string[i + 1] === string[i + 2] && string[i] !== string[i + 1]) {
            return true
        }
    }
    return false
}