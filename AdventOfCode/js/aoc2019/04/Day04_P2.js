const min = 254032
const max = 789860
let solution = 0
for(let i = min; i<max; i++){
    solution += ValidateNum(`${i}`) 
}

console.log("Solution: ", solution)
function ValidateNum(num){
    let twoSame = false
    let increase = true
    for(let l = 0; l<num.length-1; l++){
        if(Number.parseInt(num[l])>Number.parseInt(num[l+1])) increase = false
    }
    let letters = {}
    for(let l = 0; l<num.length; l++){
        if(letters[num[l]]===null || letters[num[l]]===undefined){
            letters[num[l]] = 1
        } else {
            letters[num[l]]++
        }
    }
    Object.values(letters).forEach(v=>{if(v===2) twoSame = true})
    return (twoSame && increase) ? 1 : 0
}