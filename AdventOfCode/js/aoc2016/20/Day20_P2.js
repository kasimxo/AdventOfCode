const {readLines} = require('../../input')
let input = readLines().map(l=>l.split('-').map(n=>Number.parseInt(n))).sort((a, b)=>a[0]-b[0])
let MAX_VALUE = 4294967295 + 1 // We add one bcs 0 is a valid ip
let LastRange = input[0]
for(let i = 0; i<input.length; i++){
    let minOne = input[i][0]
    let maxOne = input[i][1]
    if(minOne>LastRange[1]||maxOne<LastRange[0]){
        LastRange = [minOne, maxOne]
    }
    let newRange = LastRange
    for(let j = i+1; j<input.length; j++){
        let minTwo = input[j][0]
        let maxTwo = input[j][1]
        if(minTwo>=minOne-1&&minTwo<=maxOne+1){
            newRange[1] = Math.max(newRange[1], maxTwo)
        }
        if(maxTwo>=minOne-1&&maxTwo<=maxOne+1){
            newRange[0] = Math.min(newRange[0], minTwo)
        }
    }
    input[i] = newRange
}
let ranges = new Set(input.map(i=>i.join('-'))) // remove duplicates
ranges.values().forEach(p=>{
    let splitted = p.split('-').map(n=>Number.parseInt(n))
    let diff = splitted[1] - splitted[0] + 1 // again, it's inclusive
    MAX_VALUE = MAX_VALUE - diff
})

console.log(MAX_VALUE)