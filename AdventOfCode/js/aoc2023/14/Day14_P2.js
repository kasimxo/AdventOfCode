const { readLines } = require('../../input')
let board = readLines()
let cache = new Set(board.join(''))
let loads = [[board.join(''), CalculateLoad(board)]]
let index = 1
let unique = true
while(unique){
    board = TiltAndRotate(board)
    index++
}

console.log("REPEATED STATE AFTER", index, "ITERATIONS")
let repeatedIndex = loads.findIndex(c=>c[0].localeCompare(board.join(''))===0)
console.log("REPEATED INDEX IS", repeatedIndex)
let period = index - repeatedIndex 
console.log("PERIOD IS", period)
loads = loads.slice(repeatedIndex)
let num = 1000000000 * 4
console.log("SOLUTION", loads[(num-repeatedIndex+1)%period][1])

function TiltAndRotate(inputBoard){
    let tilted = Tilt(inputBoard)
    let rotated = RotateOnce(tilted)
    let result = board.join('')
    if(!cache.has(result)){
        cache.add(result)
        loads.push([result, CalculateLoad(board)])
    } else {
        loads.push([result, CalculateLoad(board)])
        unique = false
    }
    return rotated
}

function Tilt(oldBoard){
    let newInputSimulated = []
    for (let i = 0; i < oldBoard.length; i++) {
        newInputSimulated.push([])
        for (let j = 0; j < oldBoard[i].length; j++) {
            newInputSimulated[i].push(oldBoard[j][i])
        }
    }
    // now we join it to make every row (old column) an string
    newInputSimulated = newInputSimulated.map(l => l.join(''))
    let res = []
    for (let i = 0; i < newInputSimulated.length; i++) {
        let currRow = newInputSimulated[i]
        // we use a regex to make groups by #, but also very important to add '?' in case there is no # in the whole column
        let matches = currRow.match(/[.O]*#?/gm)
        // move every rock to the begining of the column
        let newRow = matches.map(l => {
            let clean = l.replaceAll('O', '')
            let numO = l.length - clean.length
            return 'O'.repeat(numO) + clean
        }).join('')
        newInputSimulated[i] = newRow
        res.push(newRow)        
    }
    // Return everything to normal
    let newInputSimulated2 = []
    for (let i = 0; i < newInputSimulated.length; i++) {
        newInputSimulated2.push([])
        for (let j = 0; j < newInputSimulated[i].length; j++) {
            newInputSimulated2[i].push(newInputSimulated[j][i])
        }
    }
    newInputSimulated2 = newInputSimulated2.map(l => l.join(''))
    return newInputSimulated2;
}

function RotateOnce(input){
    let newInput = []
    for(let y = 0; y<input.length; y++){
        newInput.push([''])
        for(let x = input[y].length-1; x>=0; x--){
            newInput[y] += input[x][y]
        }
    }
    return newInput
}

function CalculateLoad(input){
    let sol = 0;
    for(let i = input.length-1; i>=0; i--){
        input[i].split('').forEach(c=>sol+=c==='O'? input.length-i :0)
    }
    return sol
}

