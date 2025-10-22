const {readlLines, readLines} = require('../../input')
let input = readLines()
let sum = 0
input.forEach(line => {
    line = line.replaceAll(' ', '')
    let changed = true
    while(changed){
        let parentheses = true
        let match = line.match(/.*\(([0-9]+[+*][0-9]+)\).*/)
        if(match === null) {
            parentheses = false
            match = line.match(/([0-9]+[+*][0-9]+)/)
        } 
        /**
         * I consider the use of eval() a little bit cheese but
         * implementing a sum o multi operation is easy
         * (already done in several other puzzles) and
         * I had never used eval so...
         */
        let result = eval(match[1])
        let newLine = ''
        if(parentheses){
            newLine = line.replace(`(${match[1]})`, result)
        } else {
            newLine = line.replace(`${match[1]}`, result)
        }
        changed = newLine !== line
        line = newLine
        let safeCheck = line.match(/[+*(]/)
        if(safeCheck === null){
            sum += Number.parseInt(line)
            break
        }
    }    
})
console.log(sum)