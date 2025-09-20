const {readLines} = require('../../input')
const [EMPTY, SEATED, FLOOR] = ['L', '#', '.']
let input = readLines()
/**
 * 
input = [
    "L.LL.LL.LL",
    "LLLLLLL.LL",
    "L.L.L..L..",
    "LLLL.LL.LL",
    "L.LL.LL.LL",
    "L.LLLLL.LL",
    "..L.L.....",
    "LLLLLLLLLL",
    "L.LLLLLL.L",
    "L.LLLLL.LL"
]

input = [
    "...",
    "LLL",
    "L.L"
]
 */

input = input.map(l=>l.split(''))


let change = true
while(change){
    change = false
    let newInput = []
    for(let y = 0; y < input.length; y++){
        newInput[y] = []
        for(let x = 0; x < input[y].length; x++){
            let cell1 = GetValue(input, y-1, x-1)
            let cell2 = GetValue(input, y-1, x)
            let cell3 = GetValue(input, y-1, x+1)
            let cell4 = GetValue(input, y, x-1)
            let cell6 = GetValue(input, y, x+1)
            let cell7 = GetValue(input, y+1, x-1)
            let cell8 = GetValue(input, y+1, x)
            let cell9 = GetValue(input, y+1, x+1)
            let curr = input[y][x]
            switch(curr){
                case EMPTY:
                    if(![cell1,cell2,cell3,cell4,cell6,cell7,cell8,cell9].includes(SEATED)){
                        newInput[y][x] = SEATED
                        change = true
                    } else {
                        newInput[y][x] = input[y][x]
                    }
                    break;
                case SEATED:
                    if([cell1,cell2,cell3,cell4,cell6,cell7,cell8,cell9].reduce((acc, curr)=>acc += curr === SEATED ? 1 : 0, 0) >= 4){
                        newInput[y][x] = EMPTY
                        change = true
                    } else {
                        newInput[y][x] = input[y][x]
                    }
                    break;
                case FLOOR:
                    newInput[y][x] = FLOOR
                    break;
                default:
                    newInput[y][x] = input[y][x]
                    break;
            }
        }
    }
    input = newInput
}

let sol = 0
input.forEach(l=>l.forEach(a=>sol+=a===SEATED?1:0))
console.log(sol)

function GetValue(input, y, x){
    if(input[y]!=null&&input[y]!=undefined&&input[y][x]!=null&&input[y][x]!=undefined){
        return input[y][x]
    }
    return FLOOR
}