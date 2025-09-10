const { readInput } = require('./../../input')

// MD5(bgvyzdsv + numero decimal) => 00000
var texto = readInput()
//texto = 'abcdef'
var index = 0

var md5 = require('js-md5');

var calculando = true
while (calculando) {
    var result = md5.hex(texto + index);
    if (result.substring(0, 6).localeCompare('000000') === 0) {
        calculando = false
        console.log(result)
    } else {
        index++
    }
}
console.log('done', index)


