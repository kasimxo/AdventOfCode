const {readInput} = require('../../input')
let WIDTH = 25
let HEIGHT = 6
let LAYER_LENGTH = WIDTH * HEIGHT
let input = readInput()
let regex = new RegExp(`.{1,${LAYER_LENGTH}}`, 'g');
let layers = input.match(regex)
let finalLayer = ''
for(let i = 0; i<LAYER_LENGTH; i++){
    for(let l = 0; l<layers.length; l++){
        let done = false
        let pixel = layers[l][i]
        switch(pixel){
            case '0':
                finalLayer += pixel
                done = true
                break;
            case '1':
                finalLayer += pixel
                done = true
                break;
            case '2':
                break;
        }
        if(done) break
    }
}

let line = ''
for(let i = 0; i<finalLayer.length; i++){
    if(i%WIDTH===0&&i!==0){
        line += '\n'
    }
    line += finalLayer[i] === '1' ? '#' : ' '
}

console.log(line)