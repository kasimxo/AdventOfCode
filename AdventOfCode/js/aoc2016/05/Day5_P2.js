const { readLines } = require('./input')
let md5 = require('js-md5');

let text = 'uqwqemis'
//text = 'abc'
let cont = 0
let calculated = 0
let password = Array(8).fill(undefined)

while (calculated < 8) {
    let result = md5.hex(text + cont);
    if (result.substring(0, 5).localeCompare('00000') === 0) {
        if (Number.parseInt(result[5]) >= 0 && Number.parseInt(result[5]) < 8 && password[Number.parseInt(result[5])] === undefined) {
            password[Number.parseInt(result[5])] = result[6]
            console.log(cont, result, password)
            calculated++
        }
    }
    cont++
}

console.log('Solucion: ', password.join(''))