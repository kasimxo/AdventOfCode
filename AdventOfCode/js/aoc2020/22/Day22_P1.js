const {readLines} = require('../../input')
let deck1 = []
let deck2 = []
let input = readLines()
let inputPlayer2 = false
input.forEach((line, index) => {
    if(index === 0) return
    if(line === "" || line === "Player 2:") {
        inputPlayer2 = true
    } else {
        if(inputPlayer2){
            deck2.push(Number.parseInt(line))
        } else {
            deck1.push(Number.parseInt(line))
        }
    }
})
let turns = 0
while(deck1.length>0 &&deck2.length>0){
    turns++
    let card1 = deck1.shift()
    let card2 = deck2.shift()
    if(card1>card2){
        deck1.push(card1, card2)
    } else {
        deck2.push(card2, card1)
    }
}
let score = 0
let winningDeck = deck1.length>0?deck1:deck2
for(let i = 0; i<winningDeck.length; i++){
    score+= winningDeck[i]*(winningDeck.length-i)
}
console.log(turns, score)