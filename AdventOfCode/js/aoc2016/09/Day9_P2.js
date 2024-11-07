const { readInput } = require('./input')
var text = readInput()

let l = calculateLength(text)

console.log('Solución: ', l)


function calculateLength(str) {
    console.log(str, str.length)


    let i = 0
    let length = 0

    while (i < str.length) {

        if (str[i].localeCompare('(') === 0) {
            let open = true
            let marker = ''
            let count = i + 1
            while (open) {
                if (str[count].localeCompare(')') === 0) {
                    open = false
                } else {
                    marker += str[count]
                    count++
                }
            }
            let parts = marker.split('x')

            length += calculateLength(str.substring(count + 1, count + Number.parseInt(parts[0]) + 1)) * Number.parseInt(parts[1])


            //length += Number.parseInt(parts[0])
            i = count + Number.parseInt(parts[0]) + 1
            //console.log(parts, count, length)
        } else {
            i++
            length++
        }


        //console.log(length)
    }
    console.log(str, length)
    return length
}

//(18x9)(3x2)TWO(5x7)SEVEN -> 369
