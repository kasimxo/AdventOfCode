let input = "jlmsuwbz"
const md5 = require('js-md5');

let index = 0
let keys = []
/**
 * A key is stored with this info:
 *  index
 * index -> the index that produced that key
 */

let potentialKeys = [] 
/**
 * A potential key is a md5 secuence with 3 of the same digit in a row
 * We store its repeated digit and the index which produced such sequence
 * 
 * If in the next 1000 sequences, one with the same digit 5 times in a row is found,
 * that key is confirmed and stored in the keys object
 * 
 * If after 1000 sequences, no sequence is found with the same digit 5 times, the potential key is lost
 */
const potentialKeyRegex = new RegExp('(.)\\1{2}.*', 'g')
const validateKeyRegex = new RegExp('(.)\\1{4}.*', 'g')

while(true){
    let result = md5.hex(input + index);

    for(let i = 0; i<2016; i++){
        result = md5.hex(result)
    }

    let matchValidateKey = result.split(validateKeyRegex)[1]
    if(matchValidateKey !== undefined){
        let newKeys = []
        potentialKeys.forEach(([i, d, r])=>{
            if(index-i >= 1000) return
            if(matchValidateKey[0]===d) {
                keys.push(i)
            } else {
                newKeys.push([i, d, r])
            }
        })
        potentialKeys = newKeys
    }
    if(keys.length>=64) {
        console.log(keys[63])
        break
    }
    
    let matchPotentialKey = result.split(potentialKeyRegex)[1]
    if(matchPotentialKey !== undefined){
        potentialKeys.push([index, matchPotentialKey[0], result])
    }

    index++
}