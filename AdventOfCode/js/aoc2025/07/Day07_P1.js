const { readLines } = require('../../input')

let input = readLines()
let sol = 0
input[0] = input[0].replaceAll('S', '|')
for (let rowNum = 1; rowNum < input.length; rowNum++) {
    let prevRow = input[rowNum - 1]
    let currRow = input[rowNum]
    for (let charAt = 0; charAt < currRow.length; charAt++) {
        if (prevRow[charAt] == '|' && currRow[charAt] == '.') {
            currRow = currRow.substring(0, charAt) + '|' + currRow.substring(charAt + 1)
        } else if (prevRow[charAt] == '|' && currRow[charAt] == '|') {

        } else if (prevRow[charAt] == '|' && currRow[charAt] == '^') {
            if(charAt > 0) currRow = currRow.substring(0, charAt-1) + '|' + currRow.substring(charAt)
            
            if(charAt < currRow.length-1) currRow = currRow.substring(0, charAt+1) + '|' + currRow.substring(charAt+2)
            
            sol++
        }
    }
    input[rowNum] = currRow
}
console.log(sol)