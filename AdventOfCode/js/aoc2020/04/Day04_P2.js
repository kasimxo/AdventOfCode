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

const keys = {
    byr: (s) => validateBYR(s),
    iyr: (s) => validateIYR(s),
    eyr: (s) => validateERY(s),
    hgt: (s) => validateHGT(s),
    hcl: (s) => validateHCL(s),
    ecl: (s) => validateECL(s),
    pid: (s) => validatePID(s)
    //cid
}
let solution = 0
passports.forEach(p => solution += validatePassport(p))
console.log(solution)

function validatePassport(passport){
    let returnValue = 1
    Object.entries(keys).forEach(([k,v])=>{
        if(!Object.keys(passport).includes(k) || !v(passport[k])){
            returnValue = 0
        }
    })
    return returnValue
}

function validateBYR(s){
    const val = Number.parseInt(s)
    return 1920 <= val && val <= 2002
}
function validateIYR(s){
    const val = Number.parseInt(s)
    return 2010 <= val && val <= 2020
}
function validateERY(s){
    const val = Number.parseInt(s)
    return 2020 <= val && val <= 2030
}
function validateHGT(s){
    const unit = s.slice(s.length-2)
    const val = Number.parseInt(s.slice(0, s.length-2))
    if(unit === 'cm'){
        return 150 <= val && val <= 193
    } else if (unit === 'in'){
        return 59 <= val && val <= 76
    }
}
function validateHCL(s){
    const myRe = /#([0-9]|[a-f]){6}/g;
    const myArray = s.match(myRe);
    return myArray?.length > 0 && myArray[0] != null
}
function validateECL(s){
    const validEyeColors = [
        "amb", "blu", "brn", "gry", "grn", "hzl", "oth"
    ]
    return validEyeColors.includes(s)
}
function validatePID(s){
    const val = Number.parseInt(s)
    return s.length === 9 && !Number.isNaN(val)
}