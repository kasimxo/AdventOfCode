const { readLines } = require('./input')
let text = readLines()
let combos = []
let count = 0
text.forEach((line, index) => {
    console.log(index, text.length)
    if (index === 0) {
        combos = line.split(',').map((el) => el.trim())
    } else if (index > 1) {
        count += validateLine(line)
    }
})
console.log(count)

function validateLine(line) {
    let valid = false
    if (line.length === 0) {
        valid = true
    } else {
        combos.forEach((cb) => {
            if (!valid && line.indexOf(cb) === 0) {
                valid = validateLine(line.substring(cb.length))
            }
        })
    }
    return valid
}