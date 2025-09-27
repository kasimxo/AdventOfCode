const {readLines} = require('../../input')
let input = readLines().map(l=>l.split('-').map(n=>Number.parseInt(n))).sort((a, b)=>a[0]-b[0])
let max = input[0][1]
input.forEach(ip=>{
    if(ip[0]<=max+1) max = Math.max(ip[1], max)
})
console.log(max+1)