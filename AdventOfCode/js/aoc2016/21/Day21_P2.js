const {readLines} = require('../../input')
let input = readLines()
let target = "fbgdceah"
let letters = "abcdefgh".split('')

// This will brute force every possible combination until we find the correct one
// Although slow (several minutes), it is still doable due to input size
// With just a couple more characters, it would no longer be possible in reasonable time
for(let i = 0; i<letters.length; i++){
    for(let j = i; j<letters.length; j++){
        let inputText = letters.join('')
        let letterX = inputText[i]
        
        let letterY = inputText[j]
        let resultString = ''
        inputText.split('').forEach((c, index)=>{
            if(index===i){
                resultString+=letterY
            } else if(index===j){
                resultString+=letterX
            } else {
                resultString+=c
            }
        })
        console.log(resultString)
        PermuteLetters(resultString.slice(1), resultString[0])
    }
}

return

function PermuteLetters(text, firstHalf){
    //console.log(text, firstHalf)
    if(text.length<=1) {
        // Aqui simulamos porque ya tenemos la combinación final
        let result = SimulateInstructions(firstHalf+text)
        if(target.localeCompare(result)===0){
            console.log(firstHalf+text, result, target)
            throw new Error
        }
    }
    for(let i = 0; i<text.length; i++){
        for(let j = i; j<text.length; j++){
            let inputText = text
            let letterX = inputText[i]
            
            let letterY = inputText[j]
            let resultString = ''
            inputText.split('').forEach((c, index)=>{
                if(index===i){
                    resultString+=letterY
                } else if(index===j){
                    resultString+=letterX
                } else {
                    resultString+=c
                }
            })
            
            PermuteLetters(resultString.slice(1), firstHalf + resultString[0])
        }
    }
}


function SimulateInstructions(text){
    
    input.forEach(l=>{
        let words = l.split(' ')
        let newText = ''
        if(words[0]==='swap' && words[1]==='position') {
            newText = SwapPosition(text, words)
        } else if(words[0]==='swap' && words[1]==='letter'){
            newText = SwapLetter(text, words)
        } else if(words[0]==='rotate' && (words[1]==='left' || words[1]==='right')){
            newText = RotateString(text, words)
        } else if(words[0]==='rotate' && words[1]==='based') {
            newText = RotateBased(text, words)
        } else if(words[0]==='reverse' && words[1]==='positions'){
            newText = ReversePositions(text, words)
        } else if(words[0]==='move' && words[1]==='position'){
            newText = MovePosition(text, words)
        }
        text = newText
    })
    return text
}

console.log(text)

function MovePosition(inputText, words) {
    let resultString = ''

    let indexX = Number.parseInt(words[2])
    let indexY = Number.parseInt(words[5])
    let letter = inputText[indexX]
    let cleanString = inputText.replace(letter, '')
    resultString = cleanString.slice(0, indexY) + letter + cleanString.slice(indexY)
    return resultString
}

function RotateBased(inputText, words){
    let resultString = ''

    let targetLetter = words[6]
    let index = inputText.indexOf(targetLetter) // determine index
    let rotations = index >= 4 ? index + 2 : index +1// rotate the string to the right one time + index times + 1 additional if at least 4
    resultString = inputText.slice(inputText.length-rotations) + inputText.slice(0, inputText.length-rotations)
    //console.log(inputText, targetLetter, index, rotations, resultString)
    return resultString
}

function ReversePositions(inputText, words){
    let resultString = ''

    let firstIndex = Number.parseInt(words[2])
    let secondIndex = Number.parseInt(words[4]) + 1
    let firstPiece = inputText.slice(0, firstIndex)
    let lastPiece = inputText.slice(secondIndex)
    let reverseString = inputText.slice(firstIndex, secondIndex)
    let reversedString = ''
    for(let i = reverseString.length-1; i>=0; i--){
        reversedString += reverseString[i]
    }
    resultString = firstPiece + reversedString + lastPiece
    return resultString
}

function RotateString(inputText, words) {
    let resultString = ''
    let direction = words[1] === 'left' ? 1 : -1
    let positions = Number.parseInt(words[2]) * direction
    if(positions>0){
        // rotate left
        resultString = inputText.slice(positions) + inputText.slice(0, positions)
    } else {
        // rotate right
        resultString = inputText.slice(inputText.length + positions) + inputText.slice(0, inputText.length + positions)
    }
    return resultString
}

function SwapLetter(inputText, words){
    let resultString = ''
    let letterX = words[2]
    let letterY = words[5]
    inputText.split('').forEach(c=>{
        if(c===letterX){
            resultString+=letterY
        } else if(c===letterY){
            resultString+=letterX
        } else {
            resultString+=c
        }
    })
    return resultString
}

function SwapPosition(inputText, words){
    let indexX = Number.parseInt(words[2])
    let letterX = inputText[indexX]
    let indexY = Number.parseInt(words[5])
    let letterY = inputText[indexY]
    let resultString = ''
    inputText.split('').forEach((c, i)=>{
        if(i===indexX){
            resultString+=letterY
        } else if(i===indexY){
            resultString+=letterX
        } else {
            resultString+=c
        }
    })
    return resultString
}