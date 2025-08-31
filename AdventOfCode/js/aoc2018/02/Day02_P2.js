const {readLines} = require('./input')

let input = readLines()
for(let i = 0; i<input.length; i++){
    let base = input[i]
    for(let j = i+1; j<input.length; j++){
        let compare = input[j]
        let mistakes = 0
        let solution = ''
        for(k = 0; k<base.length; k++){
            if(base[k]!==compare[k]) mistakes++
            else solution += base[k]
        }
        if(mistakes === 1) console.log("SOLUTION: ", solution)
    }
}