const { readLines } = require('./../../input')
let md5 = require('js-md5');

let text = 'uqwqemis'
//text = 'abc'
let cont = 0
let password = ''

while (password.length < 8) {
    let result = md5.hex(text + cont);
    if (result.substring(0, 5).localeCompare('00000') === 0) {
        //console.log(cont, result, password)
        password += result[5]
    }
    cont++
}




console.log('Solucion: ', password)