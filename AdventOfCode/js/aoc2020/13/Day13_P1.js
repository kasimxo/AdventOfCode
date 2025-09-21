const { readLines } = require('../../input')
let input = readLines()
let id = Number.parseInt(input[0])
let buses = input[1].split(',').filter(b=>b!=='x').map(b=>Number.parseInt(b))
let minBusId = 0
let timestamp = Infinity
buses.forEach(b=>{
    let val = b * Math.ceil(id/b)
    if(val<timestamp){
        timestamp = val
        minBusId = b
    }
})
console.log(minBusId*(timestamp-id))