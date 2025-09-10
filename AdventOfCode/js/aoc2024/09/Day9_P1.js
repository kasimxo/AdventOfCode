const { readInput } = require('./../../input')

let text = readInput()

let count = 0
let expandedText = ''
let fileId = 0
for (let i = 0; i < text.length; i++) {
    if (i % 2 === 0) {
        // FILE
        for (let j = 0; j < Number.parseInt(text[i]); j++) {
            expandedText += Math.floor(i / 2) + ";"
        }

        fileId++
    } else {
        // FREE MEMORY
        for (let j = 0; j < Number.parseInt(text[i]); j++) {
            expandedText += ".;"
        }
    }
}
let l = 0
let arr = expandedText.split(';')
let r = arr.length - 2
console.log(arr)
while (l !== r) {
    if (arr[l] !== ".") {
        count += Number.parseInt(arr[l]) * l
    } else {
        while (arr[r] === ".") {
            r--
        }
        count += Number.parseInt(arr[r]) * l
        r--
    }
    l++
}
if (arr.length % 2 !== 0) {
    count += Number.parseInt(arr[l]) * l
}
console.log('Solucion: ', count, typeof count)