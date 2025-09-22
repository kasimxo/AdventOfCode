const {readInput} = require('../../input')
let WIDTH = 25
let HEIGHT = 6
let LAYER_LENGTH = WIDTH * HEIGHT
let input = readInput()
let regex = new RegExp(`.{1,${LAYER_LENGTH}}`, 'g');
let layers = input.match(regex)
let zeroes = Infinity
let ones = 0
let twos = 0
layers.forEach((l, i)=>{
    let newZeroes = 0
    let newOnes = 0
    let newTows = 0
    l.split('').forEach(c=>{
        switch(c){
            case '0':
                newZeroes++
                break;
            case '1':
                newOnes++
                break;
            case '2':
                newTows++
                break;
        }
    })
    if(newZeroes<zeroes){
        zeroes = newZeroes
        ones = newOnes
        twos = newTows
    }
})
console.log(ones*twos)