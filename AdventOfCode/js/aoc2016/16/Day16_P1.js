let input = "01111001100111011"
let TARGET_LENGTH = 272
while(input.length<TARGET_LENGTH){
    input+='0'
    for(let i = input.length-2; i>=0; i--){
        input += input[i] === '0' ? 1 : 0 
    }
}
input = input.substring(0, TARGET_LENGTH)
while(input.length%2===0){
    let pairs = input.match(/.{2}/g)
    let newInput = ''
    pairs.forEach(p=>{
        switch(p){
            case '00':
            case '11':
                newInput += '1'
                break;
            default:
                newInput += '0'
                break;
        }
    })
    input = newInput
}
console.log(input)