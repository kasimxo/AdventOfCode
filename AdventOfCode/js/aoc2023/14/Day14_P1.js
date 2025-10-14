const {readLines} = require('../../input')
let input = readLines()

// first we rotate the input so that every column is a row
let newInput = []
for(let i = 0; i<input.length; i++){
    newInput.push([])
    for(let j = 0; j<input[i].length; j++){
        newInput[i].push(input[j][i])
    } 
}
// now we join it to make every row (old column) an string
newInput = newInput.map(l=>l.join(''))

let sol = 0

for(let i = 0; i<newInput.length; i++){
    let currRow = newInput[i]
    // we use a regex to make groups by #, but also very important to add '?' in case there is no # in the whole column
    let matches = currRow.match(/[.O]*#?/gm)
    // move every rock to the begining of the column
    let newRow = matches.map(l=>{
        let clean = l.replaceAll('O', '')
        let numO = l.length - clean.length
        return 'O'.repeat(numO) + clean
    }).join('')
    for(let j = newRow.length-1; j>= 0; j--){
        sol += newRow[j] === 'O' ? newRow.length-j : 0
    }    
}
console.log(sol)