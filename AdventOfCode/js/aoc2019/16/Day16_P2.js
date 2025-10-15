const { readInput } = require('../../input')
let input = readInput().repeat(10000)
/**
 * EXAMPLE:
 * For the example input of 12345678
 * We generate the matrix:
 *  1   2   3   4   5   6   7   8 <- Input
 *  1   0   -1  0   1   0   -1  0  
 *  0   1   1   0   0   -1  -1  0
 *  0   0   1   1   1   0   0   0
 *  0   0   0   1   1   1   1   0
 *  0   0   0   0   1   1   1   1   
 *  0   0   0   0   0   1   1   1
 *  0   0   0   0   0   0   1   1
 *  0   0   0   0   0   0   0   1
 * 
 * Observations:
 * The bottom-left triangle is full of 0
 * Once we reach halfway point, no more -1 parameters
 * Once we reach halfway point, values do not alternate, all 0s, then all 1s
 * 
 * */

const OFFSET = input.substring(0, 7)

/**
 * Since our offset is over halfway, we know it's only 0 or 1 in our mask
 * We also know that it's a sequence of 0s followed by a sequence of 1s (no alternate)
 * We only really care for the first 1, which happens to be at offset position
 * Any digit before that is not relevant, since it would be multiplied by 0
 * 
 * We reduce the input to the minimum required section, which is past halfway point
 * */

input = input.substring(OFFSET)

// Calculate every iteration
for (let j = 0; j < 100; j++) {
    // This is only one iteration
    // It is quite fast, over two iterations per second
    let newInput = ""
    let partialSum = 0
    for (let i = input.length - 1; i >= 0; i--) {
        // Still, this loop over 500000 iterations, one per every digit
        partialSum += Number.parseInt(input[i])
        newInput = `${partialSum % 10}` + newInput
    }
    input = newInput
}

// In total, less than 15 lines of code (without special javascript shenanigans)
// Absolutely brutal puzzle
console.log(input.substring(0, 8))