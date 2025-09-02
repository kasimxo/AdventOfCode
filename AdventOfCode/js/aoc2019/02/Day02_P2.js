const {readInput} = require('./input')

for(let noun = 0; noun<100; noun++){ 
    for(let verb = 0; verb<100; verb++){
        let input = readInput().split(',').map(n=>Number.parseInt(n))
        input[1] = noun
        input[2] = verb
        let result = simulateOutput(input)
        if(result===19690720) {
            console.log("Solution: ", 100*noun+verb)
            noun = 100
            verb = 100
        }
    }
}

function simulateOutput(memory){
    let calculating = true
    let ip = 0
    while(calculating){
        let instruction = memory[ip]
        switch(instruction){
            case 1:
                memory[memory[ip+3]] = memory[memory[ip+1]] + memory[memory[ip+2]]
                break;
            case 2:
                memory[memory[ip+3]] = memory[memory[ip+1]] * memory[memory[ip+2]]
                break;
            case 99:
                calculating = false
                break;
            default:
                throw new Error
        }
        ip += 4
    }
    return memory[0]
}