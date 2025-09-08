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
        if(num[l]===num[l+1]) twoSame = true
        if(Number.parseInt(num[l])>Number.parseInt(num[l+1])) increase = false
    }
    return (twoSame && increase) ? 1 : 0
}