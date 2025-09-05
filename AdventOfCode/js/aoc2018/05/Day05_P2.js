const {readInput} = require('./input')
let input = readInput()

let polymers = [
    "aA", "bB", "cC", "dD", "eE", "fF", "gG", "hH", "iI", "jJ", "kK", "lL", "mM", "nN", "oO", "pP", "qQ", "rR", "sS", "tT", "uU", "vV", "wW", "xX", "yY", "zZ"
]
let pairs = [
    "aA", "bB", "cC", "dD", "eE", "fF", "gG", "hH", "iI", "jJ", "kK", "lL", "mM", "nN", "oO", "pP", "qQ", "rR", "sS", "tT", "uU", "vV", "wW", "xX", "yY", "zZ",
    "Aa", "Bb", "Cc", "Dd", "Ee", "Ff", "Gg", "Hh", "Ii", "Jj", "Kk", "Ll", "Mm", "Nn", "Oo", "Pp", "Qq", "Rr", "Ss", "Tt", "Uu", "Vv", "Ww", "Xx", "Yy", "Zz"
]

let min = Infinity
polymers.forEach(poly=>{
    let copy = input + ""
    let removed = copy.length
    poly.split('').forEach(l=>copy=copy.replaceAll(l, ''))
    removed -= copy.length
    
    let prevLength = Infinity
    while(prevLength>copy.length){
        prevLength = copy.length
        pairs.forEach(p=>copy=copy.replaceAll(p, ''))
    }
    
    min = Math.min(min, copy.length)
})

console.log(min)
