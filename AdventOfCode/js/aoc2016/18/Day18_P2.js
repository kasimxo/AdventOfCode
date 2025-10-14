let input = ".^^^.^.^^^.^.......^^.^^^^.^^^^..^^^^^.^.^^^..^^.^.^^..^.^..^^...^.^^.^^^...^^.^.^^^..^^^^.....^...."
let [SAFE, TRAP] = [true, false]
let safeCount = input.replaceAll('^', '').length
for(let row = 0; row<399999; row++){
    let nextRow=''
    for(let i = 0; i<input.length; i++){
        let left = i > 0 ? GetPositionStatus(input[i-1]) : SAFE
        let center = GetPositionStatus(input[i])
        let right = i<input.length-1 ? GetPositionStatus(input[i+1]) : SAFE
        if((!left && !center && right)
        || (left && !center && !right)
        || (!left && center && right)
        || (left && center && !right)){
            nextRow += '^'
        } else {
            nextRow += '.'
            safeCount++
        }
    }
    input = nextRow
}
console.log(safeCount)

function GetPositionStatus(cell){
    return cell === '.' ? SAFE : TRAP
}