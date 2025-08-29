const {readInput} = require('./input')
const passports = readInput().split('\r\n\r\n').map(p => p.replaceAll('\r\n', ' ')).map(p => {
    const splitted = p.split(' ')
    const object = {}
    splitted.forEach(s => {
        const parts = s.split(':')
        object[parts[0]] = parts[1]
    })
    return object
})

const keys = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid"
    //cid
]
let solution = 0
passports.forEach(p => solution += validatePassport(p))
console.log(solution)

function validatePassport(passport){
    let returnValue = 1
    keys.forEach(k => {
        if(!Object.keys(passport).includes(k)){
            returnValue = 0
        }
    })
    return returnValue
}