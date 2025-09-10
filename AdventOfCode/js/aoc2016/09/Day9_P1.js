const { readInput } = require('./../../input')
var text = readInput()
let i = 0
let length = 0

while (i < text.length) {

    if (text[i].localeCompare('(') === 0) {
        let open = true
        let marker = ''
        let count = i + 1
        while (open) {
            if (text[count].localeCompare(')') === 0) {
                open = false
            } else {
                marker += text[count]
                count++
            }
        }
        let parts = marker.split('x')
        length += Number.parseInt(parts[0]) * Number.parseInt(parts[1])
        i = count + Number.parseInt(parts[0]) + 1
        console.log(parts, count, length)
    } else {
        i++
        length++
    }


    //console.log(length)
}

console.log(length)

