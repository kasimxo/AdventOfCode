const {readLines} = require('../../input')
const ACTIVE = 1
const INACTIVE = 0
let input = readLines().map(line=> {return line.split('').map(c=>c==='#' ? ACTIVE : INACTIVE)})

/**
 * Every cell is stored as:
 * X-Y-Z-W
 */
let cells = new Set()

/**
 * In order to minimize our board size, 
 * we need to define our cube size
 */
let minX = Infinity
let maxX = -Infinity
let minY = Infinity
let maxY = -Infinity
let minZ = -1
let maxZ = 1
let minW = -1
let maxW = 1

/**
 * When we first load cells positions, we consider Z = 0 and W = 0
 */
for(let y = 0; y<input.length; y++){
    for(let x = 0; x<input[y].length; x++){
        let curr = input[y][x]
        if(curr===ACTIVE) {
            cells.add(`${x}-${y}-0-0`)
            minX = Math.min(minX, x-1)
            maxX = Math.max(maxX, x+1)
            minY = Math.min(minY, y-1)
            maxY = Math.max(maxY, y+1)
            //minZ = Math.min(minZ, z-1)
            //maxZ = Math.max(maxZ, z+1)
            //minW = Math.min(minW, w-1)
            //maxW = Math.max(maxW, w+1)
        }
    }
}

/**
 * Now we can start properly simulating the board
 */
console.log(cells)

// i: simulation step
for(let i = 0; i<6; i++){
    console.log(i)
    let newCells = new Set()
    let minXNew = Infinity
    let maxXNew = -Infinity
    let minYNew = Infinity
    let maxYNew = -Infinity
    let minZNew = Infinity
    let maxZNew = -Infinity
    let minWNew = Infinity
    let maxWNew = -Infinity
    for(let w = minW; w<=maxW; w++) {
        for(let z = minZ; z<=maxZ; z++){
            for(let y = minY; y<=maxY; y++){
                for(let x = minX; x<=maxX; x++){
                    let currState = cells.has(`${x}-${y}-${z}-${w}`) ? ACTIVE : INACTIVE
                    let variations = GenerateVariations(x, y, z, w)
                    let neighbors = variations.reduce((acc, curr)=> acc += cells.has(curr), 0)
                    let newCell = INACTIVE
                    if(currState == ACTIVE && (neighbors === 2 || neighbors === 3)){
                        newCell = ACTIVE
                    } else if(currState == INACTIVE && neighbors === 3){
                        newCell = ACTIVE
                    }

                    if(newCell === ACTIVE){
                        newCells.add(`${x}-${y}-${z}-${w}`)
                        minXNew = Math.min(minXNew, x-1)
                        maxXNew = Math.max(maxXNew, x+1)
                        minYNew = Math.min(minYNew, y-1)
                        maxYNew = Math.max(maxYNew, y+1)
                        minZNew = Math.min(minZNew, z-1)
                        maxZNew = Math.max(maxZNew, z+1)
                        minWNew = Math.min(minWNew, w-1)
                        maxWNew = Math.max(maxWNew, w+1)
                    }
                }
            }
        }
    }

    minX = minXNew
    maxX = maxXNew
    minY = minYNew
    maxY = maxYNew
    minZ = minZNew
    maxZ = maxZNew
    minW = minWNew
    maxW = maxWNew
    cells = newCells
}
console.log(cells.size)

function GenerateVariations(xLocal, yLocal, zLocal, wLocal){
    let combinations = []
    for(let currW = wLocal - 1; currW <= wLocal + 1; currW++){
        for(let currZ = zLocal - 1; currZ <= zLocal + 1; currZ++){
            for(let currY = yLocal - 1; currY <= yLocal + 1; currY++){
                for(let currX = xLocal - 1; currX <= xLocal + 1; currX++){
                    if(currX !== xLocal
                            || currY !== yLocal
                            || currZ !== zLocal
                            || currW !== wLocal){
                        combinations.push(`${currX}-${currY}-${currZ}-${currW}`)
                    } 
                }
            }
        }
    }
    return combinations
}