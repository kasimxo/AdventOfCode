const {readLines} = require('./../../input')

let checkSum = 0
readLines().forEach(line => {
    let nums = line.split("\t").map(n=> Number.parseInt(n))
    let min = Infinity
    let max = 0
    nums.forEach(n => {
        if(n<min){
            min = n
        } 
        if(n>max){
            max = n
        }
    })
    checkSum += max-min
})

console.log("Solution: ", checkSum)