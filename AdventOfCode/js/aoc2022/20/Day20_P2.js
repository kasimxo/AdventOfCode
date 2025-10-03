const { readLines } = require('../../input')
let instructions = readLines().map(n => Number.parseInt(n))
let input = []
instructions.forEach((e, i) => input.push([e*811589153, i, e]))
for(let i = 0; i<10; i++){
    input = MoveNumbers(input)
}
let zeroIndex = input.findIndex(e => e[0] === 0)
let firstIndex = (1000 + zeroIndex) % input.length
let secondIndex = (2000 + zeroIndex) % input.length
let thirdIndex = (3000 + zeroIndex) % input.length

console.log("SOLUTION:", input[firstIndex][0] + input[secondIndex][0] + input[thirdIndex][0])

function MoveNumbers(arr){
    const LENGTH = arr.length
    for(let i = 0; i<arr.length; i++){
        let index = arr.findIndex(e => e[1] === i)
        let el = arr[index]
        arr.splice(index, 1)
        let newIndex = (index + el[0]) % arr.length
        if (el[0]!==0&& newIndex === 0) newIndex = arr.length
        else if(el[0]===0&&newIndex === LENGTH-1) newIndex = 0
        arr.splice(newIndex, 0, el)
    }
    return arr
}