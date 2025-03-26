const {readLines} = require('./input')

let checkSum = 0
readLines().forEach(line => {
    let nums = line.split("\t").map(n=> Number.parseInt(n))
    for(let i = 0; i<nums.length; i++){
        for(let j = i+1; j<nums.length; j++){
            if(nums[i]%nums[j]===0){
                checkSum+= Math.round(nums[i]/nums[j])
            } else if(nums[j]%nums[i]===0){
                checkSum+= Math.round(nums[j]/nums[i])
            }
        }
    }
})

console.log("Solution: ", checkSum)