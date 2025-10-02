const {readInput} = require('../../input')
let input = readInput().split(',')
let lenses = Array(256).fill([])
for(let i = 0; i<input.length; i++){
    let curr = input[i]
    let boxIndex = 0
    if(curr.indexOf('-')>=0){ // Minus operation
        let label = curr.replaceAll('-', '')
        boxIndex = CalculateHash(label) 
        lenses[boxIndex] = lenses[boxIndex].filter(l=>l[0].localeCompare(label)!==0)
    } else if(curr.indexOf('=')>=0){ // Equals operation
        let split = curr.split('=')
        boxIndex = CalculateHash(split[0])
        for(let i = 0; i<lenses.length; i++){
            if(i!==boxIndex){ // All other boxes
                lenses[i] = lenses[i].filter(l=>l[0].localeCompare(split[0])!==0)
            } else { // target box
                let indexOfLens = lenses[boxIndex].findIndex(l=>l[0].localeCompare(split[0])===0)
                if(indexOfLens>=0){
                    lenses[boxIndex][indexOfLens] = split
                } else {
                    lenses[boxIndex].push(split)
                }
            }
        }
    }
}

let sol = 0
lenses.forEach((box, boxIndex)=>{
    box.forEach(([label, lens], lensIndex)=>{
        sol += (boxIndex + 1) * (lensIndex + 1) * (lens)
    })
})
console.log(sol)

function CalculateHash(input){
    let value = 0
    for(let i = 0; i<input.length; i++){
        let ascii = input.charCodeAt(i)
        value = ((value+ascii) * 17) % 256
    }
    return value
}

